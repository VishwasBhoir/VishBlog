const BlogPost = require("./../models/BlogPost");

module.exports = async (req, res) => {
  const postID = req.params.id;
  const blogPost = await BlogPost.findById(postID);
  res.render("post", { blogPost });
};

