import BaseContainer from "../ui/BaseContainer";
import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {api, handleError} from "../../helpers/api";
import "styles/views/InspectDeck.scss";
import {Button} from "../ui/Button";


const InspectDeck = (props) => {

    const history = useHistory();
    const location = useLocation();
    const [users, setUsers] = useState(null)
    const [popupFlag, setPopupFlag] = useState(null);

    /*All of this commented out code is copied from our Websocket Implementation on Armins M1 repo:*/
    /*const closePopup = () => {
        setPopupFlag(false);
    }

    const sendInvitation = ({user}) => {
        stompClient.send("/app/invite", {}, user.username);
    };

    const onInviteReceived = (payload) => {
        // const payloadData = JSON.parse(payload.body);
        // console.log(payloadData);
        setPopupFlag(true);
    }

    const onInviteReceivedPrivate = (payload) => {
        const payloadData = payload.body;
        // console.log(payload);
        setPopupFlag(true);
    }

    //connect user to Websocket for invitation
    const connect = () => {
        const socket = new SockJS(`${getDomain()}/websocket`);
        stompClient = Stomp.over(socket);
        stompClient.connect(
            {username: localStorage.getItem("username")},
            onConnected,
            onError);
        console.log("just got connected " + userData.from);
    }

    const onError = (err) => {
        console.log(err);
    }

    const onConnected = () => {
        setUserData({...userData, "connected": true});
        stompClient.subscribe('/topic/greetings', function (payload) {
            onInviteReceived(payload)
        });
        //stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        stompClient.subscribe('/users/queue/invite/greetings', function (payload) {
            onInviteReceivedPrivate(payload);
        });
    }*/

    const User = ({user}) => (
        <div className='user container'>
            <div className='user name'>{user.username}</div>
            <Button
                className="primary-button"
                //onClick={() => sendInvitation()}
            >Invite Player
            </Button>
        </div>
    );

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchPlayers() {
            try {
                const response = await api.get('/users');
                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setUsers(response.data);

            } catch (error) {
                console.error(`Something went wrong while fetching the decks: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the decks! See the console for details.");
            }
        }

        fetchPlayers();
    }, []);


    let content = <> </>
    if (users) {
        content = (
            <div className='inspect'>
                <h1>List of all Users Online (Not yet..) Users</h1>
                <ul className='inspect user-list'>
                    {users.map((user) => (
                        <User user={user} key={user.id}/>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <BaseContainer className="inspect container">
            {content}
        </BaseContainer>
    );

}

export default InspectDeck;
