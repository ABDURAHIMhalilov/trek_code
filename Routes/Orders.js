var express = require('express');
var router = express.Router();
const pool = require("../db")
const auth=require("../middleware/auth.js")
router.post('/orders', auth.authenticateToken, async (req, res) => {  
   const {trek_id,sender}=req.body;
   const query='INSERT INTO orders (trek_id, sender) VALUES ($1, $2) RETURNING *';  
    const values = [trek_id, sender];
    try {
    const result = await pool.query(query, values);
    res.status(201).send(result.rows[0]);
    }catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
router.get('/orders',auth.authenticateToken, async (req, res) => {
  try {
    const orders = 'SELECT * FROM orders';
    const orders_address = 'SELECT * FROM orders_address';
    const users = 'SELECT address,email,id FROM users';
    const result1 = await pool.query(orders);
    const result2 = await pool.query(orders_address);
    const result3 = await pool.query(users);
for (let i = 0; i < result1.rows.length; i++) {
 result1.rows[i].insender=[]
for (let j = 0; j < result3.rows.length; j++) {
 if (result1.rows[i].sender==result3.rows[j].id) {
  result1.rows[i].insender.push(result3.rows[j])
 }
 }
}
for (let i = 0; i < result2.rows.length; i++) {
  result2.rows[i].insender=[]
 for (let j = 0; j < result3.rows.length; j++) {
  if (result2.rows[i].sender==result3.rows[j].id) {
   result2.rows[i].insender.push(result3.rows[j])
  }
  }
 }
 for (let i = 0; i < result1.rows.length; i++) {
for (let j = 0; j < result2.rows.length; j++) {
if(result1.rows[i].id==result2.rows[j].orders_id && result2.rows[j].insender[0]){
  result1.rows[i].insender.push(result2.rows[j].insender[0])
}
}}
      res.json(result1.rows);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.get('/myorders',auth.authenticateToken,async (req,res)=>{
  try {
    const orders = 'SELECT * FROM orders';
    const orders_address = 'SELECT * FROM orders_address';
    const users = 'SELECT address,email,id FROM users';
    const result1 = await pool.query(orders);
    const result2 = await pool.query(orders_address);
    const result3 = await pool.query(users);
for (let i = 0; i < result1.rows.length; i++) {
 result1.rows[i].insender=[]
for (let j = 0; j < result3.rows.length; j++) {
 if (result1.rows[i].sender==result3.rows[j].id) {
  result1.rows[i].insender.push(result3.rows[j])
 }
 }
}
for (let i = 0; i < result2.rows.length; i++) {
  result2.rows[i].insender=[]
 for (let j = 0; j < result3.rows.length; j++) {
  if (result2.rows[i].sender==result3.rows[j].id) {
   result2.rows[i].insender.push(result3.rows[j])
  }
  }
 }
 for (let i = 0; i < result1.rows.length; i++) {
for (let j = 0; j < result2.rows.length; j++) {
if(result1.rows[i].id==result2.rows[j].orders_id && result2.rows[j].insender[0]){
  result1.rows[i].insender.push(result2.rows[j].insender[0])
}
}}
var a=result1.rows.filter(item=>{item.sender===req.user.userId})
      res.json(result1.rows);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }


})
router.get('/myorders2',auth.authenticateToken,async (req,res)=>{
  try {
    const orders = 'SELECT * FROM orders';
    const orders_address = 'SELECT * FROM orders_address WHERE sender=$1 ';
    var  values=[req.user.userId]
    const users = 'SELECT address,email,id FROM users';
    const result1 = await pool.query(orders);
    const result2 = await pool.query(orders_address,values);
var data=[]
for (let i = 0; i < result2.rows.length; i++) {
 for (let j = 0; j < result1.rows.length; j++) {
  if( result2.rows[i].orders_id==result1.rows[j].id){
    data.push(result1.rows[j])
  }
 }
}
res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/orders/:id',auth.authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { track_id, sender } = req.body;
      const query = 'UPDATE orders SET track_id = $2, sender = $3, time_update = current_timestamp WHERE id = $1 RETURNING *';
      const values = [id, track_id, sender];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/orders/:id',auth.authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM orders WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;