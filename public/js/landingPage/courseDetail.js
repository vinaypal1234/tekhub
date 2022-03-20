const courseDetail = (courseId) => {
  let courseDetailPopup = document.querySelector(".courseDetailPopup");
  fetch(`/courseDetail/${courseId}`)
    .then((res) => res.json())
    .then((data) => {
      courseDetailPopup.innerHTML = `
               <div class="courseDetail">
          <span id="close_popup"><i onclick="closeCourseDetailPopup()" class='bx bx-x'></i></span>
          <div class="courseContent">
              <div class="courseImage">
                  <img src=${data.img} alt="">
                  <div class="courseName">
                      <h1>${data.name}</h1>
                      <h2>${data.category}</h2>
                      <h4 id="course_date">${data.date}</h4>
                      <h4 id="course_description">Description: ${data.description}</h4>
                  </div>
                  <button  onclick="addToCart('${data._id}')">Add To Cart</button>
              </div>
           
          </div>
      </div>
              `;
      courseDetailPopup.style.display = "block";
    });
};

const closeCourseDetailPopup = () => {
  document.querySelector(".courseDetailPopup").style.display = "none";
};
