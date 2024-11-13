const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  addNewMember: (member) => ipcRenderer.invoke('add-member', member),
  getLastMemberId: () => ipcRenderer.invoke('get-last-member-id'),
});

contextBridge.exposeInMainWorld('electron', {
  login: (email, password) => ipcRenderer.invoke('login-user', { email, password }),
});
