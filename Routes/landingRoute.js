const mainRouter = require("express").Router();
const {
  Course,
  Register,
  Cart,
  CourseCategory,
  Feedback,
} = require("../Model");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const { response } = require("express");

// -------------------------HOME ROUTE----------------------
mainRouter.get("/", async (req, res) => {
  try {
    // getting 8 course which is newly added
    const newCourseData = await Course.find({ status: "active" })
      .sort({ _id: -1 })
      .limit(8);

    const courseCategory = await CourseCategory.find();
    // console.log(courseCategory);

    const feedback = await Feedback.find({ status: "active" });

    res.render("landing_views/home", {
      newCourseData: newCourseData,
      courseCategory: courseCategory,
      feedback: feedback,
    });
  } catch (err) {
    console.log(err);
  }
});

// --------------------HOME ROUTE ENDS--------------------------------

// ----------------------------COURSE ROUTE----------------------------------
mainRouter.get("/course", async (req, res) => {
  try {
    const courseCategory = await CourseCategory.find();
    res
      .status(200)
      .render("landing_views/course", { courseCategory: courseCategory });
  } catch (err) {
    console.log(err);
  }
});

// FETCH COURSE
mainRouter.get("/getCourse/:page", async (req, res) => {
  try {
    let limit = 8 * req.params.page;
    const allCourseData = await Course.find({ status: "active" }).limit(limit);
    if (allCourseData.length < 1) {
      res.status(404).json({ message: "Data Not Found" });
    } else {
      res.status(200).json(allCourseData);
    }
  } catch (err) {
    console.log(err);
  }
});

// FETCH COURSE BT CATEGORY
mainRouter.get("/course/:category", async (req, res) => {
  try {
    const getCourseByCategory = await Course.find({
      $and: [
        {
          category: req.params.category,
        },
        {
          status: "active",
        },
      ],
    });
    const courseCategory = await CourseCategory.find();
    if (getCourseByCategory) {
      res.status(200).render("landing_views/courseByCategory", {
        courseCategory: courseCategory,
        courseByCategory: getCourseByCategory,
      });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

// COURSE DETAIL
mainRouter.get("/courseDetail/:courseId", async (req, res) => {
  try {
    const singleCourseData = await Course.findOne({ _id: req.params.courseId });
    res.json(singleCourseData);
  } catch (err) {
    res.send(err);
  }
});

// -----------------------COURSE ROUTE ENDS------------------------------------

// ------------------------------LOGIN ROUTE---------------------------------
mainRouter.get("/login", async (req, res) => {
  try {
    if (req.session.email) {
      res.redirect("/");
    } else {
      const courseCategory = await CourseCategory.find();
      res.render("landing_views/login", { courseCategory: courseCategory });
    }
  } catch (err) {
    res.send(err);
  }
});

mainRouter.post("/loginStudent", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      res.status(400).json({ message: "Fill Both The Fields" });
    } else {
      let isEmailExist = await Register.findOne({ email: email });
      if (!isEmailExist) {
        res.status(400).json({ message: "Invalid Ceredentials" });
      } else {
        const comparePassword = await bcrypt.compare(
          password,
          isEmailExist.password
        );
        if (!comparePassword) {
          res.status(400).json({ message: "Invalid Ceredentials" });
        } else {
          req.session.email = isEmailExist.email;
          req.session.userId = isEmailExist._id;
          res.status(200).json({ message: "Login Successfull" });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// -----------------------LOGI ROUTE ENDS---------------------------------

// ------------------------------REGISTER STUDENT ROUTE---------------------------
mainRouter.get("/register", async (req, res) => {
  try {
    if (req.session.email) {
      res.redirect("/");
    } else {
      const courseCategory = await CourseCategory.find();
      res.render("landing_views/register", { courseCategory: courseCategory });
    }
  } catch (err) {
    res.send(err);
  }
});

mainRouter.post("/registerStudent", async (req, res) => {
  try {
    const { fullname, number, email, password } = req.body;
    if (
      fullname.value == "" ||
      number.value == "" ||
      email.value == "" ||
      password.value == ""
    ) {
      res.status(400).res.json({ message: "All Fields Are Required" });
    } else {
      let isEmailExist = await Register.findOne({ email: req.body.email });
      if (isEmailExist) {
        res.status(400).json({ message: "Email Exist" });
      } else {
        let studentData = new Register(req.body);
        const saveStudentData = await studentData.save();
        if (saveStudentData) {
          res.status(200).json({ message: "Registration Succesfull" });
        }
      }
    }
  } catch (err) {
    res.send(err);
  }
});

// ------------------------REGISTER STUENT ROUTE ENDS-------------------------------

// ----------------------------CART ROUTE----------------------
mainRouter.get("/cart", async (req, res) => {
  try {
    if (req.session.email) {
      let getCart = await Cart.find({ userId: req.session.userId });
      const courseCategory = await CourseCategory.find();
      if (getCart.length < 1) {
        res.render("landing_views/cart", { courseCategory: courseCategory });
      } else {
        res.locals.cartData = !null;
        res.render("landing_views/cart", {
          cartData: getCart,
          courseCategory: courseCategory,
        });
      }
      //
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.send(err);
  }
});

// ADD TO CART ROUTE
mainRouter.get("/addToCart/:courseId", async (req, res) => {
  try {
    if (req.session.email) {
      // IF COURSE ALREADY IN CART
      const inAlreadyInCart = await Cart.findOne({
        $and: [
          { userId: req.session.userId },
          { courseId: req.params.courseId },
        ],
      });

      if (inAlreadyInCart) {
        res.status(400).json({ message: "Already In Cart" });
      } else {
        const getCart = await Course.findOne({ _id: req.params.courseId });
        const { img, name, price } = getCart;
        const addToCart = await new Cart({
          userId: req.session.userId,
          courseId: req.params.courseId,
          courseImg: img,
          courseName: name,
          coursePrice: price,
          orderDate: new Date().toLocaleDateString(),
        });
        const addItemToCart = await addToCart.save();
        if (addItemToCart) {
          res.status(200).json({ message: "Added To Cart" });
        } else {
          res.status(400).json({ message: "Item Didn't Added To Cart " });
        }
      }
      // }
    } else {
      res.status(400).json({ message: "Login First" });
    }
  } catch (err) {
    console.log(err);
  }
});

// REMOVE TO CART
mainRouter.get("/removeToCart/:courseId", async (req, res) => {
  try {
    const itemToRemove = await Cart.findOneAndDelete({
      $and: [{ userId: req.session.userId }, { courseId: req.params.courseId }],
    });
    if (itemToRemove) {
      res.status(200).json({ message: "Item Removed" });
    } else {
      res.status(400)("Failed To Remove Item ");
    }
  } catch (err) {
    console.log(err);
  }

  // console.log(itemToRemove)
});

// -----------------CART ROUTE ENDS------------------------------

//--------------------FEEDBACK ROUTE-----------------------------
mainRouter.get("/feedback", async (req, res) => {
  const courseCategory = await CourseCategory.find();
  res.render("landing_views/feedback", { courseCategory: courseCategory });
});

mainRouter.post("/sendFeedback", async (req, res) => {
  const feedback = new Feedback(req.body);
  const isFeedbackSent = await feedback.save();
  if (isFeedbackSent) {
    res.status(200).json({ message: "Feedback Sent Succesfully" });
  } else {
    res.status(401).json({ message: "Failed" });
  }
});

// -------------------------------LOGOUT ROUTE----------------------------------------
mainRouter.get("/logoutStudent", (req, res) => {
  if (req.session.email) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  }
});
// ------------------------------LOGOUT ROUTE ENDS----------------------

mainRouter.post("/addManyCourse", async (req, res) => {
  console.log(req.body);

  try {
    const addCourse = await Course.insertMany(req.body);
    // const idCourseAdded = await addCourse.save()
    if (addCourse) {
      res.send("got");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = mainRouter;
