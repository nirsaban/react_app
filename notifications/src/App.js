import React from 'react';
import { Switch, Route} from 'react-router-dom';
import HomePage from './pages/home/home.page';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {

  return (
    <div>
      <Switch>
        <Route
             exact
              path='/'
              render={() => <HomePage />
          }
        />
      </Switch>
    </div>
  );


}
export default App