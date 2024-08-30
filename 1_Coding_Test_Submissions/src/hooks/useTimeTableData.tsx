import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setValue } from '../store/slices/TimeTableSlice'

export interface timeSlot {
    startTime: string;
    endTime: string;
}

export interface timeTableData {
    [key: string]: timeSlot[];
}

// ERP API로 부터 가져온 시간표 데이터로 가정. 더미 데이터
const dummyDataFromErp: timeTableData = {
    "2A-1 (201~)": [
        { startTime: "08:00", endTime: "08:50" },
        { startTime: "09:00", endTime: "10:15" },
        { startTime: "10:30", endTime: "12:00" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
        { startTime: "08:00", endTime: "08:50" },
        { startTime: "09:00", endTime: "10:15" },
        { startTime: "10:30", endTime: "12:00" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
        { startTime: "08:00", endTime: "08:50" },
        { startTime: "09:00", endTime: "10:15" },
        { startTime: "10:30", endTime: "12:00" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
    ],
    "3B-1 (301~)": [
        { startTime: "08:00", endTime: "08:50" },
        { startTime: "09:00", endTime: "10:15" },
        { startTime: "10:30", endTime: "12:00" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
        { startTime: "08:00", endTime: "08:50" },
        { startTime: "09:00", endTime: "10:15" },
        { startTime: "10:30", endTime: "12:00" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
        { startTime: "08:00", endTime: "08:50" },
        { startTime: "09:00", endTime: "10:15" },
        { startTime: "10:30", endTime: "12:00" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
    ],
    "2A-2 (401~)": [
        { startTime: "08:00", endTime: "08:50" },
        { startTime: "09:00", endTime: "10:15" },
        { startTime: "10:30", endTime: "12:00" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
        { startTime: "08:00", endTime: "08:50" },
        { startTime: "09:00", endTime: "10:15" },
        { startTime: "10:30", endTime: "12:00" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
        { startTime: "08:00", endTime: "08:50" },
        { startTime: "09:00", endTime: "10:15" },
        { startTime: "10:30", endTime: "12:00" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
    ],
};

function useTimeTableData () {
    const [data, setData] = useState<timeTableData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(dummyDataFromErp); // 본 프로젝트에서 사용 안함
                dispatch(setValue(dummyDataFromErp)); // 서비스 시 삭제해야 함. 테스트를 위해, 전역 상태에 더미 데이터 주입, 
            } catch (error) {
                setError(`오류 발생 ${error}`);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, []);

      return { data, loading, error };
}

export default useTimeTableData;