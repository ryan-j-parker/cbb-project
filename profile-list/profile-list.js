import { getProfiles, checkAuth, signOutUser } from '../fetch-utils.js';
import { renderProfile } from '../render-utils.js';

const profilesList = document.getElementById('profiles-list');

async function displayProfiles() {
    const users = await getProfiles();
    for (let user of users) {
        profilesList.append(renderProfile(user));
    }
}

displayProfiles();

const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
checkAuth();