// Get handle on all buttons
const startButton = document.querySelector(".start-btn button");
const infoButton = document.querySelector(".info-box");
const quitButton = infoButton.querySelector(".buttons .quit-btn");
const continueButton = infoButton.querySelector(".buttons .restart-btn");
const gameBox = document.querySelector(".game-box");
const nextButton = gameBox.querySelector(".next-btn");
const optionText = document.querySelector(".option-list");
const timeCounter = gameBox.querySelector(".timer .timer-sec");
const timeCounterLine = gameBox.querySelector("header .time-line");
const resultBox = document.querySelector(".result-box");
const restartGame = resultBox.querySelector(".buttons .restart-btn");
const quitGame = resultBox.querySelector(".buttons .quit-btn");
// Set current question to index 0 
let questionCount = 0;
// Set current question counter to 1
let questionNumber = 1;
// Set Current time to 
let counter;
let timeValue = 15;
let timerLineValue = 0;
let userScore = 0;
let checkIcon ='<div class="icon check"><i class="fas fa-check"></i></div>';
let xIcon ='<div class="icon x"><i class="fas fa-times"></i></div>';
// Once start game button clicked
startButton.onclick = ()=>{
    //changes opacity to be visible
    infoButton.classList.add("activeInfo")
}

// Once Continue button is clicked
continueButton.onclick = ()=>{
    infoButton.classList.remove("activeInfo");
    //show the Game Box
    gameBox.classList.add("activeGame");
    // Call showQuestions function
    showQuestions(questionCount);
    // Call queCounter function to show new question number
    queCounter(questionNumber);
    // Call timer function, clear counter value
    clearInterval(counter);
    startTimer(timeValue);
    startTimerLine(timerLineValue);
}

// Once Exit game button clicked
quitGame.onclick = ()=>{
    //will change opacity to not visble
    window.location.reload();
    infoButton.classList.remove("activeInfo");
}
restartGame.onclick = ()=>{

    resultBox.classList.remove("activeResult");
    gameBox.classList.add("activeGame");
    questionCount = 0;
    questionNumber = 1;
    counter;
    timeValue = 15;
    timerLineValue = 0;
    userScore = 0;
    showQuestions(questionCount);
    queCounter(questionNumber);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(timerLineValue);
    startTimerLine(timerLineValue);
    nextButton.style.display = "none";

}
// Once Next button is clicked
nextButton.onclick = ()=>{
    if(questionCount < questions.length -1){
        questionCount++;
        questionNumber++;
        // Show correct question
        showQuestions(questionCount);
        // Update our question counter in footer
        queCounter(questionNumber);
        // Once next button is pressed Time is set back to timeValue and restarts countdown
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(timerLineValue);
        startTimerLine(timerLineValue);

    }else{
        clearInterval(counter);
        clearInterval(questionNumber);
        clearInterval(timerLineValue);
        showResults();
    }  
}



// Function to correctly display question number in footer 
function queCounter(index){
    const questionCounter = gameBox.querySelector(".total-que");
    let totalQuestionCount = '<span><p>' + questionNumber + '</p>of<p>' + questions.length + '</p>Questions</span>';
    questionCounter.innerHTML = totalQuestionCount; 
}
// Get questions and options from our array
// Dynamically create HTML elements for our questions
function showQuestions(index){
    const questionText = document.querySelector(".que-txt");
    
    // Displays the Question depending on index of our questions array, also display the question index
    let queTag = '<span>'+ questions[index].qNumber + questions[index].question +'<span>';
    // Displays the possible answers using the index of our questions and the index of the options
    let optionTag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                    +'<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    +'<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    +'<div class="option">' + questions[index].options[3] + '<span></span></div>'
    questionText.innerHTML = queTag;
    optionText.innerHTML = optionTag;
    const option = optionText.querySelectorAll(".option");
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    // Time will pause once an answer is selected
    clearInterval(counter);
    clearInterval(counterLine);
    // Handle on the user selected answer
    let userAnswer = answer.textContent;
    // Handle on the correct answer 
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionText.children.length;
    // Compare the answers
    if(userAnswer === correctAnswer){
        answer.classList.add("correct");
        userScore +=1;
        // Will include our check icon for correct answer
        answer.insertAdjacentHTML("beforeend", checkIcon);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", xIcon);

        // If selected answer is incorrect then show correct answer regardless
        for(let i = 0; i < allOptions; i++){
            if(optionText.children[i].textContent === correctAnswer){
                optionText.children[i].setAttribute("class", "option correct");
                optionText.children[i].insertAdjacentHTML("beforeend", checkIcon);
            }
        }
    }

    // Disable options once user selects an answer
    for (let i = 0; i < allOptions; i++) {
        optionText.children[i].classList.add("disable");
    }
    // Only display next button once user has selected an answer
    nextButton.style.display = "block";
}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCounter.textContent = time;
        time--;
        // Prevent timer from going negative
        if(time < 0){
            clearInterval(counter);
            timeCounter.textContent = "00";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeCounterLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

function showResults(){
    infoButton.classList.remove("activeInfo");
    gameBox.classList.remove("activeGame");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".score-txt");
    let scoreTag = '<span>You scored <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
}