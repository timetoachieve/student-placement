import express from 'express';
import data from './data.js';
require("./db/conn");
const app = express();

app.get('/api/companies', (req, res) => {    
    res.send(data.companyList);
});

app.get('/api/schedules', (req, res) => {
    res.send(data.scheduleList);
});

app.get('/', (req, res) => {
    res.send('server is ready');
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
