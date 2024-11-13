import React, { useState, useEffect } from 'react';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './Components/Pages/DashboardPage';
import Header from './Components/Common/Header';
import Enquiry from './Components/Pages/Enquiry';
import Trial from './Components/Pages/Trial';
import ActiveDeactive from './Components/Pages/ActiveDeactive';
import AddMember from './Components/Pages/AddMember';
import Balance from './Components/Pages/Balance';
import MemberInformation from './Components/Pages/MemberInformation';
import OldReceipt from './Components/Pages/OldReceipt';
import PersonalTrainner from './Components/Pages/PersonalTrainner';
import Renew from './Components/Pages/Renew';
import AutoSms from './Components/Pages/AutoSms';



function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    // fetchUsers();
  }, []);

  // const fetchUsers = async () => {
  //   const result = await window.electronAPI.getUsers();
  //   setUsers(result);
  // };

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
  const HEnquiry = Header(Enquiry);
  const HTrial = Header(Trial);
  const HActiveDeactive = Header(ActiveDeactive);
  const HAddMember = Header(AddMember);
  const HBalance = Header(Balance);
  const HMemberInformation = Header(MemberInformation);
  const HOldReceipt = Header(OldReceipt);
  const HPersonalTrainner = Header(PersonalTrainner);
  const HRenew = Header(Renew);
  const HAutoSms = Header(AutoSms);





  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enquiry" element={<HEnquiry />} />
        <Route path="/trial" element={<HTrial />} />
        <Route path="/ActiveDeactive" element={<HActiveDeactive />} />
        <Route path="/AddMember" element={<HAddMember />} />
        <Route path="/Balance" element={<HBalance />} />
        <Route path="/MemberInformation" element={<HMemberInformation />} /> 
         <Route path="/OldReceipt" element={<HOldReceipt />} />
        <Route path="/PersonalTrainner" element={<HPersonalTrainner />} />
        <Route path="/Renew" element={<HRenew />} />
        <Route path="/AutoSms" element={<HAutoSms />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
