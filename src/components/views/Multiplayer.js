import BaseContainer from '../ui/BaseContainer';
import {useHistory, useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {api, handleError} from '../../helpers/api';
import LoadingSpin from 'react-loading-spin';
import 'styles/views/Multiplayer.scss';
import 'styles/ui/LoadingScreenButton.scss';
import {Button} from 'components/ui/Button';
import declineInvite from 'components/views/Home';

const Multiplayer = () => {

    const [hasAccepted, setHasAccepted] = useState(false);
    const [hasDeclined, setHasDeclined] = useState(false);
    const [duel, setDuel] = useState(null);

    const history = useHistory();
    const location = useLocation();

    const checkDuelStatus = async () => {
        try {
            const duelId = localStorage.getItem('duelId');
            const responseDuel = await api.get('/duels/' + duelId);
            const d = responseDuel.data;
            setDuel(d);

            if (d.playerTwoStatus === 'ACCEPTED') {
                setHasAccepted(true);
            }
            if (d.playerTwoStatus === 'DECLINED') {
                setHasDeclined(true);
            }

        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => checkDuelStatus(), 1000);
        return () => clearInterval(interval);
    }, []);

    document.body.style = 'background: #FFCA00;';
    return (
        <BaseContainer>
            {hasAccepted &&
                <div className="Loading text-Start">
                    Your game is ready
                    <div className="Loading start">
                        <Button
                            className='loadingScreen-button'
                            onClick={() => {
                                localStorage.setItem('duelId', duel.id);
                                history.push('/multiplayerTool/deckID=' + duel.deckId + '/cardID=0');
                            }}>
                            Start Game
                        </Button>
                    </div>
                </div>}
            {hasDeclined &&
                <div className="Loading text-Start">
                    Your Invitation has been declined
                    <div className="Loading declined">
                        <Button
                            className='loadingScreen-button'
                            onClick={async () => {
                                api.delete('/duels/' + duel.id);
                                history.push(`/home/` + localStorage.getItem("userId"));
                            }}>
                            Ok
                        </Button>
                    </div>
                </div>
            }
            {!hasAccepted && !hasDeclined &&
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
                            onClick={async () => {
                                api.delete('/invitations/' + location.state.detail.id);
                                history.push(`/home/` + localStorage.getItem("userId"));
                            }}>
                            cancel
                        </Button>
                    </div>
                </div>
            }
        </BaseContainer>
    );
};

export default Multiplayer;