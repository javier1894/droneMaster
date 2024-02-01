import React from "react";

export const CounterCard = ({ children, title, counter }) => {
    return (
        <div className="counterCardStudent">
            <div className="iconContainer">{children}</div>
            <div className="textContianer">
                <h6 className="title">{title}</h6>
                <h6>{counter}</h6>
            </div>
        </div>
    );
};