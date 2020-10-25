import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import repoGithubIcon from './../img/repoGithubIcon.png'

function Profil(props) {
    console.log(props)
    if (props.data) props.data.user.repositories.nodes = props.data.user.repositories.nodes.filter(repository => repository.owner.login === props.viewerLogin);

    return props.data ? (
        <div class="my-5">
            <div class="row d-flex align-items-center">
                <p class="col-md-10 title">Repositories</p>
                <span class="col-md-2">{`${props.data.user.repositories.totalCount} repos`}</span>
            </div>
            <div class="row mb-05 d-flex align-items-center repositories_line_color1">
                <span class="col-md-1 text-center">#</span>
                <span class="col-md-3 text-center">Repository</span>
                <span class="col-md-2 text-center">Commits</span>
                <span class="col-md-2 text-center">Team</span>
                <span class="col-md-2 text-center">Language</span>
                <span class="col-md-2 text-center">Timeline</span>
            </div>
            {props.data.user.repositories.nodes ? props.data.user.repositories.nodes
                .map((repository, index) => (
                    <div class={`row d-flex align-items-center mb-05 ${index % 2 ? "repositories_line_color1" : "repositories_line_color2"}`}>
                        <span class="col-md-1 text-center d-inline ">{index}</span>
                        <div class="col-md-3 text-center">
                            <img class="d-inline mr-3 repoGithubIcon" src={repoGithubIcon} alt='repo-github-icon' />
                            <span class="d-inline font-weight-bold">{repository.owner.login}</span>
                        </div>
                        <span class="col-md-2 text-center">{repository.ref ? repository.ref.target.history.totalCount : "0"}</span>
                        <span class="col-md-2 text-center">{repository.collaborators.totalCount}</span>
                        <span class="col-md-2 text-center">{repository.primaryLanguage ? repository.primaryLanguage.name : "-"}</span>
                        <span class="col-md-2 text-center">-</span>
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