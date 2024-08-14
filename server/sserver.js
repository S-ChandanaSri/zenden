const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors({
  origin:true,
  methods:["POST","GET","PUT","DELETE"],
  credentials:true
}));
app.use(express.json());

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
          console.log('Listings data:', results);
          res.json(results);
    })
  })


  app.post('/status', (req, res) => {
    const { id, status } = req.body;
  console.log("---",id,status)
    if (!id || !status) {
      return res.status(400).json({ error: 'Missing data: id or status' });
    }
  
    const sql = "UPDATE listings SET status = ? WHERE id = ?";
    const values = [status, id];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Status update error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      console.log("Status update result:", result);
      res.json({ success: true });
    });
  });
  



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
    console.log("Selected address:", address, "ID:", id);
  
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
        console.error('Transaction start error:', err);
        return res.status(500).json({ error: 'Transaction error' });
      }
  
      connection.query(addressSql, addressValues, (err, result) => {
        if (err) {
          console.error('Address insert error:', err);
          return connection.rollback(() => {
            res.status(500).json({ error: 'Database error' });
          });
        }
  
        const addressId = result.insertId;
        console.log("Address inserted with ID:", addressId);
  
        const fetchAddressSql = "SELECT district, state FROM addresses WHERE id = ?";
        console.log("Executing SQL to fetch district and state:", fetchAddressSql, [addressId]);
        connection.query(fetchAddressSql, [addressId], (err, rows) => {
          if (err) {
            console.error('Fetch address error:', err);
            return connection.rollback(() => {
              res.status(500).json({ error: 'Database error' });
            });
          }
  
          const { district, state } = rows[0];
          console.log("Fetched district:", district, "state:", state);
  
          const listingsSql = "UPDATE listings SET location = ?, district = ?, state = ? WHERE id = ?";
          const listingsValues = [addressId, district, state, id];
          console.log("Executing SQL to update listings:", listingsSql, listingsValues);
  
          connection.query(listingsSql, listingsValues, (err, result) => {
            if (err) {
              console.error('Listings update error:', err);
              return connection.rollback(() => {
                res.status(500).json({ error: 'Database error' });
              });
            }
  
            connection.commit(err => {
              if (err) {
                console.error('Transaction commit error:', err);
                return connection.rollback(() => {
                  res.status(500).json({ error: 'Transaction error' });
                });
              }
              console.log("Listings updated successfully.");
              res.json({ success: true, result });
            });
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



//list of images
app.post('/imageslist', (req, res) => {
  console.log("Request body:", req.body);

  const images = req.body.files; 
  const listingId = req.body.id; 

  let imageInsertCount = 0;
  let firstImageUrl = null; // Track the URL of the first image
  let lastImageId = null;

  const insertNextImage = () => {
    if (imageInsertCount >= images.length) {
      console.log("All images inserted. Updating listings table...");


      if (firstImageUrl !== null) {
        const listingsSql = "UPDATE listings SET image = ? WHERE id = ?";
        console.log("Executing SQL:", listingsSql, [firstImageUrl, listingId]);
        
        connection.query(listingsSql, [firstImageUrl, listingId], (err, result) => {
          if (err) {
            console.error('Listings update error:', err);
            return res.status(500).json({ error: 'Database error' });
          }

          console.log("Listings update result:", result);
          res.json({ success: true, lastImageId });
        });
      } else {
        console.error('No images were inserted.');
        res.status(400).json({ error: 'No images to set as cover photo' });
      }
      return;
    }

    const image = images[imageInsertCount];
    const sql = "INSERT INTO images (listing_id, image_url) VALUES (?, ?)";
    const values = [listingId, image.preview];  // Use 'preview' for image_url

    console.log("Inserting image with values:", values); // Log the values being inserted

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Image insert error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      console.log("Image insert result:", result);
      
      // Set the first image URL
      if (firstImageUrl === null) {
        firstImageUrl = image.preview; // Save the URL of the first image
        console.log("First image URL set to:", firstImageUrl);
      }

      lastImageId = result.insertId; 
      console.log("Last image ID:", lastImageId);

      imageInsertCount++;
      insertNextImage(); 
    });
  };

  insertNextImage();
});






app.post('/title', (req, res) => {
  console.log("Request body:", req.body);

  let textt = req.body.textt;
  let id = req.body.id;

  console.log("Selected text and ID:", { textt, id });

  const sql = "UPDATE listings SET listing = ? WHERE id = ?";
  connection.query(sql, [textt,id], (err, result) => { 
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.json(result);
  });
});


app.post('/describeproperty', (req, res) => {
  console.log("Request body:", req.body);

  let amenities = req.body.selectedopt;
  let id = req.body.id;

  console.log("Selected amenities and ID:", { amenities, id });

  const sql = "UPDATE listings SET describeproperty=? WHERE id = ?";
  connection.query(sql, [amenities.join(','), id], (err, result) => { 
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.json(result);
  });
});




app.post('/descriptionn', (req, res) => {
  console.log("Request body:", req.body);

  let text = req.body.text;
  let id = req.body.id;


  console.log("Selected text and ID:", { text, id });

  const sql = "UPDATE listings SET description = ? WHERE id = ?";
  connection.query(sql, [text,id], (err, result) => { 
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.json(result);
  });
});





app.post('/pay',(req,res)=>{
  console.log("Request body:", req.body);

  let amount=req.body.pay;
  
  const sql="INSERT INTO listings (amount) values(?)";
  connection.query(sql,[amount],(err,result)=>{
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
  }
  return res.json({ result, id: result.insertId });
  })
})



  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });