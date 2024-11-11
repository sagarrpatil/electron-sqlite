import React, { useState, useEffect } from 'react';

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

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {editing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleCreate}>Create</button>
        )}
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
