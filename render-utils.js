export function renderCategoryOptions(categories) {
    // document fragment is a "bag" for elements
    const fragment = document.createDocumentFragment();

    for (const category of categories) {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = `${category.emoji} ${category.name}`;
        fragment.append(option);
    }

    return fragment;
}

export function renderPosts(posts) {
    const fragment = document.createDocumentFragment();

    for (const post of posts) {

        const a = document.createElement('a');
        a.href = `../detail/?id=${post.id}`;

        const li = document.createElement('li');
        li.classList.add('post-it');

        const titleEl = document.createElement('h2');
        titleEl.textContent = post.title;

        const categoryEl = document.createElement('span');
        categoryEl.classList.add('category');
        categoryEl.title = post.category.name;
        categoryEl.textContent = post.category.emoji;

        const descriptionEl = document.createElement('p');
        descriptionEl.classList.add('description');
        descriptionEl.textContent = post.description;

        const contactEl = document.createElement('p');
        contactEl.textContent = post.contact;

        li.append(titleEl, categoryEl, descriptionEl, contactEl);

        a.append(li);
        fragment.append(a);
    
    }

    return fragment;
}

export function renderPostDetail(post) {

    const postIt = document.createElement('div');
    postIt.classList.add('post-detail-container');

    const deletePost = document.createElement('button');
    deletePost.classList.add('delete-post-btn');
    deletePost.textContent = 'Delete post';

    const categoryEl = document.createElement('p');
    categoryEl.textContent = `${post.category.emoji}`;
    console.log(post);

    const postTitle = document.createElement('h2');
    postTitle.textContent = `${post.title}`;
    postTitle.classList.add('post-title-detail');

    const postDescription = document.createElement('p');
    postDescription.classList.add('post-description-detail');
    postDescription.textContent = `${post.description}`;

    const contactEl = document.createElement('p');
    contactEl.textContent = `${post.content}`;
    contactEl.classList.add('contact-detail');

    const commentSection = document.createElement('div');
    const commentInput = document.createElement('input');
    commentInput.classList.add('comment-input');
    const postComment = document.createElement('button');
    postComment.classList.add('post-comment');

    postComment.textContent = 'Post comment';

    commentSection.append(commentInput, postComment);
    postIt.append(deletePost, categoryEl, postTitle, postDescription, contactEl, commentSection);

    return postIt;
}
