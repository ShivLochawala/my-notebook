import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './contexts/notes/NoteState';
import AddNote from './components/AddNote';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

function App() {
  
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavBar />
          <Alert/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/add-note" element={<AddNote />} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<SignUp/>} />
              <Route exact path="/profile" element={<Profile/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
