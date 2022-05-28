import 'styles/ui/Header.scss';
import BaseContainer from './BaseContainer';
import { useHistory} from 'react-router-dom';
import { api, handleError } from '../../helpers/api';
import { useEffect, useState } from 'react';
import { Button } from './Button';

const Header = () => {
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [burgerMenu, setBurgerMenu] = useState(false);

    const logout = () => {
        const setUserOffline = async () => {
            const firstName = user.firstName;
            const lastName = user.lastName;
            const username = user.username;
            const email = user.email;
            const status = 'OFFLINE';
            const requestBody = JSON.stringify({ firstName, lastName, username, email, status });
            await api.put('/logout', requestBody);
        };
        setUserOffline();
        sessionStorage.clear();
        history.push('/login');
    };

    const toProfile = (userId) => {
        let url = '/profile/';
        history.push(url.concat(userId));
    };

    const goHome = async () => {
        const id = sessionStorage.getItem('userId');
        history.push(`/home/` + id);
    };

    const goPublicDecks = async () => {
        history.push('/library');
    };

    const goCreator = async () => {
        history.push(`/deckcreator`);
    };

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userId = sessionStorage.getItem('userId');
                const responseUser = await api.get('/users/' + userId);
                setUser(responseUser.data);
            } catch (error) {
                console.error(
                    `Something went wrong while fetching the Data: \n${handleError(error)}`
                );
                console.error('Details:', error);
                alert('Something went wrong while fetching the Data! See the console for details.');
            }
        }
        fetchData();
    }, []);

    let userId = parseInt(sessionStorage.getItem('userId'));
    let content;

    let burgerMenuContent = (
        <BaseContainer>
            <Button className='burgerMenu title' onClick={() => goHome()}>
                NB
            </Button>

            <div className='burgerMenu window'>
                <Button className='burgerMenu username' onClick={() => toProfile(userId)}>
                    {user?.username ? user.username : 'Username'}
                </Button>
                <Button
                    className='burgerMenu home'
                    onClick={() => {
                        setBurgerMenu(false);
                        goHome();
                    }}
                >
                    Home
                </Button>
                <Button className='burgerMenu public-decks' onClick={() => goPublicDecks()}>
                    Library
                </Button>
                <Button className='burgerMenu creator' onClick={() => goCreator()}>
                    Creator
                </Button>
                <Button className='burgerMenu logoutButton' onClick={() => logout()}>
                    Logout
                </Button>
                <div className='burgerMenu x' onClick={() => setBurgerMenu(false)}>
                    x
                </div>
            </div>
        </BaseContainer>
    );

    if (user) {
        content = (
            <BaseContainer>
                <Button className='burgerMenu title' onClick={() => goHome()}>
                    NB
                </Button>

                <div className='burgerMenu burger-position' onClick={() => setBurgerMenu(true)}>
                    <div className='burgerMenu burger1' />
                    <div className='burgerMenu burger2' />
                    <div className='burgerMenu burger3' />
                </div>
            </BaseContainer>
        );
    }

    return <BaseContainer>{burgerMenu ? burgerMenuContent : content}</BaseContainer>;
};

export default Header;