import React from "react";
import { Range, getTrackBackground } from "react-range";

const InputRange = ({value, step, min, max, setValue}) => {
        return (
                <Range
                    values={[value]}
                    step={step}
                    min={min}
                    max={max}
                    onChange={(values) => {setValue(values)}}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "2px",
                                display: "flex",
                                width: "100%",
                                position: "absolute",
                                bottom: 0,
                                padding: "0 24px",
                                zIndex: 10
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "2px",
                                    width: "100%",
                                    borderRadius: "2px",
                                    background: getTrackBackground({
                                        values: [value],
                                        colors: ["#ff9514", "#e1e1e1"],
                                        min: min,
                                        max: max
                                    }),
                                    alignSelf: "center"
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "20px",
                                width: "20px",
                                borderRadius: "100%",
                                backgroundColor: "#ff9514",
                            }}
                        >
                        </div>
                    )}
                />
        );
}

export default InputRange
