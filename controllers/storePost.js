const BlogPost = require("./../models/BlogPost");
const path = require("path");

module.exports = async (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "../public/img", image.name));

  const blogPost = {
    title: req.body.title,
    body: req.body.body,
    image: "/img/" + image.name,
  };

  await BlogPost.create(blogPost)
    .then((blogPost) => {
      console.log("Created Post: ", blogPost);
    })
    .catch((err) => {
      console.log("error: ", err);
    });

  res.redirect("/");
};
