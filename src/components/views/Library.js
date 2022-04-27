import 'styles/views/Home.scss';
// react imports
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// local imports
import { api, handleError } from 'helpers/api';
import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import Header from 'components/ui/Header';

const Library = () => {
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [allDecks, setAllDecks] = useState(null);

    // TODO: remove userData, doesn't do anything, when connecting it is still empty
    const [userData, setUserData] = useState({
        from: '',
        connected: false,
    });

    const cardOverview = () => {
        history.push('/cardOverview');
    };


    useEffect(() => {

        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                const responseUser = await api.get('/users/' + userId);
                const responseDecks = await api.get('/decks');
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setUser(responseUser.data);
                setAllDecks(responseDecks.data);

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


    if (user) {
        var listItems = <div className='Home deck-None'>Please create a new Deck</div>;
        if (allDecks) {
            listItems = allDecks.map((d) => (
                <Button
                    className='Home listElement-Box'
                    onClick={() => {
                        cardOverview();
                        localStorage.setItem('DeckID', d.id);
                    }}
                >
                    <div className='Home listElement-Number'/>
                    <div className='Home listElement-Title'>{d.deckname}</div>
                    <div className='Home listElement-Score'>
                        <br /> <br />{' '}
                    </div>
                    <div className='Home listElement-Text'>Click to ADD</div>
                </Button>
            ));
        }

    }

    document.body.style = 'background: #4757FF';

    return (
        <BaseContainer>
            <Header/>
            <div className='Home listTitle'>Public Decks</div>
            <div className='Home list'>{listItems}</div>
        </BaseContainer>
    );
};

export default Library;