export const BACKEND_URL = 'http://localhost:8080';

export const GET_BLOG_DATA = {
  url: 'blog-posts',
  method: 'GET',
};

export const UPDATE_BLOG_DATA = (blogId) => ({
  url: `blog-posts/${blogId}`,
  method: 'PUT',
});
