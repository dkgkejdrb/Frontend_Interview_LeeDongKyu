import { Button } from "antd";
import { Link } from 'react-router-dom';

function TimeTable() { 

    return(
        <div className=".container" style={{ textAlign: "center" }}>
            <h1>WELCOME!</h1>
            <p>
                시간표 관리 기능에 접근하기 위해, 아래 버튼을 클릭해 주세요. 
            </p>
            <p>
                👇👇Click Here!👇👇
            </p>
            <Link to="/timetable">
                <Button>시간표 관리로 이동</Button>
            </Link>
        </div>
    );
}

export default TimeTable;