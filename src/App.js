import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Listing from './components/Listing';
import Listings from './components/Listings';
import Steps from './components/Steps';


function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<Aboutus />} />
            <Route path='/propertylisting' element={<Listing />} />
            <Route path='/listing' element={<Listings />} />
            <Route path='/steps' element={<Steps />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
