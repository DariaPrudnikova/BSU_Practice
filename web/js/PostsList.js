// eslint-disable-next-line no-unused-vars
class PostsList {
  constructor(posts) {
    this._posts = posts;
  }

  static validate(post) {
    console.log(`validating ${post}`);
    return true;
  }

  get(id) {
    return this._posts[id];
  }

  add(post) {
    if (!PostsList.validate(post)) return false;
    this._posts.push(post);
    return true;
  }

  remove(id) {
    this._posts = this._posts.filter(post => post.id !== id);
    return this._posts;
  }
}
