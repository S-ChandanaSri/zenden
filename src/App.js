import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Listing from './components/Listing';
import Listings from './components/Listings';
import Steps from './components/Steps';
import Imagesstep from './components/Imagesstep';
import Edit from './components/Edit';
import Slider from './components/Slider';
import Payment from './components/Payment';
import Place from './components/Place';






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
            <Route path='/images' element={<Imagesstep />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/slider' element={<Slider />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/place' element={<Place />} />





          </Routes>
        </Router>
      </div>
  );
}

export default App;
