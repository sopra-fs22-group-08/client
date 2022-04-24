import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import PropTypes from "prop-types";
import {Button} from 'components/ui/Button';
import User from "../../models/User";
import Card from "../../models/Card";

const LearningToolResult = (props) => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const location = useLocation();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [user, setUser] = useState(null);

    const [cards, setCards] = useState(null);


    const [burgerMenu, setBurgerMenu] = useState(false);


    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    const goProfile = async () => {
        const id = localStorage.getItem("userId")
        history.push(`/profile/` + id);

    };

    const goHome = async () => {
        const id = localStorage.getItem("userId")
        history.push(`/home/` + id);

    };

    const goStore = async () => {
        history.push(`/store`);

    };

    const goCreator = async () => {
        history.push(`/deckcreator`);

    };




    let content;

    let burgerMenuContent = (
        <BaseContainer>
            <div className="profile window"></div>
            <div className="profile username"></div>
            <Button
                className="profile username"
                onClick={() => {setBurgerMenu(false); goProfile();}}
            >{user?.username  ? user.username : "Username"}
            </Button>
            <Button
                className="profile home"
                onClick={() => goHome()}
            >Home
            </Button>
            <Button
                className="profile store"
                onClick={() => goStore()}
            >Store
            </Button>
            <Button
                className="profile creator"
                onClick={() => goCreator()}
            >Creator
            </Button>
            <Button
                className="profile logoutButton"
                onClick={() => logout()}
            >Logout
            </Button>
            <div
                className="profile x"
                onClick={() => setBurgerMenu(false)}

            >x</div>

        </BaseContainer>
    )



    let count = localStorage.getItem('result');
    //count++
    const lengthDeck = localStorage.getItem('lengthDeck');

    content = (
        <BaseContainer>
            <div className="profile title">NB</div>


            <div className="profile burger1"></div>
            <div className="profile burger2"></div>
            <div className="profile burger3"></div>
            <div
                className="profile burgerButton"
                // open edit window
                onClick={() => setBurgerMenu(true)}
            ></div>

            <div className="card question-title">Result</div>


            <div><p>You had {(count)} out of {lengthDeck} correct</p></div>

        </BaseContainer>

    );
    document.body.style = 'background: #4757FF;';

    return (
            <BaseContainer>
                {content}
                {burgerMenu ? burgerMenuContent : null}
            </BaseContainer>
    );
}

export default LearningToolResult;
