const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const sqlite3 = require("sqlite3");
const dbConnection = new sqlite3.Database('mydb.db', { Promise })

const init = async()=> {
    const db = await dbConnection
    await db.serialize(()=> {
        db.run('create table if not exists carros (id INTEGER PRIMARY KEY, marca TEXT)')
        db.run(`insert into carros(marca) values('FIAT')`)
    })
}
init()

app.use("/", async(req, res) => {

    const db = await dbConnection
    db.all("select * from carros", [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message})
          return
        }
        res.json({
            "data":rows
        })
      })
})

app.listen(port, () => {
  console.log(`Express online on port: ${port}`);
});