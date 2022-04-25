import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/LearningTool.scss';
import PropTypes from 'prop-types';
import { Button } from 'components/ui/Button';
import User from '../../models/User';
import Card from '../../models/Card';

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
    };

    const goProfile = async () => {
        const id = localStorage.getItem('userId');
        history.push(`/profile/` + id);
    };

    const goHome = async () => {
        const id = localStorage.getItem('userId');
        history.push(`/home/` + id);
    };

    const goPublicDecks = async () => {
        history.push(`/publicdecks`);
    };

    const goCreator = async () => {
        history.push(`/deckcreator`);
    };

    let content;

    let burgerMenuContent = (
        <BaseContainer>
            <div className='learningTool window'></div>
            <div className='learningTool username'></div>
            <Button
                className='learningTool username'
                onClick={() => {
                    setBurgerMenu(false);
                    goProfile();
                }}
            >
                {user?.username ? user.username : 'Username'}
            </Button>
            <Button className='learningTool home' onClick={() => goHome()}>
                Home
            </Button>
            <Button className='learningTool publicdecks' onClick={() => goPublicDecks()}>
                Public Decks
            </Button>
            <Button className='learningTool creator' onClick={() => goCreator()}>
                Creator
            </Button>
            <Button className='learningTool logoutButton' onClick={() => logout()}>
                Logout
            </Button>
            <div className='learningTool x' onClick={() => setBurgerMenu(false)}>
                x
            </div>
        </BaseContainer>
    );

    let count = localStorage.getItem('result');
    localStorage.setItem('result', 0);

    const lengthDeck = localStorage.getItem('lengthDeck');

    content = (
        <BaseContainer>
            <div className='learningTool title'>NB</div>

            <div className='learningTool burger1'></div>
            <div className='learningTool burger2'></div>
            <div className='learningTool burger3'></div>
            <div
                className='learningTool burgerButton'
                // open edit window
                onClick={() => setBurgerMenu(true)}
            ></div>

            <div className='learningTool resPage-Title'>Result</div>

            <div className='learningTool resPage-Text'>
                You had {count} out of {lengthDeck} correct
            </div>
        </BaseContainer>
    );
    document.body.style = 'background: #FFCA00;';

    return (
        <BaseContainer>
            {content}
            {burgerMenu ? burgerMenuContent : null}
        </BaseContainer>
    );
};

export default LearningToolResult;