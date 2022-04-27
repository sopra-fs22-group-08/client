import 'styles/views/Home.scss';
// react imports
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// local imports
import { api, handleError } from 'helpers/api';
import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import Header from 'components/ui/Header';

const Home = () => {
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [decks, setDecks] = useState(null);
    const [invitations, setInvitations] = useState(null);

    // TODO: remove userData, doesn't do anything, when connecting it is still empty
    const [userData, setUserData] = useState({
        from: '',
        connected: false,
    });

    const cardOverview = () => {
        history.push('/cardOverview');
    };

    /*
    * Every interval time: check if the logged in player has any invites and fetch them
    * */
    const checkInvites = async () =>{
        try{

            //fetch invitations for the logged in-user from backend
            const id = localStorage.getItem("userId");
            const responseBody = await api.get("/users/" + id + "/invitations");
            setInvitations(responseBody.data);
            //console.log(responseBody.data);

        }catch (error){
            alert(error);
            console.log(error);
        }

    }

    useEffect(() => {

        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                console.log(userId);
                const responseUser = await api.get('/users/' + userId);
                const responseDecks = await api.get('/users/' + userId + '/decks');
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setUser(responseUser.data);
                setDecks(responseDecks.data);

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

        /*
        * set Interval to which we fetch the invitations:
        **/
        const interval = setInterval(() => {
            checkInvites();
        }, 5000);

        fetchData();
        return () => clearInterval(interval);
    }, []);

    if (user) {
        var listItems = <div className='Home deck-None'>Please create a new Deck</div>;
        if (decks) {
            listItems = decks.map((d) => (
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
                    <div className='Home listElement-Text'>Click to Learn</div>
                </Button>
            ));
        }

        var listInvites = <div className='Home deck-None'>Please create a new Deck</div>;
        if (invitations) {
            listInvites = invitations.map((i) => (

                    <div className='Home invitations-Field'>
                        //TODO add User Name, Add Deck Name
                    <div className='Home invitations-text'>Person 1 wants to conquer you on BWL 3</div>
                    <Button
                        className='Home invitations-Accept'
                        onClick={() => {
                            //TODO send Accept
                            cardOverview();
                        }}
                    >Accept</Button>
                    <Button
                        className='Home invitations-Decline'
                        onClick={() => {
                            //TODO send Decline
                            cardOverview();
                        }}
                    >X</Button>
                    </div>


            ));
        }


    }

    document.body.style = 'background: #4757FF';

    return (
        <BaseContainer>
            <Header/>
            <div className='Home listTitle'>Continue Learning</div>
            <div className='Home list'>{listItems}</div>
            <div className='Home invitations-title'>Invitations</div>
            <div className='Home invitations-list'>{listInvites}</div>
        </BaseContainer>
    );
};

export default Home;