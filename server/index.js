const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words')


const app = express();


const db = monk('localhost/database');
const tweets = db.get('tweets')
const filter = new Filter()




app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: "Tweet"
    })
})

app.get('/tweets', (req, res) => {
    tweets.find().then(tweets => {
        res.json(tweets)
    })
})


function isValidTweet(tweet) {
    return tweet.name && tweet.name.toString().trim() !== '' && tweet.content && tweet.content.toString().trim() !== ''
}


app.post('/tweets', (req, res) => {
    if (isValidTweet(req.body)) {
        const tweet = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        }
        tweets
            .insert(tweet)
            .then(createdTweet => {
                res.json(createdTweet)
            });
    } else {
        res.status(422);
        res.json({
            message: "Name and content are required"
        })
    }
})









app.listen(5000, () => {
    console.log("Listening on port 5000")
})
