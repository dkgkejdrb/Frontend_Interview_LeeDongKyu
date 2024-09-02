import { Button } from "antd";
import { Link } from 'react-router-dom';

function TimeTable() {

    return (
        <div className=".container" style={{ textAlign: "center" }}>
            <h1>WELCOME!</h1>
            <p>
                To set up a timetable, please click the button below.
            </p>
            <p>
                👇👇Click Here!👇👇
            </p>
            <Link to="/timetable">
                <Button>Set Up Timetable</Button>
            </Link>
        </div>
    );
}

export default TimeTable;