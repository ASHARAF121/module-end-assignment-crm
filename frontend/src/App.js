import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  const handleLogin = (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
        <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
        {token && <Link to="/profile" style={{ marginRight: 10 }}>Profile</Link>}
        {token && <Link to="/update" style={{ marginRight: 10 }}>Update Profile</Link>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={token ? <Profile token={token} /> : <Navigate to="/login" />} />
        <Route path="/update" element={token ? <UpdateProfile token={token} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
