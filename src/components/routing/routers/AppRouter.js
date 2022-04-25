import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GeneralGuard} from "components/routing/routeProtectors/GeneralGuard";
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
import LearningToolResult from "../../views/LearningToolResult";
import CardOverview from "../../views/CardOverview";

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
                <Route path='/home'>
                    <GeneralGuard>
                        <Home />
                    </GeneralGuard>
                </Route>
                <Route path='/deckcreator'>
                    <GeneralGuard>
                        <DeckCreator />
                    </GeneralGuard>
                </Route>
                <Route path='/cardcreator'>
                    <GeneralGuard>
                        <CardCreator />
                    </GeneralGuard>
                </Route>
                <Route path="/cardOverview">
                    <GeneralGuard>
                        <CardOverview/>
                    </GeneralGuard>
                </Route>
                <Route path="/learningtool">
                    <GeneralGuard>
                        <LearningTool />
                    </GeneralGuard>
                </Route>
                <Route path="/learningtoolresult">
                    <GeneralGuard>
                        <LearningToolResult/>
                    </GeneralGuard>
                </Route>
                <Route path="/profile">
                    <ProfileGuard>
                        <Profile />
                    </ProfileGuard>
                </Route>
                <Route exact path='/Register'>
                    <LoginGuard>
                        <Register />
                    </LoginGuard>
                </Route>
                <Route exact path='/login'>
                    <LoginGuard>
                        <Login />
                    </LoginGuard>
                </Route>
                <Route exact path='/'>
                    <LandingPage />
                </Route>
                <Route path='/publicdecks'>
                    <GeneralGuard>
                        <PublicDecks />
                    </GeneralGuard>
                </Route>
                <Route path='/inspectdeck'>
                    <GeneralGuard>
                        <InspectDeck />
                    </GeneralGuard>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;