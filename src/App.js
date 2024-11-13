import React, { useState, useEffect } from 'react';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './Components/Pages/DashboardPage';
import Header from './Components/Common/Header';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const result = await window.electronAPI.getUsers();
    setUsers(result);
  };

  const handleCreate = async () => {
    if (name && email) {
      const newUser = await window.electronAPI.createUser({ name, email });
      setUsers([...users, newUser]);
      setName('');
      setEmail('');
    }
  };

  const handleEdit = (user) => {
    setEditing(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdate = async () => {
    if (editing && name && email) {
      const updatedUser = await window.electronAPI.updateUser({ id: editing, name, email });
      setUsers(users.map((user) => (user.id === editing ? updatedUser : user)));
      setEditing(null);
      setName('');
      setEmail('');
    }
  };

  const handleDelete = async (id) => {
    await window.electronAPI.deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };


  const Dashboard = Header(DashboardPage);

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
