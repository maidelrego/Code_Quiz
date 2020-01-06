const startButton = document.getElementById('start-btn');
const questionContainerEl = document.getElementById('question-container');
const mainPage = document.getElementById('main-page');
const questionEl = document.getElementById('question');
const answerButtonEl = document.getElementsByClassName('btn-info'); 
const buttonsDiv = document.getElementById('answer-btn');
const answerRight = document.getElementById('answer-right');
const answerWrong = document.getElementById('answer-wrong');
const submitScore = document.getElementById('submit');
const input = document.getElementById('initialsForm');
const highscores = document.getElementById('highscores');
const listScores = document.querySelector("#listScores");
const badge = document.getElementById('HighScorebadge');
const timeScore = document.getElementById('timeScore');
const showScore = document.getElementById('showScore');
const clear = document.getElementById('clear');

let scores = [];
var seconds = 75;
let count = 0;
var time;

startButton.addEventListener('click', startQuiz);



function startQuiz(event){
 mainPage.classList.add('d-none');
 questionContainerEl.classList.remove('d-none');
 showQuestions();

 timeScore.innerText = seconds;

  time = setInterval(function(){
   seconds--;
   timeScore.innerText = seconds;
   if(seconds <= 0){
    clearInterval(time);
    questionContainerEl.classList.add('d-none');
    input.classList.remove('d-none');
    showScore.innerText = 0;
    timeScore.innerText = 0;
   } 
 },1000);
 
}


function showQuestions() {
  questionEl.innerText = questions[count].title;

  for(let i = 0; i < questions[count].choices.length; i++){
    answerButtonEl[i].innerText = questions[count].choices[i];
    answerButtonEl[i].addEventListener('click', next);
  }
}


function next(event){
  
  if(event.toElement.innerText === questions[count].answer){
    answerRight.classList.remove('d-none');

    setTimeout(function(){
      answerRight.classList.add('d-none');
    }, 500);

    count++;
  }

  else{
    answerWrong.classList.remove('d-none');
    seconds = seconds - 15;

    setTimeout(function(){
      answerWrong.classList.add('d-none');
    }, 500);

    count++;
  }
 
  if(count < questions.length){
    questionEl.innerText = questions[count].title;
    for(let i = 0; i < questions[count].choices.length; i++){
      answerButtonEl[i].innerText = questions[count].choices[i];
    }

  }

  if(count == questions.length){

    if(seconds <= 0){
      clearInterval(time);
      showScore.innerText = 0;
      timeScore.innerText = 0;
      setTimeout(function(){
        questionEl.classList.add('d-none');
        buttonsDiv.classList.add('d-none');
        input.classList.remove('d-none');
        submitScore.addEventListener('click', createInput);
      }, 700);
     
    }
    else{

      clearInterval(time);
     showScore.innerText = seconds; 
     timeScore.innerText = seconds;
    
      setTimeout(function(){
        questionEl.classList.add('d-none');
        buttonsDiv.classList.add('d-none');
        input.classList.remove('d-none');
        submitScore.addEventListener('click', createInput);
      }, 700);

    }
    
  }

}


function createInput(event){

  const data = JSON.parse(localStorage.getItem('items'));

  if(data != null){
    let scoreInput = document.getElementById('scoreInput').value;
    data.push(scoreInput + " - " + showScore.innerText);

    for (var i = 0; i < data.length; i++) {
      var valueScore = data[i];
      var li = document.createElement("li");
      li.textContent = valueScore;
      li.setAttribute("class", "list-group-item list-group-item-info");
      listScores.appendChild(li);
    }

    localStorage.setItem('items', JSON.stringify(data));

  }
  else{
    let scoreInput = document.getElementById('scoreInput').value;
    scores.push(scoreInput + " - " + showScore.innerText);

    for (var i = 0; i < scores.length; i++) {
      var valueScore = scores[i];
      var li = document.createElement("li");
      li.textContent = valueScore;
      li.setAttribute("class", "list-group-item list-group-item-info");

      listScores.appendChild(li);
      
    }

    localStorage.setItem('items', JSON.stringify(scores));

  }

  input.classList.add('d-none');
  highscores.classList.remove('d-none');
  event.preventDefault();
}

clear.addEventListener('click', clearData);

function clearData(){
  let liEL = document.getElementsByTagName("li");
  let count = liEL.length;
  for(var i = 0; i < count; count--){
    listScores.removeChild(liEL[i]);
  }

  localStorage.clear();
}



badge.addEventListener('click', toggleHighScores);


function toggleHighScores(){
  mainPage.classList.add('d-none');
  questionContainerEl.classList.add('d-none');
  highscores.classList.remove('d-none')

  const data = JSON.parse(localStorage.getItem('items'));
  if(data == null){
    highscores.classList.remove('d-none')
  }
  else{
    for (var i = 0; i < data.length; i++) {
      var valueScore = data[i];
      var li = document.createElement("li");
      li.textContent = valueScore;
      li.setAttribute("class", "list-group-item list-group-item-info");
      listScores.appendChild(li);
    }

  }
  
}


var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },

    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },

    {
        title: "Arrays In JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"  
    },

    {
      title: "String values must be enclosed within ____ when being assigend to variables.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "quotes"  
  },

    {
      title: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScrip", "terminal/bash", "for loops", "console.log"],
      answer: "console.log"  
  },


  ];