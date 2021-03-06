import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/Profile.scss';
import PropTypes from 'prop-types';
import { Button } from 'components/ui/Button';
import Header from '../ui/Header';

const FormFieldFn = (props) => {
    return (
        <div className='profile field'>
            <input
                className='profile firstName-text'
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
        <div className='profile field'>
            <input
                className='profile lastName-text'
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
        <div className='profile field'>
            <input
                className='profile email-text'
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
        <div className='profile field'>
            <input
                className='profile username-text'
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
        <div className='profile field'>
            <input
                type='password'
                className='profile password-text'
                placeholder='********'
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

const Profile = () => {
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState(location.state.detail.firstName);
    const [lastName, setLastName] = useState(location.state.detail.lastName);
    const [username, setUsername] = useState(location.state.detail.username);
    const [editButton, setEditButton] = useState(false);
    const [status, setStatus] = useState('ONLINE');

    const doUpdate = async () => {
        try {
            // checkNamesElseSetThem();
            const id = sessionStorage.getItem('userId');
            const requestBody = JSON.stringify({ firstName, lastName, username, status });
            await api.put('/users/' + id, requestBody);
            window.location.reload(true);
        } catch (e) {
            // add popup for error
            alert(handleError(e));
            console.error(handleError(e));
        }
    };

    async function fetchData() {
        try {
            const userId = location.pathname.match(/\d+$/);
            const response = await api.get('/users/' + userId);
            setUser(response.data);
            if (user) {
                setUsername(user.username);
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setStatus(user.status);
            }
        } catch (error) {
            console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
            console.error('Details:', error);
            alert('Something went wrong while fetching the users! See the console for details.');
        }
    }

    useEffect(() => {
        fetchData();
    }, [editButton]);

    let content;
    let edit;

    if (user) {
        content = (
            <BaseContainer>
                <div className='profile login-text'>Profile</div>

                <div className='profile username-title'>Username</div>
                <div className='profile username-field' />
                <FormFieldUn value={user.username} />

                <div className='profile firstName-title'>First Name</div>
                <div className='profile firstName-field' />
                <FormFieldFn value={user.firstName} />

                <div className='profile lastName-title'>Last Name</div>
                <div className='profile lastName-field' />
                <FormFieldLn value={user.lastName} />

                <div className='profile email-title'>Email</div>
                <div className='profile email-field' />
                <FormFieldEm value={user.email} />

                <Button
                    className='profile createButton2'
                    // open edit window
                    onClick={() => setEditButton(true)}
                >
                    Edit
                </Button>
            </BaseContainer>
        );

        edit = (
            <BaseContainer>
                <div className='profile login-text'>Edit Profile</div>

                <div className='profile username-title'>Username</div>
                <div className='profile username-field' />
                <FormFieldUn value={username} onChange={(un) => setUsername(un)} />

                <div className='profile firstName-title'>First Name</div>
                <div className='profile firstName-field' />
                <FormFieldFn value={firstName} onChange={(un) => setFirstName(un)} />

                <div className='profile lastName-title'>Last Name</div>
                <div className='profile lastName-field' />
                <FormFieldLn value={lastName} onChange={(n) => setLastName(n)} />

                <Button
                    className='profile createButton'
                    onClick={() => [doUpdate(), setEditButton(false)]}
                >
                    Submit
                </Button>
            </BaseContainer>
        );
    }

    document.body.style = 'background: #4757FF;';

    return (
        <BaseContainer>
            {editButton ? edit : content}
            <Header />
        </BaseContainer>
    );
};

export default Profile;