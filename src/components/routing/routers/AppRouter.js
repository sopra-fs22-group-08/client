import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import Profile from "components/views/Profile";
import {ProfileGuard} from "components/routing/routeProtectors/ProfileGuard";
import Register from "components/views/Register";
import LandingPage from "../../views/LandingPage";
import Home from "../../views/Home";
import DeckCreator from "../../views/DeckCreator";
import CardCreator from "../../views/CardCreator";
import PublicDecks from "../../views/PublicDecks";
import InspectDeck from "../../views/InspectDeck";
import LearningTool from "../../views/LearningTool";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/game">
                    <GameGuard>
                        <GameRouter base="/game"/>
                    </GameGuard>
                </Route>

                <Route path="/home">
                    <GameGuard>
                        <Home/>
                    </GameGuard>
                </Route>
                <Route path="/deckcreator">
                    <GameGuard>
                        <DeckCreator/>
                    </GameGuard>
                </Route>
                <Route path="/cardcreator">
                    <GameGuard>
                        <CardCreator/>
                    </GameGuard>
                </Route>
                <Route path="/learningtool">
                    <GameGuard>
                        <LearningTool/>
                    </GameGuard>
                </Route>
                <Route path="/profile">
                    <ProfileGuard>
                        <Profile/>
                    </ProfileGuard>
                </Route>
                <Route exact path="/Register">
                    <LoginGuard>
                        <Register/>
                    </LoginGuard>
                </Route>
                <Route exact path="/login">
                    <LoginGuard>
                        <Login/>
                    </LoginGuard>
                </Route>
                <Route exact path="/">
                    <LandingPage/>
                </Route>
                <Route path="/publicdecks">
                        <PublicDecks/>
                </Route>
                <Route path="/inspectdeck">
                    <InspectDeck/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
