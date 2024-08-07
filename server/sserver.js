const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());

const connection = mysql.createConnection({
    host: 'mysql-31ca3eaa-proerty-7efc.e.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_t_PE2ZfGcL2AIgXscOM',
    database: 'list',
    port: 27949,
    ssl: {
      ca: fs.readFileSync("C:/Users/asus/Downloads/ca (4).pem"), 
    }
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database.');
  });


  app.get('/listings',(req,res)=>{
    const query='select * from listings';
    connection.query(query,(error,results)=>{
        if (error) {
            res.status(500).json({ error: error.message });
           
          }
         
          res.json(results);

    })

  })

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });