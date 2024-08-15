import './App.css';
import './components/Body/Body.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import MyChannel from './pages/MyChannel';
import LoginContextProvider from './contexts/LoginContextProvider'
import LoginForm from './components/Login/LoginForm';
import SignUp from './pages/SignUp';
function App() {
  return (
    <BrowserRouter>
    <LoginContextProvider>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/join' element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}/> 
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/myChannel" element={<MyChannel/>}/>
      </Routes>
    </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
