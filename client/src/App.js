import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Show from './components/Show';
import Home from './components/Home';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path='/user' exact element={<Show />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;