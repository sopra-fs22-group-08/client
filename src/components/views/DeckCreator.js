import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';
import Deck from '../../models/Deck';
import Header from '../ui/Header';
import Switch from '@mui/material/Switch';

const FormFieldFn = (props) => {
    return (
        <div className='cardCreator field'>
            <input
                className='cardCreator field-text'
                placeholder='Enter the Carddeck Title ...'
                value={props.value === null ? '' : props.value}
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
    const [deckname, setDeckname] = useState(null);
    const [visibility, setVisibility] = useState('PRIVATE');
    const [checked, setChecked] = React.useState(true);

    const doDeckCreator = async () => {
        try {
            const userid = sessionStorage.getItem('userId');
            const requestBodyTitle = JSON.stringify({ deckname, visibility });
            const responseTitle = await api.post('/users/' + userid + '/decks', requestBodyTitle);

            // Get the returned deck and update a new object.
            const deck = new Deck(responseTitle.data);

            // Store deckId into the local storage.
            sessionStorage.setItem('deckId', deck.id);

            // DeckCreator successfully worked --> navigate to the route /home in the GameRouter
            history.push(`/cardcreator`);
        } catch (error) {
            alert(`Something went wrong during the Creation: \n${handleError(error)}`);
        }
    };

    // event: React.ChangeEvent<HTMLInputElement>
    const handleChange = (event) => {
        if (checked) {
            setVisibility('PUBLIC');
        } else {
            setVisibility('PRIVATE');
        }
        setChecked(event.target.checked);
    };

    document.body.style = 'background: #4757FF;';

    return (
        <BaseContainer>
            <div className='cardCreator cardDeck-title'>Title</div>

            <div className='cardCreator switch-text'>{visibility ? visibility : 'State'}</div>

            <Switch
                className='cardCreator switch'
                checked={checked}
                onChange={handleChange}
                color='default'
            />

            <FormFieldFn value={deckname} onChange={(un) => setDeckname(un)} />
            <Button
                className='cardCreator createButton2'
                disabled={!deckname}
                onClick={() => doDeckCreator()}
            >
                Create
            </Button>
            <Header />
        </BaseContainer>
    );
};

export default DeckCreator;