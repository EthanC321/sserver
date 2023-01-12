
const form = document.querySelector('form');
const posts = document.querySelector('.posts');
const t = 'http://localhost:5000/post';
var check = "t";
var y;

listpost();

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    const text = data.get("text");
    const date = new Date();
    //console.log(name + " : " + text);
   
    const post = {
        name,
        text,
        date
    };
    form.style.display = 'none';

    //Send Post to Server
    
    fetch(t, {
        method: 'POST',
        body: JSON.stringify(post),
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json',
        }
    }).then((res) => 
        res.json()
    )
    .then(npost => {
        console.log(npost)
        form.reset();
        listpost();
        form.style.display = '';
    })
    .catch(error => console.error(error));
    
    
    
});

function listpost(){
    posts.innerHTML = '';
    fetch(t)
    .then(post => post.json())
    .then(res => {
        console.log(res)
        res.reverse()
        res.forEach(p => {
            const div = document.createElement('div');
            const header = document.createElement('h3');
            header.textContent = p.name;
            const text = document.createElement('p');
            text.textContent = p.text;

            div.appendChild(header);
            div.appendChild(text);

            posts.appendChild(div);
            
        });
    });
}