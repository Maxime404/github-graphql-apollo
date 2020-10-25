import React, { Component } from 'react'
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Profile';
import Repositories from './Repositories';

import gql from "graphql-tag";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewer: {},
      profileData: "",
      repositoriesData: "",
      commitTotalCount: 0
    }
  }

  componentDidMount() {
    this.getViewer();
  }

  getViewer() {
    this.props.query({
      query: gql`
        query {
          viewer {
            login
            id
          }
        }
    `})
      .then(result => {
        const viewer = result.data.viewer || process.env.REACT_APP_DEFAULT_VIEWER;

        this.setState({ viewer });
        this.setAllQueries();
      });
  }

  setAllQueries() {
    this.getProfileData();
    this.getRepositoriesData();
  }

  getProfileData() {
    this.props.query({
      query: gql`
      {
        user(login: "${this.state.viewer.login}") {
            repositories {
              totalCount
            },
            name
            bio
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
      }
    `}).then(result => {
        this.setState({ profileData: result.data });
      });
  }

  getRepositoriesData() {
    this.props.query({
      query: gql`
      { 
        user(login: "${this.state.viewer.login}") {
          repositories(first: 100) {
            totalCount
            nodes {
              nameWithOwner
              name
              owner {
                login
              }
              description
              collaborators {
                totalCount
              }
              createdAt
              primaryLanguage {
                name
              }
              languages(first: 100) {
                nodes {
                  name
                }
              }
              ref(qualifiedName: "master") {
                target {
                    ... on Commit {
                        history(author: {id: "${this.state.viewer.id}"}) {
                            totalCount
                        }
                    }
                } 
              }
            }
          }
        }
      }
    `}).then(result => {
        this.setState({ repositoriesData: result.data });
        this.calculateCommits(result.data);
      });
  }

  calculateCommits(repositoriesData) {
    if (repositoriesData) {
      const repositoriesData = this.state.repositoriesData;
      let commitTotalCount = 0

      repositoriesData.user.repositories.nodes
        .map((repository) => {
          commitTotalCount += repository.ref ? repository.ref.target.history.totalCount : 0;
        });

      this.setState({ commitTotalCount });
    }
  }

  render() {
    return (
      <div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50px", backgroundColor: "#89d4e8" }}></div>
        <div style={{ position: "absolute", top: 50, left: 0, right: 0, height: "285px", backgroundColor: "#F0F4F1" }}>
          <div class="container mt-5">
            <Profile data={this.state.profileData} commits={this.state.commitTotalCount} />
            <Repositories viewerLogin={this.state.viewer.login} data={this.state.repositoriesData} />
          </div>
        </div>
      </div>

    );
  }
}
