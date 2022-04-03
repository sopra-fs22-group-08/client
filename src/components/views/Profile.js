import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {useHistory, useLocation} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";


const Profile = (props) => {
    // use react-router-dom's hook to access the history
    //const history = useHistory();
    const location = useLocation();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [user, setUser] = useState(null);


    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userId = location.pathname.match(/\d+$/);
                const response = await api.get('/users/' + userId);

                await new Promise(resolve => setTimeout(resolve, 1000));

                setUser(response.data)


            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);

    let content = <Spinner/>;

    if (user) {
        content = (
                <div className="profile">
                    <div>Username:</div>
                    <div>{user.username}</div>
                    <div>--------------------------- </div>
                    <div>Status:</div>
                    <div>{user.status}</div>
                    <div>--------------------------- </div>
                    <div>Email:</div>
                    <div>{user.email}</div>
                    <div>--------------------------- </div>
                </div>
        );
    }

    return (
            <BaseContainer className="profile container">
                <h2>Happy Coding!</h2>
                <p className="profile paragraph">
                    Profile:
                    {content}
                </p>

            </BaseContainer>
    );
}

export default Profile;