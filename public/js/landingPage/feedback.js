// GETTING VALUES
let fullname = document.querySelector("#fullname");
let email = document.querySelector("#email");
let message = document.querySelector("#message");

// ADD VALIDATION
let fullnameValidation = document.getElementById("fullname-validation");
let emailValidation = document.getElementById("email-validation");
let messageValidation = document.getElementById("message-validation");

// FEEDBACK BUTTON
let feedbackBtn = document.querySelector("button");

feedbackBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let feedbackInfo;

  //   VALIDATING FORM HERE
  if (
    fullname.value == "" ||
    fullname.value.length < 3 ||
    email.value == ""
    // message.value == "" ||
    // message.value.length < 20
  ) {
    document.querySelectorAll("form div").forEach((input) => {
      input.style.marginBottom = "30px";
    });

    fullnameValidation.innerText = "This field is required";
    emailValidation.innerText = "This field is required";
    // messageValidation.innerText = "This field is required";

    // Fullname Validation
    if (fullname.value != "" && fullname.value.length < 3) {
      fullnameValidation.innerText =
        "Fullname should be longer than 2 Alphabets";
    } else if (fullname.value.length > 2) {
      fullnameValidation.innerText = "";
    }

    // Email Validation
    let regex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.value != "" && !regex.test(email.value)) {
      emailValidation.innerText = "Email not valid";
    } else if (regex.test(email.value)) {
      emailValidation.innerText = "";
    }

    // Password Validation
    // if (message.value != "" && message.value.length < 20) {
    //   messageValidation.innerText =
    //     "message should be longer than 19 Characters";
    // } else if (message.value.length > 19) {
    //   passwordValidation.innerText = "";
    // }
  } else {
    // AFTER VALIDATION COMPLETES

    feedbackInfo = {
      name: fullname.value,
      email: email.value,
      message: message.value,
    };

    // SENDING DATA TO SERVER
    fetch("/sendFeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Failed") {
          alert(data.message);
        } else {
          alert(data.message);

          fullname.value = "";
          email.value = "";
          message.value = "";

          fullnameValidation.innerText = "";
          emailValidation.innerText = "";
          messageValidation.innerText = "";
          document.querySelectorAll("form div").forEach((input) => {
            input.style.marginBottom = "10px";
          });
        }
      });
  }
});
