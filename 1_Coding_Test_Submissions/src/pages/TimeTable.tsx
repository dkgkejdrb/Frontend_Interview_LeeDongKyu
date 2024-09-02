import { Tabs, Switch } from "antd";
import type { TabsProps } from "antd";
import Periods from '../components/Periods';
import useTimeTableData from '../hooks/useTimeTableData';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './TimeTable.css';

function TimeTable() {
    // Retrieve timetable data from the global state
    const data = useSelector((state: RootState) => state.TimeTableDataState.value);

    // Get state values from the custom hook. When connecting to the API, you should receive data, loading, and error
    const { loading } = useTimeTableData();
    const [tabItems, setTabItems] = useState<TabsProps['items']>([]);

    // Key for querying the timetable data of the selected class
    const [clickedTabKey, setClickedTabKey] = useState<string>("");
    const TabsOnChange = (key: string) => {
        setClickedTabKey(key);
    };

    // When class is clicked, display the timetalbe
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