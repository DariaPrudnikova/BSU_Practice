(() => {
  const logFunctionCall = (func, context, params) => {
    let result;
    if (params.length) result = func.apply(context, params);
    else result = func.call(context, params);

    if (typeof params === 'object') {
      console.log(`${func.name}(${JSON.stringify(params).slice(1, -1)})`);
    } else {
      console.log(`${func.name}(${params})`);
    }
    console.log(result);
  };

  const referenceDate = new Date('2020-02-15T23:00:00');

  const testData = {
    getPage: [
      [],
      [0, 5],
      [5, 3],
      [0, 10, { authorId: 2 }],
      [0, 10, { date: { before: referenceDate } }],
      [0, 10, { date: { after: referenceDate } }],
      [0, 10, { date: { after: referenceDate }, authorId: 1 }],
      [0, 10, { hashTag: 'cool' }],
    ],

    get: [1, 2, 15],

    add: [
      {
        id: 100,
        content: 'This post was created by addPost() function.',
        author: {
          id: 2,
          author: '@Daria',
        },
        createdAt: referenceDate,
      },
    ],

    edit: [
      [1, { content: 'This post was edited with editPost() function.' }],
      [7, { content: 'This post was edited with editPost() function.', createdAt: new Date() }],
    ],

    remove: [1, 2, 10],

    validate: [
      {
        id: 300,
        content: 'This is the valid post example.',
        author: {
          id: 2,
          author: '@Daria',
        },
        createdAt: referenceDate,
      },
      {
        id: 300,
        content: 'This post is invalid since it has no createdAt field.',
        author: {
          id: 2,
          author: '@Daria',
        },
      },
    ],
  };

  /* eslint-disable no-undef */
  window.testPostCollection = () => {
    const postCollection = new PostList(testPosts);
    console.warn('Running pseudo-tests (demo) for PostCollection class:');
    Object.keys(testData).forEach(method => {
      const isStatic = (method === 'validate');
      const context = isStatic ? PostList : postCollection;
      testData[method].forEach(
        params => logFunctionCall(context[method], context, params),
      );
    });
  };
})();
