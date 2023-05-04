import { password_secret, name_db_secret } from "../modules/secret/secret.js";
import fs from 'fs';
import path from 'path';
import express from 'express';
import pg from 'pg';

const app = express(); // 1

const host = 'localhost';
const port = 8000;

const handler = (req, res) => {
    res.writeHead(200);
    res.end('ПСП такой крутой!');
};

const readJson = (fileName) => {
    const file = fs.readFileSync(path.join(__dirname, fileName), "utf8");
    const json = JSON.parse(file);
    return json;
};

app.get('/music', (req, res) => {
    res.end('Я слушаю только Radiohead!');
});

app.get('/course', (req, res) => {
    res.json({ course: 'ПСП' });
});


const storageName = 'stocks.json';

app.get('/stocks', (req, res) => {
    const stocks = readJson(storageName);
    res.send(stocks);
});

app.get('/stocks/:id', (req, res) => {
    const id = req.params.id; // 1
    
    const numberId = Number.parseInt(id);
    if (Number.isNaN(numberId)) { // 2
        res.status(400).send({status: 'Bad Request', message: 'id must be number!'});
    }

    const stocks = readJson(storageName);
    const stock = stocks.find((value) => { // 3
        return value.id === numberId;
    });

    if (stock) { // 4
        res.send(stock);
    } else {
        res.status(404).send({status: 'Not Found', message: `not found stock with id ${numberId}`});
    }
});

app.get('/Students', (req, res_app) => {
    const querySelectAll = `SELECT * FROM student;`; 
    client.query(querySelectAll, (err, res) => { 
        if (err) { 
            console.error(err); 
            return; 
        }
        // for (let row of res.rows) { 
        //     console.log(row); 
        // } 
        res_app.send(res.rows);
    }); 
});

app.get('/Students/:id', (req, res_app) => {
    const querySelectAll = `SELECT * FROM student WHERE student.id_student = ${req.params.id};`; 
    client.query(querySelectAll, (err, res) => { 
        if (err) { 
            console.error(err); 
            return; 
        }
        // for (let row of res.rows) { 
        //     console.log(row); 
        // } 
        res_app.send(res.rows);
    }); 
});

app.get('/InsertStudents/:last_name/:first_name', (req, res_app) => {
    const queryInsertStudent = ` 
    INSERT INTO student (last_name, first_name) 
    VALUES ('${req.params.last_name}', '${req.params.first_name}');
    `; 
    console.log(queryInsertStudent);
    client.query(queryInsertStudent, (err, res) => { 
        if (err) { 
            console.error(err); 
            return; 
        } 
        console.log('Data insert successful'); 
        res_app.send('Data insert successful');
    });
});

app.get('/UpdateStudents/:id/:last_name/:first_name', (req, res_app) => {
    const queryInsertStudent = ` 
    UPDATE student SET last_name = '${req.params.last_name}', first_name = '${req.params.first_name}'
    WHERE id_student = ${req.params.id};
    `; 
    console.log(queryInsertStudent);
    client.query(queryInsertStudent, (err, res) => { 
        if (err) { 
            console.error(err); 
            return; 
        } 
        console.log('Data was updated successful'); 
        res_app.send('Data was updated successful');
    });
});
 

app.get('/DeleteStudents/:id', (req, res_app) => {
    const queryInsertStudent = ` 
    DELETE FROM student WHERE id_student = ${req.params.id};
    `; 
    console.log(queryInsertStudent);
    client.query(queryInsertStudent, (err, res) => { 
        if (err) { 
            console.error(err); 
            return; 
        } 
        console.log('Data was deleted successful'); 
        res_app.send('Data was deleted successful');
    });
});

const client = new pg.Client({ 
    user: 'postgres', 
    host: 'localhost', 
    database: name_db_secret, 
    password: password_secret, 
    port: 8081, 
}); 
 
client.connect(); 

app.listen(port, host, () => { // 3
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
});

//client.end(); 

// CRUD
// READ 1/2 need read by id
// 