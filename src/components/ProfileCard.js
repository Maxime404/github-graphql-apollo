import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfileCard(props) {
    return (
        <div class={`profileCard d-flex flex-column ${props.greenColor ? "ProfileCardGreenColor" : ""}`}>
            <span>{props.label}</span>
            <span>{`${props.value !== "" ? props.value : "-"}`}</span>
        </div>

    )
}

export default ProfileCard;
