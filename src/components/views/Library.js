import 'styles/views/Home.scss';
import 'styles/views/Profile.scss';
// react imports
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// local imports
import { api, handleError } from 'helpers/api';
import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import Header from 'components/ui/Header';

const FormFieldDeckSearch = (props) => {
    return (
        <div className='profile search-field'>
            <input
                className='profile search-text'
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

    var listItems;
    var deckView;

    if (user) {
        listItems = <div className='Home deck-None'>No Deck(s) found yet</div>;

        if (publicDecks) {
            listItems = publicDecks.map((d) => (
                <Button
                    key={d.id}
                    className='Home listElement-Box'
                    onClick={() => {
                        cardOverview();
                        localStorage.setItem('deckId', d.id);
                    }}
                >
                    <div className='Home listElement-Number' />
                    <div className='Home listElement-Title'>{d.deckname}</div>
                    <div className='Home listElement-Text'>Click to Learn</div>
                </Button>
            ));
            deckView = (
                <BaseContainer>
                    <div className='Home listTitle-library'>Public Decks</div>
                    <div className='Home list-library'>{listItems}</div>
                </BaseContainer>
            );
        }
        if (foundDecks) {
            listItems = foundDecks.map((d) => (
                <Button
                    key={d.id}
                    className='Home listElement-Box'
                    onClick={() => {
                        cardOverview();
                        localStorage.setItem('deckId', d.id);
                    }}
                >
                    <div className='Home listElement-Number' />
                    <div className='Home listElement-Title'>{d.deckname}</div>
                    <div className='Home listElement-Text'>Click to Learn</div>
                </Button>
            ));
            deckView = (
                <BaseContainer>
                    <div className='Home listTitle-library'>Found Decks</div>
                    <div className='Home list-library'>{listItems}</div>
                </BaseContainer>
            );
        }
    }


    /**
     * @brief fetches decks with a searchString
     */
    const getSearchedForDecks = async (input) => {
        try {
            if (input !== '') {
                const responseDecks = await api.get('/decks/search/' + input);
                // console.log('response:', responseDecks.data);
                setFoundDecks(responseDecks.data);
            } else {
                alert('Please enter a search String');
            }
        } catch (error) {
            alert('No deck found, please retry with another string');
            console.error(`Something went wrong while fetching the decks: \n${handleError(error)}`);
        }
    };

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
                className='profile searchButton'
                onClick={() => {
                    getSearchedForDecks(searchString);
                }}
            >
                🔍
            </Button>
        </BaseContainer>
    );

    /**
     * @brief this reloads the page, resulting in getting back to all
     * public decks
     */
    let reloadPage = (
        <BaseContainer>
            <Button
                className='Home delSearchButton'
                onClick={() => {
                    window.location.reload(true);
                }}
            >
                ✘
            </Button>
        </BaseContainer>
    );

    return (
        <BaseContainer>

            {SearchElement}
            {deckView}
            {reloadPage}
            <Header />
        </BaseContainer>
    );
};

export default Library;