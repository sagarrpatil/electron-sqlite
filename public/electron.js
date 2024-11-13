const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// let db = new sqlite3.Database(path.join(app.getPath('userData'), 'mydatabase.db'));  // Connect to SQLite DB

const dbPath = path.join(__dirname, 'mydatabase.db');
let db = new sqlite3.Database(dbPath);

let isDev;
(async () => {
  isDev = (await import('electron-is-dev')).default;
})();


db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS loginuser (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, type TEXT)",
    (err) => {
      if (err) {
        console.error("Error creating users table:", err.message);
      } else {
        console.log("Users table created or already exists.");
      }
    }
  );
});


async function createWindow() {
  if (isDev === undefined) {
    isDev = (await import('electron-is-dev')).default;
  }
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'), // Ensure this path is correct
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false,
      },
  });
  if (isDev) {
    win.loadURL('http://localhost:3000');  // Load the development server
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'index.html'));  // Load the production file
  }
  win.webContents.on('did-finish-load', () => {
    console.log('Window Loaded');
  });

  // Optional: Handle load failures
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load page:', errorCode, errorDescription);
  });
 
}



ipcMain.handle('login-user', (event, { email, password }) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM loginuser WHERE email = ? AND password = ?", [email, password], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        resolve({ success: true, user: row });
      } else {
        resolve({ success: false, message: 'Invalid credentials' });
      }
    });
  });
});


// CRUD Operations
ipcMain.handle('create-user', (event, user) => {
  const { name, email } = user;
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function(err) {
      if (err) reject(err);
      resolve({ id: this.lastID, name, email });
    });
  });
});

ipcMain.handle('get-users', () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
});

ipcMain.handle('update-user', (event, user) => {
  const { id, name, email } = user;
  return new Promise((resolve, reject) => {
    db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], function(err) {
      if (err) reject(err);
      resolve({ id, name, email });
    });
  });
});

ipcMain.handle('delete-user', (event, id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE id = ?", [id], function(err) {
      if (err) reject(err);
      resolve({ id });
    });
  });
});

app.whenReady().then(async () => {
  await createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('quit', () => {
    db.close((err) => {
      if (err) console.error('Error closing database:', err);
    });
  });