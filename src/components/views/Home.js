import 'styles/views/Home.scss';
// react imports
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// local imports
import { api, handleError } from 'helpers/api';
import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import Header from 'components/ui/Header';
import Invitation from "../../models/Invitation";

const Home = () => {
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [decks, setDecks] = useState(null);
    const [invitations, setInvitations] = useState([]);

    const cardOverview = (deckId) => {
        history.push('/cardOverview/deckID=' + deckId);
    };

    const acceptInvite = async (invite) => {
        await api.delete('/invitations/' + invite.id);
        await api.put('/duels/' + invite.duelId + '/players/' + user.id + '/status/ACCEPTED');
        sessionStorage.setItem('duelId', invite.duelId);

        const url = '/multiplayer/';
        history.push({
            pathname: url.concat(invite.duelId),
            state: { detail: invite },
        });
    };

    const declineInvite = async (invite) => {
        await api.put('/duels/' + invite.duelId + '/players/' + user.id + '/status/DECLINED');
        await api.delete('/invitations/' + invite.id);
    };

    const checkInvites = async () => {
        try {
            const id = sessionStorage.getItem('userId');
            const responseBody = await api.get('/users/' + id + '/invitations');
            setInvitations(responseBody.data);

        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = sessionStorage.getItem('userId');
                const responseUser = await api.get('/users/' + userId);
                const responseDecks = await api.get('/users/' + userId + '/decks');
                setUser(responseUser.data);
                setDecks(responseDecks.data);

            } catch (error) {
                console.error(
                    `Something went wrong while fetching the users: \n${handleError(error)}`
                );
                console.error('Details:', error);
                alert(
                    'Something went wrong while fetching the users! See the console for details.'
                );
            }
        }

        const interval = setInterval(() => {
            checkInvites();
        }, 1000);

        fetchData();
        return () => clearInterval(interval);
    }, []);
    let listItems = <div className='Home deck-None'>Please create a new Deck in the Creator</div>;
    let listInvites = <div className='Home deck-None'>You have no invitations :(</div>;
    if (user) {
        if (decks && decks.length !== 0) {
            listItems = decks.map((d) => (
                <Button
                    key={d.id}
                    className='Home listElement-Box'
                    onClick={() => {
                        cardOverview(d.id);
                        sessionStorage.setItem('deckId', d.id);
                    }}
                >
                    <div className='Home listElement-Number' />
                    <div className='Home listElement-Title'>{d.deckname}</div>
                    <div className='Home listElement-Text'>Click to Overview</div>
                </Button>
            ));
        }

        if (invitations.length !== 0) {
            listInvites = invitations.map((i) => (
                <div className='Home invitations-Field'>
                    <div className='Home invitations-text'>
                        {i.senderUsername} wants to challenge you on {i.deckname}
                    </div>
                    <Button
                        className='Home invitations-Accept'
                        onClick={() => {
                            acceptInvite(i);
                        }}
                    >
                        ✓
                    </Button>
                    <Button
                        key={i.id}
                        className='Home invitations-Decline'
                        onClick={() => {
                            declineInvite(i);
                        }}
                    >
                        ✘
                    </Button>
                </div>
            ));
        }
    }

    document.body.style = 'background: #4757FF';

    return (
        <BaseContainer>
            <div className='Home listTitle'>Your Card Decks</div>
            <div className='Home list'>{listItems}</div>
            <div className='Home invitations-title'>Invitations</div>
            <div className='Home invitations-list'>{listInvites}</div>
            <Header />
        </BaseContainer>
    );
};

export default Home;