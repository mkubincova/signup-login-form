import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Success from './components/Success';
import Failure from './components/Failure';
import Welcome from './components/Welcome';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        {/* serve different components based on path */}
        <Route exact path="/" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/success" component={Success} />
        <Route path="/failure" component={Failure} />
        <Route path="/welcome" component={Welcome} />

      </div>
    </BrowserRouter>
  );
}

export default App;
