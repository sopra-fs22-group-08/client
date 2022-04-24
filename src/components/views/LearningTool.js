import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import PropTypes from "prop-types";
import {Button} from 'components/ui/Button';

const FormFieldFn = props => {
    return (
        <div className="card field">
            <input
                className="card question-text"
                value={props.value}
            />
        </div>
    );
};

FormFieldFn.propTypes = {
    value: PropTypes.string,
};

const FormFieldLn = props => {
    return (
        <div className="card field">
            <input
                className="card answer1-text"
                value={props.value}
            />
        </div>
    );
};

FormFieldLn.propTypes = {
    value: PropTypes.string,
};

const FormFieldEm = props => {
    return (
        <div className="card field">
            <input
                className="card answer2-text"
                value={props.value}
            />
        </div>
    );
};

FormFieldEm.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

const FormFieldUn = props => {
    return (
        <div className="card field">
            <input
                className="card answer3-text"
                value={props.value}
            />
        </div>
    );
};

FormFieldUn.propTypes = {
    value: PropTypes.string,
};

const FormFieldPw = props => {
    return (
        <div className="card field">
            <input
                className="card answer4-text"
                value={props.value}
            />
        </div>
    );
};


FormFieldPw.propTypes = {
    value: PropTypes.string,
};



const LearningTool = (props) => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const location = useLocation();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [user, setUser] = useState(null);
    const [count, setCount] = useState(0);

    const [cards, setCards] = useState(null);


    const [burgerMenu, setBurgerMenu] = useState(false);


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

    const goNextCard = async () => {
        const deckId = location.pathname.match(/deckID=(\d+)/);
        let cardId = location.pathname.match(/cardID=(\d+)/);
        cardId[1]++
        history.push(`/learningtool/deckID=` + deckId[1] + '/cardID=' + cardId[1]);

    };

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const deckId = location.pathname.match(/deckID=(\d+)/);
                const responseCard = await api.get('/decks/' + deckId[1] + '/cards');

                await new Promise(resolve => setTimeout(resolve, 1000));

                setCards(responseCard.data)


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
            <div className="profile window"></div>
            <div className="profile username"></div>
            <Button
                className="profile username"
                onClick={() => {setBurgerMenu(false); goProfile();}}
            >{user?.username  ? user.username : "Username"}
            </Button>
            <Button
                className="profile home"
                onClick={() => goHome()}
            >Home
            </Button>
            <Button
                className="profile store"
                onClick={() => goStore()}
            >Store
            </Button>
            <Button
                className="profile creator"
                onClick={() => goCreator()}
            >Creator
            </Button>
            <Button
                className="profile logoutButton"
                onClick={() => logout()}
            >Logout
            </Button>
            <div
                className="profile x"
                onClick={() => setBurgerMenu(false)}

            >x</div>

        </BaseContainer>
    )


    function shuffleAnswers(array) {
        let curId = array.length;
        while (0 !== curId) {
            let randId = Math.floor(Math.random() * curId);
            curId -= 1;
            let tmp = array[curId];
            array[curId] = array[randId];
            array[randId] = tmp;
        }
        return array;
    }
    let arr = [0, 1, 2, 3,];
    arr = shuffleAnswers(arr);

    const match = location.pathname.match(/cardID=(\d+)/);
    const cardID = match[1]

    //checks if there are still some cards left to learn
    function checkNextCard(cardID, value) {
        if (value == 0) {
            setCount(count + 1)
        }
        cardID++
        if (Object.keys(cards).length <= (cardID)) {
            return goHome()
        }
        else {
            return goNextCard()
        }
    }



    if (cards) {
        content = (
            <BaseContainer>
                <div className="profile title">NB</div>


                <div className="profile burger1"></div>
                <div className="profile burger2"></div>
                <div className="profile burger3"></div>
                <div
                    className="profile burgerButton"
                    // open edit window
                    onClick={() => setBurgerMenu(true)}
                ></div>

                <div className="card learningtool-text">Card</div>

                <div className="card question-title">Question</div>
                <div className="card question-field"></div>



                <FormFieldFn
                    value={cards[cardID].question}
                />

                <div className="card answer1-title">Answer 1</div>
                <div className="card answer1-field"></div>

                <Button
                        className="cardDeck createButton"
                        onClick={() => checkNextCard(cardID, arr[0])}
                >
                <FormFieldLn
                    value={cards[cardID].options[arr[0]]}
                />
                </Button>

                <div className="card answer2-title">Answer 2</div>
                <div className="card answer2-field"></div>

                <Button
                        className="cardDeck createButton"
                        onClick={() => checkNextCard(cardID, arr[1])}
                >
                <FormFieldEm
                    value={cards[cardID].options[arr[1]]}
                />
                </Button>

                <div className="profile answer3-title">Answer 3</div>
                <div className="profile answer3-field"></div>

                <Button
                        className="cardDeck createButton"
                        onClick={() => checkNextCard(cardID, arr[2])}
                >
                <FormFieldUn
                    value={cards[cardID].options[arr[2]]}
                />
                </Button>

                <div className="profile answer4-title">Answer 4</div>
                <div className="profile answer4-field"></div>

                <Button
                        className="cardDeck createButton"
                        onClick={() => checkNextCard(cardID, arr[3])}
                >
                <FormFieldPw
                    value={cards[cardID].options[arr[3]]}
                />
                </Button>

                <div><p>You had {count} correct</p></div>

            </BaseContainer>

        );
    }

    document.body.style = 'background: #4757FF;';

    return (
            <BaseContainer>
                {content}
                {burgerMenu ? burgerMenuContent : null}
            </BaseContainer>
    );
}

export default LearningTool;
