import React from "react";
import 'styles/ui/Popup.scss';
import {Button} from "./Button";

function accept() {
    console.log("You have accepted the request")
}

export const Popup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
                <Button width='100%' onClick={() => accept()}>
                    Accept
                </Button>
            </div>
        </div>
    );
};