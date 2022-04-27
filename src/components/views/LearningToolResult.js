import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/LearningTool.scss';
import Header from "../ui/Header";

const LearningToolResult = () => {

    const history = useHistory();
    const location = useLocation();

    let count = localStorage.getItem('result');
    localStorage.setItem('result', 0);

    const lengthDeck = localStorage.getItem('lengthDeck');


    document.body.style = 'background: #FFCA00;';

    return (
        <BaseContainer>
            <div className='learningTool resPage-Title'>Result</div>

            <div className='learningTool resPage-Text'>
                You had {count} out of {lengthDeck} correct
            </div>
            <Header/>
        </BaseContainer>
    );
};

export default LearningToolResult;