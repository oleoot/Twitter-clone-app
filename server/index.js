const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words')
const ratelimit = require('express-rate-limit');
require('dotenv').config();

const app = express();


const db = monk(process.env.DATABASE_URL);
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


app.use(ratelimit({
    window: 30 * 1000,
    max: 5
}))

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







const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
