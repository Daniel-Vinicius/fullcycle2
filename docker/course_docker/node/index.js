const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const mysql = require('mysql')

app.get('/:name', (req, res) => {
  const name = req.params.name;
  const connection = mysql.createConnection(config)
  
  const sql = `INSERT INTO people(name) values('${name}')`
  connection.query(sql)
  connection.end()
  return res.send(`${name} inserted on MySQL database`)
})

app.listen(port, () => {
  console.log('Running on port ' + port)
})
