/* start form control coding */
var signupBtn = document.querySelector('.signup-btn');
var loginBtn = document.querySelector('.login-btn');
var loginBox = document.querySelector('.login-box');
var signupBox = document.querySelector('.signup-box');

signupBtn.onclick = function(){
    signupBox.classList.add('active');
    loginBox.classList.remove('active');
    loginBtn.classList.remove('d-none');
    signupBtn.classList.add('d-none');
}

loginBtn.onclick = function(){
    signupBox.classList.remove('active');
    loginBox.classList.add('active');
    loginBtn.classList.add('d-none');
    signupBtn.classList.remove('d-none');
}

