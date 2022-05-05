import logo from './logo.svg';
import './App.css';

import React from 'react';
import { Routes,Route,BrowserRouter,Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

import CreateWork from './components/work/create-work';
import EditWork from './components/work/edit-work';
import ListWork from './components/work/list-work';

function App() {
  return (
    <BrowserRouter>
        <Nav/>
        
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />

            <Route path="/create-work" element={<CreateWork/>} />
            <Route path="/edit-work/:workID" element={<EditWork/>} />
            <Route path="/list-work" element={<ListWork/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
