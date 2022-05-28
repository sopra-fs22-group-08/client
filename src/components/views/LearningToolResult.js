import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/LearningTool.scss';
import { Button } from 'components/ui/Button';

const LearningToolResult = () => {
    const history = useHistory();
    const userId = sessionStorage.getItem('userId');

    let count = sessionStorage.getItem('result');
    //TODO: Find other way to set it 0
    //sessionStorage.setItem('result', 0);

    const lengthDeck = sessionStorage.getItem('lengthDeck');

    const goHomeButton = (
        <Button
            onClick={() => {
                /**
                 * NOTE: the duelId cannot be cleared out, since it causes 400 errors,
                 * as there is an async fetch to it in the background
                 */
                sessionStorage.removeItem('result');
                sessionStorage.removeItem('lengthDeck');
                sessionStorage.removeItem('deckId');
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
                You had {count} out of {lengthDeck} correct
            </div>
            {goHomeButton}
        </BaseContainer>
    );
};

export default LearningToolResult;