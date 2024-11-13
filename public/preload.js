const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  createUser: (user) => ipcRenderer.invoke('create-user', user),
  getUsers: () => ipcRenderer.invoke('get-users'),
  updateUser: (user) => ipcRenderer.invoke('update-user', user),
  deleteUser: (id) => ipcRenderer.invoke('delete-user', id),
});

contextBridge.exposeInMainWorld('electron', {
  login: (email, password) => ipcRenderer.invoke('login-user', { email, password }),
});