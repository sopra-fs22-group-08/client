import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/CardCreator.scss';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';
import Card from '../../models/Card';

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const FormFieldLn = (props) => {
    return (
        <div className='cardCreator card-question-field'>
            <input
                className='cardCreator card-text'
                placeholder='Enter the Question ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldLn.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const FormFieldEm = (props) => {
    return (
        <div className='cardCreator card-aw-field'>
            <input
                className='cardCreator card-text'
                placeholder='Enter the Answer ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldEm.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const FormFieldFn = (props) => {
    return (
        <div className='cardCreator card-waw1-field'>
            <input
                className='cardCreator card-text'
                placeholder='Enter a wrong Answer ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldFn.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};
const FormFieldUn = (props) => {
    return (
        <div className='cardCreator card-waw2-field'>
            <input
                className='cardCreator card-text'
                placeholder='Enter a wrong Answer ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldUn.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};
const FormFieldPw = (props) => {
    return (
        <div className='cardCreator card-waw3-field'>
            <input
                className='cardCreator card-text'
                placeholder='Enter a wrong Answer ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldPw.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const CardCreator = () => {
    const history = useHistory();
    const location = useLocation();
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [wrongAnswer1, setWrongAnswer1] = useState(null);
    const [wrongAnswer2, setWrongAnswer2] = useState(null);
    const [wrongAnswer3, setWrongAnswer3] = useState(null);
    const options = [answer, wrongAnswer1, wrongAnswer2, wrongAnswer3];
    const [burgerMenu, setBurgerMenu] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                const response = await api.get('/users/' + userId);

                await new Promise((resolve) => setTimeout(resolve, 1000));

                setUser(response.data);
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

    const doCardCreator = async () => {
        try {
            const deckId = localStorage.getItem('deckId');
            const requestBodyCard = JSON.stringify({ question, answer, options });
            const responseCard = await api.post('/decks/' + deckId + '/cards', requestBodyCard);

            // Get the returned deck and update a new object.
            const card = new Card(responseCard.data);

            // Store deckID into the local storage.
            localStorage.setItem('cardId', card.id);

            // DeckCreator successfully worked --> navigate to the route /home in the GameRouter
            history.push(`/home/` + 1);
            history.push(`/cardcreator`);
        } catch (error) {
            alert(`Something went wrong during the Creation: \n${handleError(error)}`);
        }
    };

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
        history.push(`/creator`);
    };

    let burgerMenuContent = (
        <BaseContainer>
            <div className='cardCreator window'></div>
            <div className='cardCreator username'></div>
            <Button
                className='cardCreator username'
                onClick={() => {
                    setBurgerMenu(false);
                    goProfile();
                }}
            >
                {user?.username ? user.username : 'Username'}
            </Button>
            <Button className='cardCreator home' onClick={() => goHome()}>
                Home
            </Button>
            <Button className='cardCreator public-decks' onClick={() => goPublicDecks()}>
                Public Decks
            </Button>
            <Button className='cardCreator creator' onClick={() => goCreator()}>
                Creator
            </Button>
            <Button className='cardCreator logoutButton' onClick={() => logout()}>
                Logout
            </Button>
            <div className='cardCreator x' onClick={() => setBurgerMenu(false)}>
                x
            </div>
        </BaseContainer>
    );

    document.body.style = 'background: #4757FF;';

    return (
        <BaseContainer>
            <div className='cardCreator title'>NB</div>

            <div className='cardCreator burger1'></div>
            <div className='cardCreator burger2'></div>
            <div className='cardCreator burger3'></div>
            <div
                className='cardCreator burgerButton'
                // open edit window
                onClick={() => setBurgerMenu(true)}
            ></div>

            <div className='cardCreator card-title'>Card</div>

            <div className='cardCreator card-ft'>Question</div>
            <div className='cardCreator frontText-field'></div>

            <FormFieldLn value={question} onChange={(n) => setQuestion(n)} />

            <div className='cardCreator card-bt'>Answer</div>
            <div className='cardCreator backText-field'></div>

            <FormFieldEm value={answer} onChange={(n) => setAnswer(n)} />

            <div className='cardCreator card-w1'>Wrong Answer</div>
            <div className='cardCreator wrongAnswer-field'></div>

            <FormFieldFn value={wrongAnswer1} onChange={(n) => setWrongAnswer1(n)} />

            <div className='cardCreator card-w2'>Wrong Answer</div>
            <div className='cardCreator wrongAnswer-field'></div>

            <FormFieldUn value={wrongAnswer2} onChange={(n) => setWrongAnswer2(n)} />

            <div className='cardCreator card-w3'>Wrong Answer</div>
            <div className='card wrongAnswer-field'></div>

            <FormFieldPw value={wrongAnswer3} onChange={(n) => setWrongAnswer3(n)} />

            <Button
                className='cardCreator createButton3'
                disabled={question || answer || wrongAnswer1 || wrongAnswer2 || wrongAnswer3}
                onClick={() => history.push(`/home/` + 1)}
            >
                End
            </Button>
            <Button
                className='cardCreator createButton4'
                disabled={!question || !answer || !wrongAnswer1 || !wrongAnswer2 || !wrongAnswer3}
                onClick={() => doCardCreator()}
            >
                Create
            </Button>

            {burgerMenu ? burgerMenuContent : null}
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default CardCreator;