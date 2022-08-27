import { getPostDetail, checkAuth, deletePost } from '../fetch-utils.js';
import { renderPostDetail } from '../render-utils.js';

const postItDetail = document.getElementById('post-it-detail');
const params = new URLSearchParams(window.location.search);

async function displayPost() {
    const user = checkAuth();
    
    const post = await getPostDetail(params.get('id'));
    if (user.id === post.user_id) {
        const authPost = authPostDetail(post);
        postItDetail.append(authPost);
    } else {
        const postDetailEl = renderPostDetail(post);
        postItDetail.append(postDetailEl);
    }
    
}

displayPost();

// this is what renders the detail page if the user trying to access the post's detail page is the same user that created the post
function authPostDetail(post) {

    const postIt = document.createElement('div');
    postIt.classList.add('post-it');

    const deleteBtn = document.createElement('button');
    deleteBtn.addEventListener('click', async () => {
        await deletePost(post.id);
        location.href = '../';
    });
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'Delete';

    const categoryEl = document.createElement('p');
    categoryEl.classList.add('category');
    categoryEl.textContent = `${post.category.emoji}`;

    const postTitle = document.createElement('h2');
    postTitle.textContent = `${post.title}`;
    postTitle.classList.add('title');

    const postDescription = document.createElement('p');
    postDescription.classList.add('description');
    postDescription.textContent = `${post.description}`;

    const contactEl = document.createElement('p');
    contactEl.textContent = `${post.contact}`;
    contactEl.classList.add('contact');

    postIt.append(deleteBtn, categoryEl, postTitle, postDescription, contactEl);

    return postIt;
}

