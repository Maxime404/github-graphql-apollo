import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profil from './Profil'

import gql from "graphql-tag";
import { Query } from "react-apollo";

const PROFIL = gql`
  {
    user(login: "Maxime404") {
        repositories {
          totalCount
        },
        avatarUrl,
        bio,
        name
      }
  }
`;

function App(props) {

  props.query({
      query: gql`
      query {
        viewer {
          login
        }
      }
    `
    })
    .then(result => console.log(result));

  return (
    <div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50px", backgroundColor: "#89d4e8" }}></div>
      <div style={{ position: "absolute", top: 50, left: 0, right: 0, height: "285px", backgroundColor: "#F0F4F1" }}>
        <div class="container">
          <div class="mt-5">
            <Query query={PROFIL} variables={{}}>
              {({ data, loading }) =>
                loading ? (
                  <span>I am loading your data...</span>
                ) : (
                    <Profil data={data} />
                  )
              }
            </Query>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
