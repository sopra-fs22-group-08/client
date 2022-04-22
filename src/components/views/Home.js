import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Home.scss";
import PropTypes from "prop-types";
import {Button} from 'components/ui/Button';
import User from "../../models/User";



const Profile = (props) => {
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

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [editButton, setEditButton] = useState(false);
    const [password, setPassword] = useState(null);
    const [burgerMenu, setBurgerMenu] = useState(false);

    const doUpdate = async () => {
        const id = localStorage.getItem("userId")

        const requestBody = JSON.stringify({firstName, lastName, email, username});
        const response = await api.put('/users/'+ id, requestBody);

        window.location.reload(false);
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
        history.push(`/deckcreator`);

    };

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userId = localStorage.getItem("userId")
                //const userId = location.pathname.match(/\d+$/);
                const response = await api.get('/users/' + userId);

                await new Promise(resolve => setTimeout(resolve, 1000));

                setUser(response.data)


                const response2 = await api.get('/users');

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
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
            <div className="Home window"></div>
            <div className="Home username"></div>
            <Button
                className="Home username"
                onClick={() => goProfile()}
            >{user?.username  ? user.username : "Username"}
            </Button>
            <Button
                className="Home home"
                onClick={() => {setBurgerMenu(false); goHome();}}
            >Home
            </Button>
            <Button
                className="Home store"
                onClick={() => goStore()}
            >Store
            </Button>
            <Button
                className="Home creator"
                onClick={() => goCreator()}
            >Creator
            </Button>
            <Button
                className="Home logoutButton"
                onClick={() => logout()}
            >Logout
            </Button>
            <div
                className="Home x"
                onClick={() => setBurgerMenu(false)}

            >x</div>

        </BaseContainer>
    )



    if (user) {

        const numbers = [1, 2, 3, 4, 5];
        const listItems = numbers.map((number) =>
            <div className="Home listElement-Box">
        <div className="Home listElement-Number">43 / 76</div>
        <div className="Home listElement-Title">Asset Pricing </div>
        <div className="Home listElement-Score">1. YOU <br /> 2. Gusti <br /> 3. Mefisto</div>
        <div className="Home listElement-Text">Click to Learn</div></div>
        );

        const numbers2 = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16];
        const listItems2 = numbers2.map((number) =>
            <div className="Home listElement-Box">
                <div className="Home listElement-Number">43 / 76</div>
                <div className="Home listElement-Title">Asset Pricing </div>
                <div className="Home listElement-Score">1. YOU <br /> 2. Gusti <br /> 3. Mefisto</div>
                <div className="Home listElement-Text">Click to Learn</div></div>
        );

        var listItems3;
        if (users){
             listItems3 = users.map(u =>
                <Button
                    className="Home online-Button"
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
                <div className="Home title">NB</div>


                <div className="Home burger1"></div>
                <div className="Home burger2"></div>
                <div className="Home burger3"></div>
                <div
                    className="Home burgerButton"
                    // open edit window
                    onClick={() => setBurgerMenu(true)}
                ></div>

                <div className="Home listTitle">Continue Learning</div>
                <div className="Home list">{listItems}</div>

                <div className="Home online-Title">People to challenge</div>
                <div className="Home online-Number">10</div>
                <div className="Home online-ButtonPositon">{listItems3}</div>

                <div className="Home cards-Title1">Cards</div>
                <div className="Home cards-Title2">Yours, Completed</div>
                <div className="Home cards-list">{listItems2}</div>



            </BaseContainer>

        );
    }

    document.body.style = 'background: #4757FF;';

    return (
            <BaseContainer>
                {editButton ? null : content}
                {burgerMenu ? burgerMenuContent : null}
            </BaseContainer>
    );
}

export default Profile;