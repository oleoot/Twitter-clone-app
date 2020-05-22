const form = document.querySelector('.main-form')
const loadingElement = document.querySelector('.loading')

const API_URL = 'http://localhost:5000/tweets'

loadingElement.style.display = 'none'


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
    })
})
