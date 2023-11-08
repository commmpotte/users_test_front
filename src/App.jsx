import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import UserList from './components/UserList'
import { AppProvider } from './store/store.jsx'
import User from './components/User'
import UserPersonal from './components/UserPersonal'
import Intro from './components/Intro'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} index />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users/pp/:id" element={<UserPersonal />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
