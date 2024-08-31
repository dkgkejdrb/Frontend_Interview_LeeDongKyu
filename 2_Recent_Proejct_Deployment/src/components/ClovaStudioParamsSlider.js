import React from 'react';
import { InputNumber, Slider } from 'antd';

const ClovaStudioParamsSlider = ({
    label,
    description,
    value,
    min,
    max,
    step,
    onChangeValue,
    clickedStateArray,
    index,
    setClickedStateArray
}) => {
    return (
        <div style={{ width: 200, marginBottom: "10px", display: "flex" }}>
            <div className="left">
                <div
                    style={{
                        width: 190,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        className={clickedStateArray[index] ? "clicked" : "unclicked"}
                        style={{ fontSize: 14, letterSpacing: -0.5 }}
                    >
                        {label}
                        <br />
                        {description}
                    </div>
                    <InputNumber
                        min={min}
                        max={max}
                        step={step}
                        onChange={onChangeValue}
                        value={value}
                        onClick={() => {
                            setClickedStateArray(clickedStateArray.map((state, i) => i === index));
                        }}
                        style={{ width: 60 }}
                    />
                </div>
                <Slider
                    range
                    min={min}
                    max={max}
                    step={step}
                    onChange={onChangeValue}
                    value={value}
                />
            </div>
        </div>
    );
};

export default ClovaStudioParamsSlider;