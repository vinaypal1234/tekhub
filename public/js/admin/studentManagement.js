// FETCHING STUDENT FROM DATABASE
const showStudentData = (page = 1) => {
  let tableBody = document.querySelector("tbody");

  tableBody.innerHTML = "";

  fetch(`/getStudentData/${page}`)
    .then((res) => res.json())
    .then((data) => {
      data.map((student) => {
        tableBody.innerHTML += `
<tr>
    <td>
        ${student.fullname}
    </td>
    <td>
       ${student.number}
    </td>
    <td>
       ${student.email}
    </td>
    <td>
       ${student.date}
    </td>
   
    <td>
      <span onclick="getStudentToEdit('${student._id}',${page})"><i class='bx bxs-edit'></i></span>
    </td>
    <td>
           <span onclick="delStudent('${student._id}',${page})"><i class='bx bxs-trash-alt'></i></span>
    </td>
</tr>

`;
      });
    });
};

showStudentData();

// PAGINATION
const pagination = () => {
  let page = document.querySelectorAll("li");
  page.forEach((elem) => {
    elem.addEventListener("click", () => {
      showStudentData(elem.textContent);
      window.scrollTo(0, 0);
    });
  });
};

pagination();

// DELETE STUDENT
const delStudent = (studentId, page) => {
  fetch(`/deleteStudent/${studentId}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.message === "Student Deleted") {
        alert(data.message);
        showStudentData(page);
      } else {
        alert(data.message);
      }
    });
};

// GET STUDENT EDIT
const getStudentToEdit = (studentId, page) => {
  let editPopup = document.querySelector(".edit-popup");
  fetch(`/getStudentToEdit/${studentId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Request Failed") {
        alert(data.message);
      } else {
        data.map((student) => {
          editPopup.innerHTML = `
                    <i class='bx bx-x close_popup' style="color:red;" onclick="close_popup()"></i>
                     <div class="form">
                        <h4>Edit Student</h4>
                        <div class="student-name">
                            <input type="text" id="fullname" value="${student.fullname}" placeholder="Fullname" />
                        </div>
                        <div class="student-number">
                            <input type="text" id="number" value="${student.number}" placeholder="Number" />
                        </div>
                        <div class="student-email">
                            <input type="text" id="email" value="${student.email}" placeholder="Email" />
                        </div>
                        <button id="edit-student-btn" onclick="editStudent('${student._id}',${page})">Done</button>
                    </div>
            `;
        });
      }

      editPopup.style.display = "block";
    });
};

// EDIT STUDENT
const editStudent = (studentId, page) => {
  let fullname = document.getElementById("fullname");
  let number = document.getElementById("number");
  let email = document.getElementById("email");
  fetch(`/editstudent/${studentId}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname: fullname.value,
      number: number.value,
      email: email.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Student Edited Successfully") {
        alert(data.message);
        document.querySelector(".edit-popup").style.display = "none";
        showStudentData(page);
      } else {
        alert(data.message);
      }
    });
};

const close_popup = () => {
  // console.log("hey")
  document.querySelector(".edit-popup").style.display = "none";
};
