import { getPostDetail } from '../fetch-utils.js';
import { renderPostDetail } from '../render-utils.js';


const postItDetail = document.getElementById('post-it-detail');
const params = new URLSearchParams(window.location.search);

async function displayPost() {
    const post = await getPostDetail(params.get('id'));
    const postDetailEl = renderPostDetail(post);
    postItDetail.append(postDetailEl);
}

displayPost();
