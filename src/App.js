import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Maps from './pages/Maps';
import Footer from './components/Footer';
import '@material-tailwind/react/tailwind.css';

function App() {
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route exact path="/settings">
                        <Settings />
                    </Route>
                    <Route exact path="/tables">
                        <Tables />
                    </Route>
                    <Route exact path="/maps">
                        <Maps />
                    </Route>
                    <Redirect from="*" to="/dashboard" />
                </Switch>
                <Footer />
            </div>
        </>
    );
}

export default App;
