import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
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
          <NoteState>
            <Navbar />
            <Alert />
            <div className="container my-5">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login/>} />
              </Routes>
            </div>
          </NoteState>
        </div>
      </Router>
    </>
  );
}

export default App;
