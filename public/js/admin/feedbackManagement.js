// FETCHING FEEDBACK FROM DATABASE
const showFeedbackData = (page = 1) => {
  let tableBody = document.querySelector("tbody");

  tableBody.innerHTML = "";

  fetch(`/getFeedbackData/${page}`)
    .then((res) => res.json())
    .then((data) => {
      data.map((feedback) => {
        if (feedback.status === "active") {
          tableBody.innerHTML += `
      <tr>
          <td>
              ${feedback.name}
          </td>
          <td>
             ${feedback.email}
          </td>
          <td>
             ${feedback.message}
          </td>
          <td>
             ${feedback.status}
          </td>
          <td>
             ${feedback.date}
          </td>

          <td>
                 <span onclick="delFeedback('${feedback._id}',${page})"><i class='bx bxs-trash-alt'></i></span>
          </td>
          <td>
                 <button onclick="deactivateFeedback('${feedback._id}',${page})">Deactivate</button>
          </td>
      </tr>

      `;
        } else {
          tableBody.innerHTML += `
      <tr>
          <td>
              ${feedback.name}
          </td>
          <td>
             ${feedback.email}
          </td>
          <td>
             ${feedback.message}
          </td>
          <td>
             ${feedback.status}
          </td>
          <td>
             ${feedback.date}
          </td>

          <td>
                 <span onclick="delFeedback('${feedback._id}',${page})"><i class='bx bxs-trash-alt'></i></span>
          </td>
          <td>
                 <button onclick="activateFeedback('${feedback._id}',${page})">Activate</button>
          </td>
      </tr>

      `;
        }
      });
    });
};

showFeedbackData();

// PAGINATION
const pagination = () => {
  let page = document.querySelectorAll("li");
  page.forEach((elem) => {
    elem.addEventListener("click", () => {
      showFeedbackData(elem.textContent);
      window.scrollTo(0, 0);
    });
  });
};

pagination();

// DELETE FEEDBACK
const delFeedback = (feedbackId, page) => {
  fetch(`/deleteFeedback/${feedbackId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Feedback Deleted") {
        alert(data.message);
        showFeedbackData(page);
      } else {
        alert(data.message);
      }
    });
};

// DEACTIVATE FEEDBACK
const deactivateFeedback = (id, page) => {
  fetch(`/deactivateFeedback/${id}`)
    .then((res) => res.text())
    .then((data) => {
      if (data === "Feedback Deactivated") {
        alert(data);
        showFeedbackData(page);
      }
    });
};

// ACTIVATE Feedback
const activateFeedback = (id, page) => {
  fetch(`/activateFeedback/${id}`)
    .then((res) => res.text())
    .then((data) => {
      if (data === "Feedback activated") {
        alert(data);
        showFeedbackData(page);
      }
    });
};
