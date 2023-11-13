import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { AuthContextProvider } from './Context/AuthContext'
import Continuation from './Pages/Register/Continuation';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectRouter from './Components/ProtectRouter';
import CreateBlog from './Pages/CreateBlog/CreateBlog';
import UserPage from './Pages/UserPage/UserPage';
import AboutPage from './Pages/AboutPage/AboutPage';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/continuation' element={<Continuation />} />
          <Route path='/dashboard' element={
            <ProtectRouter>
              <Dashboard />
            </ProtectRouter>
          } />
          <Route path='/create-publi' element={
            <ProtectRouter>
              <CreateBlog />
            </ProtectRouter>
          } />
          <Route path='/user/:id' element={<UserPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </AuthContextProvider>

    </div>
  );
}

export default App;
