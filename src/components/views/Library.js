import 'styles/views/Home.scss';
import 'styles/views/Profile.scss';
// react imports
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// local imports
import { api, handleError } from 'helpers/api';
import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import Header from 'components/ui/Header';

const FormFieldDeckSearch = (props) => {
    return (
        <div className='profile field'>
            <input
                className='profile lastName-text'
                placeholder='Enter Deck Name'
                value={props.value}
                onChange={(input) => {
                    props.onChange(input.target.value);
                }}
            />
        </div>
    );
};

FormFieldDeckSearch.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const Library = () => {
    document.body.style = 'background: #4757FF';

    const history = useHistory();

    const [user, setUser] = useState(null);
    const [publicDecks, setPublicDecks] = useState(null);
    const [searchString, setSearchString] = useState('');
    const [foundDecks, setFoundDecks] = useState(null);

    const cardOverview = () => {
        localStorage.setItem('edit', false);
        history.push('/cardOverview');
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                const responseUser = await api.get('/users/' + userId);
                // NOTE: get only public decks, so they don't have to get filtered further down
                const responseDecks = await api.get('/decks/visibility/PUBLIC');
                setUser(responseUser.data);
                setPublicDecks(responseDecks.data);
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
        fetchData();
    }, []);

    /**
     * @brief creates an assortment of inputted Decks
     */
    const createDeckView = (inputDecks) => {
        return inputDecks.map((d) => (
            <Button
                className='Home listElement-Box'
                onClick={() => {
                    cardOverview();
                    localStorage.setItem('deckId', d.id);
                }}
            >
                <div className='Home listElement-Number' />
                <div className='Home listElement-Title'>{d.deckname}</div>
                <div className='Home listElement-Score'>
                    <br /> <br />{' '}
                </div>
                <div className='Home listElement-Text'>Click to ADD</div>
            </Button>
        ));
    };

    if (user) {
        var listItems = <div className='Home deck-None'>Please create a new Deck</div>;
        if (publicDecks) {
            // console.log(publicDecks);
            listItems = createDeckView(publicDecks);
        }
    }

    /**
     * @brief fetches decks with a searchString
     */
    const getSearchedForDecks = async (input) => {
        try {
            if (input !== '') {
                console.log(input);
                const responseDecks = await api.get('/decks/search/' + input);
                console.log(responseDecks.data);
                setFoundDecks(responseDecks.data);
                // now rewrite the listItems
                listItems = createDeckView(foundDecks);
            } else {
                alert('Please enter a search String');
            }
        } catch (error) {
            alert('No deck found, please retry with another string');
            console.error(`Something went wrong while fetching the decks: \n${handleError(error)}`);
        }
    };

    // TODO: find better postioning and do better styling
    /**
     * @brief element including search elements
     */
    let SearchElement = (
        <BaseContainer>
            <FormFieldDeckSearch
                value={searchString}
                onChange={(input) => {
                    setSearchString(input);
                }}
            />
            <Button
                className='profile createButton'
                onClick={() => {
                    getSearchedForDecks(searchString);
                }}
            >
                Submit
            </Button>
        </BaseContainer>
    );

    let publicDecksView = (
        <BaseContainer>
            <div className='Home listTitle'>Public Decks</div>
            <div className='Home list'>{listItems}</div>
        </BaseContainer>
    );

    let searchedDecksView = (
        <BaseContainer>
            <div className='Home listTitle'>Found Decks</div>
            <div className='Home list'>{listItems}</div>
        </BaseContainer>
    );

    // TODO: find better styling and better positioning
    /**
     * @brief this reloads the page, resulting in getting back to all
     * public decks
     */
    let reloadPage = (
        <BaseContainer>
            <Button
                onClick={() => {
                    window.location.reload(true);
                }}
            >
                Go Back to all Decks
            </Button>
        </BaseContainer>
    );

    return (
        <BaseContainer>
            <Header />
            {SearchElement}
            {foundDecks === null ? publicDecksView : searchedDecksView}
            {reloadPage}
        </BaseContainer>
    );
};

export default Library;