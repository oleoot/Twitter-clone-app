const form = document.querySelector('.main-form')
const loadingElement = document.querySelector('.loading')
const tweetsElement = document.querySelector('.tweets')
const API_URL = 'http://localhost:5000/tweets'

loadingElement.style.display = ''


listAllMews()


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');


    const tweet = {
        name,
        content
    }
    form.style.display = 'none'
    loadingElement.style.display = '';
    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(tweet),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(createdTweet => {
            console.log(createdTweet)
            form.reset()
            loadingElement.style.display = 'none'
            listAllMews()
            form.style.display = ''
        })
})

function listAllMews() {
    tweetsElement.innerHTML = ''
    fetch(API_URL)
        .then(response => response.json())
        .then(tweets => {
            tweets.reverse();
            console.log(tweets)
            tweets.forEach(tweet => {
                const div = document.createElement('div');
                const header = document.createElement('h3');
                header.textContent = tweet.name;

                const contents = document.createElement('p');
                contents.textContent = tweet.content
                const date = document.createElement('small')
                date.textContent = new Date(tweet.created);
                div.append(header, contents, date)
                tweetsElement.append(div)
            });
            loadingElement.style.display = 'none'
        })
}
