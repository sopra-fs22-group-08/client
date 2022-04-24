import BaseContainer from "../ui/BaseContainer";
import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {api, handleError} from "../../helpers/api";
import "styles/views/InspectDeck.scss";
import {Button} from "../ui/Button";
import {stompClient} from "./Home";

const InspectDeck = (props) => {

    const location = useLocation();
    const [users, setUsers] = useState(null)

    //send private invitation to websocket
    const sendPrivateInvite = ({user}) => {
        console.log("just sent an invite to " + user.username);
        stompClient.send("/app/invite", {}, user.username);
    };

    // TODO: rename to UserView
    const User = ({user}) => (
        <div className='user container'>
            <div className='user name'>{user.username}</div>
            <Button
                className="primary-button"
                onClick={() => sendPrivateInvite(user = {user})}
            >Invite Player
            </Button>
        </div>
    );

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const response = await api.get('/users');
                await new Promise(resolve => setTimeout(resolve, 1000));
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
                <h1>Inspecting deck: {location.deck.deckname}</h1>
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
