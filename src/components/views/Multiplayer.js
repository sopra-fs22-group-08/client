import BaseContainer from "../ui/BaseContainer";
import {useHistory, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import LoadingSpin from "react-loading-spin";
import 'styles/views/Multiplayer.scss';

const Multiplayer = () => {
    const history = useHistory();
    const location = useLocation();

    const [duel, setDuel] = useState(null);

    async function checkAccepted() {
        try {
            const duelId = localStorage.getItem("duelId");
            const responseDuel = await api.get('/duels/' + duelId);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            setDuel(responseDuel.data);

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

    useEffect(() => {

        const interval = setInterval(() => {
            checkAccepted();
        }, 5000);

    }, []);

    if (duel) {
        console.log(duel)
        if (duel.playerTwoStatus === "ACCEPTED") {
            //Todo witerleite zum spiele
            localStorage.setItem("duelId", duel.id);
            history.push('/multiplayerTool/deckID=' + duel.deckId + '/cardID=0');
        }
    }

    document.body.style = 'background: #FFCA00;';
    return (
        <BaseContainer>
            <div className="Loading">
                <div className="Loading text">
                    waiting for your friend to accept
                </div>
                <div className={"ExampleOfUsage"}>
                    <LoadingSpin
                        duration="2s"
                        width="15px"
                        timingFunction="ease-in-out"
                        direction="alternate"
                        size="150px"
                        primaryColor="yellow"
                        secondaryColor="#333"
                        numberOfRotationsInAnimation={2}
                    />
                </div>
            </div>
        </BaseContainer>
    );
}

export default Multiplayer;