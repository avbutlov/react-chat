import React from 'react'
import { Link } from "react-router-dom";

const HomeButton = ({goHome}) => {
    return (
        <Link to='/' onClick={goHome}>
        <button
          className="waves-effect waves-light btn-large"
        >
          main page
        </button>
        </Link>
    )
}

export default HomeButton;