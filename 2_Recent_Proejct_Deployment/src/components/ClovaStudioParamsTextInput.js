import React from 'react';
import { Input } from 'antd';

const ClovaStudioParamsTextInput = ({
    label,
    index,
    value,
    onChange,
    onKeyDown,
    onKeyDownCapture,
    clickedStateArray,
    setClickedStateArray
}) => {
    return (
        <div style={{ width: 200, marginBottom: "10px", display: "flex" }}>
            <div className="left" style={{ width: 190 }}>
                <div
                    className={clickedStateArray[index] ? "clicked" : "unclicked"}
                    style={{
                        marginBottom: "10px",
                        letterSpacing: "-1px",
                        fontSize: 14,
                    }}
                >
                    {label}
                </div>
                <Input
                    style={{ width: 190, height: "30px" }}
                    onChange={onChange}
                    value={value}
                    onKeyDown={onKeyDown}
                    onKeyDownCapture={onKeyDownCapture}
                    onClick={() => { setClickedStateArray(clickedStateArray.map((state, i) => i === index)); }}
                />
            </div>
        </div>
    );
};

export default ClovaStudioParamsTextInput;