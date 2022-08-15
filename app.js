// importing other stuff, utility functions for:
// working with supabase
import { checkAuth, signOutUser, getPosts } from './fetch-utils.js';
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
