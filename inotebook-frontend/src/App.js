import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


function App() {
  return (
    <>
    <Router>
        <div className="App">
          <Navbar />
          <NoteState>
          <div className="container my-5">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
          </NoteState>
        </div>
    </Router>
    </>
  );
}

export default App;
