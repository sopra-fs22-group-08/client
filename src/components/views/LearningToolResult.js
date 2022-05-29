import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/LearningTool.scss';
import { Button } from 'components/ui/Button';

const LearningToolResult = () => {
    const history = useHistory();
    const userId = sessionStorage.getItem('userId');

    const goHomeButton = (
        <Button
            onClick={() => {
                sessionStorage.removeItem('result');
                sessionStorage.removeItem('lengthDeck');
                sessionStorage.removeItem('deckId');
                sessionStorage.removeItem('result');
                history.push('/home/' + userId);
            }}
            className='learningTool back-button'
        >
            Go to Home
        </Button>
    );
    document.body.style = 'background: #FFCA00;';

    return (
        <BaseContainer>
            <div className='learningTool resPage-Title'>Result</div>

            <div className='learningTool resPage-Text'>
                You had {sessionStorage.getItem('result')} out of {sessionStorage.getItem('lengthDeck')} correct
            </div>
            {goHomeButton}
        </BaseContainer>
    );
};

export default LearningToolResult;