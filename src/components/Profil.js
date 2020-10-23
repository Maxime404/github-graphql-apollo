import React from 'react';

function Profil(props) {
    console.log(props.data)

    return (
        <p>{`Login : ${props.data}`}</p>
    )
}

export default Profil;