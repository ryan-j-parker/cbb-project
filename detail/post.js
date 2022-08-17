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
    contactEl.textContent = `${post.content}`;
    contactEl.classList.add('contact');

    const commentSection = document.createElement('div');
    const commentInput = document.createElement('input');
    commentInput.classList.add('comment-input');
    const postComment = document.createElement('button');
    postComment.classList.add('post-comment');

    postComment.textContent = 'Post comment';

    commentSection.append(commentInput, postComment);
    postIt.append(deleteBtn, categoryEl, postTitle, postDescription, contactEl, commentSection);

    return postIt;
}

