

const Post = require('../models/Post');

async function createPost  (req, res) {
  try {
    const post = new Post({
      ...req.body,
      author: req.user.id, 
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

async function getAllPosts (req, res) {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function findPostByTitle  (req, res)  {
  try {
    const post = await Post.findOne({ title: req.params.title });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function updatePost (req, res) {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

async function deletePost  (req, res) {
  try {
    const post = await Post.findOne({ _id: req.params.id, $or: [{ author: req.user._id }, { role: 'admin' }] });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
    findPostByTitle,
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    
  };