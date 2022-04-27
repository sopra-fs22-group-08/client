import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/LearningTool.scss';
import { Button } from 'components/ui/Button';
import Header from "../ui/Header";

const LearningTool = () => {
    const history = useHistory();
    const location = useLocation();

    const [cards, setCards] = useState(null);
    const [deck, setDeck] = useState(null);
    const [b1, setB1] = useState(false);
    const [b2, setB2] = useState(false);
    const [b3, setB3] = useState(false);
    const [b4, setB4] = useState(false);
    const [arr, setArr] = useState(shuffleAnswers([1, 2, 0, 3]));
    const [counter, setCounter] = useState(0);

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

    useEffect(() => {

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
                    `Something went wrong while fetching the decks: \n${handleError(error)}`
                );
                console.error('Details:', error);
                alert(
                    'Something went wrong while fetching the decks! See the console for details.'
                );
            }
        }

        fetchData();
    }, []);

    let content;

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
        if (value === 0) {
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
                <div className='learningTool question-field'/>
                <div className='learningTool card2'/>
                <div className='learningTool card'/>
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
                            ? arr[1] === 0
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
                            ? arr[2] === 0
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
                            ? arr[3] === 0
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
            <Header/>
            {content}
        </BaseContainer>
    );
};

export default LearningTool;