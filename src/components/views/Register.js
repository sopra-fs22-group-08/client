import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const FormFieldFn = props => {
  return (
      <div className="register field">
        <input
            className="register firstName-text"
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
      <div className="register field">
        <input
            className="register lastName-text"
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
      <div className="register field">
        <input
            className="register email-text"
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
      <div className="register field">
        <input
            className="register username-text"
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
      <div className="register field">
        <input
            type="password"
            className="register password-text"
            placeholder="Enter your Password ..."
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

const Register = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({username, firstName, lastName, email, password});
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);

      // Store userID and username into the local storage.
      localStorage.setItem('userId', user.id);
      // localStorage.setItem('username', user.username);

      // Register successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/home/` + user.id);
    } catch (error) {
      alert(`Something went wrong during the Registration: \n${handleError(error)}`);
    }
  };

  document.body.style = 'background: #4757FF;';

  return (

    <BaseContainer>
      <div className="register title">No Brainer</div>
      <div className="register login-text">Create New Account</div>

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
          disabled={!firstName || !lastName || !email || !username || !password}
          onClick={() => doRegister()}
      >
        Create
      </Button>

    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Register;
