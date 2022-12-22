//Query selects the overview class with profile information.
const overview = document.querySelector(".overview");
const username = "and-draci";
const repoList = document.querySelector(".repo-list");

// Fetches repos with user info.
const gitUserInfo = async function (){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log (data);

userInfoDisplay(data);
};

gitUserInfo();

// Display user info from Github on webpage
const userInfoDisplay= function(data){
    const userInfoDiv= document.createElement("div"); 
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;

  overview.append(userInfoDiv);
  
  gitRepos();
};

// Gets repo info
const gitRepos = async function(){
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
   // console.log(repoData);


   displayRepos(repoData);
};

//Displays repo info on webpage.
const displayRepos= function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

