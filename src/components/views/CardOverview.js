import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/CardOverview.scss';
import { Button } from 'components/ui/Button';
import Header from '../ui/Header';
import Duel from 'models/Duel';
import Switch from '@mui/material/Switch';

const FormField = (props) => {
    return (
        <div className='cardOverview form-field'>
            <input
                className='cardOverview form-text'
                placeholder='Enter the new Deckname ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

const CardOverview = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const location = useLocation();

    const [users, setUsers] = useState(null);
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState(null);
    const [user, setUser] = useState(null);
    const [deckname, setDeckname] = useState(null);
    const [visibility, setVisibility] = useState(null);
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [checked, setChecked] = useState(true);
    const [showEditButton, setShowEditButton] = useState(false);
    const [cardEmpty, setCardEmpty] = useState(false);

    const doLearning = () => {
        const Id = sessionStorage.getItem('deckId');
        if (card.length) {
            console.log(card.id);
            history.push('/learningtool/deckID=' + Id + '/cardID=0');
        }
    };

    const doUpdate = async () => {
        const deckId = location.pathname.match(/\d+$/);
        const requestBodyTitle = JSON.stringify({ deckname, visibility });
        await api.put('/decks/' + deckId, requestBodyTitle);
        window.location.reload(false);
    };

    const deleteDeck = async() => {
        const deckId = location.pathname.match(/\d+$/);
        await api.delete('/decks/' + deckId);
        history.push(`/home/` + user.id);
    }

    /*
     *Send invitation to user with userToInviteId and then create a new duel and go to multiplayer page
     * */
    const startMP = async (userToInviteId, userN) => {
        try {
            //first create a new duel with the two players
            const playerOneId = sessionStorage.getItem('userId');
            const playerTwoId = userToInviteId;
            const deckId = deck.id;
            const requestBodyDuel = JSON.stringify({ playerOneId, deckId, playerTwoId });

            const responseDuel = await api.post('/duels', requestBodyDuel);

            const duel = new Duel(responseDuel.data);
            sessionStorage.setItem('duelId', duel.id);

            //then send an invitation to the player to invite
            const senderId = playerOneId;
            const receiverId = playerTwoId;
            const duelId = duel.id;
            const deckname = deck.deckname;
            const senderUsername = user.username;
            const receiverUsername = userN;

            const requestBodyInvitation = JSON.stringify({
                senderId,
                receiverId,
                duelId,
                deckname,
                deckId,
                senderUsername,
                receiverUsername,
            });

            const responseBodyInvitation = await api.post(
                '/users/' + receiverId + '/invitation',
                requestBodyInvitation
            );
            const inv = responseBodyInvitation.data;

            //then open new multiplayer page with the duel in location:
            const url = '/multiplayer/';
            history.push({
                pathname: url.concat(duel.id),
                state: { detail: inv },
            });
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    /*
     * create a new duel with the invited player and push on duel site
     * */

    function isOnline(us) {
        if (String(us.status) === 'ONLINE') {
            return us;
        }
    }

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userId = sessionStorage.getItem('userId');
                const deckId = sessionStorage.getItem('deckId');
                const editen = sessionStorage.getItem('edit');
                if (editen === true) {
                    setIsInEditMode(editen);
                }

                const responseDeck = await api.get('/decks/' + deckId);
                const responseUsers = await api.get('/users');
                const responseDecks = await api.get('/users/' + userId + '/decks');
                const responseUser = await api.get('/users/' + userId);
                const responseCards = await api.get('/decks/' + deckId + '/cards');

                const ownDecks = responseDecks.data;

                // Store deckId into the local storage.
                sessionStorage.setItem('deckId', deckId);

                setDeck(responseDeck.data);
                setUsers(responseUsers.data);
                setUser(responseUser.data);
                setCard(responseCards.data);

                //check if deck is own deck
                for (var i = 0; i < ownDecks.length; i++) {
                    if (JSON.stringify(ownDecks[i]) === JSON.stringify(responseDeck.data)) {
                        setShowEditButton(true);
                    }
                }
            } catch (error) {
                console.error(
                    `Something went wrong while fetching the Data: \n${handleError(error)}`
                );
                console.error('Details:', error);
                alert('Something went wrong while fetching the Data! See the console for details.');
            }
        }
        fetchData();
    }, []);

    useEffect(() => {

        async function fetchData2() {
            setDeckname(deck.deckname);
            setVisibility(deck.visibility);
            if (deck.visibility === 'PUBLIC') {
                setChecked(false);
            } else {
                setChecked(true);
            }
        }
        fetchData2();
    }, [deck]);

    useEffect(() => {

        async function fetchData3() {
            //check if deck has a card.
            if (card !== null && card.length !== 0) { setCardEmpty(true); }
        }
        fetchData3();
    }, [card]);

    let listOfOnlineUsers;
    let listItems = <div className='cardOverview deck-None'>Please create a new Card</div>;

    if (users && user) {
        const onlineUsers = users.filter(isOnline);
        if (onlineUsers.length === 0) {
            listOfOnlineUsers = (
                <div className='cardOverview online-None'>Currently there is no User online</div>
            );
        } else {
            listOfOnlineUsers = onlineUsers.map((u) => {
                if (String(u.id) !== String(user.id)) {
                    return (
                        <Button
                            key={u.id}
                            className='cardOverview people-Button'
                            onClick={() => startMP(u.id, u.username)}
                        >
                            {u.username}
                        </Button>
                    );
                }
                return null;
            });
        }
    }
    if (user) {
        if (card) {
            listItems = card.map((c) => (
                <Button
                    key={c.id}
                    className='cardOverview listElement-Box'
                    onClick={() => {
                        sessionStorage.setItem('cardId', c.id);
                        history.push('/CardEditPage');
                    }}
                >
                    <div className='cardOverview listElement-Number' />
                    <div className='cardOverview listElement-Title'>{c.question}</div>
                    <div className='cardOverview listElement-Text'>Click to Edit</div>
                </Button>
            ));
        }
    }

    let content;
    let clickToLearn;
    let addCards;
    let edit;
    let edit_button;
    let peopleToChallenge;
    let noPeopleToChallenge;

    // event: React.ChangeEvent<HTMLInputElement>
    const handleChange = (event) => {
        if (checked) {
            setVisibility('PUBLIC');
        } else {
            setVisibility('PRIVATE');
        }
        setChecked(event.target.checked);
    };

    if (showEditButton) {
        edit_button = (
            <Button className='cardOverview edit-Button2' onClick={() => setIsInEditMode(true)}>
                Edit
            </Button>
        );
    }

    edit = (
        <BaseContainer>
            <div className='cardOverview card-Title'>Edit</div>
            <FormField value={deckname} onChange={(n) => setDeckname(n)} />

            <Button
                className='cardOverview addCard-Button'
                onClick={() => history.push('/cardcreator')}
            >
                +
            </Button>

            <div className='cardOverview switch-text'>{visibility}</div>

            <Switch
                className='cardOverview switch'
                checked={checked}
                onChange={handleChange}
                color='default'
            />

            <Button
                className='cardOverview edit-Button'
                onClick={() => [
                    doUpdate(),
                    sessionStorage.setItem('edit', false),
                    setIsInEditMode(false),
                ]}
            >
                Submit Changes
            </Button>

            <Button
                className='cardOverview delete-Button'
                onClick={() => [
                    // setIsInEditMode(false),
                    deleteDeck(),
                    sessionStorage.setItem('edit', false),
                ]}
            >
                Delete
            </Button>
            <Header />
            <div className='cardOverview listTitle'>Cards</div>
            <div className='cardOverview list'>{listItems}</div>
        </BaseContainer>
    );

    clickToLearn = (
        <div className='cardOverview card-Text'>Click to Learn</div>
    );

    addCards = (
        <div className='cardOverview card-Text'>Please add Card</div>
    );

    peopleToChallenge = (
        <BaseContainer>
            <div className='cardOverview people-Title'>People to challenge</div>
            <div className='cardOverview people-Button-position'>{listOfOnlineUsers}</div>
        </BaseContainer>
    );

    noPeopleToChallenge = (<div className='cardOverview people-Title'></div>);

    content = (
        <BaseContainer>
            <Button className='cardOverview card' onClick={() => doLearning()}>
                <div className='cardOverview card-Title2'>{deck ? deck.deckname : ''}</div>
                {cardEmpty ? clickToLearn : addCards}
            </Button>
            {edit_button}
            {cardEmpty ? peopleToChallenge : noPeopleToChallenge}
            <Header />
        </BaseContainer>
    );

    document.body.style = 'background: #FFCA00;';

    return (
        <BaseContainer>
            {isInEditMode ? edit : content}
            <Header />
        </BaseContainer>
    );
};

export default CardOverview;