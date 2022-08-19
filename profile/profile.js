import { getProfile, saveProfile, checkAuth } from '../fetch-utils.js';

const profileForm = document.getElementById('profile-form');
const profileNameInput = profileForm.querySelector('[name=profile-name]');
const profileBioInput = profileForm.querySelector('[name=profile-bio]');
const errorDisplay = profileForm.querySelector('.error');
const user = checkAuth();

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorDisplay.textContent = '';
    const data = new FormData(profileForm);
    const response = await saveProfile({
        name: data.get('profile-name'),

        bio: data.get('profile-bio'),
    });

    const error = response.error;

    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        location.assign('../');
    }
    profileForm.reset();
});

async function displayProfile() {
    const response = await getProfile(user.id);
    const profile = response.data;
    if (profile) {
        profileNameInput.value = profile.name;
        profileBioInput.value = profile.bio;
    }
}

displayProfile();

