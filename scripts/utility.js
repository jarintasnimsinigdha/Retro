const search = async() =>{
    toggleSpinner(true);
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value;
    if(searchText){
        setTimeout(() => {
            allPost(searchText);
        }, 2000);
    }
}

const allPost = async (searchText) => {
    let url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts;
    allPostCards(posts);
}

const allPost2 = async () => {
    let url = 'https://openapi.programming-hero.com/api/retro-forum/posts';
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts;
    allPostCards(posts);
}

const allPostCards = posts => {
    const  mainCards = document.getElementById('main-cards-container');
    mainCards.textContent = '';
    for (const post of posts) {
        // active button 
        let isActive = post.isActive;
        if (isActive) {
            activeColor ='bg-green-500';
        }
        else {
            activeColor = 'bg-red-500';
        }
        const div = document.createElement('div');
        div.classList = `flex flex-col lg:flex-row gap-6 p-10 rounded-3xl bg-[#F3F3F5] hover:bg-[#797DFC1A] hover:border-2 hover:border-secondary`;
        div.innerHTML = `
                <div class="relative avatar h-[105px]">
                    <div class="absolute -top-2 left-20 lg:-right-1 ${activeColor} rounded-full w-5 h-5"></div>
                    <div class="w-24 rounded-2xl">
                    <img src="${post.image}" />
                    </div>
                </div>
                <div class="flex flex-col gap-4 grow">
                    <div class="flex gap-6">
                        <h5 class="text-sm text-third font-medium">#${post.category}</h5>
                        <h5 class="text-sm text-third font-medium">Author : ${post.author.name}</h5>
                    </div>
                    <h2 class="text-2xl font-bold text-primary">${post.title}</h2>
                    <p class="text-base font-medium text-third">${post.description}</p>
                    <div class="flex flex-col lg:flex-row justify-between items-left gap-5 lg:gap-0">
                        <div class="flex gap-3">
                            <div class="flex gap-3 justify-center items-center">
                                <i class="fa-regular fa-message"></i>
                                <p class="text-base font-bold text-third">${post.comment_count}</p>
                            </div>
                            <div class="flex gap-3 justify-center items-center">
                                <i class="fa-regular fa-eye"></i>
                                <p class="text-base font-bold text-third">${post.view_count}</p>
                            </div>
                            <div class="flex gap-3 justify-center items-center">
                                <i class="fa-regular fa-clock"></i>
                                <p class="text-base font-bold text-third">${post.posted_time}</p>
                            </div>
                        </div>
                        <div onclick="recentViewed('${post.id}', '${post.title}', '${post.view_count}'), totalReadNumber(1)" class="justify-end" ><img src="images/message.png" alt=""></div>
                    </div>
                </div>
        
        `;
        mainCards.appendChild(div);
    }

    toggleSpinner(false);
}

function recentViewed(id, title, viewCount) {
    const sidecard = document.getElementById('sidecard');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="flex flex-row items-center gap-8 lg:gap-12 bg-white p-4 mt-4 rounded-2xl">
            <h2 class="text-base lg:text-xl font-bold text-primary">${title}</h2>
            <div class="flex gap-3 justify-center items-center text-xl font-bold text-third">
                <i class="fa-regular fa-eye"></i>
                <p>${viewCount}</p>
            </div>
        </div>
    `;
    sidecard.appendChild(div);
}

function totalReadNumber(){
    const totalRead = document.getElementById('totalRead');
    let totalReadCount = parseInt(totalRead.innerText);
    totalReadCount =  totalReadCount+ 1;
    totalRead.innerText = totalReadCount;
}

const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading){
        spinner.classList.remove('hidden')
    }
    else{
        spinner.classList.add('hidden');
    }
}

const latestPost = async() => {
    let url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';
    const res = await fetch(url);
    const data = await res.json();
    const posts = data;
    const latestPostsContainer = document.getElementById('latestpostscontainer');
    for (const post of posts) {
        const date = post.author.posted_date ? post.author.posted_date : "No publish date";
        const designation = post.author.designation ? post.author.designation : "Unknown";
        const div = document.createElement('div');
        div.classList = `flex flex-col p-6 gap-8 rounded-3xl border-gray-300 border-2`;
        div.innerHTML = `
                        <div class="img w-auto lg:w-auto h-[190px] rounded-3xl mb-6" >
                            <img src="${post.cover_image}" class="w-auto rounded-3xl">
                        </div>
                        <div class="body flex flex-col gap-4">
                            <div class="flex gap-2 items-center">
                                <i class="fa-regular fa-calendar"></i>
                                <p class="text-lg text-third font-medium">${date}</p>
                            </div>
                            <h2 class="text-xl font-extrabold">${post.title}</h2>
                            <p class="text-lg text-third font-medium">${post.description}</p>
                        </div>
                        <div class="flex gap-4 items-center justigy-center footer">
                            <img src="${post.profile_image}" alt="" class="rounded-full w-11 h-11">
                            <div>
                                <h2 class="text-xl font-bold">${post.author.name}</h2>
                                <p class="text-lg text-third font-medium">${designation}</p>
                            </div>
                        </div>
                    
        `;
            latestPostsContainer.appendChild(div);
    }
}

latestPost();
allPost2();