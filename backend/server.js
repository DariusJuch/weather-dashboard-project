const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json);


const db = new sqlite3.Database('./logs.db', (err) =>{
    if (err){
        conseole.error("Database connection error:" , err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});


db.run(`CREATE TABLE IF NOT EXISTS activity_logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT,
    timestamp TEXT
    )`);


app.post('/api/log', (req, res) => {
const { city, timestamp } = req.body;
const sql = `INSERT INTO activity_logs (city, timestamp) VALUES (?, ?)`;

db.run(sql, [city, timestamp], function(err) {
if (err) {
console.error(err.message);
return res.status(500).json({ error: "Failed to save log" });
}
console.log(`[SERVER LOG]: City "${city}" saved at ${timestamp}`);
res.status(200).json({ status: "success", id: this.lastID });
});
});

app.listen(PORT, () => {
console.log(`Backend server is running on http://localhost:${PORT}`);
});
