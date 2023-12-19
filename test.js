const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/my_database");

const post = {
  title: `2 Blog`,
  body: `If you have been here a long time, you might remember when I went on ITV Tonight to
dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money
topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery
opens up. You know those bullet-point lists. You start spotting them everything at this time of year.
They go like this:`,
};

BlogPost.findById('657b65c47a934dd5e738b4a5')
  .then((posts) => {
    console.log(`Posts found:`, posts);
  })
  .catch((err) => {
    console.log(`Error: `, err);
  });
