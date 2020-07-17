import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import ContactListPage from './pages/ContactListPage/ContactListPage';
import PrivateRoute from './routes/private.route';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <PrivateRoute exact path='/contacts' component={ContactListPage} />
          <Route exact path='/'>
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
