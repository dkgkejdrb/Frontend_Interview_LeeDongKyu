import { NextPage } from "next";
import React, { useEffect, useState } from "react";

interface Props {
    isDone: any;
}

const Timer: NextPage<Props> = ({ isDone }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Executes the setInterval callback at 0.1-second intervals
        const id = setInterval(() => {
            // Increment the timer count
            setCount((count) => count + 1);
        }, 100); // Changed from 10 to 100 to count at 0.1-second intervals

        // console.log(isDone);
        if (isDone) {
            clearInterval(id);
        }

        return () => clearInterval(id);
        // Re-runs useEffect whenever the count variable changes
    }, [count]);

    return (
        <div>
            <div style={{ color: "red" }}>{count / 10}</div>
            <div style={{ color: "red" }}>{"isDone"}</div>
        </div>
    );
}

export default Timer;