/* start form control coding */
var signupBtn = document.querySelector('.signup-btn');
var loginBtn = document.querySelector('.login-btn');
var loginBox = document.querySelector('.login-box');
var signupBox = document.querySelector('.signup-box');

signupBtn.onclick = function () {
    signupBox.classList.add('active');
    loginBox.classList.remove('active');
    loginBtn.classList.remove('d-none');
    signupBtn.classList.add('d-none');
}

loginBtn.onclick = function () {
    signupBox.classList.remove('active');
    loginBox.classList.add('active');
    loginBtn.classList.add('d-none');
    signupBtn.classList.remove('d-none');
}

// start register coding

var registerForm = document.querySelector('.signup-form');
var allInput = registerForm.querySelectorAll('INPUT');
var textArea = registerForm.querySelector('textarea');


registerForm.onsubmit = function (e) {
    e.preventDefault();
    registrationData();
}

const registrationData = () => {
    if (localStorage.getItem(allInput[0].value) == null) {
        const userData = {
            brandCode: allInput[0].value,
            brandName: allInput[1].value,
            website: allInput[2].value,
            contact: allInput[3].value,
            address: textArea.value,
            username: allInput[4].value,
            password: allInput[5].value
        }
        let userString = JSON.stringify(userData);
        localStorage.setItem(allInput[0].value, userString);
        registerForm.reset('');
        swal("Registration Successful!", "Please Sign In!", "success");
    } else {
        swal("Change Brand Code", "This Brand Code is already taken!", "warning");
    }
}

// start signin coding
var signinBtn = document.querySelector('.signin-btn');
var brandCode = document.querySelector('#brand-code');
var username = document.querySelector('#username');
var password = document.querySelector('#password');

signinBtn.onclick = function (e) {
    e.preventDefault();
    if(brandCode.value && username.value && password.value !== ""){
        if(localStorage.getItem(brandCode.value) !== null){
            var allData = JSON.parse(localStorage.getItem(brandCode.value));
            console.log(allData);
            if(allData.username == username.value){
                if(allData.password == password.value){
                    signinBtn.innerHTML = "Please Wait...";
                    signinBtn.disabled = true;
                    setTimeout(function(){
                        window.location = '../dashboard/dashboard.html';
                    }, 3000)
                }else{
                    swal("Wrong Password !", "Please check your Password !", "warning");
                }
            }else{
                swal("Wrong Username !", "Please check your Username !", "warning");
            }
        }else{
            swal("Wrong Brand Code !", "Please Sign up first!", "warning");
        }
    }else{
        swal("Empty Field !", "Please fill All the Fields", "warning");
    }
}