import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Router, Route} from 'react-router-dom'
import history from './history'

import Header from './Components/Header'
import PlayerSetup from './Components/PlayerSetup';
import Tournament from './Components/TournamentView/'
import ResultsPage from './Components/ResultsView/'

function App() {
  
  return(
  
    <Router history={history}>
      
      <Header />

      <Route exact path='/' component={PlayerSetup} />

      <Route path='/tournament' component={Tournament} />

      <Route exact path='/results' component={ResultsPage}/> 

    </Router>

  )

};

export default App;
