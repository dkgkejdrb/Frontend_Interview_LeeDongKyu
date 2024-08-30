import { Tabs, Switch } from "antd";
import type { TabsProps } from "antd";
import Periods from '../components/Periods';
import useTimeTableData from '../hooks/useTimeTableData';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './TimeTable.css';

function TimeTable() {
    // 전역 상태(시간표 data) 불러오기
    const data = useSelector((state: RootState) => state.TimeTableDataState.value);

    // 커스텀 훅에서 상태값 받아오기. API 연동 시, data, loading, error 다 받아와야 함
    const { loading } = useTimeTableData();
    const [tabItems, setTabItems] = useState<TabsProps['items']>([]);

    // 학급의 시간표 data 조회를 위한 key
    const [clickedTabKey, setClickedTabKey] = useState<string>("");
    const TabsOnChange = (key: string) => {
        setClickedTabKey(key);
    };

    // 학급 클릭 시, 해당 학급의 시간표 표시하기
    useEffect(() => {
        if (data && !loading) {
            const _tabItems = Object.keys(data).map((tabItem) => {
                return ({
                    key: tabItem,
                    label: tabItem,
                    children: (
                        <Periods
                            clickedTabKey={clickedTabKey} />
                    )
                })
            })
            setTabItems(_tabItems);
        }
    }, [loading, clickedTabKey]);

    return (
        <div className="container">
            <div className="tapBar">
                <Tabs items={tabItems} onChange={TabsOnChange} />
                <div className="right">
                    <Switch className="timeTableSwitch" defaultChecked={false} />
                    <label>모든 교실 동일 시간표 적용</label>
                </div>
            </div>
        </div>
    );
}

export default TimeTable;