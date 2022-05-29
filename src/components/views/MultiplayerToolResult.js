import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/LearningTool.scss';
import { api } from '../../helpers/api';
import { Button } from 'components/ui/Button';

const MultiplayerToolResult = () => {
    const history = useHistory();

    let userScore = parseInt(sessionStorage.getItem('result'));
    const lengthDeck = parseInt(sessionStorage.getItem('lengthDeck'));
    const userId = parseInt(sessionStorage.getItem('userId'));

    const [duel, setDuel] = useState(null);
    const [opponent, setOpponent] = useState(null);
    let opponentScore = 0;
    let opponentId;

    if (duel !== null && userId) {
        if (duel.playerOneId === userId) {
            opponentId = duel.playerTwoId;
            opponentScore = duel.playerTwoScore;
        } else {
            opponentId = duel.playerOneId;
            opponentScore = duel.playerOneScore;
        }
    }

    async function checkResults() {
        try {
            const duelId = sessionStorage.getItem('duelId');
            const responseDuel = await api.get('/duels/' + duelId);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setDuel(responseDuel.data);

            if (opponentId) {
                const opponentResponse = await api.get('/users/' + opponentId);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setOpponent(opponentResponse.data);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkResults();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    let content = (<div> <h5 align='center'>The other player has not finished yet...</h5> </div>);
    if (duel) {
        if (duel.playerOneStatus === 'FINISHED' && duel.playerTwoStatus === 'FINISHED') {
            let status;
            if (opponentScore > userScore) {
                status = 'LOSS';
            } else if (opponentScore < userScore) {
                status = 'WIN';
            } else {
                status = 'DRAW';
            }
            content = (
                <div>
                    <h3 align='center'>It's a {status}!</h3>
                    Your opponent {opponent ? "'" + opponent.username + "'" : ''} had{' '}
                    {opponentScore} out of {lengthDeck} correct
                </div>
            );
        }
        if ((duel.playerOneStatus === 'CHICKEN' && duel.playerTwoStatus === 'FINISHED') || (duel.playerOneStatus === 'FINISHED' && duel.playerTwoStatus === 'CHICKEN')){
            content = (
                <div>
                    <h5 align='center'>The other player was too afraid and chickened out! 🐔 </h5>
                </div>
            )
        }
    }

    document.body.style = 'background: #FFCA00;';

    const goHomeButton = (
        <Button
            onClick={() => {
                /**
                 * NOTE: the duelId cannot be cleared out, since it causes 400 errors,
                 * as there is an async fetch to it in the background
                 */
                sessionStorage.removeItem('result');
                sessionStorage.removeItem('lengthDeck');
                sessionStorage.removeItem('deckId');
                history.push('/home/' + userId);
            }}
            className='learningTool back-button'
        >
            Go to Home
        </Button>
    );

    // TODO: add better styling to the results page!
    return (
        <BaseContainer>
            {/* <Header /> */}
            {/* NOTE: we need to remove the header, as with the 'go back' button, we can clear the
            sessionStorage from unnecessary elements, causing issues */}
            <div className='learningTool resPage-Title'>Result</div>
            <div className='learningTool resPage-Text'>
                You had {userScore} out of {lengthDeck} correct
                {content}
            </div>
            {goHomeButton}
        </BaseContainer>
    );
};

export default MultiplayerToolResult;