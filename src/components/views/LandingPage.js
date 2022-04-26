import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/LandingPage.scss';
import BaseContainer from 'components/ui/BaseContainer';

const LandingPage = (props) => {
    const history = useHistory();

    const goToLogin = async () => {
        history.push(`/login`);
    };
    const goToRegister = async () => {
        history.push(`/register`);
    };

    document.body.style = 'background: #FFFFFF;';

    return (
        <BaseContainer>
            <div className='landingPage title'> No Brainer</div>
            <div className='landingPage container'>
                <Button className='landingPage loginButton-container' onClick={() => goToLogin()}>
                    Login
                </Button>
                <Button
                    className='landingPage registerButton-container'
                    onClick={() => goToRegister()}
                >
                    Register
                </Button>
                <div className='landingPage text-title'>
                    Remembering things just became much easier.
                </div>
                <div className='landingPage text-text'>
                    It's a lot more efficient than traditional study methods, you can either greatly
                    decrease your time spent studying, or greatly increase the amount you learn.
                </div>
                <Button
                    className='landingPage getStartedButton-container'
                    onClick={() => goToRegister()}
                >
                    Get Started
                </Button>

                <div className='landingPage text1-title'>Anywhere</div>
                <div className='landingPage text1-text'>
                    Find us in a web browser, wherever you are.
                </div>
                <div className='landingPage text2-title'>Simplicity</div>
                <div className='landingPage text2-text'>
                    Easy to use, easy to learn.
                </div>
                <div className='landingPage text3-title'>Efficiently</div>
                <div className='landingPage text3-text'>
                    Only practice the decks that you're about to forget.
                </div>

                <div className='landingPage card-left'/>
                <div className='landingPage card-right'/>

                <div className='landingPage card'/>
                <div className='landingPage card-text'>
                    What is the difference between a long call and a long put option?
                </div>
                <div className='landingPage card-title'>Asset Pricing</div>
                <div className='landingPage card-number'>1 / 76</div>
                <div className='landingPage card-action'>Click to Flip</div>
            </div>
        </BaseContainer>
    );
};

export default LandingPage;