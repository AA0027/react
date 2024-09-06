import './App.css';
import './components/Body/Body.css';
import './components/Channel/Channel.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import LoginContextProvider from './contexts/LoginContextProvider'
import LoginForm from './components/Login/LoginForm';


function App() {
  
  return (
    <BrowserRouter>
      <LoginContextProvider>
          <Routes>
            <Route path='/' element={<LoginForm/>}/>
            <Route path="/home" element={<Home/>}/> 
            <Route path="/chat" element={<Chat/>}/>
          </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
