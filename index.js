const db = require('./db')

db.query('SELECT * FROM users', (err, results) => {
    if(err){
        console.error(err)
        return
    }
    console.log(results)
})

db.query('SELECT * FROM products', (err, res) =>{
    if (err){
        console.error(err)
    }
    console.log(res)

})
