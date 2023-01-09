//Query selects the overview class with profile information.
const overview = document.querySelector(".overview");
const username = "and-draci";
const repoList = document.querySelector(".repo-list");

// Variable for all repo information
const allRepoInfo = document.querySelector(".repos");
//Variable for individual repo information.
const repoData= document.querySelector(".repo-data");

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

repoList.addEventListener("click", function (e){
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
  
    getRepoInfo(repoName);
  }
});

// Async function to get specific repo data

const getRepoInfo = async function (repoName){
  const fetchInfo= await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  
  console.log(repoInfo);

  // Captures data from the language url property.

  const fetchLanguages = await fetch (repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  console.log (languageData);

  // Lists the languages

  const languages = [];
  for (const language in languageData) {
    languages.push(language);

    console.log (languages);
  }

  displayRepoInfo(repoInfo, languages);
};

// Display specific repo data on web page

const displayRepoInfo= function (repoInfo, languages) {
  repoData.innerHTML = "";
  const div = document.createElement("div"); 

  repoData.classList.remove("hide");
  allRepoInfo.classList.add("hide");

  div.innerHTML = 
  `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`;

repoData.append (div);

};


