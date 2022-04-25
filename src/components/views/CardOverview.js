import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/CardOverview.scss";
import PropTypes from "prop-types";
import {Button} from 'components/ui/Button';
import User from "../../models/User";
import Card from "../../models/Card";

const CardOverview = (props) => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const location = useLocation();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);

    const [deck, setDeck] = useState(null);


    const [burgerMenu, setBurgerMenu] = useState(false);


    const doLearning = () => {
        const deckID = localStorage.getItem("DeckID")
        history.push('/learningtool/deckID=' + deckID + '/cardID=0');
    }

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
        history.push(`/deckcreator`);

    };

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {

                const deckID = localStorage.getItem("DeckID")
                const responseDeck =  await api.get('/decks/' + deckID);

                await new Promise(resolve => setTimeout(resolve, 1000));

                setDeck(responseDeck.data)

                const response2 = await api.get('/users');
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setUsers(response2.data);

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);


    let content;

    let burgerMenuContent = (
        <BaseContainer>
            <div className="cardOverview window"></div>
            <div className="cardOverview username"></div>
            <Button
                className="cardOverview username"
                onClick={() => {setBurgerMenu(false); goProfile();}}
            >{user?.username  ? user.username : "Username"}
            </Button>
            <Button
                className="cardOverview home"
                onClick={() => goHome()}
            >Home
            </Button>
            <Button
                className="cardOverview store"
                onClick={() => goStore()}
            >Store
            </Button>
            <Button
                className="cardOverview creator"
                onClick={() => goCreator()}
            >Creator
            </Button>
            <Button
                className="cardOverview logoutButton"
                onClick={() => logout()}
            >Logout
            </Button>
            <div
                className="cardOverview x"
                onClick={() => setBurgerMenu(false)}

            >x</div>

        </BaseContainer>
    )

    var listItems3;
    if (users){
        listItems3 = users.map(u =>
            <Button
                className="cardOverview people-Button"
                //Start Multiplayer
                onClick={() => logout()}
            >{u.username}
            </Button>
        );
    }
    else{
        listItems3 = (<div className="Home online-None">Currently there is no User online</div>);
    }

    content = (
        <BaseContainer>
            <div className="cardOverview title">NB</div>


            <div className="cardOverview burger1"></div>
            <div className="cardOverview burger2"></div>
            <div className="cardOverview burger3"></div>
            <div
                className="cardOverview burgerButton"
                // open edit window
                onClick={() => setBurgerMenu(true)}
            ></div>


            <Button
                className="cardOverview card"
                onClick={() => doLearning()}
            >
            <div className="cardOverview card-Title">{deck ? deck.deckname : ""}</div>
            <div className="cardOverview card-Text">Click to Learn</div></Button>

            <Button className="cardOverview edit-Button">Edit</Button>


            <div className="cardOverview people-Title">People to challenge</div>


            <div className="cardOverview people-Button-position">{listItems3}</div>



        </BaseContainer>

    );
    document.body.style = 'background: #FFCA00;';

    return (
            <BaseContainer>
                {content}
                {burgerMenu ? burgerMenuContent : null}
            </BaseContainer>
    );
}

export default CardOverview;
