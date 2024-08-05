import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Home from './components/Home';
import Aboutus from './components/Aboutus';


function App() {
  return (
    <div className="App">
       <Router>
       <Routes>
        <Route path='/home' element={< Home />} />
        <Route path='/about' element={< Aboutus />} />
       </Routes>

       </Router>
    </div>
  );
}

export default App;
