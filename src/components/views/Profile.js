import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import PropTypes from "prop-types";
import {Button} from 'components/ui/Button';

const FormField = props => {
    return (
            <div className="register field">
                <label className="register label">
                    {props.label}
                </label>
                <input
                        className="register input"
                        placeholder="enter here.."
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                />
            </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

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

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [editButton, setEditButton] = useState(false);

    const doUpdate = async () => {
        const id = localStorage.getItem("userId")

        const requestBody = JSON.stringify({firstName, lastName, email, username});
        const response = await api.put('/users/'+ id, requestBody);

        window.location.reload(false);
    };

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userId = location.pathname.match(/\d+$/);
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

    let content = <Spinner/>;
    let addEditButton = "";
    let edit;

    edit = (
            <div>
                <FormField
                        label="First Name"
                        value={firstName}
                        onChange={b => setFirstName(b)}
                />
                <FormField
                        label="Last Name"
                        value={lastName}
                        onChange={b => setLastName(b)}
                />
                <FormField
                        label="Email"
                        value={email}
                        onChange={b => setEmail(b)}
                />
                <FormField
                        label="Username"
                        value={username}
                        onChange={un => setUsername(un)}
                />
                <Button
                        width="100%"
                        // close edit window
                        onClick={() => [setEditButton(false), doUpdate()]}
                >
                    Submit
                </Button>
            </div>);



    addEditButton = (
            <Button
                    width="100%"
                    // open edit window
                    onClick={() => setEditButton(true)}
            >
                Edit
            </Button>
    );



    if (user) {
        content = (
                <div className="profile">
                    <div>First Name:</div>
                    <div>{user.firstName}</div>
                    <div>--------------------------- </div>
                    <div>Last Name:</div>
                    <div>{user.lastName}</div>
                    <div>--------------------------- </div>
                    <div>Email:</div>
                    <div>{user.email}</div>
                    <div>--------------------------- </div>
                    <div>Username:</div>
                    <div>{user.username}</div>
                    <div>--------------------------- </div>
                    <div>Status:</div>
                    <div>{user.status}</div>
                    <div>--------------------------- </div>
                    {addEditButton}
                </div>
        );
    }

    return (
            <BaseContainer className="profile container">
                <h2>Profile</h2>
                <p className="profile paragraph">
                    {editButton ? edit : content}
                </p>

            </BaseContainer>
    );
}

export default Profile;