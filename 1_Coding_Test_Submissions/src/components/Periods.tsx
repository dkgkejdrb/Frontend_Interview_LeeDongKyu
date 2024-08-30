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
    // 전역 상태(시간표 data) 불러오기
    const data = useSelector((state: RootState) => state.TimeTableDataState.value);
    const dispatch = useDispatch();

    // 첫 화면 렌더링 시, clickedTabKey(undefined)를 피하기 위해 첫번째 키의 값으로 초기 설정
    const firstTabKey = Object.keys(data)[0];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState<string | null>(); // key는 학급명, 탭 라벨
    const [selectedIndex, setSelectedIndex] = useState<number | null>(); // index는 교시

    // 삭제 여부 모달에서 "삭제하기" 클릭했을 때
    const handleOk = () => {
        if (selectedKey && selectedIndex !== null) {
            const newArray = [...data[selectedKey]];

            if (selectedIndex === 0) {
                newArray.splice(Number(selectedIndex), 1);
            } else {
                newArray.splice(Number(selectedIndex), 1);
            }

            newArray.push({ startTime: "", endTime: "" });
            // 전역 상태(시간표 data) 갱신
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

    // 삭제 버튼을 눌렀을 때
    const deleteBtnHandler = (e: MouseEvent<HTMLButtonElement>) => {

        // 삭제 여부 모달 팝업
        setIsModalOpen(true);

        // 버튼 id에서 key와 index 추출
        const buttonId = e.currentTarget.id;
        const [key, index] = buttonId.split('@');

        // 추출한 key와 idnex 상태로 저장해서 handleOK에서 사용
        setSelectedKey(key);
        setSelectedIndex(Number(index));
    }

    // 첫 화면 렌더링 시, 첫번째 key 사용 (예: 2A-1 (201~))
    const activeKey = clickedTabKey || firstTabKey;

    // 추가 버튼을 눌렀을 때
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

        // 추가 버튼에 해당하는 Period에 맞게 총 5길이의 교시 배열에서 비어있는 교시 위치 찾기
        const emptyIndexArray = tmpArray
            .slice(startIndex, startIndex + 5)
            .map((timeSlot, index) => startIndex + index) // 교시 인덱스를 먼저 매핑
            .filter((_, index) => {
                const timeSlot = tmpArray[startIndex + index];
                return !timeSlot.startTime && !timeSlot.endTime;
            });

        // 비어있는 교시 위치 배열에서 첫 번째 위치만 추출
        const emptyIndex = emptyIndexArray.filter(index => index !== undefined)[0];
        // 비어있는 교시 위치를 기준으로 교시 배열 슬라이싱하고 추가 후, 결합하기
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

    // 수업 추가, 삭제, 시간 설정 컴포넌트
    // labelText, labelTime: 라벨
    // sliceIndex: 설정한 시간이 표시될 구간을 나타내는 값
    // addBtnText: 버튼의 name. 해당 값으로 전역 상태(시간표 data) 갱신
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