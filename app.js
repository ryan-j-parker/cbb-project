// importing other stuff, utility functions for:
// working with supabase
import { checkAuth, signOutUser, getPosts, getPostsByCategory } from './fetch-utils.js';
// pure rendering (data --> DOM)
import { renderPosts } from './render-utils.js';

// some "boiler plate" code for:
// sign out link
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
// make sure we have a user
checkAuth();

// grab needed DOM elements on page
const bulletinBoard = document.getElementById('bulletin-board');

async function displayPosts() {
    const posts = await getPosts();
    const listEls = renderPosts(posts);
    bulletinBoard.append(listEls);
}

displayPosts();

// const categoryDropdown = document.getElementById('category-dropdown');

// categoryDropdown.addEventListener('change', async () => {
//     // const categorySelection = ;
//     if ()
// });

// const catPost = getPostsByCategory(5);
// console.log(catPost);


const categoryDropdown = document.getElementById('category-dropdown');

categoryDropdown.addEventListener('change', async () => {
    displayFilteredPosts(categoryDropdown.value);
});

displayPosts();

async function displayFilteredPosts(value) {
    bulletinBoard.textContent = '';
    const pTag = document.createElement('p');
    pTag.textContent = 'No posts match your selection';
    pTag.classList.add('no-match');
    const filteredArray = await getPostsByCategory(value);
    const filteredPosts = renderPosts(filteredArray);
    filteredArray.length === 0 ? bulletinBoard.append(pTag) : bulletinBoard.append(filteredPosts);
}

/*

0  -->  1  -->  2  -->  3  -->  0

0 = index.html (event listener)
    - waits for user click
    - upon click, calls fetch util to return user selection

1 = fetch util (getPostByCategory)
    - accesses entire data table on supabase 
    - grabs data (user-selected data only, OR all table data?)
    
2 = render util (renderPosts(posts))
    - if (user-selected data only fetched) {                    [data sorted by fetch]
        send all collected data to render function
    } else (ALL table data fetched) {                           [data sorted by render]
        render function selectively renders needed elements
    }

3 = display function
    - feeds render function data collected by fetch function
    - appends rendered DOM elements to DOM
    
back to index.html
*/

function renderCatsOnTheFly() {
    
    const catDiv = document.createElement('div');
    const catOne = document.createElement('button');
    catOne.textContent = 'For sale';
    catOne.classList.add('cat-btn');

    const catTwo = document.createElement('button');
    catTwo.textContent = 'Free';
    catTwo.classList.add('cat-btn');
    
    const catThree = document.createElement('button');
    catThree.textContent = 'Event';
    catThree.classList.add('cat-btn');
    
    const catFour = document.createElement('button');
    catFour.textContent = 'Housing';
    catFour.classList.add('cat-btn');
    
    const catFive = document.createElement('button');
    catFive.textContent = 'Misc';
    catFive.classList.add('cat-btn');

    const noMatch = document.createElement('p');
    noMatch.textContent = 'No posts match your request';
    noMatch.classList.add('no-match');
    
    catOne.addEventListener('click', async () => {
        bulletinBoard.textContent = '';
        const forSalePosts = await getPostsByCategory(1);
        const forSaleP = renderPosts(forSalePosts);
        forSalePosts.length === 0 ? bulletinBoard.append(noMatch) : bulletinBoard.append(forSaleP);
    });

    catTwo.addEventListener('click', async () => {
        bulletinBoard.textContent = '';
        const freePosts = await getPostsByCategory(2);
        const freeP = renderPosts(freePosts);
        freePosts.length === 0 ? bulletinBoard.append('No posts match your request') : bulletinBoard.append(freeP);
    });

    catThree.addEventListener('click', async () => {
        bulletinBoard.textContent = '';
        const eventPosts = await getPostsByCategory(3);
        const eventP = renderPosts(eventPosts);
        eventPosts.length === 0 ? bulletinBoard.append('No posts match your request') : bulletinBoard.append(eventP);
    });

    catFour.addEventListener('click', async () => {
        bulletinBoard.textContent = '';
        const housingPosts = await getPostsByCategory(4);
        const housingP = renderPosts(housingPosts);
        housingPosts.length === 0 ? bulletinBoard.append('No posts match your request') : bulletinBoard.append(housingP);
    });

    catFive.addEventListener('click', async () => {
        bulletinBoard.textContent = '';
        const miscPosts = await getPostsByCategory(5);
        const miscP = renderPosts(miscPosts);
        miscPosts.length === 0 ? bulletinBoard.append('No posts match your request') : bulletinBoard.append(miscP);
    });

    catDiv.classList.add('cat-div');
    catDiv.append(catOne, catTwo, catThree, catFour, catFive);
    bulletinBoard.append(catDiv);

}

renderCatsOnTheFly();