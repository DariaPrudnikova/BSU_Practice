// eslint-disable-next-line no-unused-vars
class PostList {
  constructor(posts) {
    this._posts = [];
    this.addAll(posts);
  }

  static validate(post) {
    if (!post) return false;
    if (!post.id || typeof post.id !== 'number') return false;
    if (!post.author || typeof post.author !== 'string') return false;
    if (!post.content || typeof post.content !== 'string') return false;
    if (!post.createdAt || typeof post.createdAt !== 'object') return false;

    if (post.imageUrl && typeof post.imageUrl !== 'string') return false;
    if (post.likes && typeof post.likes !== 'object') return false;
    if (post.hashTags && typeof post.hashTags !== 'object') return false;

    return true;
  }

  _filter(posts, filterConfig) {
    if (!filterConfig) return posts;
    const { createdAt, author } = filterConfig;
    return posts.filter(post => post.author === author && post.createdAt === createdAt);
  }

  getPage(skip = 0, top = 10, filterConfig = null) {
    const page = this._posts.slice(skip, skip + top);
    const sorted = page.sort((a, b) => a.createdAt < b.createdAt);
    return this._filter(sorted, filterConfig);
  }

  get(id) {
    return this._posts[id];
  }

  add(post) {
    if (!PostList.validate(post)) return false;
    this._posts.push(post);
    return true;
  }

  edit(id, data) {
    const index = this._posts.findIndex(post => post.id === id);
    const postToEdit = this._posts[index];
    const editedPost = { ...postToEdit, ...data };
    if (!PostList.validate(editedPost)) return false;
    this._posts[index] = editedPost;
    return editedPost;
  }

  addAll(posts) {
    return posts.reduce((invalidPosts, post) => {
      const result = this.add(post);
      if (!result) invalidPosts.push(post);
      return invalidPosts;
    }, []);
  }

  clear() {
    this._posts = [];
  }

  remove(id) {
    this._posts = this._posts.filter(post => post.id !== id);
    return this._posts;
  }
}
