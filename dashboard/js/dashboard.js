// get data from session storage
var brandCode;
brandCode = sessionStorage.getItem('brandCode');
if(brandCode == null){
    document.body.innerHTML = "";
    document.body.style.background = "black";
    swal("Unauthorised User !", "Do not waste your time !", "warning");
}
var allUserData = JSON.parse(localStorage.getItem(brandCode));
var brandNameEl = document.getElementById('brand-name');
console.log(allUserData);
brandNameEl.innerHTML = "Welcome : " + allUserData.brandName;

// start logout coding
var logoutBtn = document.querySelector('#logout-btn');
logoutBtn.onclick = function(){
    this.innerHTML = "Please wait...";
    logoutBtn.disabled = true;
    this.style.background = "#ccc";
    setTimeout(function(){
        window.location = "../company/company.html";
        sessionStorage.removeItem('brandCode');
    }, 3000);
}