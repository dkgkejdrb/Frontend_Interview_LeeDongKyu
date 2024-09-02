import { Button, Modal } from 'antd';
import { useState, MouseEvent } from 'react';
import { timeSlot } from '../hooks/useTimeTableData';
import MyTimePicker from './MyTimePicker';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useDispatch } from "react-redux";
import { setValue } from '../store/slices/TimeTableSlice';
import './Periods.css';

interface periodsProps {
    clickedTabKey: string | undefined
}

interface periodProps {
    labelText: string;
    labelTime: string;
    sliceIndex: [number, number];
    addBtnText: string;
}

function Periods({ clickedTabKey }: periodsProps) {
    // Retrieve time table data into the global state
    const data = useSelector((state: RootState) => state.TimeTableDataState.value);
    const dispatch = useDispatch();

    // On mount, to avoid issue(clickedTabKey(undefined)), set default value to the first key in Tab
    const firstTabKey = Object.keys(data)[0];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState<string | null>(); // key: classname, tab label name
    const [selectedIndex, setSelectedIndex] = useState<number | null>(); // index: class number

    // When user clicks "Delete" button in the warning Modal
    const handleOk = () => {
        if (selectedKey && selectedIndex !== null) {
            const newArray = [...data[selectedKey]];

            if (selectedIndex === 0) {
                newArray.splice(Number(selectedIndex), 1);
            } else {
                newArray.splice(Number(selectedIndex), 1);
            }

            newArray.push({ startTime: "", endTime: "" });
            // Update global state(timetable data)
            dispatch(setValue({
                ...data,
                [selectedKey]: newArray
            }));
        }
        setIsModalOpen(false);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    // When users clikcs "Delete" btn
    const deleteBtnHandler = (e: MouseEvent<HTMLButtonElement>) => {

        // Show the Modal
        setIsModalOpen(true);

        // Extract both "key" and "index" from DOM's id
        const buttonId = e.currentTarget.id;
        const [key, index] = buttonId.split('@');

        setSelectedKey(key);
        setSelectedIndex(Number(index));
    }

    // On mount, use "first key" (Example: 2A-1 (201~))
    const activeKey = clickedTabKey || firstTabKey;

    // When user clicks "Add" btn
    const addBtnHandler = (e: MouseEvent<HTMLButtonElement>) => {
        const buttonName = e.currentTarget.name;
        let startIndex = 0;

        if (buttonName === "+ 오전 교시 추가") {
            startIndex = 0;
        } else if (buttonName === "+ 오후 교시 추가") {
            startIndex = 5;
        } else if (buttonName === "+ 저녁 교시 추가") {
            startIndex = 10;
        }

        const tmpArray = data[activeKey];

        // Find the first empty time slot in period time that user have selected
        const emptyIndexArray = tmpArray
            .slice(startIndex, startIndex + 5)
            .map((timeSlot, index) => startIndex + index) // mapping index on based 3-period section
            .filter((_, index) => {
                const timeSlot = tmpArray[startIndex + index];
                return !timeSlot.startTime && !timeSlot.endTime;
            });

        // // Extract the first empty slot from the array of empty time slots
        const emptyIndex = emptyIndexArray.filter(index => index !== undefined)[0];
        // Slice the period array at the empty slot position, add the new period, then merge
        if (emptyIndex !== undefined) {
            const beforeArray = tmpArray.slice(0, emptyIndex);
            const afterArray = tmpArray.slice(emptyIndex, tmpArray.length);

            beforeArray.push({ startTime: "00:00", endTime: "00:00" });
            const newArray = beforeArray.concat(afterArray);

            dispatch(setValue({
                ...data,
                [activeKey]: newArray
            }));
        }
    }

    // Component for adding, deleting, and setting class times
    // labelText, labelTime: Labels
    // sliceIndex: Indicates the section where the set time is displayed
    // addBtnText: Button name, used to update global state (timetable data)
    const Period = ({ labelText, labelTime, sliceIndex, addBtnText }: periodProps) => {
        return (
            <div className="period">
                <div className="firstRow">
                    <h1>{labelText}</h1>
                    <h1>{labelTime}</h1>
                </div>
                <div className="secondRows">
                    {
                        data[activeKey].slice(sliceIndex[0], sliceIndex[1]).map((timeSlot: timeSlot, index: number) => (
                            <div className="row" key={index}>
                                <p className="left">
                                    {index + sliceIndex[0] + 1}교시
                                </p>
                                <div className="middle">
                                    {
                                        !timeSlot.startTime && !timeSlot.endTime ?
                                            <></>
                                            :
                                            <>
                                                <MyTimePicker activeKey={activeKey} index={index} sliceIndex={sliceIndex[0]} isStartTime={true} />
                                                <div className="dividerWrapper">
                                                    <div className="divider"></div>
                                                </div>
                                                <MyTimePicker activeKey={activeKey} index={index} sliceIndex={sliceIndex[0]} isStartTime={false} />
                                            </>
                                    }
                                </div>
                                <div className="_right">
                                    {
                                        !timeSlot.startTime && !timeSlot.endTime ?
                                            <></>
                                            :
                                            <Button className="deleteBtn" id={`${activeKey}@${index + sliceIndex[0]}`} onClick={deleteBtnHandler}>삭제</Button>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <Button className="addClassBtn" name={addBtnText} onClick={addBtnHandler}>{addBtnText}</Button>
            </div>
        );
    }

    return (
        <div className="periods">
            <Modal title="주의" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="삭제하기" cancelText="취소">
                <p>정말로 삭제하시겠습니까?</p>
            </Modal>
            <Period labelText="오전" labelTime="(~12:00)" sliceIndex={[0, 5]} addBtnText="+ 오전 교시 추가" />
            <Period labelText="오후" labelTime="(13:00~)" sliceIndex={[5, 10]} addBtnText="+ 오후 교시 추가" />
            <Period labelText="저녁" labelTime="(19:00~)" sliceIndex={[10, 15]} addBtnText="+ 저녁 교시 추가" />
        </div>
    )
}

export default Periods;