import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import ProfileCard from './ProfileCard';


function Profil(props) {
    console.log(props)

    return props.data ? (
        <div class="my-5 pt-5">
            <div class="row d-flex align-items-center mb-2">
                <p class="col-md-6 title">{props.data.user.name}</p>
                <p class="col-md-6">{props.data.user.bio}</p>
            </div>
            <div class="row">
                <span class="col-md-2 mb-2">{props.data.user.name}</span>
            </div>
            <div class="row d-flex align-items-center">
                <img class="col-md-2 avatar" src={props.data.user.avatarUrl} alt={props.data.user.name} />
                <div class="col-md-2"><ProfileCard label="Commits" value={props.commits} /></div>
                <div class="col-md-2"><ProfileCard label="Repos" value={props.data.user.repositories.totalCount} /></div>
                <div class="col-md-2"><ProfileCard label="Lines of code" value="" /></div>
                <div class="col-md-2"><ProfileCard label="Followers" value={props.data.user.followers.totalCount} greenColor="true" /></div>
                <div class="col-md-2"><ProfileCard label="Following" value={props.data.user.following.totalCount} greenColor="true" /></div>
            </div>
        </div>
    ) :
        (
            <div>Loading data...</div>
        )
}

export default Profil;