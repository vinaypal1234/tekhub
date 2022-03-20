const adminRouter = require("express").Router();

const {
  Course,
  Admin,
  CourseCategory,
  Register,
  Feedback,
} = require("../Model");

// -----------------------------------ADMIN LOGIN ROUTE-----------------------------------------------
adminRouter.get("/admin/login", (req, res) => {
  res.render("admin_views/adminLogin");
});

adminRouter.post("/adminCeredentials", async (req, res) => {
  try {
    const adminData = await Admin.findOne({ username: req.body.username });
    if (adminData.password === req.body.password) {
      req.session.username = adminData.username;
      res.redirect("admin/dashboard");
    } else {
      res.send("Invalid Ceredentials");
    }
  } catch (err) {
    console.log(err);
  }
});

// ------------------------------ADMIN LOGIN ROUTE ENDS-------------------

// --------------------------ADMIN DASHBOARD ROUTE-----------------------------------------
adminRouter.get("/admin/Dashboard", (req, res) => {
  if (req.session.username) {
    res.render("admin_views/adminDashboard");
  } else {
    res.redirect("/admin/login");
  }
});
// ----------------------------ADMIN DAHBOARD ROUTE ENDS------------------------------

// ---------------------------------------ADMIN DASHBOARD COURSE MANAGEMENT ROUTE---------------------------------------
adminRouter.get("/admin/dashboard/courseManagement", async (req, res) => {
  if (req.session.username) {
    try {
      const allCourseData = await Course.find();
      // console.log(allCourseData.length)
      let limit = 5;
      let totalPage = Math.ceil(allCourseData.length / limit);
      res.render("admin_views/courseManagement", {
        totalPage: totalPage,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/admin/login");
  }
});

// FETCHING COURSE DATA FROM DATABASE
adminRouter.get("/getCourseData/:page", async (req, res) => {
  try {
    let page = req.params.page;
    let limit = 5;
    let offset = (page - 1) * limit;
    const courseData = await Course.find().limit(limit).skip(offset);
    //   const getUsername = await adminRouter.find({
    //     username: req.session.username,
    //   });
    res.json(courseData);
  } catch (err) {
    console.log(err);
  }
});

// ADD COURSE ROUTE
adminRouter.get("/admin/dashboard/addCourse", async (req, res) => {
  try {
    if (req.session.username) {
      const courseCategory = await CourseCategory.find();

      res.render("admin_views/addCourse", { courseCategory: courseCategory });
    } else {
      res.redirect("/admin/login");
    }
  } catch (err) {
    res.send(err);
  }
});

// ADD COURSE
adminRouter.post("/addCourseData", async (req, res) => {
  console.log(req.body);
  try {
    let courseData = new Course(req.body);
    let saveCourse = await courseData.save();
    if (saveCourse) {
      res.send("Course added Succesfully");
    } else {
      res.send("Failed");
    }
  } catch (err) {
    res.send(err);
  }
});

// GET COURSE TO EDIT
adminRouter.get("/getCourseToEdit/:courseId", async (req, res) => {
  try {
    const courseData = await Course.find({ _id: req.params.courseId });

    res.json(courseData);
  } catch (err) {
    res.send(err);
  }
});

// EDIT COURSE
adminRouter.patch("/editCourse/:courseId", async (req, res) => {
  const { img, name, price, author } = req.body;
  try {
    const findCourseToEdit = await Course.updateOne(
      { _id: req.params.courseId },
      {
        $set: {
          img,
          name,
          price,
          author,
        },
      }
    );
    if (findCourseToEdit) {
      res.send("Course Edited Successfully");
    } else {
      res.send("Course Edit Failed");
    }
  } catch (err) {
    res.send(err);
  }
});

// DEACTIVATE COURSE
adminRouter.get("/deactivateCourse/:id", async (req, res) => {
  try {
    const courseData = await Course.updateOne(
      { _id: req.params.id },
      { $set: { status: "deactive" } }
    );
    res.send("Course Deactivated");
  } catch (err) {
    res.send(err);
  }
  console.log(req.params.id);
});

// ACTIVATE COURSE
adminRouter.get("/activateCourse/:id", async (req, res) => {
  try {
    const courseData = await Course.updateOne(
      { _id: req.params.id },
      { $set: { status: "active" } }
    );
    res.send("Course activated");
  } catch (err) {
    res.send(err);
  }
  console.log(req.params.id);
});

// DELETE COURSE
adminRouter.get("/deleteCourse/:id", async (req, res) => {
  try {
    const courseData = await Course.deleteOne({ _id: req.params.id });
    res.send("Course Deleted");
  } catch (err) {
    res.send(err);
  }
});
// -------------------------------------------------ADMIN DASHBOARD COURSE MANAGEMENT ROUTE ENDS-----------------------

//----------------------------------------ADMIN DASHBOARD STUDENT MANAGEMENT ROUTE---------------------------------------------------------
adminRouter.get("/admin/dashboard/studentManagement", async (req, res) => {
  if (req.session.username) {
    try {
      const allStudentData = await Register.find();
      let limit = 10;
      let totalPage = Math.ceil(allStudentData.length / limit);
      res.render("admin_views/studentManagement", {
        totalPage: totalPage,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/admin/login");
  }
});

// FETCHING STUDENT DATA FROM DATABASE
adminRouter.get("/getStudentData/:page", async (req, res) => {
  try {
    let page = req.params.page;
    let limit = 10;
    let offset = (page - 1) * limit;
    const studentData = await Register.find().limit(limit).skip(offset);
    if (studentData) {
      res.status(200).json(studentData);
    }
  } catch (err) {
    console.log(err);
  }
});

// ADD STUDENT
adminRouter.get("/admin/dashboard/addStudent", (req, res) => {
  if (req.session.username) {
    res.render("admin_views/addStudent");
  } else {
    res.redirect("admin/login");
  }
});

// DELETE STUDENT
adminRouter.delete("/deleteStudent/:studentId", async (req, res) => {
  try {
    const findStudentToDelete = await Register.findOneAndDelete({
      _id: req.params.studentId,
    });
    if (findStudentToDelete) {
      res.status(200).json({ message: "Student Deleted" });
    } else {
      res.status(400).json({ message: "Request Failed" });
    }
  } catch (err) {
    res.send(err);
  }
});

// GET STUDENT TO EDIT BY STUDENT ID
adminRouter.get("/getStudentToEdit/:studentId", async (req, res) => {
  try {
    const findStudentToEdit = await Register.find({
      _id: req.params.studentId,
    });
    if (findStudentToEdit) {
      res.status(200).json(findStudentToEdit);
    } else {
      res.status(400).json({ message: "Request Failed" });
    }
  } catch (err) {
    res.send(err);
  }
});

// EDIT STUDENT
adminRouter.patch("/editStudent/:courseId", async (req, res) => {
  const { fullname, number, email } = req.body;
  try {
    const updateStudent = await Register.updateOne(
      { _id: req.params.courseId },
      {
        $set: {
          fullname,
          number,
          email,
        },
      }
    );
    if (updateStudent) {
      res.status(200).json({ message: "Student Edited Successfully" });
    } else {
      res.status(400).json({ message: "Student Edit Failed" });
    }
  } catch (err) {
    res.send(err);
  }
});

// ---------------------------------ADMIN DASHBOARD STUDENT MANAGEMENT ROUTE ENDS-----------

// FEEDBACK MANAGEMENT

adminRouter.get("/admin/dashboard/feedbackManagement", async (req, res) => {
  if (req.session.username) {
    try {
      const allFeedbackData = await Feedback.find();
      let limit = 5;
      let totalPage = Math.ceil(allFeedbackData.length / limit);
      res.render("admin_views/feedbackManagement", {
        totalPage: totalPage,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/admin/login");
  }
});

// GET FEEDBACK DATA
adminRouter.get("/getFeedbackData/:page", async (req, res) => {
  try {
    let page = req.params.page;
    let limit = 5;
    let offset = (page - 1) * limit;
    const feedbackData = await Feedback.find().limit(limit).skip(offset);
    if (feedbackData) {
      res.status(200).json(feedbackData);
    }
    // console.log(feedbackData);
  } catch (err) {
    console.log(err);
  }
});

// DEACTIVATE FEEDBACK
adminRouter.get("/deactivateFeedback/:id", async (req, res) => {
  try {
    const FeedbackData = await Feedback.updateOne(
      { _id: req.params.id },
      { $set: { status: "deactive" } }
    );
    res.send("Feedback Deactivated");
  } catch (err) {
    res.send(err);
  }
  console.log(req.params.id);
});

// ACTIVATE FEEDBACK
adminRouter.get("/activateFeedback/:id", async (req, res) => {
  try {
    const FeedbackData = await Feedback.updateOne(
      { _id: req.params.id },
      { $set: { status: "active" } }
    );
    res.send("Feedback activated");
  } catch (err) {
    res.send(err);
  }
  console.log(req.params.id);
});

// DELETE FEEDBACK
adminRouter.delete("/deleteFeedback/:feedbackId", async (req, res) => {
  try {
    const findFeedbackToDelete = await Feedback.findOneAndDelete({
      _id: req.params.feedbackId,
    });
    if (findFeedbackToDelete) {
      res.status(200).json({ message: "Feedback Deleted" });
    } else {
      res.status(400).json({ message: "Request Failed" });
    }
  } catch (err) {
    res.send(err);
  }
});

// -------------------------------------FEEDBACK MANAGEMENT ENDS---

// ADMIN LOGOUT
adminRouter.get("/logoutAdmin", (req, res) => {
  if (req.session.username) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  }
});

module.exports = adminRouter;

// ---------------------------------------------------------------------------------------------------------------\
