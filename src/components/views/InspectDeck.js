import BaseContainer from "../ui/BaseContainer";
import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {api, handleError} from "../../helpers/api";
import "styles/views/InspectDeck.scss";


const InspectDeck = (props) => {

    const history = useHistory();
    const location = useLocation();
    const [users, setUsers] = useState(null)

    const User = ({user}) => (
        <div className='player container'>
            <div className='player name'>{user.username}</div>
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
            <div className='game'>
                <h1>List of all Online Users</h1>
                <ul className='game user-list'>
                    {users.map((user) => (
                        <User user={user} key={user.id}/>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <BaseContainer className="Game container">
            {content}
        </BaseContainer>
    );

}

export default InspectDeck;
