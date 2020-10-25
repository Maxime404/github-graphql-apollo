import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import repoGithubIcon from './../img/repoGithubIcon.png'

function Profil(props) {
    console.log(props)
    if (props.data) props.data.user.repositories.nodes = props.data.user.repositories.nodes.filter(repository => repository.owner.login === props.viewerLogin);

    return props.data ? (
        <div class="my-5">
            <div class="row">
                <p class="col-md-12 title">Repositories</p>
            </div>
            <div class="row my-1 d-flex align-items-center repositories_line_1">
                <p class="col-md-1">#</p>
                <p class="col-md-3">Repository</p>
                <p class="col-md-2">Commits</p>
                <p class="col-md-2">Team</p>
                <p class="col-md-2">Language</p>
                <p class="col-md-2">Timeline</p>
            </div>
            {props.data.user.repositories.nodes ? props.data.user.repositories.nodes
                .map((repository, index) => (
                    <div class={`row my-1 d-flex align-items-center ${index % 2 ? "repositories_line_1" : "repositories_line_2"}`}>
                        <p class="col-md-1">{index}</p>
                        <div class="col-md-3">
                            <p class="font-weight-bold">{repository.owner.login}</p>
                        </div>
                        <p class="col-md-2">Commits</p>
                        <p class="col-md-2">{repository.collaborators.totalCount}</p>
                        <p class="col-md-2">{repository.primaryLanguage ? repository.primaryLanguage.name : "-"}</p>
                        <p class="col-md-2">Timeline</p>
                    </div>
                ))
                : <p>Loading data...</p>}
        </div>
    ) :
        (
            <p>Loading data...</p>
        )
}

export default Profil;