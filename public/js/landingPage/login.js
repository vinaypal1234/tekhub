let email = document.getElementById("email");
let password = document.getElementById("password");

let emailValidation = document.getElementById("email-validation");
let passwordValidation = document.getElementById("password-validation");

let loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let loginData;
  if (email.value == "" || password.value == "") {
    document.querySelectorAll("form div").forEach((input) => {
      input.style.marginBottom = "30px";
    });
    emailValidation.innerText = " Fill the fields ";
    passwordValidation.innerText = " Fill the fields ";

    if (email.value != "") {
      emailValidation.innerText = "";
    }

    if (password.value != "") {
      passwordValidation.innerText = "";
    }
  } else {
    loginData = {
      email: email.value,
      password: password.value,
    };

    fetch("/loginStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message == "Fill Both The Fields") {
          alert(data.message);
        } else if (data.message == "Invalid Ceredentials") {
          alert(data.message);
          emailValidation.innerText = "";
          passwordValidation.innerText = "";
        } else {
          location.href = "/";
        }
      });
  }
});

// // GETTING VALUES
// let fullname = document.querySelector("#fullname");
// let number = document.querySelector("#number");
// let email = document.querySelector("#email");
// let password = document.querySelector("#password");

// // ADD VALIDATION
// let fullnameValidation = document.getElementById("fullname-validation");
// let numberValidation = document.getElementById("number-validation");
// let emailValidation = document.getElementById("email-validation");
// let passwordValidation = document.getElementById("password-validation");

// // REGISTER BUTTON
// let registerBtn = document.querySelector("button");

// registerBtn.addEventListener("click", (e) => {
//     e.preventDefault();

//     let registerInfo;

//     //   VALIDATING FORM HERE
//     if (
//         (fullname.value == "" ||
//             fullname.value.length < 3) ||
//         (number.value == "" || number.value.length < 10) ||
//         (email.value == "") ||
//         (password.value == "" ||
//             password.value.length < 8)
//     ) {

//         document.querySelectorAll("form div").forEach(input => {
//             input.style.marginBottom = "30px";
//         })

//         fullnameValidation.innerText = "This field is required";
//         numberValidation.innerText = "This field is required";
//         emailValidation.innerText = "This field is required";
//         passwordValidation.innerText = "This field is required";

//         // Fullname Validation
//         if (fullname.value != "" && fullname.value.length < 3) {
//             fullnameValidation.innerText =
//                 "Fullname should be longer than 2 Alphabets";
//         } else if (fullname.value.length > 2) {
//             fullnameValidation.innerText = "";
//         }

//         // NUMBER Validation
//         if (number.value != "" && number.value.length < 10) {
//             numberValidation.innerText =
//                 "Number should be 10 digits long";
//         } else if (number.value.length > 9) {
//             numberValidation.innerText = "";
//         }

//         // Email Validation
//         if (email.value != "") {
//             emailValidation.innerText = "";
//         }

//         // Password Validation
//         if (password.value != "" && password.value.length < 9) {
//             passwordValidation.innerText =
//                 "Password should be longer than 8 Characters";
//         } else if (password.value.length > 8) {
//             passwordValidation.innerText = "";
//         }
//     } else {
//         // AFTER VALIDATION COMPLETES

//         registerInfo = {
//             fullname: fullname.value,
//             number: number.value,
//             email: email.value,
//             password: password.value,
//         };

//         // SENDING DATA TO SERVER
//         fetch("http://localhost:4000/registerStudent", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(registerInfo),
//             })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.message == "All Fields Are Required") {
//                     alert(data.message);
//                 } else if (data.message == "Email Exist") {
//                     alert(data.message)
//                 } else {

//                     alert(data.message)

//                     fullname.value = "";
//                     number.value = "";
//                     email.value = "";
//                     password.value = "";

//                     fullnameValidation.innerText = "";
//                     numberValidation.innerText = "";
//                     emailValidation.innerText = "";
//                     passwordValidation.innerText = "";
//                     document.querySelectorAll("form div").forEach(input => {
//                         input.style.marginBottom = "10px";
//                     })
//                 }
//             });

//     }
// });
