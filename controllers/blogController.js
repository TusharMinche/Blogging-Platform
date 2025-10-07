const Blogs = require("../models/blogs");

const home = async (req, res) => {
  const sort = req.query.sort || "title"
  const perPage = 5;
  const page = req.query.page || 1
  try {
    
    const blogs = await Blogs.find()
    .sort({[sort]: 1})
    .skip((perPage * page) - perPage)
    .limit(perPage)

    const count = await Blogs.countDocuments()
    const totalPages = Math.ceil(count/perPage)
    res.render("home", { message: null, blogData: blogs, current: page, pages: totalPages, sort });
  } catch (error) {
    res.render("home", {
      message: "Blog can not be loaded at this moment",
    });
  }
};

const myBlogs = async (req, res) => {
  const userId = req.session.userId;
  const myBlogs = await Blogs.find({ userId });
  res.render("myblogs", { message: null, blogData: myBlogs });
};

const addBlog = (req, res) => {
  res.render("addblog", { message: null });
};

const editBlog = async (req, res) => {
  try {
    const { blogId } = req.query;
    const blogData = await Blogs.findOne({ _id: blogId });
    res.render("editblog", { message: null, blogData });
  } catch (error) {
    res.render("editblog", {
      message: "Blog can not be edited at this moment",
    });
  }
};

const createBlog = (req, res) => {
  try {
    const { title, body } = req.body;
    const newBlog = new Blogs({ title, body, userId: req.session.userId });
    newBlog
      .save()
      .then((response) => {
        res.redirect("/myblogs");
      })
      .catch((err) => {
        res.render("addblog", {
          message: "Blog can not be saved at this moment",
        });
      });
  } catch (error) {
    res.render("addblog", {
      message: "Can not create a blog due to server error",
    });
  }
};

const updateBlog = (req, res) => {
  try {
    const { blogId } = req.query;
    Blogs.findByIdAndUpdate({ _id: blogId }, req.body)
      .then((response) => {
        res.redirect("/myblogs");
      })
      .catch((err) => {
        res.render("editblog", { message: "Can not edit" });
      });
  } catch (err) {
    res.render("editblog", {
      message: "Can not edit a blog due to server error",
    });
  }
};

const deleteBlog = (req, res) => {
  try {
    const { blogId } = req.query;
    Blogs.findByIdAndDelete({ _id: blogId })
      .then((response) => {
        res.redirect("/myblogs");
      })
      .catch((err) => {
        res.redirect("/myblogs");
      });
  } catch (error) {
    res.render("myblogs", {
      message: "Can not create a blog due to server error",
    });
  }
};

module.exports = {
  home,
  myBlogs,
  addBlog,
  createBlog,
  deleteBlog,
  editBlog,
  updateBlog,
};
