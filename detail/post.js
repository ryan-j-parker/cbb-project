import { getPostDetail } from '../fetch-utils';

function renderPostDetail(title, description) {
    
    const postItDetail = document.getElementById('post-it-detail');

    const postIt = document.createElement('div');
    postIt.classList.add('post-it-detail');

    const postTitle = document.createElement('h2');
    postTitle.classList.add('post-title-detail');
    
    const postDescription = document.createElement('p');
    postDescription.classList.add('post-description-detail');

    const commentSection = document.createElement('div');
    const commentInput = document.createElement('input');
    commentInput.classList.add('comment-input');
    const postComment = document.createElement('button');
    postComment.classList.add('post-comment');

    postTitle.textContent = title;
    postDescription.textContent = description;
    postComment.textContent = 'Post comment';

    commentSection.append(commentInput, postComment);
    postIt.append(postTitle, postDescription);
    postItDetail.append(postIt, commentSection);
    
    return postIt;
}

async function displayPost() {
    
}