let posts = [];

exports.getPosts = (req, res) => {
  res.json(posts);
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content, author: req.user.username });
  res.json({ message: 'Post created successfully' });
};
