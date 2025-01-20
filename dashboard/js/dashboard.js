// get data from session storage
var brandCode;
brandCode = sessionStorage.getItem('brandCode');
if (brandCode == null) {
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
logoutBtn.onclick = function () {
    this.innerHTML = "Please wait...";
    logoutBtn.disabled = true;
    this.style.background = "#ccc";
    setTimeout(function () {
        window.location = "../company/company.html";
        sessionStorage.removeItem('brandCode');
    }, 3000);
}

// start store subject coding
var visibleSubject = document.querySelector('.visible-subject');
var subjectBtn = document.querySelector('.subject-btn');
var subjectEl = document.querySelector('.subject');
subjectBtn.onclick = function (e) {
    e.preventDefault();
    if (subjectEl.value != '') {
        newSubject();
        subjectEl.value = "";
    } else {
        swal("Subject field is empty !", "Please Enter Subject !", "warning");
    }
}

const newSubject = () => {
    visibleSubject.innerHTML += `
    <div class="d-flex justify-content-between align-items-center">
        <h3>${subjectEl.value}</h3>
        <div>
            <i class="fa fa-edit mx-2" style="font-size: 22px;"></i>
            <i class="fa fa-save mx-2 d-none" style="font-size: 22px;"></i>
            <i class="fa fa-trash mx-2" style="font-size: 22px;"></i>
        </div>
    </div>

    `;
}