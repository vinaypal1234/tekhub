// FETCHING COURSE FROM DATABASE
const showCourseData = (page = 1) => {
  let tableBody = document.querySelector("tbody");

  tableBody.innerHTML = "";

  fetch(`/getCourseData/${page}`)
    .then((res) => res.json())
    .then((data) => {
      data.map((course) => {
        if (course.status === "active") {
          tableBody.innerHTML += `
<tr>
    <td><img src=${course.img} /></td>
    <td>
        ${course.name}
    </td>
    <td>
        ${course.description}
    </td>
    <td>
       ${course.price}
    </td>
    <td>
       ${course.category}
    </td>
    <td>
       ${course.status}
    </td>
    <td>
      ${course.date}
    </td>
    <td>
      <span onclick="getCourseToEdit('${course._id}',${page})"><i class='bx bxs-edit'></i></span>
    </td>
    <td>
           <span onclick="delCourse('${course._id}',${page})"><i class='bx bxs-trash-alt'></i></span>
    </td>
    <td>
           <button onclick="deactivateCourse('${course._id}',${page})">Deactivate</button>
    </td>
</tr>

`;
        } else {
          tableBody.innerHTML += `
<tr>
    <td><img src=${course.img} /></td>
    <td>
        ${course.name}
    </td>
    <td>
       ${course.price}
    </td>
    <td>
       ${course.category}
    </td>
    <td>
       ${course.status}
    </td>
    <td>
      ${course.date}
    </td>
    <td>
      <span onclick="getCourseToEdit('${course._id}',${page})"><i class='bx bxs-edit'></i></span>
    </td>
    <td>
           <span onclick="delCourse('${course._id}',${page})"><i class='bx bxs-trash-alt'></i></span>
    </td>
    <td>
           <button onclick="activateCourse('${course._id}',${page})">Activate</button>
    </td>
</tr>

`;
        }
      });
    });
};

showCourseData();

// PAGINATION
const pagination = () => {
  let page = document.querySelectorAll("li");
  page.forEach((page) => {
    page.addEventListener("click", () => {
      showCourseData(page.textContent);
      window.scrollTo(0, 0);
    });
  });
};

pagination();

// DELETE COURSE
const delCourse = (id, page) => {
  fetch(`/deleteCourse/${id}`)
    .then((res) => res.text())
    .then((data) => {
      if (data === "Course Deleted") {
        alert(data);
        showCourseData(page);
      }
    });
};

// GETTING COURSE TO EDIT
const getCourseToEdit = (courseId, page) => {
  let editPopup = document.querySelector(".edit-popup");
  fetch(`/getCourseToEdit/${courseId}`)
    .then((res) => res.json())
    .then((data) => {
      data.map((elem) => {
        editPopup.innerHTML = `
            <i class='bx bx-x close_popup' style="color:red;" onclick="close_popup()"></i>
             <div class="form">
                <h4>Edit Course</h4>
                <div class="course_img">
                    <input type="text" id="image" value="${elem.img}" placeholder="Image" />
                </div>
                <div class="course_name">
                    <input type="text" id="name" value="${elem.name}" placeholder="Name" />
                </div>
                <div class="course_img">
                    <input type="number" id="price" value="${elem.price}" placeholder="Price" />
                </div>
                <div class="course_description">
                    <input type="text" id="author" value="${elem.description}" placeholder="Author" />
                </div>
                <button id="edit-course-btn" onclick="editCourse('${courseId}',${page})">Done</button>
            </div>
    `;
      });

      editPopup.style.display = "block";
    });
};

// EDIT COURSE
editCourse = (courseId, page) => {
  let img = document.getElementById("image");

  let name = document.getElementById("name");
  let price = document.getElementById("price");
  let author = document.getElementById("author");
  fetch(`/editCourse/${courseId}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      img: img.value,
      name: name.value,
      price: price.value,
      author: author.value,
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      if (data === "Course Edited Successfully") {
        alert(data);
        document.querySelector(".edit-popup").style.display = "none";
        showCourseData(page);
      } else {
        alert(data);
      }
    });
  // console.log(img.value, name.value, price.value, author.value);
};

// CLOSE POPUP
const close_popup = () => {
  // console.log("hey")
  document.querySelector(".edit-popup").style.display = "none";
};

// DEACTIVATE COURSE
const deactivateCourse = (id, page) => {
  fetch(`/deactivateCourse/${id}`)
    .then((res) => res.text())
    .then((data) => {
      if (data === "Course Deactivated") {
        alert(data);
        showCourseData(page);
      }
    });
};

// ACTIVATE COURSE
const activateCourse = (id, page) => {
  fetch(`/activateCourse/${id}`)
    .then((res) => res.text())
    .then((data) => {
      if (data === "Course activated") {
        alert(data);
        showCourseData(page);
      }
    });
};
