import * as fs from 'fs';
import * as sqlite3 from 'sqlite3';

function connectToSQLLite() {
    const dirPath = path.join(__dirname, 'sqlite-table.db'); 
    const db = new sqlite3.Database(dirPath, sqlite3.OPEN_READWRITE, (err) => {
      if(err) return console.error("Error creating sqlite connection: ", dirPath)
    });
    return db;
  }
  
function initSQLite() {
    const db = connectToSQLLite()
    const sqliteCreate = `CREATE TABLE surveyStructure(id TEXT PRIMARY KEY NOT NULL, idsite INTEGER, idsitehsr INTEGER, surveyData TEXT, created_at TEXT NOT NULL DEFAULT current_timestamp)`
    db.run(sqliteCreate)
}
    
function fetchFromEFS() {
    const efsMountPoint = path.join(__dirname, '..', 'remote');
    const latestFile = getLatestFile(efsMountPoint)
    
    // Read the file
    fs.readFile(latestFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file from EFS:', err);
            return;
        }
        console.log('File contents:', data);
    });

    function getLatestFile(directoryPath) {
        try {
          const files = fs.readdirSync(directoryPath);
      
          if (files.length === 0) {
              throw new Error('No files found in the directory.');
          }
      
          // Get the latest file based on modification time
          let latestFile = files[0];
          let latestTime = fs.statSync(path.join(directoryPath, latestFile)).mtime;
      
          for (const file of files) {
              const filePath = path.join(directoryPath, file);
              const stats = fs.statSync(filePath);
      
              if (stats.mtime > latestTime) {
                  latestTime = stats.mtime;
                  latestFile = file;
              }
          }
      
          return path.join(directoryPath, latestFile);
        } catch (error) {
            console.error('Error fetching the latest file:', error.message);
            throw error;
        }
    }
}