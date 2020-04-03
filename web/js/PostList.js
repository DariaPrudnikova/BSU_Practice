// eslint-disable-next-line no-unused-vars
class PostList {
  constructor(posts) {
    this._posts = posts;
  }

  static validate(post) {
    console.log(`validating ${post}`);
    return true;
  }

  _filter(posts, filterConfig) {
    console.log(`filtering by ${filterConfig}`);
    return posts;
  }

  getPage(skip, top, filterConfig = {}) {
    const page = this._posts.slice(skip, skip + top);
    return this._filter(page, filterConfig);
  }

  get(id) {
    return this._posts[id];
  }

  add(post) {
    if (!PostList.validate(post)) return false;
    this._posts.push(post);
    return true;
  }

  addAll(posts) {
    return posts.reduce((invalidPosts, post) => {
      const result = this.add(post);
      if (!result) invalidPosts.push(post);
      return invalidPosts;
    });
  }

  remove(id) {
    this._posts = this._posts.filter(post => post.id !== id);
    return this._posts;
  }
}
