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
var allSubject = [];
subjectBtn.onclick = function (e) {
    e.preventDefault();
    if (subjectEl.value != '') {
        newSubject();
        subjectEl.value = "";
    } else {
        swal("Subject field is empty !", "Please Enter Subject !", "warning");
    }
    updateSubject();
}

const newSubject = (subject, index) => {
    var subjectName = subjectEl.value;
    if (subject) {
        subjectName = subject.subjectName;
    }
    visibleSubject.innerHTML += `
    <div class="d-flex subject-box justify-content-between align-items-center">
        <h3 index='${index}'>${subjectName}</h3>
        <div>
            <i class="fa fa-edit edit-btn mx-2" style="font-size: 22px;"></i>
            <i class="fa fa-save save-btn mx-2 d-none" style="font-size: 22px;"></i>
            <i class="fa fa-trash del-btn mx-2" style="font-size: 22px;"></i>
        </div>
    </div>

    `;
    //  start delete button coding
    var i;
    var delAllBtn = visibleSubject.querySelectorAll('.del-btn');
    for (i = 0; i < delAllBtn.length; i++) {
        delAllBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement;

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        parent.remove();
                        updateSubject();
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    }

    // start update button coding
    var allEditBtn = visibleSubject.querySelectorAll(".edit-btn");
    for (i = 0; i < allEditBtn.length; i++) {
        allEditBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement;
            var h3 = parent.getElementsByTagName("H3");
            var saveBtn = parent.querySelector(".save-btn");
            h3[0].contentEditable = true;
            h3[0].focus();
            this.classList.add('d-none');
            saveBtn.classList.remove('d-none');
            saveBtn.onclick = function () {
                var editedSub = h3[0].innerHTML;
                var id = h3[0].getAttribute('index');
                updateSubject(editedSub, id);
                this.classList.add('d-none');
                allEditBtn[id].classList.remove('d-none');
                h3[0].contentEditable = false;
            }
        }
    }
}

if (localStorage.getItem(brandCode + '_allSubject') != null) {
    allSubject = JSON.parse(localStorage.getItem(brandCode + '_allSubject'));
    allSubject.forEach((subject, index) => {
        newSubject(subject, index);
    })
}

function updateSubject(subject, id) {
    if (subject != undefined && id != undefined) {
        allSubject[id] = {
            subjectName: subject
        }
    } else {
        var i;
        allSubject = [];
        var subjectBox = visibleSubject.querySelectorAll('.subject-box');
        for (i = 0; i < subjectBox.length; i++) {
            var h3 = subjectBox[i].getElementsByTagName('H3');
            allSubject.push({
                subjectName: h3[0].innerHTML
            });
        }
    }

    localStorage.setItem(brandCode + '_allSubject', JSON.stringify(allSubject));
}

// start return subject in question form (Approved Code)

var chooseSubject = document.querySelector('#choose-subject');
var questionForm = document.querySelector('.question-form');
var allQuesInput = questionForm.querySelectorAll('INPUT');
var selectSubject = document.querySelector('#select-subject');
var allQuestion = [];
var subject;
questionForm.onsubmit = (e) => {
    e.preventDefault();
    insertQuestionFunc();
}

const chooseSubjectFunc = () => {
    allSubject.forEach((subject, index) => {
        chooseSubject.innerHTML += `        
        <option value="${subject.subjectName}">${subject.subjectName}</option>
        `;

        selectSubject.innerHTML += `        
        <option value="${subject.subjectName}">${subject.subjectName}</option>
        `;
    })
}
chooseSubjectFunc();

chooseSubject.addEventListener('change', () => {
    checkSubject();
    checkSubjectKey();
});

var firstOption = chooseSubject.querySelectorAll("OPTION")[1];

function checkSubject() {
    if (chooseSubject.value == "choose subject") {
        subject = firstOption.value;        
    } else {
        subject = chooseSubject.value;
    }
}
checkSubject();

function checkSubjectKey() {
    if (localStorage.getItem(brandCode + '_' + subject + '_question')!= null) {
        allQuestion = JSON.parse(localStorage.getItem(brandCode + '_' + subject + '_question'));
    }else{
        allQuestion = [];
    }
}

checkSubjectKey();

function insertQuestionFunc() {
    if (chooseSubject.value != "choose subject") {
        allQuestion.push({
            question: allQuesInput[0].value,
            optionOne: allQuesInput[1].value,
            optionTwo: allQuesInput[2].value,
            optionThree: allQuesInput[3].value,
            optionFour: allQuesInput[4].value,
            correctAnswer: allQuesInput[5].value
        });

        localStorage.setItem(brandCode + '_' + chooseSubject.value + "_question", JSON.stringify(allQuestion));
        swal("Success !", "Data Inserted Successfully !", "success");
        questionForm.reset('');
    } else {
        swal("Choose Subject !", "Please Select Subject !", "warning");
    }
}