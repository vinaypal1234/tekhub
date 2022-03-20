// IMPORT MONGOOSE TO CREATE SCHEMA
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// CONTACT SCHEMA
const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 20,
  },
});

// COURSE SCHEMA
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toDateString(),
  },
  status: {
    type: String,
    default: "active",
  },
});

// REGISETR SCHEMA
const registerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    default: "hey",
  },
  date: {
    type: String,
    default: new Date().toDateString(),
  },
});

// ADMIN SCHEMA
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  courseImg: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  coursePrice: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
  },
});

// FEEDBACK SCHEMA
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toDateString(),
  },
  status: {
    type: String,
    default: "deactive",
  },
});

// COURSE CATEGORY SCHMEA
const courseCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

registerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// CONTACT COLLECTION
const ContactUs = new mongoose.model("contact_us", contactUsSchema);

// COURSE COLLECTION
const Course = new mongoose.model("courses", courseSchema);

// REGSITER COLLECTION
const Register = new mongoose.model("register", registerSchema);

// ADMIN COLLECTION
const Admin = new mongoose.model("admin", adminSchema);

// CART COLLECTION
const Cart = new mongoose.model("cart", cartSchema);

// ENQUIRY MODEL
const Feedback = new mongoose.model("feedback", feedbackSchema);

// COURSE CATEGORY MODEL
const CourseCategory = new mongoose.model(
  "course_category",
  courseCategorySchema
);

// EXPORT
module.exports = {
  ContactUs,
  Course,
  Register,
  Admin,
  Cart,
  CourseCategory,
  Feedback,
};
