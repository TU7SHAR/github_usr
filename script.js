console.log(`Connected`);

const APIURL = 'https://api.github.com/users/';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

async function getUsers(username){
      try{
      const { data } = await axios(APIURL + username);  
      createUser_placeholder(data);
      getRepos(username);
    }
    catch(err){
        console.log(err);
        if(err.response.status == 404){
            createerrorCard('There Appears To Be No Such User On Github');
        }
    }
}

async function getRepos(username){
    
    try{
        const { data } = await axios(APIURL + username +'/repos');  
        getRepos(data);
        }
        catch(err){
              console.log(err);
            //   createerrorCard('No Repos');  
        }
}

function createerrorCard(msg){
    console.log('inside error placeholder')
    const cardHTML = `
        <div class='card animate-txt'>
        <h1 id="animations">${msg}</h1>
        </div>
    `
    main.innerHTML = cardHTML;
}

function createUser_placeholder(user){
    const cardHTML = `
        <div class="card">
        <div id="avatar">
        <img src="${user.avatar_url}" alt="" class="avatar">
        </div>

        <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>     
        <ul>
             <li>${user.followers} <strong>Followers</strong></li>
             <li>${user.following} <strong>Following</strong></li>
             <li>${user.public_repos} <strong>Repos</strong></li>
             <li>${user.public_gists} <strong>Gists</strong></li>             
         </ul>

             <div id="repos"></div>
         </div>
    </div>`

    main.innerHTML = cardHTML;
}

function addRepos(repos){
    const reposEl = document.getElementById('repos');
    repos.forEach(repo => {
        console.log('Inside Repo!');
        const repoEl = document.createElement('a');
        repoEl.classlist.add('repo');
        repoEl.href = repo.html_url;
        repoEl.traget = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = search.value;

    if(user){
        getUsers(user);
        search.value = '';
    }

})

