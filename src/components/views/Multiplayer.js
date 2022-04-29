import BaseContainer from "../ui/BaseContainer";
import {useHistory, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import LoadingSpin from "react-loading-spin";
import 'styles/views/Multiplayer.scss';
import 'styles/ui/LoadingScreenButton.scss';
import {Button} from 'components/ui/Button';
import declineInvite from 'components/views/Home';

const Multiplayer = () => {
    const history = useHistory();
    const location = useLocation();

    async function checkAccepted() {
        try {
            const duelId = localStorage.getItem("duelId");
            const responseDuel = await api.get('/duels/' + duelId);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            const d = responseDuel.data;

            if (d.playerTwoStatus === "ACCEPTED") {
                localStorage.setItem("duelId", d.id);
                history.push('/multiplayerTool/deckID=' + d.deckId + '/cardID=0');
            }

        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    useEffect(() => {

        const interval = setInterval(() => {
            checkAccepted();
        }, 5000);

    }, []);

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
                <div className="Loading cancel">
                    <Button
                        className='loadingScreen-button'
                        onClick={() => {
                            api.delete('/invitations/' + location.state.detail.id);
                            history.push(`/home/` + localStorage.getItem("userId"));
                        }}>
                        cancel
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
}

export default Multiplayer;