import React from 'react';
import { Select } from 'antd';

const ClovaStudioParamsSelector = ({
    label,
    options,
    value,
    onChangeValue,
    clickedStateArray,
    index,
    setClickedStateArray
}) => {
    return (
        <div
            style={{
                width: 200,
                display: "flex",
                marginBottom: "20px",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "5px",
                }}
            >
                <div
                    className={clickedStateArray[index] ? "clicked" : "unclicked"}
                    style={{
                        marginTop: 15,
                        fontSize: 14,
                    }}
                >
                    {label}
                </div>
                <Select
                    value={value}
                    options={options}
                    style={{
                        width: 190,
                    }}
                    onChange={onChangeValue}
                    onClick={() => { setClickedStateArray(clickedStateArray.map((state, i) => i === index)); }}
                />
            </div>
        </div>
    );
};

export default ClovaStudioParamsSelector;