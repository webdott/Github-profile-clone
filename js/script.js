//============================= Initialize Variables ====================================//

const navbarSticky = document.querySelector('#nav2');
const main = document.querySelector('main');

const stickyPosition = navbarSticky.offsetTop;

const navbarStickyMobile = document.querySelector('#nav2-mobile');

let stickyPositionMobile = 424;

let lastScrollPos = 0;
let tick = false;

let loginName, username, namePosition;

//============================= Initialize Variables ====================================//

//============================= toggle account name Show ====================================//

const showAccount = (scrollPos, username, namePosition) => {
  if (scrollPos >= namePosition){
    username.classList.add('show');
  } else{
    username.classList.remove('show');
  }
}

//============================= toggle account name Show ====================================//


// ================================Format Updated Time ==============================//

const getInterval = (updatedTimeStamp, format) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const timeParam = { second, minute, hour, day };
  return Math.floor(updatedTimeStamp / timeParam[format]);
}

const formatTimeUpdated = (date) => {
  const updatedDate = Date.parse(date);
  const modifiedUpdate = (new Date(updatedDate)).toDateString()
  const daysInterval = getInterval(Date.now() - updatedDate, "day");
  if(daysInterval >= 30){
    const [_, month, day, year] = /\s(\w{3})\s(\d{2})\s(\w{4})/.exec(modifiedUpdate);
    return `on ${parseInt(day)} ${month} ${(new Date()).getFullYear() === +year ? "" : year}`
  }
  else{
    let formats = ["day", "hour", "minute", "second"];
    const lastUpdated = formats.map(format =>{
      const when = getInterval(Date.now() - updatedDate, format)
      return `${when} ${when > 1 ? `${format}s`: format} ago`;
    })
      .filter( value => parseInt(value) !== 0)
    return lastUpdated[0];
  }
}
// ================================Format Updated Time ==============================//

// ================================ Navbar ==========================================//

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.search-links.small-flex');

const showMenu = () => {
  menu.classList.toggle('shown');
  menu.style.maxHeight = menu.style.maxHeight ? null : `${menu.scrollHeight}px`;
}

// ================================ Navbar ==========================================//

// =============================== Fill Profile Details ===============================//

const profileSection = document.querySelector('.left-up');

const fillProfileSection = (data) => {
  const {
    avatarUrl,
    bio,
    email,
    location,
    login,
    name,
    starredRepositories,
    status,
    twitterUsername,
    websiteUrl,
    followers,
    following
  } = data;

  profileSection.innerHTML = `
    <div class="small-none profile-picture">
      <img src="${avatarUrl}" alt="profile-picture">
      <div class="status-emoji">
          ${status.emojiHTML}
          <span class="edit-status"><a href="#">&nbsp; Edit status</a></span>
      </div>
    </div>

    <div class="small-none name-details">
      <h2 class="name">${name}</h2>
      <h2 class="login">${login}</h2>
    </div>

    <div class='prof-det'>
      <div class='profile-details-small'>

        <div class="profile-picture">
          <img src="${avatarUrl}" alt="profile-picture">
        </div>

        <div class="name-details">
          <h2 class="name">${name}</h2>
          <h2 class="login">${login}</h2>
        </div>

      </div>

      <div class="status-emoji normal">
        ${status.emojiHTML}
        <span><a href="#">Edit status</a></span>
      </div>
    </div>

    <div class="description">
      <h2>${bio}</h2>
    </div>

    <div class="profile-editable">
      <button class="normal">Edit profile</button>

      <div class="stats small-none">
          <a href="#">
              <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>
              <span class="stat-number">${followers.totalCount}</span>
              <span>followers</span>
          </a>
          <span class="dot">.</span>
          <a href="#">
              <span class="stat-number">${following.totalCount}</span>
              <span>following</span>
          </a>
          <span class="dot">.</span>
          <a href="#">
              <svg class='star' height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
              <span class="stat-number">${starredRepositories.totalCount}</span>
          </a>
      </div>

      <div class="profile-details">
          <ul>
              <li class='small-none'>
                  <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                  <span>${location}</span>
              </li>
              <li>
                  <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"></path></svg>
                  <a href="#">${email}</a>
              </li>
              <li>
                  <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>
                  <a href="#">${websiteUrl}</a>
              </li>
              <li class='small-none'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.5 222.3" width="16" height="16"><path d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1" fill="currentColor"></path></svg>
                  <a href="https://twitter.com/caspero_17">@${twitterUsername}</a>
              </li>
          </ul>
          <div class="stats small-flex">
              <a href="#">
                  <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>
                  <span class="stat-number">${followers.totalCount}</span>
                  <span>followers</span>
              </a>
              <span class="dot">.</span>
              <a href="#">
                  <span class="stat-number">${following.totalCount}</span>
                  <span>following</span>
              </a>
              <span class="dot">.</span>
              <a href="#">
                  <svg class='star' height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                  <span class="stat-number">${starredRepositories.totalCount}</span>
              </a>
          </div>
      </div>
    </div>
  `;

  loginName = document.querySelector('.name-details');
  username = document.querySelector('.account-username');
  namePosition = loginName.offsetTop;
}

// =============================== Fill Profile Details ===============================//

// =============================== Repository Data ===================================//

const repositoryContainer = document.querySelector('.repositories');

const repoNumber = document.querySelectorAll('.repo-number');

const fillRepositoryData = (data) => {

  data.forEach(repo => {

    let updatedAt = formatTimeUpdated(repo.updatedAt);

    let repository = document.createElement('div');
    repository.className = 'repository';
    repository.innerHTML = `
      <div class="repository-details">

        <h3 class="repository-title">
            <a href=${repo.url}>
              ${repo.name}
            </a>
            ${repo.parent && repo.parent.isPrivate ? 
              `<span class='label'>Private</span>`:
              ``
            }
        </h3>

        <h3 class="repository-forked">
          ${
            repo.parent ?
            `Forked from <a href=${repo.parent.url}>${repo.parent.nameWithOwner}</a>` :
            ``
          }
        </h3>

        <h3 class="repository-description">
          ${repo.description ? repo.description : ''}
        </h3>

        <div class="stats repository-stats">
          ${repo.languages.nodes.length ? 
            `
              <div>
                <i class="fas fa-circle" style="color: ${repo.languages.nodes[0].color};"></i>
                <span>${repo.languages.nodes[0].name}</span>
              </div>
            ` :
            ``
          }

          ${repo.stargazerCount ? 
            `
              <a>
                <svg class='star' height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                <span>${repo.stargazerCount}</span>
              </a>
            ` :
            ``
          }

          ${repo.parent ?
            `
              <a>
                <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                <span>${repo.parent.forkCount}</span>
              </a>
            `
            : repo.forkCount ? 

            `
              <a>
                <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                <span>${repo.forkCount}</span>
              </a>
            ` :
            ``
          }

          ${repo.parent && repo.parent.licenseInfo? 
            `
              <a>
              <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>
                <span>${repo.parent.licenseInfo.name}</span>
              </a>
            ` :
            ``
          }

          <h3 class="repository-update">
            Updated ${updatedAt}
          </h3>
        </div>

      </div>
      <div class="star-button">
          <button class="normal">
              <svg class='star' height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
              <span>Star</span>
          </button>
      </div>
    `;

    repositoryContainer.appendChild(repository);
  })
}

// =============================== Repository Data ====================================//


// ================================ For sticky Navbar ==============================//

const addSticky = (scrollPos) => {
  if (scrollPos >= stickyPosition){
    navbarSticky.classList.add('sticky');
    main.classList.add('sticky-after');
  } else{
    navbarSticky.classList.remove('sticky');
    main.classList.remove('sticky-after');
  }
}


const addStickyMobile = (scrollPos, stickyPositionMobile) => {
  if (scrollPos >= stickyPositionMobile){
    navbarStickyMobile.classList.add('sticky');
  } else{
    navbarStickyMobile.classList.remove('sticky');
  }
}

// ================================ For sticky Navbar ==============================//


//================================= Query Repo Data ===============================//
const queryData = `{
  user(login: "caspero-62") {
    avatarUrl
    bio
    email
    followers {
      totalCount
    }
    following {
      totalCount
    }
    location
    login
    name
    repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        name
        updatedAt
        stargazerCount
        forkCount
        languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            name
            color
          }
        }
        description
        url
        parent {
          forkCount
          name
          licenseInfo {
            name
          }
          languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
            nodes {
              color
              name
            }
          }
          isPrivate
          nameWithOwner
          url
        }
      }
    }
    twitterUsername
    websiteUrl
    status {
      emojiHTML
      emoji
      message
    }
    starredRepositories {
      totalCount
    }
    updatedAt
  }
}`;

const API_URL = 'https://api.github.com/graphql';

const token = process.env.token;

const queryOptions = {
    method: "POST",
    headers: {
        "Authorization": `bearer ${token}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        query: queryData
    }),
}

const getRepositoryData = async () => {
    try {
        
        const response = await fetch(API_URL, queryOptions);
        const fetchedData = await response.json();
        const reqData = fetchedData.data.user;

        const {
          repositories,
        } = reqData;

        fillProfileSection(reqData);
        fillRepositoryData(repositories.nodes);
        repoNumber.forEach(num => {
          num.innerHTML = repositories.totalCount;
        })

    } catch (err) {

       console.log(err);

    }
}
//================================= Query Repo Data End ===============================//


// ================================ Event Listeners ===================================//
window.addEventListener('load', getRepositoryData);

window.addEventListener('scroll', (e) => {
  lastScrollPos = window.pageYOffset;

  if (!tick) {
    window.requestAnimationFrame(() => {

      addSticky(lastScrollPos);
      showAccount(lastScrollPos, username, namePosition);
    
      addStickyMobile(lastScrollPos, stickyPositionMobile);
      tick = false;
    });

    tick = true;
  }
});

hamburger.addEventListener('click', showMenu);

// =============================== Event Listeners End ================================//


