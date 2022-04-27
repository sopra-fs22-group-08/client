import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/CardOverview.scss';
import { Button } from 'components/ui/Button';
import Header from "../ui/Header";
import Duel from "models/Duel"

const CardOverview = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const location = useLocation();

    const [users, setUsers] = useState(null);
    const [deck, setDeck] = useState(null);
    const [user, setUser] = useState(null);

    const doLearning = () => {
        const deckID = localStorage.getItem('DeckID');
        history.push('/learningtool/deckID=' + deckID + '/cardID=0');
    };

    /*
    *Send invitation to user with userToInviteId and then create a new duel and go to multiplayer page
    * */
    const startMP = async (userToInviteId) => {
        try{

            //first create a new duel with the two players
            const playerOneId = localStorage.getItem("userId");
            const playerTwoId = userToInviteId;
            const deckID = deck.id;
            const requestBodyDuel = JSON.stringify({playerOneId, deckID, playerTwoId});

            const responseDuel = await api.post("/duels", requestBodyDuel);

            const duel = new Duel(responseDuel.data);
            console.log("just created new duel with Player 1: " + duel.playerOneId + ", player 2: " + duel.playerTwoId + " and id: " + duel.id);

            //then send an invitation to the player to invite
            const senderId = playerOneId;
            const receiverId = playerTwoId;
            const duelId = duel.id;
            const requestBodyInvitation = JSON.stringify({senderId, receiverId, duelId});

            await api.post('/users/' + receiverId + '/invitation', requestBodyInvitation);

            console.log("just sent an invitation to player: " + receiverId);

            //then open new multiplayer page with the duel in location:
            const url = "/multiplayer/";
            history.push({
                pathname: url.concat(duel.id),
                state: {detail: duel}
            })

        }catch (error){
            alert(error);
            console.log(error);
        }
    }

    /*
    * create a new duel with the invited player and push on duel site
    * */

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userID = localStorage.getItem('userId');
                setUser(userID);
                const deckID = localStorage.getItem('DeckID');
                const responseDeck = await api.get('/decks/' + deckID);
                const responseUsers = await api.get('/users');
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setDeck(responseDeck.data);
                setUsers(responseUsers.data);
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

    var listItems3;
    if (users) {
        listItems3 = users.map((u) => {
            if (String(u.id) !== user) {
                return <Button
                    className='cardOverview people-Button'
                    // TODO: start multiplayer/send invite
                    // FIX: leads to profile
                    onClick={() => startMP(u.id)}
                >
                    {u.username}
                </Button>
            }

        });
    } else {
        listItems3 = <div className='cardOverview online-None'>Currently there is no User online</div>;
    }

    document.body.style = 'background: #FFCA00;';

    return (
        <BaseContainer>

            <Button className='cardOverview card' onClick={() => doLearning()}>
                <div className='cardOverview card-Title'>{deck ? deck.deckname : ''}</div>
                <div className='cardOverview card-Text'>Click to Learn</div>
            </Button>
            {/*<Button className='cardOverview edit-Button'>Edit</Button>*/}
            <div className='cardOverview people-Title'>People to challenge</div>
            <div className='cardOverview people-Button-position'>{listItems3}</div>
            <Header/>
        </BaseContainer>
    );
};

export default CardOverview;