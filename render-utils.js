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
    postIt.classList.add('post-it');

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

    postIt.append(categoryEl, postTitle, postDescription, contactEl);

    return postIt;
}

export function renderProfile(profile) {
    const div = document.createElement('div');
    div.classList.add('profile');

    const nameEl = document.createElement('h2');
    nameEl.textContent = `${profile.name}`;
    nameEl.classList.add('name');

    const bioEl = document.createElement('p');
    bioEl.textContent = `${profile.bio}`;
    bioEl.classList.add('bio');

    div.append(nameEl, bioEl);
    return div;
}