import 'styles/views/Home.scss';
// react imports
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// local imports
import { api, handleError } from 'helpers/api';
import { stompClient } from 'helpers/websocket';
import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import { Popup } from 'components/ui/Popup';
import Header from 'components/ui/Header';

const Home = () => {
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [decks, setDecks] = useState(null);

    /*
     * Websocket logic
     */
    const [popupFlag, setPopupFlag] = useState(null);
    // TODO: remove userData, doesn't do anything, when connecting it is still empty
    const [userData, setUserData] = useState({
        from: '',
        connected: false,
    });

    const closePopup = () => {
        setPopupFlag(false);
    };

    const connect = () => {
        stompClient.connect({ username: localStorage.getItem('username') }, onConnected, onError);
        console.log('just got connected ' + userData.from);
    };

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe('/users/queue/invite/greetings', function (payload) {
            onInviteReceivedPrivate(payload);
        });
    };

    const onInviteReceivedPrivate = (payload) => {
        // const payloadData = payload.body;
        console.log(payload);
        setPopupFlag(true);
    };

    const onError = (err) => {
        console.log(err);
    };
    //  end websockets

    const cardOverview = () => {
        history.push('/cardOverview');
    };


    useEffect(() => {

        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                const responseUser = await api.get('/users/' + userId);
                const responseDecks = await api.get('/users/' + userId + '/decks');
                await new Promise((resolve) => setTimeout(resolve, 1000));
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
        connect();
        fetchData();
    }, []);


    if (user) {
        var listItems = <div className='Home deck-None'>Please create a new Deck</div>;
        if (decks) {
            listItems = decks.map((d) => (
                <Button
                    className='Home listElement-Box'
                    onClick={() => {
                        cardOverview();
                        localStorage.setItem('DeckID', d.id);
                    }}
                >
                    <div className='Home listElement-Number'/>
                    <div className='Home listElement-Title'>{d.deckname}</div>
                    <div className='Home listElement-Score'>
                        <br /> <br />{' '}
                    </div>
                    <div className='Home listElement-Text'>Click to Learn</div>
                </Button>
            ));
        }

    }

    document.body.style = 'background: #4757FF';

    return (
        <BaseContainer>
            <Header/>
            <div>
                {popupFlag && (
                    <Popup
                        content={
                            <>
                                <b>You have received an Invitation</b>
                            </>
                        }
                        handleClose={closePopup}
                    />
                )}
            </div>
            <div className='Home listTitle'>Continue Learning</div>
            <div className='Home list'>{listItems}</div>
        </BaseContainer>
    );
};

export default Home;