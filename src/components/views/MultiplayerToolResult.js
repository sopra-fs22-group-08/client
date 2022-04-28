import React, {useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/LearningTool.scss';
import Header from "../ui/Header";
import {api, handleError} from "../../helpers/api";

const MultiplayerToolResult = () => {

    const history = useHistory();
    const location = useLocation();

    let count = localStorage.getItem('result');
    localStorage.setItem('result', 0);

    const lengthDeck = localStorage.getItem('lengthDeck');


    const [duel, setDuel] = useState(null);
    const [opponent, setOpponent] = useState(null);
    let opponentScore = 0;

    useEffect(() => {

        let opponentId;


        async function fetchData() {
            try {
                const duelId = localStorage.getItem("duelId");
                const userId = localStorage.getItem("userId");
                const responseDuel = await api.get('/duels/' + duelId);

                await new Promise((resolve) => setTimeout(resolve, 1000));
                setDuel(responseDuel.data);

                if(duel){
                    if(duel.playerOneId === userId){
                        opponentId = duel.playerTwoId;
                        opponentScore = duel.playerTwoScore;
                    }else{
                        opponentId = duel.playerOneId;
                        opponentScore = duel.playerOneScore;
                    }
                    const responseOpponent = await api.get('/users/' + opponentId);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setOpponent(responseOpponent.data);
                }


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
    if (duel) {
        console.log(duel)
        if (duel.playerOneStatus === "FINISHED" && duel.playerTwoStatus === "FINISHED" ) {
            content = (
                <div>
                    {} Score = {opponentScore}
                </div>
            );

        }
    }





    document.body.style = 'background: #FFCA00;';

    return (
        <BaseContainer>
            <div className='learningTool resPage-Title'>Result</div>

            <div className='learningTool resPage-Text'>
                You had {count} out of {lengthDeck} correct
                {content}
            </div>
            <Header/>
        </BaseContainer>
    );
};

export default MultiplayerToolResult;