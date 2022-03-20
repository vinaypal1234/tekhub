// ADD COURSE
let courseImage = document.getElementById("image");
let courseName = document.getElementById("name");
let coursePrice = document.getElementById("price");
let courseDuration = document.getElementById("duration");
let courseDescription = document.getElementById("description");
let courseCategory = document.getElementById("course-category");

document.getElementById("add-course-btn").addEventListener("click", (e) => {
  e.preventDefault();
  let courseData = {
    name: courseName.value,
    price: coursePrice.value,
    description: courseDescription.value,
    img: courseImage.value,
    category: courseCategory.value,
    duration: courseDuration.value,
  };
  // console.log(courseCategory.value);

  fetch("/addCourseData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  })
    .then((res) => res.text())
    .then((data) => {
      alert(data);
      location.href = "/admin/dashboard/coursemanagement";
      courseName.value = "";
      coursePrice.value = "";
      courseDescription.value = "";
      courseDuration.value = "";
      courseImage.value = "";
      courseCategory.value = "";
    });
});
