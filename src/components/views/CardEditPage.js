import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/CardCreator.scss';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';
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

const CardEditPage = () => {
    const history = useHistory();
    const location = useLocation();
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [wrongAnswer1, setWrongAnswer1] = useState(null);
    const [wrongAnswer2, setWrongAnswer2] = useState(null);
    const [wrongAnswer3, setWrongAnswer3] = useState(null);
    const options = [answer, wrongAnswer1, wrongAnswer2, wrongAnswer3];
    const [card, setCard] = useState(null);
    const [deckId, setDeckId] = useState(null);

    const doUpdate = async () => {
        const id = localStorage.getItem('cardId');

        const requestBody = JSON.stringify({question, answer, options});
        const response = await api.put('/cards/' + id, requestBody);
    };
    const deleteCard = async () => {
        const id = localStorage.getItem('cardId');
        await api.delete('/cards/' + id);
    };

    useEffect(() => {

        async function fetchData() {
            try {
                const deckId = await localStorage.getItem('deckId')
                const response = await api.get('/decks/' + deckId + '/cards');

                //new Promise((resolve) => setTimeout(resolve, 1000));

                setCard(response.data);

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


    useEffect(() => {
        async function fetchData2() {
            const cardId = await localStorage.getItem('cardId');
            var count = 0;
            for (const c of card) {
                if (c.id === parseInt(cardId)) {
                    break;
                }
                count++
            }
            setQuestion(card[count].question);
            setAnswer(card[count].answer);
            setWrongAnswer1(card[count].options[1]);
            setWrongAnswer2(card[count].options[2]);
            setWrongAnswer3(card[count].options[3]);
        }

        fetchData2();

    }, [card]);


    const goToCardOverviewDeckEdit = async () => {
        const deckId = localStorage.getItem('deckId');
        setDeckId(deckId);
        localStorage.setItem('edit', true);

        history.push(`/cardOverview/deckID=` + deckId);

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
                onClick={() => [doUpdate(), goToCardOverviewDeckEdit()]}
            >
                Submit
            </Button>
            <Button
                className='cardCreator createButton4'
                onClick={() => [deleteCard(), goToCardOverviewDeckEdit()]}
            >
                Delete
            </Button>
            <Header/>
        </BaseContainer>
    );
};

export default CardEditPage;