import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';


const FormFieldFn = (props) => {
    return (
        <div className='register field'>
            <input
                className='register firstName-text'
                placeholder='Enter your First Name ...'
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

const FormFieldLn = (props) => {
    return (
        <div className='register field'>
            <input
                className='register lastName-text'
                placeholder='Enter your Last Name ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldLn.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const FormFieldEm = (props) => {
    return (
        <div className='register field'>
            <input
                className='register email-text'
                placeholder='Enter your Email ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldEm.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const FormFieldUn = (props) => {
    return (
        <div className='register field'>
            <input
                className='register username-text'
                placeholder='Enter your Username ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldUn.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const FormFieldPw = (props) => {
    return (
        <div className='register field'>
            <input
                type='password'
                className='register password-text'
                placeholder='Enter your Password ...'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldPw.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const Register = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    const checkEmail = (email) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(email) === false) {
            return false;
        }
        return true;
    }

    const doRegister = async () => {
        try {
            if (!checkEmail(email)) {
                alert("please enter a valid email");
                return;
            }

            setIsRegistered(true);

            const requestBody = JSON.stringify({username, firstName, lastName, email, password});
            const response = await api.post('/users', requestBody);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);

            // Store userID and username into the local storage.
            localStorage.setItem('userId', user.id);
            localStorage.setItem('username', user.username);

            // Register successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/home/` + user.id);
        } catch (error) {
            setIsRegistered(false);
            alert(`Something went wrong during the Registration: \n${handleError(error)}`);
        }
    };

    const goToLandingPage = () => {
        history.push('/');
    }
    document.body.style = 'background: #4757FF;';
    return (
        <BaseContainer>
            <div className='register title' onClick={() => goToLandingPage()}>No Brainer</div>
            <div className='register login-text'>Create New Account</div>

            <div className='register firstName-title'>First Name</div>
            <div className='register firstName-field'/>

            <FormFieldFn value={firstName} onChange={(un) => setFirstName(un)}/>

            <div className='register lastName-title'>Last Name</div>
            <div className='register lastName-field'/>

            <FormFieldLn value={lastName} onChange={(n) => setLastName(n)}/>

            <div className='register email-title'>Email</div>
            <div className='register email-field'/>

            <FormFieldEm value={email} onChange={(n) => setEmail(n)}/>

            <div className='register username-title'>Username</div>
            <div className='register username-field'/>

            <FormFieldUn value={username} onChange={(un) => setUsername(un)}/>

            <div className='register password-title'>Password</div>
            <div className='register password-field'/>
            <FormFieldPw value={password} onChange={(n) => setPassword(n)}/>

            <Button
                className='register createButton'
                disabled={!firstName || !lastName || !email || !username || !password || isRegistered}
                onClick={() => doRegister()}
            >
                Create
            </Button>
        </BaseContainer>
    );
};

export default Register;