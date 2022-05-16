import 'styles/views/Home.scss';
// react imports
import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
// local imports
import {api, handleError} from 'helpers/api';
import BaseContainer from 'components/ui/BaseContainer';
import {Button} from 'components/ui/Button';
import Header from 'components/ui/Header';

const Home = () => {
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [decks, setDecks] = useState(null);
    const [invitations, setInvitations] = useState(null);

    // TODO: remove userData, doesn't do anything, when connecting it is still empty
    const [userData, setUserData] = useState({
        from: '',
        connected: false,
    });

    const cardOverview = (deckID) => {
        history.push('/cardOverview/deckID=' + deckID);
    };

    const acceptInvite = async (invite) => {
        await api.delete('/invitations/' + invite.id)
        await api.put('/duels/' + invite.duelId + '/players/' + user.id + '/status/ACCEPTED');
        localStorage.setItem("duelId", invite.duelId);

        const url = "/multiplayer/";
        history.push({
            pathname: url.concat(invite.duelId),
            state: {detail: invite}
        })
    }

    const declineInvite = async (invite) => {
        await api.put('/duels/' + invite.duelId + '/players/' + user.id + '/status/DECLINED');
        await api.delete('/invitations/' + invite.id)
    }

    /*
    * Every interval time: check if the logged in player has any invites and fetch them
    * */
    const checkInvites = async () => {
        try {
            //fetch invitations for the logged in-user from backend
            const id = localStorage.getItem("userId");
            const responseBody = await api.get("/users/" + id + "/invitations");
            setInvitations(responseBody.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    useEffect(() => {

        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
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

        /*
        * set Interval to which we fetch the invitations:
        **/
        const interval = setInterval(() => {
            checkInvites();
        }, 1000);

        fetchData();
        return () => clearInterval(interval);
    }, []);

    if (user) {
        var listItems = <div className='Home deck-None'>Please create a new Deck</div>;
        if (decks) {
            listItems = decks.map((d) => (
                <Button
                    className='Home listElement-Box'
                    onClick={() => {
                        cardOverview(d.id);
                        localStorage.setItem('DeckID', d.id);
                    }}
                >
                    <div className='Home listElement-Number'/>
                    <div className='Home listElement-Title'>{d.deckname}</div>
                    <div className='Home listElement-Score'>
                        <br/> <br/>{' '}
                    </div>
                    <div className='Home listElement-Text'>Click to Learn</div>
                </Button>
            ));
        }

        var listInvites = <div className='Home deck-None'>Invite Player</div>;
        if (invitations) {
            listInvites = invitations.map((i) => (
                <div className='Home invitations-Field'>
                    <div className='Home invitations-text'>{i.senderUsername} wants to challenge you
                        on {i.deckname}
                    </div>
                    <Button
                        className='Home invitations-Accept'
                        onClick={() => {
                            acceptInvite(i);
                        }}
                    >Accept</Button>
                    <Button
                        className='Home invitations-Decline'
                        onClick={() => {
                            declineInvite(i);
                        }}
                    >X</Button>
                </div>
            ));
        }


    }

    document.body.style = 'background: #4757FF';

    return (
        <BaseContainer>
            <div className='Home listTitle'>Continue Learning</div>
            <div className='Home list'>{listItems}</div>
            <div className='Home invitations-title'>Invitations</div>
            <div className='Home invitations-list'>{listInvites}</div>
            <Header/>
        </BaseContainer>
    );
};

export default Home;