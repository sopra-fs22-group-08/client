import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/LandingPage.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const LandingPage = props => {
  const history = useHistory();


  const goToLogin = async () => {
      history.push(`/login`);
  };
  const goToRegister = async () => {
    history.push(`/register`);
  };

  return (
    <BaseContainer>
      <div className="landingPage title"> No Brainer</div>
      <div className="landingPage container">
        <Button className="landingPage loginButton-container"
              onClick={() => goToLogin()}
          >
          Login
          </Button>
        <Button className="landingPage registerButton-container"
                onClick={() => goToRegister()}
        >
          Register
        </Button>
        <div className="landingPage text-title">
          Remembering things
          just became much easier.
        </div>
        <div className="landingPage text-text">
          It's a lot more efficient than traditional study methods, you can either greatly decrease your time spent studying, or greatly increase the amount you learn.
        </div>
        <Button className="landingPage getStartedButton-container"
                onClick={() => goToRegister()}
        >
          Get Started
        </Button>

        <div className="landingPage text1-title">
          Anything
        </div>
        <div className="landingPage text1-text">
          From images to audio, video  and LaTeX we got you covered.
        </div>
        <div className="landingPage text2-title">
          Anywhere
        </div>
        <div className="landingPage text2-text">
          Finde us on any device with a web browser.
        </div>
        <div className="landingPage text3-title">
          Efficiently
        </div>
        <div className="landingPage text3-text">
          Only practice the material that you're about to forget.
        </div>

        <div className="landingPage card-left">
        </div>
        <div className="landingPage card-right">
        </div>

        <div className="landingPage card">
        </div>
        <div className="landingPage card-text">
          What is the difference between a long call and a long put option?
        </div>
        <div className="landingPage card-title">
          Asset Pricing
        </div>
        <div className="landingPage card-number">
          1 / 76
        </div>
        <div className="landingPage card-action">
          Click to Flip
        </div>



      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default LandingPage;
