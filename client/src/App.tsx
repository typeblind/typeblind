import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'wouter';
import HomePage from './components/pages/Home/HomePage';

function App() {
  
  return (
    <>
      <Switch>
        <Route path="/" component={() => <HomePage />} >  </Route>
        <Route path="/:rest*">
          <Redirect to={'/'} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
