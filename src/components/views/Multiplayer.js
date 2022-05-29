import BaseContainer from '../ui/BaseContainer';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { api, handleError } from '../../helpers/api';
import LoadingSpin from 'react-loading-spin';
import 'styles/views/Multiplayer.scss';
import 'styles/ui/LoadingScreenButton.scss';
import { Button } from 'components/ui/Button';

const Multiplayer = () => {
    const [P1Status, setP1Status] = useState('');
    const [P2Status, setP2Status] = useState('');

    const [duel, setDuel] = useState(null);

    const history = useHistory();
    const location = useLocation();

    const checkDuelStatus = async () => {
        try {
            const duelId = localStorage.getItem('duelId');
            const responseDuel = await api.get('/duels/' + duelId);
            const d = responseDuel.data;
            setDuel(d);

            if (d.playerOneStatus === 'ACCEPTED') {
                setP1Status('ACCEPTED');
            }
            if (d.playerOneStatus === 'DECLINED') {
                setP1Status('DECLINED');
            }
            if (d.playerOneStatus === 'PENDING') {
                setP1Status('PENDING');
            }
            if (d.playerOneStatus === 'CHICKEN') {
                setP1Status('CHICKEN');
            }

            if (d.playerTwoStatus === 'ACCEPTED') {
                setP2Status('ACCEPTED');
            }
            if (d.playerTwoStatus === 'DECLINED') {
                setP2Status('DECLINED');
            }
            if (d.playerTwoStatus === 'PENDING') {
                setP2Status('PENDING');
            }
            if (d.playerTwoStatus === 'CHICKEN') {
                setP2Status('CHICKEN');
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => checkDuelStatus(), 1000);
        return () => clearInterval(interval);
    }, []);

    document.body.style = 'background: #FFCA00;';

    const userId = localStorage.getItem('userId');

    return (
        <BaseContainer>
            {P1Status === 'ACCEPTED' && P2Status === 'ACCEPTED' && (
                <div className='Loading text-Start'>
                    Your game is ready
                    <div className='Loading start'>
                        <Button
                            className='loadingScreen-button'
                            onClick={() => {
                                localStorage.setItem('duelId', duel.id);
                                localStorage.setItem('result', 0);
                                history.push(
                                    '/multiplayerTool/deckID=' + duel.deckId + '/cardID=0'
                                );
                            }}
                        >
                            Start
                        </Button>
                        <div className='Loading chicken'>
                            <Button
                                className='loadingScreen-button'
                                onClick={async () => {
                                    if (userId === duel.playerOneId) {
                                        setP1Status('DECLINED');
                                    }
                                    if (userId === duel.playerTwoId) {
                                        setP2Status('DECLINED');
                                    }
                                    try {
                                        await api.put(
                                            '/duels/' +
                                                duel.id +
                                                '/players/' +
                                                userId +
                                                '/status/CHICKEN'
                                        );
                                        localStorage.removeItem('duelId');
                                        history.push(`/home/` + userId);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}
                            >
                                🐔
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {(P1Status === 'DECLINED' || P2Status === 'DECLINED') && (
                <div className='Loading text-Start'>
                    Your Invitation has been declined
                    <div className='Loading declined'>
                        <Button
                            className='loadingScreen-button'
                            onClick={async () => {
                                try {
                                    await api.delete('/duels/' + duel.id);
                                    localStorage.removeItem('duelId');
                                    history.push(`/home/` + userId);
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                        >
                            Ok
                        </Button>
                    </div>
                </div>
            )}
            {(P1Status === 'CHICKEN' || P2Status === 'CHICKEN') && (
                <div className='Loading text-Start'>
                    The other Player chickened out...
                    <div className='Loading declined'>
                        <Button
                            className='loadingScreen-button'
                            onClick={async () => {
                                try {
                                    await api.delete('/duels/' + duel.id);
                                    localStorage.removeItem('duelId');
                                    history.push(`/home/` + userId);
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                        >
                            Ok
                        </Button>
                    </div>
                </div>
            )}
            {((P1Status === 'ACCEPTED' && P2Status === 'PENDING') ||
                (P2Status === 'ACCEPTED' && P1Status === 'PENDING')) && (
                <div className='Loading'>
                    <div className='Loading text'>Waiting for your Friend</div>
                    <div className='Loading position'>
                        <LoadingSpin
                            duration='2s'
                            width='12px'
                            timingFunction='ease-in-out'
                            direction='alternate'
                            size='250px'
                            primaryColor='#4757FF'
                            secondaryColor='#000000'
                            numberOfRotationsInAnimation={2}
                        />
                    </div>
                    <div className='Loading cancel'>
                        <Button
                            className='loadingScreen-button'
                            onClick={async () => {
                                try {
                                    await api.delete('/invitations/' + location.state.detail.id);
                                    await api.delete('/duels/' + duel.id);
                                } catch (error) {
                                    console.log(error);
                                }
                                localStorage.removeItem('duelId');
                                history.push(`/home/` + userId);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </BaseContainer>
    );
};

export default Multiplayer;