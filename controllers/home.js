const BlogPost = require("./../models/BlogPost");

module.exports = async (req, res) => {
  const blogPosts = await BlogPost.find({})
    .then((blogPosts) => {
      res.render("index", { blogPosts });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  console.log(req.session);
};
