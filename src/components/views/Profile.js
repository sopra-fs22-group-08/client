import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/Profile.scss';
import PropTypes from 'prop-types';
import {Button} from 'components/ui/Button';
import Header from '../ui/Header';
import User from "../../models/User";

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
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [editButton, setEditButton] = useState(false);
    const [status, setStatus] = useState('ONLINE');

    const doUpdate = async () => {
        const id = localStorage.getItem('userId');

        const requestBody = JSON.stringify({firstName, lastName, username, status});
        const response = await api.put('/users/' + id, requestBody);

        window.location.reload(true);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = location.pathname.match(/\d+$/);
                const response = await api.get('/users/' + userId);

                //new Promise((resolve) => setTimeout(resolve, 1000));

                setUser(response.data);
            } catch (error) {
                console.error(
                    `Something went wrong while fetching the users: \n${handleError(error)}`
                );
                console.error('Details:', error);
                alert(
                    'Something went wrong while fetching the users! See the console for details.'
                );
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData2() {
            setUsername(user.username);
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
        fetchData2();
    }, [user]);

    let content;
    let edit;

    edit = (
        <BaseContainer>
            <div className='profile login-text'>Edit Profile</div>

            <div className='profile username-title'>Username</div>
            <div className='profile username-field'/>
            <FormFieldUn value={username} onChange={(un) => setUsername(un)}/>

            <div className='profile firstName-title'>First Name</div>
            <div className='profile firstName-field'/>
            <FormFieldFn value={firstName} onChange={(un) => setFirstName(un)}/>

            <div className='profile lastName-title'>Last Name</div>
            <div className='profile lastName-field'/>
            <FormFieldLn value={lastName} onChange={(n) => setLastName(n)}/>

            <Button
                className='profile createButton'
                onClick={() => [doUpdate(), setEditButton(false)]}
            >
                Submit
            </Button>
        </BaseContainer>
    );

    if (user) {
        content = (
            <BaseContainer>
                <div className='profile login-text'>Profile</div>

                <div className='profile username-title'>Username</div>
                <div className='profile username-field'/>
                <FormFieldUn value={user.username} onChange={(un) => setUsername(un)}/>

                <div className='profile firstName-title'>First Name</div>
                <div className='profile firstName-field'/>
                <FormFieldFn value={user.firstName} onChange={(un) => setFirstName(un)}/>

                <div className='profile lastName-title'>Last Name</div>
                <div className='profile lastName-field'/>
                <FormFieldLn value={user.lastName} onChange={(n) => setLastName(n)}/>

                <div className='profile email-title'>Email</div>
                <div className='profile email-field'/>
                <FormFieldEm value={user.email} onChange={(n) => setEmail(n)}/>

                <Button
                    className='register createButton'
                    // open edit window
                    onClick={() => setEditButton(true)}
                >
                    Edit
                </Button>
            </BaseContainer>
        );
    }

    document.body.style = 'background: #4757FF;';

    return (
        <BaseContainer>
            {editButton ? edit : content}
            <Header/>
        </BaseContainer>
    );
};

export default Profile;