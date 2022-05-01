import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import 'styles/views/LearningTool.scss';
import Header from "../ui/Header";

const LearningToolResult = () => {

    const history = useHistory();
    const location = useLocation();
    const userId = localStorage.getItem("userId");

    let count = localStorage.getItem('result');
    //TODO: Find other way to set it 0
    //localStorage.setItem('result', 0);

    const lengthDeck = localStorage.getItem('lengthDeck');


    document.body.style = 'background: #FFCA00;';

    return (
        <BaseContainer>
            <div className='learningTool resPage-Title'>Result</div>

            <div className='learningTool resPage-Text'>
                You had {count} out of {lengthDeck} correct
                <div>
                    <button onClick={()=>{
                        history.push("/home/"+ userId);
                        localStorage.setItem('result', 0);
                    }} className = {"learningTool back-button"}>
                        Go Back
                    </button>
                </div>
            </div>
        </BaseContainer>
    );
};

export default LearningToolResult;