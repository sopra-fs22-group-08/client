import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/CardOverview.scss';
import { Button } from 'components/ui/Button';
import Header from "../ui/Header";

const CardOverview = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const location = useLocation();

    const [users, setUsers] = useState(null);
    const [deck, setDeck] = useState(null);


    const doLearning = () => {
        const deckID = localStorage.getItem('DeckID');
        history.push('/learningtool/deckID=' + deckID + '/cardID=0');
    };

    const toProfile = (userId) => {
        let url = "/profile/"
        history.push(url.concat(userId));
    };


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
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
        listItems3 = users.map((u) => (
            <Button
                className='cardOverview people-Button'
                // TODO: start multiplayer/send invite
                // FIX: leads to profile
                onClick={() => toProfile(u.id)}
            >
                {u.username}
            </Button>
        ));
    } else {
        listItems3 = <div className='cardOverview online-None'>Currently there is no User online</div>;
    }


    document.body.style = 'background: #FFCA00;';

    return (
        <BaseContainer>
            <Header/>

            <Button className='cardOverview card' onClick={() => doLearning()}>
                <div className='cardOverview card-Title'>{deck ? deck.deckname : ''}</div>
                <div className='cardOverview card-Text'>Click to Learn</div>
            </Button>
            <Button className='cardOverview edit-Button'>Edit</Button>
            <div className='cardOverview people-Title'>People to challenge</div>
            <div className='cardOverview people-Button-position'>{listItems3}</div>

        </BaseContainer>
    );
};

export default CardOverview;