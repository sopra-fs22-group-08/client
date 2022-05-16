import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/CardOverview.scss';
import {Button} from 'components/ui/Button';
import Header from "../ui/Header";
import Duel from "models/Duel"
import Invitation from "../../models/Invitation";
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
    const [editButton, setEditButton] = useState(false);
    const [checked, setChecked] = React.useState(true);

    const doLearning = () => {
        const Id = localStorage.getItem('deckId');
        history.push('/learningtool/deckID=' + Id + '/cardID=0');
    };

    const doUpdate = async () => {
        const deckId = location.pathname.match(/\d+$/);

        const requestBodyTitle = JSON.stringify({deckname, visibility});
        const responseTitle = await api.put('/decks/' + deckId, requestBodyTitle);

        window.location.reload(false);
    };
    /*
    *Send invitation to user with userToInviteId and then create a new duel and go to multiplayer page
    * */
    const startMP = async (userToInviteId, userN) => {
        try {

            //first create a new duel with the two players
            const playerOneId = localStorage.getItem("userId");
            const playerTwoId = userToInviteId;
            const deckId = deck.id;
            const requestBodyDuel = JSON.stringify({playerOneId, deckId, playerTwoId});

            const responseDuel = await api.post("/duels", requestBodyDuel);

            const duel = new Duel(responseDuel.data);
            localStorage.setItem("duelId", duel.id);

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
                receiverUsername
            });

            const responseBodyInvitation = await api.post('/users/' + receiverId + '/invitation', requestBodyInvitation);
            const inv = responseBodyInvitation.data;

            //then open new multiplayer page with the duel in location:
            const url = "/multiplayer/";
            history.push({
                pathname: url.concat(duel.id),
                state: {detail: inv}
            })

        } catch (error) {
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
                const deckID = localStorage.getItem('DeckID');
                const editen = localStorage.getItem('edit');
                if (editen === true){
                    setEditButton(editen);
                }


                const responseDeck = await api.get('/decks/' + deckID);
                const responseUsers = await api.get('/users');
                const responseUser = await api.get('/users/' + userID);
                const responseCards = await api.get('/decks/' + deckID + '/cards');

                // Store deckID into the local storage.
                localStorage.setItem('deckId', deckID);

                await new Promise((resolve) => setTimeout(resolve, 1000));
                setDeck(responseDeck.data);
                if (deck) {
                    setDeckname(deck.deckname);
                }
                setUsers(responseUsers.data);
                setUser(responseUser.data);
                setCard(responseCards.data);
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
    if (users && user) {
        listItems3 = users.map((u) => {
            if (String(u.id) !== String(user.id)) {
                return <Button
                    className='cardOverview people-Button'
                    onClick={() => startMP(u.id, u.username)}
                >
                    {u.username}
                </Button>
            }

        });
    } else {
        listItems3 =
            <div className='cardOverview online-None'>Currently there is no User online</div>;
    }

    if (user) {
        var listItems = <div className='cardOverview deck-None'>Please create a new Card</div>;
        if (card) {
            listItems = card.map((c) => (
                <Button
                    className='cardOverview listElement-Box'
                    onClick={() => {
                        localStorage.setItem('cardId', c.id);
                        history.push('/CardEditPage');
                    }}
                >
                    <div className='cardOverview listElement-Number'/>
                    <div className='cardOverview listElement-Title'>{c.question}</div>
                    <div className='cardOverview listElement-Score'>
                        <br/> <br/>{' '}
                    </div>
                    <div className='cardOverview listElement-Text'>Click to Edit</div>
                </Button>
            ));
        }

    }

    let content;
    let edit;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(checked){
            setVisibility("PUBLIC")
        } else {
            setVisibility("PRIVATE")
        }
        setChecked(event.target.checked);
    };

    edit = (
        <BaseContainer>
            <div className='cardOverview card-Title'>Edit</div>
            <FormField value={deckname}
                       onChange={(n) => setDeckname(n)}/>

            {editButton}
            <Button className='cardOverview addCard-Button'
                    onClick={() => history.push('/cardcreator')}
            >
                +
            </Button>

            <div className='cardOverview switch-text'
            >
                {visibility ? visibility : 'State'}
            </div>

            <Switch
                className='cardOverview switch'
                checked={checked}
                onChange={handleChange}
                color="default"
            />


            <Button className='cardOverview edit-Button'
                    onClick={() => [doUpdate(), localStorage.setItem('edit', false),setEditButton(false)]}
            >
                Submit Changes
            </Button>
            <Header/>
            <div className='cardOverview listTitle'>Cards</div>
            <div className='cardOverview list'>{listItems}</div>
        </BaseContainer>
    );

    content = (
        <BaseContainer>

            <Button className='cardOverview card' onClick={() => doLearning()}>
                <div className='cardOverview card-Title2'>{deck ? deck.deckname : ''}</div>
                <div className='cardOverview card-Text'>Click to Learn</div>
            </Button>
            <Button className='cardOverview edit-Button2'
                    onClick={() => setEditButton(true)}>Edit</Button>
            <div className='cardOverview people-Title'>People to challenge</div>
            <div className='cardOverview people-Button-position'>{listItems3}</div>
            <Header/>
        </BaseContainer>
    );

    document.body.style = 'background: #FFCA00;';

    return (
        <BaseContainer>
            {editButton ? edit : content}
            <Header/>
        </BaseContainer>
    );
};

export default CardOverview;