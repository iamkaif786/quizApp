var subject = sessionStorage.getItem('subject');
var brandCode = sessionStorage.getItem('brandCode');
var studentName = sessionStorage.getItem('name');
var address = sessionStorage.getItem('address');
var fatherName = sessionStorage.getItem('fatherName');
var enrollment = sessionStorage.getItem('enrollment');
var imgUrl = sessionStorage.getItem('imgUrl');

var allQuestion = [];

// Reading questions from localStorage
if (localStorage.getItem(brandCode + '_' + subject + '_question') != null) {
    allQuestion = JSON.parse(localStorage.getItem(brandCode + '_' + subject + '_question'));
    console.log(allQuestion);
}

var index = 0;
var total = allQuestion.length;
var right = 0;
var wrong = 0;
var allUserResult = [];
var particularUserResult = [];

let mainBox = document.querySelector('.main');
var allOptionsEl = document.querySelectorAll('.option');
let questionEl = document.querySelector('.question-el');
var nextBtn = document.querySelector('.next-btn');

var timerEl = document.createElement('div');
timerEl.className = 'timer';
timerEl.style.fontSize = '20px';
timerEl.style.marginBottom = '10px';
mainBox.prepend(timerEl);

let timer;
const startTimer = () => {
    let timeLeft = 30; // 1 minute for each question
    timerEl.innerHTML = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerHTML = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 10) {
            timerEl.style.color = "red"; // Change color to red at 10 seconds
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            timerEl.innerHTML = "Time Up!";
            wrong++;
            setTimeout(() => {
                timerEl.style.color = "black"; // Reset color before moving to next question
                moveToNextQuestion();
            }, 1000);
        }
    }, 1000);
};

const getQuestionFunc = () => {
    if (index == total) {
        return endQuiz();
    }
    resetFunc();
    clearInterval(timer);
    startTimer();
    let data = allQuestion[index];
    questionEl.innerHTML = `Q-${index + 1} : ${data.question}`;
    allOptionsEl[0].nextElementSibling.innerText = data.optionOne;
    allOptionsEl[1].nextElementSibling.innerText = data.optionTwo;
    allOptionsEl[2].nextElementSibling.innerText = data.optionThree;
    allOptionsEl[3].nextElementSibling.innerText = data.optionFour;
};
getQuestionFunc();

nextBtn.onclick = function () {
    moveToNextQuestion();
};

const moveToNextQuestion = () => {
    let data = allQuestion[index];
    var ans = getAnswer();
    if (ans == data.correctAnswer) {
        right++;
    } else if (ans !== undefined) {
        wrong++;
    }
    index++;
    getQuestionFunc();
};

const getAnswer = () => {
    var answer;
    allOptionsEl.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
};

function resetFunc() {
    allOptionsEl.forEach((input) => {
        input.checked = false;
    });
}

const endQuiz = () => {
    clearInterval(timer);

    let unattempted = total - (right + wrong);

    mainBox.innerHTML = `
        <h2>Quiz Completed!</h2>
        <div align='center'>
            <table border="1" cellpadding="10" cellspacing="0">
                <tr><th>Total Questions</th><td>${total}</td></tr>
                <tr><th>Correct Answers</th><td>${right}</td></tr>
                <tr><th>Wrong Answers</th><td>${wrong}</td></tr>
                <tr><th>Unattempted Questions</th><td>${unattempted}</td></tr>
            </table>
            <br>
            <button class='btn btn-primary quiz-submit-btn'>Submit</button>
        </div>
    `;
    submitFunc();
};

const submitFunc = () => {
    if (localStorage.getItem(brandCode + '_' + subject + '_result') != null) {
        allUserResult = JSON.parse(localStorage.getItem(brandCode + '_' + subject + '_result'));
    }

    if (localStorage.getItem(brandCode + '_' + enrollment + '_result') != null) {
        particularUserResult = JSON.parse(localStorage.getItem(brandCode + '_' + enrollment + '_result'));
    }

    var submitBtn = document.querySelector('.quiz-submit-btn');
    submitBtn.onclick = function () {
        document.cookie = brandCode + '_' + subject + '_' + enrollment + '=done; max-age=86400;path=/';
        allUserResultFunc();
        particularUserResultFunc();
        this.innerHTML = 'Please Wait...!';
        this.disabled = true;
    };
};

const allUserResultFunc = () => {
    allUserResult.push({
        name: studentName,
        enrollment: enrollment,
        rightAns: right,
        wrongAns: wrong,
        subject: subject,
        maxMarks: total
    });
    localStorage.setItem(brandCode + '_' + subject + '_result', JSON.stringify(allUserResult));
    setTimeout(function () {
        sessionStorage.clear();
        window.location = '/index.html';
    }, 2000);
};

const particularUserResultFunc = () => {
    particularUserResult.push({
        name: studentName,
        fatherName: fatherName,
        enrollment: enrollment,
        subject: subject,
        rightAns: right,
        wrongAns: wrong,
        maxMarks: total,
        profilePic: imgUrl
    });
    localStorage.setItem(brandCode + '_' + enrollment + '_result', JSON.stringify(particularUserResult));
};

document.addEventListener('contextmenu', event => event.preventDefault());
