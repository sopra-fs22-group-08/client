import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Home.scss";
import "styles/views/PublicDecks.scss";
import PropTypes from "prop-types";
import User from "../../models/User";
import {Button} from 'components/ui/Button';

const PublicDecks = (props) => {

    const [decks, setDecks] = useState(null);

    const Deck = ({deck}) => (
        <div className='deck container'>
            <div className='deck name'>
                id: {deck.id}
            </div>
            {/* <div className='player username'>{user.username} </div> */}
            {/* <div className='secondary-button' onClick={() => toProfile(user.id)}>{user.username}</div> */}
            {/* <div className='player name'>{user.name}</div> */}
            {/* <Button onClick={() => toProfile(user.id)}>view Profile</Button> */}
        </div>
    );
    Deck.propTypes = {
        deck: PropTypes.object,
    };

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        /*async function fetchDecks() {
            try {
                const response = await api.get('/decks');

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setDecks(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the decks: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the decks! See the console for details.");
            }
        }*/

        //fetchDecks();
    }, []);

    let content = (
        <div className='publicDecks'>
            <ul className='publicDecks deck-list'>
            </ul>
        </div>
    );

    return (
        <BaseContainer>
            {content}
        </BaseContainer>
    );
}

export default PublicDecks;