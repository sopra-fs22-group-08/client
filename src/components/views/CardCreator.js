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


const FormFieldLn = props => {
  return (
      <div className="card field">
        <input
            className="card question-text"
            placeholder="Enter the Question ..."
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
      <div className="card field">
        <input
            className="card answer-text"
            placeholder="Enter the Answer ..."
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

const FormFieldFn = props => {
    return (
            <div className="card field">
                <input
                        className="card wrongAnswer-text"
                        placeholder="Enter a wrong Answer ..."
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
const FormFieldUn = props => {
    return (
            <div className="card field">
                <input
                        className="card wrongAnswer-text"
                        placeholder="Enter a wrong Answer ..."
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
            <div className="card field">
                <input
                        className="card wrongAnswer-text"
                        placeholder="Enter a wrong Answer ..."
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


const CardCreator = () => {
  const history = useHistory();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [wrongAnswer1, setWrongAnswer1] = useState(null);
  const [wrongAnswer2, setWrongAnswer2] = useState(null);
  const [wrongAnswer3, setWrongAnswer3] = useState(null);
  const options = [answer, wrongAnswer1, wrongAnswer2, wrongAnswer3];

  const doCardCreator = async () => {
    try {
      const deckId = localStorage.getItem('deckId');
      const requestBodyCard = JSON.stringify({question, answer, options});
      const responseCard = await api.post('/decks/' + deckId +'/cards', requestBodyCard);

      // DeckCreator successfully worked --> navigate to the route /home in the GameRouter
      history.push(`/home/` + 1);
      history.push(`/cardcreator`);
    } catch (error) {
      alert(`Something went wrong during the Creation: \n${handleError(error)}`);
    }
  };


  document.body.style = 'background: #4757FF;';

  return (

    <BaseContainer>
      <div className="carddeck title">No Brainer</div>
      <div className="carddeck login-text">Create New Card</div>


      <div className="card frontText-title">Front Text</div>
      <div className="card frontText-field"></div>

      <FormFieldLn
          value={question}
          onChange={n => setQuestion(n)}
      />

      <div className="card backText-title">Back Text</div>
      <div className="card backText-field"></div>

      <FormFieldEm
          value={answer}
          onChange={n => setAnswer(n)}
      />


        <div className="card wrongAnswer-title">Wrong Answer 1</div>
        <div className="card wrongAnswer-field"></div>

        <FormFieldFn
                value={wrongAnswer1}
                onChange={n => setWrongAnswer1(n)}
        />

        <div className="card wrongAnswer-title">Wrong Answer 2</div>
        <div className="card wrongAnswer-field"></div>

        <FormFieldUn
                value={wrongAnswer2}
                onChange={n => setWrongAnswer2(n)}
        />

        <div className="card wrongAnswer-title">Wrong Answer 3</div>
        <div className="card wrongAnswer-field"></div>

        <FormFieldPw
                value={wrongAnswer3}
                onChange={n => setWrongAnswer3(n)}
        />





      <Button
              className="card addCardButton"
              disabled={question || answer || wrongAnswer1 || wrongAnswer2 || wrongAnswer3}
              onClick={() => history.push(`/home/` + 1)}
      >
          End
      </Button>
      <Button
          className="cardDeck createButton"
          disabled={!question || !answer || !wrongAnswer1 || !wrongAnswer2 || !wrongAnswer3}
          onClick={() => doCardCreator()}
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
export default CardCreator;
