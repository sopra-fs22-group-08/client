import AppRouter from 'components/routing/routers/AppRouter';
import { PopupProvider } from 'react-hook-popup';

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
    return (
        <div>
            <PopupProvider>
                <AppRouter />
            </PopupProvider>
        </div>
    );
};

export default App;