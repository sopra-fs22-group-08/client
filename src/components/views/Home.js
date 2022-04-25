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

const Home = (props) => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const location = useLocation();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [editButton, setEditButton] = useState(false);
    const [password, setPassword] = useState(null);
    const [burgerMenu, setBurgerMenu] = useState(false);
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
        // console.log(payload);
        setPopupFlag(true);
    };

    const onError = (err) => {
        console.log(err);
    };
    //  end websockets

    const doUpdate = async () => {
        const id = localStorage.getItem('userId');
        const requestBody = JSON.stringify({ firstName, lastName, email, username });
        const response = await api.put('/users/' + id, requestBody);
        window.location.reload(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    const cardOverview = () => {
        history.push('/cardOverview');
    };

    const goProfile = async () => {
        const id = localStorage.getItem('userId');
        history.push(`/profile/` + id);
    };

    const goHome = async () => {
        const id = localStorage.getItem('userId');
        history.push(`/home/` + id);
    };

    const goPublicDecks = async () => {
        history.push(`/publicdecks`);
    };

    const goCreator = async () => {
        history.push(`/deckcreator`);
    };

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                //const userId = location.pathname.match(/\d+$/);
                const response = await api.get('/users/' + userId);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setUser(response.data);
                //Decks
                const response3 = await api.get('/users/' + userId + '/decks');
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setDecks(response3.data);
                const response2 = await api.get('/users');
                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Get the returned users and update the state.
                setUsers(response2.data);
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

    let content;

    let burgerMenuContent = (
        <BaseContainer>
            <div className='Home window'></div>
            <div className='Home username'></div>
            <Button className='Home username' onClick={() => goProfile()}>
                {user?.username ? user.username : 'Username'}
            </Button>
            <Button
                className='Home home'
                onClick={() => {
                    setBurgerMenu(false);
                    goHome();
                }}
            >
                Home
            </Button>
            <Button className='Home public-decks' onClick={() => goPublicDecks()}>
                Public Decks
            </Button>
            <Button className='Home creator' onClick={() => goCreator()}>
                Creator
            </Button>
            <Button className='Home logoutButton' onClick={() => logout()}>
                Logout
            </Button>
            <div className='Home x' onClick={() => setBurgerMenu(false)}>
                x
            </div>
        </BaseContainer>
    );

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
                    <div className='Home listElement-Number'></div>
                    <div className='Home listElement-Title'>{d.deckname}</div>
                    <div className='Home listElement-Score'>
                        <br /> <br />{' '}
                    </div>
                    <div className='Home listElement-Text'>Click to Learn</div>
                </Button>
            ));
        }
        content = (
            <BaseContainer>
                <div className='Home title'>NB</div>
                <div className='Home burger1'></div>
                <div className='Home burger2'></div>
                <div className='Home burger3'></div>
                <div
                    className='Home burgerButton'
                    // open edit window
                    onClick={() => setBurgerMenu(true)}
                ></div>
                <div className='Home listTitle'>Continue Learning</div>
                <div className='Home list'>{listItems}</div>
            </BaseContainer>
        );
    }

    document.body.style = 'background: #4757FF';

    return (
        <BaseContainer>
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
            {editButton ? null : content}
            {burgerMenu ? burgerMenuContent : null}
        </BaseContainer>
    );
};

export default Home;