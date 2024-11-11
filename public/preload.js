const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  createUser: (user) => ipcRenderer.invoke('create-user', user),
  getUsers: () => ipcRenderer.invoke('get-users'),
  updateUser: (user) => ipcRenderer.invoke('update-user', user),
  deleteUser: (id) => ipcRenderer.invoke('delete-user', id),
});
