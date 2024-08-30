import { useEffect, useState, MouseEvent } from 'react';
import { Button, ConfigProvider, Input } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useDispatch } from "react-redux";
import { setValue } from '../store/slices/TimeTableSlice';
import './MyTimePicker.css';

interface MyTimePickerProps {
    activeKey: string,
    index: number,
    sliceIndex: number,
    isStartTime: boolean,
}

function MyTimePicker({ activeKey, index, sliceIndex, isStartTime }: MyTimePickerProps) {
    // 전역 상태(시간표 data) 불러오기
    const data = useSelector((state: RootState) => state.TimeTableDataState.value);
    const dispatch = useDispatch();

    const [hour, setHour] = useState<string>("00");
    const [minute, setMinute] = useState<string>("00");
    const [inputTime, setInputTime] = useState<string>("00:00");

    // 첫 화면 렌더링 시, data 뿌리기
    useEffect(() => {
        const timeSlot = data[activeKey][index + sliceIndex];
        if (isStartTime) {
            const array = timeSlot.startTime.split(':');
            setHour(array[0]);
            setMinute(array[1]);
        } else {
            const array = timeSlot.endTime.split(':');
            setHour(array[0]);
            setMinute(array[1]);
        }
    }, [])

    const hourBtnHandler = ((e: MouseEvent<HTMLButtonElement>) => {
        const _hour = e.currentTarget.name;
        setHour(_hour);
    })

    const minuteBtnHandler = ((e: MouseEvent<HTMLButtonElement>) => {
        const _minute = e.currentTarget.name;
        setMinute(_minute);
    })

    // input 클릭 시 Timepicker 창 열기
    const [isOpen, setIsOpen] = useState(false);
    const inputHandler = () => {
        setIsOpen(!isOpen);
    }

    // Timepicker의 확인 버튼을 클릭 시, 전역 상태(시간표 data) 갱신
    const timeBtnHandelr = ((e: MouseEvent<HTMLButtonElement>) => {
        setIsOpen(false);

        const _inputTime = inputTime || "";  // undefined일 경우 빈 문자열로 대체

        const timeSlotKey = isStartTime ? "startTime" : "endTime";

        const _data = {
            ...data,
            [activeKey]: data[activeKey].map((timeSlot, i) =>
                i === index + sliceIndex ?
                    {
                        ...timeSlot,
                        [timeSlotKey]: _inputTime
                    }
                    :
                    timeSlot
            )
        };
        dispatch(setValue(_data)); // 전역 상태(시간표 data) 갱신
    });

    useEffect(() => {
        setInputTime(
            `${hour}:${minute}`
        )
    }, [data, hour, minute]);

    return (
        <ConfigProvider wave={{ disabled: true }}>
            <div className="myTimePickerWrapper">
                <Input
                    className="timePickerInput"
                    value={inputTime}
                    onClick={inputHandler} readOnly />
                {
                    isOpen &&
                    <div className="timePickerBoard">
                        <div className="outFrame">
                            <div className="leftFrame">
                                {
                                    Array.from({ length: 25 }, (_, hour) => hour).map((hour, i) => (
                                        <Button className="timeOption" key={i + 1} name={hour.toString().padStart(2, '0')} onClick={hourBtnHandler}>
                                            {hour.toString().padStart(2, '0')}
                                        </Button>
                                    ))}
                            </div>
                            <div className="rightFrame">
                                {
                                    Array.from({ length: 60 }, (_, hour) => hour).map((hour, i) => (
                                        <Button className="timeOption" key={i + 1} name={hour.toString().padStart(2, '0')} onClick={minuteBtnHandler}>
                                            {hour.toString().padStart(2, '0')}
                                        </Button>
                                    ))}
                            </div>
                        </div>
                        <div className="secondRow">
                            <Button className="timeUpdateBtn" onClick={timeBtnHandelr}>확인</Button>
                        </div>
                    </div>
                }
            </div>
        </ConfigProvider>
    );

}

export default MyTimePicker;