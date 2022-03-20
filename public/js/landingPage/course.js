// Fetching All Course Data
const fetchAllCourse = (page = 1) => {
  fetch(`/getCourse/${page}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.message == "Data Not Found") {
        let courseData = document.querySelector(".course-data");
        courseData.innerHTML = `
                <div class="col-6">
                ${data.message}
                </div>
                `;
      } else {
        let courseData = document.querySelector(".course-data");

        courseData.innerHTML = "";

        data.map((course) => {
          courseData.innerHTML += `
         <div class="col-12 col-sm-6 col-m-4 col-lg-3 course-container">
            <div class="course-card">
                <img class="course-img" src=${course.img} onclick="courseDetail('${course._id}')" />
                <div class="course-detail">
                    <h4>${course.name}</h4>                  
                    <h6>${course.author}</h6>
                     <h5>${course.category}</h5>
                    <div class="price">
                        <div class="discount-price">
                            <span>&#8377;</span><span>${course.price}</span>
                        </div>
                        <div class="actual-price">
                            <span><del>&#8377;2000</del></span></div>
                    </div>
                </div>
                <div id="atc-btn">
         <i class='bx bx-cart-alt' onclick="addToCart('${course._id}')"></i>
                </div>
            </div>
        </div>
           `;
        });
      }
    });
};

fetchAllCourse();

// LOAD MORE BUTTON
let loadMorePage = 1;
const loadMoreBtn = () => {
  loadMorePage += loadMorePage;
  fetchAllCourse(loadMorePage);
};

// SHOW COURSE BY CATEGORY
const showCourseByCategory = () => {
  let selectedCategory = document.querySelector("select");
  if (selectedCategory.value !== "") {
    location.href = `/course/${selectedCategory.value}`;
  }
};
