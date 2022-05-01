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
    //TODO: find way to reset
    //localStorage.setItem('result', 0);

    const lengthDeck = localStorage.getItem('lengthDeck');
    const userId = localStorage.getItem("userId")

    const [duel, setDuel] = useState(null);
    const [opponent, setOpponent] = useState(null);
    let opponentScore = 0;
    let opponentId;

    if (duel && userId){
        console.log("Check test");
        if(String(duel.playerOneId) === String(userId)){
            opponentId = duel.playerTwoId;
            opponentScore = duel.playerTwoScore;
        }else{
            opponentId = duel.playerOneId;
            opponentScore = duel.playerOneScore;
        }
    }

    async function fetchData() {
        try {
            const duelId = localStorage.getItem("duelId");
            const responseDuel = await api.get('/duels/' + duelId);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            setDuel(responseDuel.data);

            if(userId){
                const responseOpponent =  api.get('/users/' + parseInt(opponentId));
                new Promise((resolve) => setTimeout(resolve, 1000));
                setOpponent(responseOpponent.data);
            }

        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    useEffect(() => {

        setInterval(() => fetchData(), 2000);

        fetchData();
    }, []);

    let content;
    if (duel) {
        console.log(duel)
        if (duel.playerOneStatus === "FINISHED" && duel.playerTwoStatus === "FINISHED" ) {

            content = (
                <div>
                    Your {opponent ? opponent.username : "Opponent"} had {opponentScore} out of {lengthDeck} correct
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