import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
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
      <div className="cardCreator field">
        <input
            className="cardCreator field-text"
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
    const location = useLocation();

    const [deckname, setDeckname] = useState(null);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [user, setUser] = useState(null);



    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userId = localStorage.getItem("userId")
                const response = await api.get('/users/' + userId);

                await new Promise(resolve => setTimeout(resolve, 1000));

                setUser(response.data)


            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);


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

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    const goProfile = async () => {
        const id = localStorage.getItem("userId")
        history.push(`/profile/` + id);

    };

    const goHome = async () => {
        const id = localStorage.getItem("userId")
        history.push(`/home/` + id);

    };

    const goStore = async () => {
        history.push(`/store`);

    };

    const goCreator = async () => {
        history.push(`/creator`);

    };

    let burgerMenuContent = (
        <BaseContainer>
            <div className="cardCreator window"></div>
            <div className="cardCreator username"></div>
            <Button
                className="cardCreator username"
                onClick={() => {setBurgerMenu(false); goProfile();}}
            >{user?.username  ? user.username : "Username"}
            </Button>
            <Button
                className="cardCreator home"
                onClick={() => goHome()}
            >Home
            </Button>
            <Button
                className="cardCreator store"
                onClick={() => goStore()}
            >Store
            </Button>
            <Button
                className="cardCreator creator"
                onClick={() => goCreator()}
            >Creator
            </Button>
            <Button
                className="cardCreator logoutButton"
                onClick={() => logout()}
            >Logout
            </Button>
            <div
                className="cardCreator x"
                onClick={() => setBurgerMenu(false)}

            >x</div>

        </BaseContainer>
    )

    document.body.style = 'background: #4757FF;';

  return (

    <BaseContainer>

        <div className="cardCreator title">NB</div>


        <div className="cardCreator burger1"></div>
        <div className="cardCreator burger2"></div>
        <div className="cardCreator burger3"></div>
        <div
            className="cardCreator burgerButton"
            // open edit window
            onClick={() => setBurgerMenu(true)}
        ></div>



      <div className="cardCreator cardDeck-title">Title</div>
      <div className="carddeck carddeckTitle-field"></div>

      <FormFieldFn
          value={deckname}
          onChange={un => setDeckname(un)}
      />




      <Button
          className="cardCreator createButton2"
          disabled={!deckname}
          onClick={() => doDeckCreator()}
      >
        Create
      </Button>
        {burgerMenu ? burgerMenuContent : null}
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default DeckCreator;
