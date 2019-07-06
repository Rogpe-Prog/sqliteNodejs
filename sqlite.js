/* Look that for more information: www.sqlite.org
*  To NodeJS there are some differences between SQLITE and SQLITE3 
*/
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const sqlite = require('sqlite')
const dbConnection = sqlite.open('mydb.sqlite', { Promise })

app.get('/', async(req, res)=> {
    const db = await dbConnection
    const categoria = await db.all('select * from vagas')
    res.send({ categoria })
})

const init = async()=> {
   const db = await dbConnection
   await db.run('create table if not exists vagas(id INTEGER PRIMARY KEY, categoria TEXT)')
   await db.run(`insert into vagas(categoria) values('JavaScript Developer')`)
}
init()

app.listen(port, ()=> {
    console.log(`Express online on ${port}`)
})