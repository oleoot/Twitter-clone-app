const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: "Tweet"
    })
})

app.post('/tweets', (req, res) => {
    console.log(req.body)
})









app.listen(5000, () => {
    console.log("Listening on port 5000")
})
