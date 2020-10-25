import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';

function Profil(props) {
    
    return props.data ? (
        <div class="my-5">
            <div class="row">
                <p class="col-md-6 align-self-end title">{props.data.user.name}</p>
                <p class="col-md-6 align-self-end">{props.data.user.bio}</p>
            </div>
            <div class="row">
                <img class="col-md-2 align-self-end avatar" src={props.data.user.avatarUrl} alt={props.data.user.name}/>
            </div>
        </div>
    ) : 
    (
        <div>Loading data...</div>
    )
}

export default Profil;