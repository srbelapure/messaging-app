import React from 'react';

const TitleComponent =({appTitle})=>{
    var currentUser = JSON.parse(localStorage.getItem("chatWindowDetails")) 
    return(
        <div className="header-section">
            {appTitle}
            <div className="current-user-name">Name:{" "}{currentUser.username}</div>
        </div>
    )
}

export default TitleComponent;