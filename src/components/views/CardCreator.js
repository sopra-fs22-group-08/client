import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/CardCreator.scss';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';
import Card from '../../models/Card';
import Header from "../ui/Header";

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
    const [user, setUser] = useState(null);
    const [deckId, setDeckId] = useState(null);

    const goToCardOverview = async () => {
        const deckId = localStorage.getItem('deckId');
        history.push(`/cardOverview/deckID=` + deckId);
    };

    useEffect(() => {

        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                const response = await api.get('/users/' + userId);
                //await new Promise((resolve) => setTimeout(resolve, 1000));
                setUser(response.data);
            } catch (error) {
                console.error(
                    `Something went wrong while fetching the Data: \n${handleError(error)}`
                );
                console.error('Details:', error);
                alert(
                    'Something went wrong while fetching the Data! See the console for details.'
                );
            }
        }

        fetchData();
    }, []);



    const doCardCreator = async () => {
        try {
            const deckId = localStorage.getItem('deckId');
            const requestBodyCard = JSON.stringify({question, answer, options});
            const responseCard = await api.post('/decks/' + deckId + '/cards', requestBodyCard);

            // Get the returned deck and update a new object.
            const card = new Card(responseCard.data);

            // Store cardID into the local storage.
            localStorage.setItem('cardId', card.id);

            setDeckId(deckId);

            // DeckCreator successfully worked --> navigate to the route /home in the GameRouter
            history.push(`/home/` + 1);
            history.push(`/cardcreator`);
        } catch (error) {
            alert(`Something went wrong during the Creation: \n${handleError(error)}`);
        }
    };

    document.body.style = 'background: #4757FF;';

    return (
        <BaseContainer>

            <div className='cardCreator card-title'>Card</div>

            <div className='cardCreator card-ft'>Question</div>
            <div className='cardCreator frontText-field'/>

            <FormFieldLn value={question} onChange={(n) => setQuestion(n)}/>

            <div className='cardCreator card-bt'>Answer</div>
            <div className='cardCreator backText-field'/>

            <FormFieldEm value={answer} onChange={(n) => setAnswer(n)}/>

            <div className='cardCreator card-w1'>Wrong Answer</div>
            <div className='cardCreator wrongAnswer-field'/>

            <FormFieldFn value={wrongAnswer1} onChange={(n) => setWrongAnswer1(n)}/>

            <div className='cardCreator card-w2'>Wrong Answer</div>
            <div className='cardCreator wrongAnswer-field'/>

            <FormFieldUn value={wrongAnswer2} onChange={(n) => setWrongAnswer2(n)}/>

            <div className='cardCreator card-w3'>Wrong Answer</div>
            <div className='card wrongAnswer-field'/>

            <FormFieldPw value={wrongAnswer3} onChange={(n) => setWrongAnswer3(n)}/>

            <Button
                className='cardCreator createButton3'
                disabled={question || answer || wrongAnswer1 || wrongAnswer2 || wrongAnswer3}
                onClick={() => goToCardOverview()}
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
            <Header/>
        </BaseContainer>

    );
};

export default CardCreator;