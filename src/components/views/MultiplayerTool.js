import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/LearningTool.scss';
import { Button } from 'components/ui/Button';

const synth = window.speechSynthesis;

const MultiplayerTool = () => {
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [cards, setCards] = useState(null);
    const [deck, setDeck] = useState(null);
    const [b1, setB1] = useState(false);
    const [b2, setB2] = useState(false);
    const [b3, setB3] = useState(false);
    const [b4, setB4] = useState(false);
    const [arr, setArr] = useState(shuffleAnswers([1, 2, 0, 3]));
    const [counter, setCounter] = useState(0);
    const [disable, setDisable] = useState(false);
    let voices = [];
    const getVoice = () => {
        voices = synth.getVoices();
        return voices[9];
    };
    const speak = (text) => {
        if (synth.speaking) {
            console.error('Already speaking...');
            return;
        }
        if (text !== '') {
            //Get Speak text
            const speakText = new SpeechSynthesisUtterance(text);
            //Speak End
            speakText.onend = (e) => {
                console.log('Done Speaking...');
            };
            //Speak error
            speakText.onerror = (e) => {
                console.error('Something went wrong');
            };
            const selectedVoice = getVoice();

            speakText.voice = selectedVoice;
            speakText.rate = 1;
            speakText.pitch = 1;
            //Speak
            synth.speak(speakText);
        }
    };

    const goResult = async () => {
        const duelId = localStorage.getItem('duelId');
        const result = localStorage.getItem('result');
        await api.put('/duels/' + duelId + '/players/' + user.id + '/score/' + result);
        await api.put('/duels/' + duelId + '/players/' + user.id + '/status/FINISHED');
        history.push(`/multiplayerToolResult`);
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
        setDisable(false);
        history.push(`/multiplayerTool/deckID=` + deckId[1] + '/cardID=' + cardId[1]);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                const deckId = location.pathname.match(/deckID=(\d+)/);
                const responseUser = await api.get('/users/' + userId);
                const responseCard = await api.get('/decks/' + deckId[1] + '/cards');
                const responseDeck = await api.get('/decks/' + deckId[1]);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setUser(responseUser.data);
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
                <div className='learningTool question-field' />
                <div className='learningTool card2' />
                <div className='learningTool card' />
                <div className='learningTool card-number'>
                    {cardID}/{Object.keys(cards).length}
                </div>
                <div className='learningTool card-tittle'>{deck.deckname}</div>
                <div className='learningTool card-question'>
                    {cards[cardID].question}
                    <button
                        className='learningTool text-to-speech'
                        onClick={() => speak(cards[cardID].question +
                            ", A" +cards[cardID].options[arr[0]] +
                            ", B" + cards[cardID].options[arr[1]] +
                            ", C" + cards[cardID].options[arr[2]] +
                            ", D" + cards[cardID].options[arr[3]])}
                    >
                        Text To Speech
                    </button>
                </div>

                <div className='learningTool learn-tittle'>Which one is correct?</div>

                <Button
                    disabled={disable}
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
                        setDisable(true);
                    }}
                >
                    {cards[cardID].options[arr[0]]}
                </Button>

                <Button
                    disabled={disable}
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
                        setDisable(true);
                    }}
                >
                    {cards[cardID].options[arr[1]]}
                </Button>

                <Button
                    disabled={disable}
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
                        setDisable(true);
                    }}
                >
                    {cards[cardID].options[arr[2]]}
                </Button>

                <Button
                    disabled={disable}
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
                        setDisable(true);
                    }}
                >
                    {cards[cardID].options[arr[3]]}
                </Button>
                <div className='learningTool livescore-container'>
                    You have{' '}
                    {parseInt(localStorage.getItem('result')) === null
                        ? 0
                        : localStorage.getItem('result')}{' '}
                    out of {Object.keys(cards).length} correct!
                </div>
            </BaseContainer>
        );
    }

    document.body.style = 'background: #FFCA00;';

    return <BaseContainer>{content}</BaseContainer>;
};

export default MultiplayerTool;