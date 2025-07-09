import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login'
import Register from './Components/Register'
import Dashboard from './Components/dashboard';
export default function App(){
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </Router>
    </>
  );
}
