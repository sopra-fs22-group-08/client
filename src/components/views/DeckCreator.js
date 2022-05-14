import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';
import Deck from '../../models/Deck';
import Header from "../ui/Header";

const FormFieldFn = (props) => {
    return (
        <div className='cardCreator field'>
            <input
                className='cardCreator field-text'
                placeholder='Enter the Carddeck Title ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldFn.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const DeckCreator = () => {
    const history = useHistory();
    const location = useLocation();
    const [deckname, setDeckname] = useState(null);
    const [visibility, setVisibility] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {

        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                const response = await api.get('/users/' + userId);
                //await new Promise((resolve) => setTimeout(resolve, 1000));
                setUser(response.data);
            } catch (error) {
                console.error(
                    `Something went wrong while fetching the Data: \n${handleError(error)}`
                );
                console.error('Details:', error);
                alert(
                    'Something went wrong while fetching the Data! See the console for details.'
                );
            }
        }

        fetchData();
    }, []);

    const doDeckCreator = async () => {
        try {
            const userid = localStorage.getItem('userId');
            const requestBodyTitle = JSON.stringify({ deckname, visibility });
            const responseTitle = await api.post('/users/' + userid + '/decks', requestBodyTitle);

            // Get the returned deck and update a new object.
            const deck = new Deck(responseTitle.data);

            // Store deckID into the local storage.
            localStorage.setItem('deckId', deck.id);

            // DeckCreator successfully worked --> navigate to the route /home in the GameRouter
            history.push(`/cardcreator`);
        } catch (error) {
            alert(`Something went wrong during the Creation: \n${handleError(error)}`);
        }
    };



    document.body.style = 'background: #4757FF;';

    return (
        <BaseContainer>
            <div className='cardCreator cardDeck-title'>Title</div>

            <FormFieldFn value={deckname} onChange={(un) => setDeckname(un) & setVisibility("PUBLIC") } />  //@andrin add switch
            <Button
                className='cardCreator createButton2'
                disabled={!deckname}
                onClick={() => doDeckCreator()}
            >
                Create
            </Button>
            <Header/>
        </BaseContainer>
    );
};

export default DeckCreator;