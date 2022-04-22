import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import Deck from "../../models/Deck";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const FormFieldFn = props => {
  return (
      <div className="creator field">
        <input
            className="creator title-text"
            placeholder="Enter the Carddeck Title ..."
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
        />
      </div>
  );
};

FormFieldFn.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};


const DeckCreator = () => {
  const history = useHistory();
  const [deckname, setDeckname] = useState(null);

  const doDeckCreator = async () => {
    try {
      const userid = localStorage.getItem('userId');
      const requestBodyTitle = JSON.stringify({deckname});
      const responseTitle = await api.post('/users/' + userid +'/decks', requestBodyTitle);

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
      <div className="carddeck title">No Brainer</div>
      <div className="carddeck login-text">Create New Deck</div>

      <div className="carddeck carddeckTitle-title">Carddeck Title</div>
      <div className="carddeck carddeckTitle-field"></div>

      <FormFieldFn
          value={deckname}
          onChange={un => setDeckname(un)}
      />




      <Button
          className="cardDeck createButton"
          disabled={!deckname}
          onClick={() => doDeckCreator()}
      >
        Create
      </Button>

    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default DeckCreator;
