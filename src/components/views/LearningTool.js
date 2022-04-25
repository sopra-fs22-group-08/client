import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/LearningTool.scss';
import PropTypes from 'prop-types';
import { Button } from 'components/ui/Button';
import User from '../../models/User';
import Card from '../../models/Card';
import { ButtonRedGreen } from '../ui/ButtonRedGreen';

const LearningTool = (props) => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const location = useLocation();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [user, setUser] = useState(null);
    //const [count, setCount] = useState(0);

    const [cards, setCards] = useState(null);
    const [deck, setDeck] = useState(null);

    const [b1, setB1] = useState(false);
    const [b2, setB2] = useState(false);
    const [b3, setB3] = useState(false);
    const [b4, setB4] = useState(false);

    const [arr, setArr] = useState(shuffleAnswers([1, 2, 0, 3]));

    const [counter, setCounter] = useState(0);

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

    const goStore = async () => {
        history.push(`/store`);
    };

    const goCreator = async () => {
        history.push(`/deckcreator`);
    };

    const goResult = async () => {
        history.push(`/learningtoolresult`);
    };

    const goNextCard = async () => {
        const deckId = location.pathname.match(/deckID=(\d+)/);
        let cardId = location.pathname.match(/cardID=(\d+)/);
        cardId[1]++;
        setB1(false);
        setB2(false);
        setB3(false);
        setB4(false);
        setArr(shuffleAnswers([1, 2, 0, 3]));
        history.push(`/learningtool/deckID=` + deckId[1] + '/cardID=' + cardId[1]);
    };

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const deckId = location.pathname.match(/deckID=(\d+)/);
                const responseCard = await api.get('/decks/' + deckId[1] + '/cards');

                const responseDeck = await api.get('/decks/' + deckId[1]);

                await new Promise((resolve) => setTimeout(resolve, 1000));

                setDeck(responseDeck.data);
                setCards(responseCard.data);
                setCards(responseCard.data);
            } catch (error) {
                console.error(
                    `Something went wrong while fetching the users: \n${handleError(error)}`
                );
                console.error('Details:', error);
                alert(
                    'Something went wrong while fetching the users! See the console for details.'
                );
            }
        }

        fetchData();
    }, []);

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
            <Button className='learningTool store' onClick={() => goStore()}>
                Store
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

    function shuffleAnswers(array) {
        let curId = array.length;
        while (0 !== curId) {
            let randId = Math.floor(Math.random() * curId);
            curId -= 1;
            let tmp = array[curId];
            array[curId] = array[randId];
            array[randId] = tmp;
        }
        return array;
    }
    const match = location.pathname.match(/cardID=(\d+)/);
    const cardID = match[1];

    async function checkAnswer(cardID, value) {
        let c = counter;
        if (value == 0) {
            //Right Answer
            c = c + 1;
            setCounter(c);
            localStorage.setItem('result', c);
        }

        await new Promise((resolve) => setTimeout(resolve, 1200));

        localStorage.setItem('lengthDeck', Object.keys(cards).length);

        checkNextCard(cardID, value);
    }
    //checks if there are still some cards left to learn
    function checkNextCard(cardID, value) {
        cardID++;
        if (Object.keys(cards).length <= cardID) {
            return goResult();
        } else {
            return goNextCard();
        }
    }
    if (cards) {
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
                <div className='learningTool question-field'></div>
                <FormFieldFn value={cards[cardID].question} />

                <div className='learningTool card2'></div>
                <div className='learningTool card'></div>
                <div className='learningTool card-number'>
                    {cardID}/{Object.keys(cards).length}
                </div>
                <div className='learningTool card-tittle'>{deck.deckname}</div>
                <div className='learningTool card-question'>{cards[cardID].question}</div>

                <div className='learningTool learn-tittle'>Which one is correct?</div>

                <Button
                    className={
                        b1
                            ? arr[0] == 0
                                ? 'learningTool card-aw1-card-green'
                                : 'learningTool card-aw1-card-red'
                            : 'learningTool card-aw1-card'
                    }
                    onClick={() => {
                        checkAnswer(cardID, arr[0]);
                        setB1(true);
                    }}
                >
                    {cards[cardID].options[arr[0]]}
                </Button>

                <Button
                    className={
                        b2
                            ? arr[1] == 0
                                ? 'learningTool card-aw2-card-green'
                                : 'learningTool card-aw2-card-red'
                            : 'learningTool card-aw2-card'
                    }
                    onClick={() => {
                        checkAnswer(cardID, arr[1]);
                        setB2(true);
                    }}
                >
                    {cards[cardID].options[arr[1]]}
                </Button>

                <Button
                    className={
                        b3
                            ? arr[2] == 0
                                ? 'learningTool card-aw3-card-green'
                                : 'learningTool card-aw3-card-red'
                            : 'learningTool card-aw3-card'
                    }
                    onClick={() => {
                        checkAnswer(cardID, arr[2]);
                        setB3(true);
                    }}
                >
                    {cards[cardID].options[arr[2]]}
                </Button>

                <Button
                    className={
                        b4
                            ? arr[3] == 0
                                ? 'learningTool card-aw4-card-green'
                                : 'learningTool card-aw4-card-red'
                            : 'learningTool card-aw4-card'
                    }
                    onClick={() => {
                        checkAnswer(cardID, arr[3]);
                        setB4(true);
                    }}
                >
                    {cards[cardID].options[arr[3]]}
                </Button>
            </BaseContainer>
        );
    }

    document.body.style = 'background: #FFCA00;';

    return (
        <BaseContainer>
            {content}
            {burgerMenu ? burgerMenuContent : null}
        </BaseContainer>
    );
};

export default LearningTool;