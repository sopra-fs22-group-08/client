import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Home.scss";
import "styles/views/PublicDecks.scss";
import PropTypes from "prop-types";
import {Button} from 'components/ui/Button';

const PublicDecks = (props) => {

    const history = useHistory();
    document.body.style = 'background: #4757FF;';

    const [decks, setDecks] = useState(null);

    function inspectDeck(deck) {

        let url = "/inspectdeck/"

        history.push({
            pathname: url.concat(deck.deckname),
            deck: deck
        })
    }

    const Deck = ({deck}) => (
        <div className='deck container'>
            <div className='deck name'>
                {deck.deckname}
            </div>
            <Button
                className="primary-button"
                onClick={() => inspectDeck(deck)}
            >Inspect
            </Button>
        </div>
    );
    Deck.propTypes = {
        deck: PropTypes.object,
    };

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchDecks() {
            try {
                const response = await api.get('/decks');
                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setDecks(response.data);

            } catch (error) {
                console.error(`Something went wrong while fetching the decks: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the decks! See the console for details.");
            }
        }

        fetchDecks();
    }, []);

    let content = <></>

    if (decks) {
        content = (
            <div className='publicDecks'>
                <div className ="h2"> List of all Decks</div>
                <ul className='publicDecks deck-list'>
                    {decks.map((deck) => (
                        <Deck deck={deck} key={deck.id} />
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <BaseContainer className= "publicDecks container">
            {content}
        </BaseContainer>
    );

}

export default PublicDecks;
