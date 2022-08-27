const SUPABASE_URL = 'https://ycrjdcltdpujspwklmtr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljcmpkY2x0ZHB1anNwd2tsbXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk2NDA4ODAsImV4cCI6MTk3NTIxNjg4MH0.09-eHnBOrLeSZ5iozNMkme5G9W9_LfVD2GYU4ycn4eg';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    if (!user) location.replace(`/auth/?redirectUrl=${encodeURIComponent(location)}`);
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({ email, password });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({ email, password });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Helper for logging errors */

function checkError({ data, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : data;
}

/* Categories */

export async function getCategories() {
    const response = await client.from('categories').select('*');
    return checkError(response);
}

/* Posts */

export async function getPosts() {
    const response = await client.from('posts').select(`
        *,
        category:categories(*)
    `);
    return checkError(response);
}

export async function createPost(post) {
    return await client.from('posts').insert(post);
}

export async function getPostDetail(id) {
    const response = await client.from('posts').select('*, category: categories(*)').match({ id }).single();
    return checkError(response);
}

// deletes post from supabase by post ID
export async function deletePost(id) {
    return await client.from('posts').delete().match({ id });
}

export async function getProfiles() {
    const response = await client.from('profiles').select('*');
    return checkError(response);
    // return await client.from('profiles').select('*');
}

export async function getProfile(id) {
    // const response = await client.from('profiles').match({ id });
    // return checkError(response);
    return await client.from('profiles').select('*').match({ id }).single();
}

export async function saveProfile(profile) {
    // const response = await client.from('profiles').upsert(profile).single();
    // return checkError(response);
    return await client.from('profiles').upsert(profile).single();
}

export async function getPostsByCategory(category_id) {
    const response = await client.from('posts').select('*, category: categories(*)').match({ category_id });
    return checkError(response);
}
