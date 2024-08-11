const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync(process.env.SSL_CA_PATH), 
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

//for step2
  app.post('/sendplace',(req,res)=>{
    console.log("Request body:", req.body);

    let place=req.body.selectedOption;
    console.log("zz",place);
    const sql="INSERT INTO listings (selectplace) values(?)";
    connection.query(sql,[place],(err,result)=>{
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
    }
    return res.json({ result, id: result.insertId });
    })
  })


  //for step3
  app.post('/placetype',(req,res)=>{
    console.log("Request body:", req.body);

    let place=req.body.placetype;
    let id = req.body.id;
    console.log("selectedplacetype=",place,id);
    const sql="UPDATE listings SET placetype = ? WHERE id = ?";
    connection.query(sql,[place,id],(err,result)=>{
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
    }
    return res.json(result);

    })
  })


  //for step5
  app.post('/address', (req, res) => {
    console.log("Request body:", req.body);

    const address = req.body.address;
    const id = req.body.id;
    console.log("selectedplacetype=", address, id);

    const addressSql = "INSERT INTO addresses (road, street, village, mandal, city, district, state, zipcode, country, country_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const addressValues = [
        address.road || '',
        address.street || '',
        address.village || '',
        address.mandal || '',
        address.city || '',
        address.district || '',
        address.state || '',
        address.zipcode || '',
        address.country || '',
        address.country_code || ''
    ];

    connection.beginTransaction(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Transaction error' });
        }

        connection.query(addressSql, addressValues, (err, result) => {
            if (err) {
                return connection.rollback(() => {
                    console.error(err);
                    res.status(500).json({ error: 'Database error' });
                });
            }

            const addressId = result.insertId;

            const listingsSql = "INSERT INTO listings (id, location) VALUES (?, ?) ON DUPLICATE KEY UPDATE location = VALUES(location)";
            const listingsValues = [id, addressId];

            connection.query(listingsSql, listingsValues, (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error(err);
                        res.status(500).json({ error: 'Database error' });
                    });
                }

                connection.commit(err => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error(err);
                            res.status(500).json({ error: 'Transaction error' });
                        });
                    }
                    res.json({ success: true ,result});
                });
            });
        });
    });
});


//for step6
app.post('/amenities1',(req,res)=>{
  console.log("Request body:", req.body,req.body.idd);

  let guests=req.body.countguests;
  let bedrooms=req.body.countBedrooms;
  let beds=req.body.countBeds;
  let click=req.body.isClicked;
  let id = req.body.idd;
    console.log("selectedplacetype=",{guests,bedrooms,beds,click, id});
  const sql="UPDATE listings SET guests = ?,bedrooms=?,beds=?,click=? WHERE id = ?";
  connection.query(sql,[guests,bedrooms,beds,click,id],(err,result)=>{
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
  }
  return res.json(result);

  })
})


//for step7
app.post('/amenities2',(req,res)=>{
  console.log("Request body:", req.body);

  let privateroom=req.body.privateroom;
  let privateroom1=req.body.privateroom1;
  let privateroom2=req.body.privateroom2;
  let id = req.body.id;
  console.log("selectedplacetype=",{privateroom,privateroom1,privateroom2,id});
  const sql="UPDATE listings SET private = ?,dedicated=?,shared=? WHERE id = ?";
  connection.query(sql,[privateroom,privateroom1,privateroom2,id],(err,result)=>{
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
  }
  return res.json(result);

  })
})



app.post('/peopletype',(req,res)=>{
  console.log("Request body:", req.body);

  let people=req.body.peopletype;
  let id = req.body.id;
  console.log("selectedplacetype=",people,id);
  const sql="UPDATE listings SET peopletype = ? WHERE id = ?";
  connection.query(sql,[people,id],(err,result)=>{
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
  }
  return res.json(result);

  })
})


//step2
app.post('/amenities', (req, res) => {
  console.log("Request body:", req.body);

  let amenities = req.body.selectedoption;
  let id = req.body.id;

  console.log("Selected amenities and ID:", { amenities, id });

  const sql = "UPDATE listings SET amenities=? WHERE id = ?";
  connection.query(sql, [amenities.join(','), id], (err, result) => { 
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.json(result);
  });
});








  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });