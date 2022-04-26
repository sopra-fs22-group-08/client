import 'styles/ui/Header.scss';
import BaseContainer from "./BaseContainer";
import {useHistory, useLocation} from "react-router-dom";
import {api, handleError} from "../../helpers/api";
import {useEffect, useState} from "react";
import {Button} from "./Button";


const Header = () => {
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [burgerMenu, setBurgerMenu] = useState(false);


    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    const toProfile = (userId) => {
        let url = '/profile/';
        history.push(url.concat(userId));
    };

    const goHome = async () => {
        const id = localStorage.getItem('userId');
        history.push(`/home/` + id);
    };

    const goPublicDecks = async () => {
        history.push(`/publicdecks`);
    };

    const goCreator = async () => {
        history.push(`/deckcreator`);
    };

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                const responseUser = await api.get('/users/' + userId);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setUser(responseUser.data);

            } catch (error) {
                console.error(
                    `Something went wrong while fetching the Data: \n${handleError(error)}`
                );
                console.error('Details:', error);
                alert(
                    'Something went wrong while fetching the Data! See the console for details.'
                );
            }
        }
        fetchData();
    }, []);

    let content;

    let burgerMenuContent = (
        <BaseContainer>
            <div className='Home title'>NB</div>
            <div className='Home window'/>
            <Button
                className='Home username'
                onClick={() => toProfile(localStorage.getItem('userId'))}
            >
                {user?.username ? user.username : 'Username'}
            </Button>
            <Button
                className='Home home'
                onClick={() => {
                    setBurgerMenu(false);
                    goHome();
                }}
            >
                Home
            </Button>
            <Button className='Home public-decks' onClick={() => goPublicDecks()}>
                Public Decks
            </Button>
            <Button className='Home creator' onClick={() => goCreator()}>
                Creator
            </Button>
            <Button className='Home logoutButton' onClick={() => logout()}>
                Logout
            </Button>
            <div className='Home x' onClick={() => setBurgerMenu(false)}>
                x
            </div>
        </BaseContainer>
    );

    if (user) {
        content = (
            <BaseContainer>
                <div className='Home title'>NB</div>
                <div className='Home burger1'/>
                <div className='Home burger2'/>
                <div className='Home burger3'/>
                <div
                    className='Home burgerButton'
                    onClick={() => setBurgerMenu(true)}
                />
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            {burgerMenu ? burgerMenuContent : content}
        </BaseContainer>
    );
};

export default Header;