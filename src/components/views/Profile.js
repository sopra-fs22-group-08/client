import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import PropTypes from "prop-types";
import {Button} from 'components/ui/Button';

const FormFieldFn = props => {
    return (
        <div className="profile field">
            <input
                className="profile firstName-text"
                placeholder="Enter your First Name ..."
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

const FormFieldLn = props => {
    return (
        <div className="profile field">
            <input
                className="profile lastName-text"
                placeholder="Enter your Last Name ..."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldLn.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

const FormFieldEm = props => {
    return (
        <div className="profile field">
            <input
                className="profile email-text"
                placeholder="Enter your Email ..."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
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
        <div className="profile field">
            <input
                className="profile username-text"
                placeholder="Enter your Username ..."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldUn.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

const FormFieldPw = props => {
    return (
        <div className="profile field">
            <input
                type="password"
                className="profile password-text"
                placeholder="********"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};


FormFieldPw.propTypes = {
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
    const [password, setPassword] = useState(null);

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

    let content;
    let addEditButton = "";
    let edit;

    edit = (

        <BaseContainer>
            <div className="profile title">NB</div>

            <div className="profile burger1"></div>
            <div className="profile burger2"></div>
            <div className="profile burger3"></div>

            <div className="register login-text">Edit Profile</div>

            <div className="register firstName-title">First Name</div>
            <div className="register firstName-field"></div>

            <FormFieldFn
                value={firstName}
                onChange={un => setFirstName(un)}
            />

            <div className="register lastName-title">Last Name</div>
            <div className="register lastName-field"></div>

            <FormFieldLn
                value={lastName}
                onChange={n => setLastName(n)}
            />

            <div className="register email-title">Email</div>
            <div className="register email-field"></div>

            <FormFieldEm
                value={email}
                onChange={n => setEmail(n)}
            />

            <div className="register username-title">Username</div>
            <div className="register username-field"></div>

            <FormFieldUn
                value={username}
                onChange={un => setUsername(un)}
            />

            <div className="register password-title">Password</div>
            <div className="register password-field"></div>
            <FormFieldPw
                value={password}
                onChange={n => setPassword(n)}
            />


            <Button
                className="register createButton"
                onClick={() => [setEditButton(false), doUpdate()]}
            >
                Submit
            </Button>

        </BaseContainer>)







    addEditButton = (
            <Button
                className="register createButton"
                // open edit window
                onClick={() => setEditButton(true)}
            >
                Edit
            </Button>
    );



    if (user) {
        content = (
            <BaseContainer>
                <div className="profile title">NB</div>

                <div className="profile burger1"></div>
                <div className="profile burger2"></div>
                <div className="profile burger3"></div>

                <div className="profile login-text">Profile</div>

                <div className="profile firstName-title">First Name</div>
                <div className="profile firstName-field"></div>

                <FormFieldFn
                    value={user.firstName}
                    onChange={un => setFirstName(un)}
                />

                <div className="profile lastName-title">Last Name</div>
                <div className="profile lastName-field"></div>

                <FormFieldLn
                    value={user.lastName}
                    onChange={n => setLastName(n)}
                />

                <div className="profile email-title">Email</div>
                <div className="profile email-field"></div>

                <FormFieldEm
                    value={user.email}
                    onChange={n => setEmail(n)}
                />

                <div className="profile username-title">Username</div>
                <div className="profile username-field"></div>

                <FormFieldUn
                    value={user.username}
                    onChange={un => setUsername(un)}
                />

                <div className="profile password-title">Password</div>
                <div className="profile password-field"></div>
                <FormFieldPw
                    value={password}
                    onChange={n => setPassword(n)}
                />
                {addEditButton}

            </BaseContainer>

        );
    }

    document.body.style = 'background: #4757FF;';

    return (
            <BaseContainer>
                {editButton ? edit : content}
            </BaseContainer>
    );
}

export default Profile;