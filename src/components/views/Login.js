import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';
import { api, handleError } from '../../helpers/api';
import User from '../../models/User';

const FormFieldUn = (props) => {
    return (
        <div className='login field'>
            <input
                className='login username-text'
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
        <div className='login field'>
            <input
                type='password'
                className='login password-text'
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

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const doLogin = async () => {
        try {
            const requestBody = JSON.stringify({ username, password });
            const response = await api.post('/login', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);

            // Store userID into the local storage.
            localStorage.setItem('userId', user.id);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/home/` + user.id);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    const goToLandingPage = () => {
        history.push('/');
    }

    document.body.style = 'background: #4757FF';
    return (
        <BaseContainer>
            <div className='login title' onClick={()=>goToLandingPage()}>No Brainer</div>
            <div className='login login-text'>Login</div>
            <div className='login username-title'>Username</div>
            <div className='login username-field'/>
            <FormFieldUn value={username} onChange={(un) => setUsername(un)} />
            <div className='login password-title'>Password</div>
            <div className='login password-field'/>
            <FormFieldPw value={password} onChange={(n) => setPassword(n)} />
            <Button
                className='login loginButton'
                disabled={!username || !password}
                onClick={() => doLogin()}
            >
                Login
            </Button>
        </BaseContainer>
    );
};

export default Login;