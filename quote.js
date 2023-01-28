let pic = document.getElementById('pic');
// Add event listeners to answer elements
document.querySelector('#correct_answer').addEventListener('click', checkAnswer);
document.querySelector('#ia1').addEventListener('click', checkAnswer);
document.querySelector('#ia2').addEventListener('click', checkAnswer);
document.querySelector('#ia3').addEventListener('click', checkAnswer);

let correctAnswer;
function checkAnswer() {
    if (this.innerHTML === correctAnswer) {
        alert('Correct!');
    } else {
        alert('Incorrect!');
    }
}

document.addEventListener('DOMContentLoaded', function() {
getQuote();

})

function capitalize(str){
    return str[0].toUpperCase()+str.slice(1)
}

function randomizeAnswers(correctAnswer, incorrectAnswers) {
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    let randomizedAnswers = [];
    
    while(allAnswers.length > 0) {
      let randomIndex = Math.floor(Math.random() * allAnswers.length);
      randomizedAnswers.push(allAnswers[randomIndex]);
      allAnswers.splice(randomIndex, 1);
    }
    
    return randomizedAnswers;
  }

  
function getQuote() {
    fetch("https://opentdb.com/api.php?amount=1").then(response => response.json()).then(data => {
    
   
        document.querySelector('#question').innerHTML = '"' + data.results[0].question  + '"' ;  
        document.querySelector('#category').innerHTML = "Category: " +  data.results[0].category;  
        if (data.results[0].type=="boolean") {
            document.querySelector('#type').innerHTML = "Type: " +  "True/False";  
        } else if (data.results[0].type=="multiple") {
            document.querySelector('#type').innerHTML = "Type: " +  "Multiple Choice";  
        } else
        {document.querySelector('#type').innerHTML = "Type: " +  data.results[0].type; } 

        document.querySelector('#difficulty').innerHTML = "Difficulty: " +  capitalize(data.results[0].difficulty);  
        // document.querySelector('#correct_answer').innerHTML = "Answer: " + data.results[0].correct_answer;  
        // document.querySelector('#ia0').innerHTML = "Incorrect Answer(s):";
        // document.querySelector('#ia1').innerHTML = "" + data.results[0].incorrect_answers[0]; 
        // if (data.results[0].incorrect_answers[1] !== undefined)   
        // {document.querySelector('#ia2').innerHTML = "" + data.results[0].incorrect_answers[1];} else {document.querySelector('#ia2').innerHTML = "";}
        // if (data.results[0].incorrect_answers[2] !== undefined)      
        // {document.querySelector('#ia3').innerHTML = "" + data.results[0].incorrect_answers[2];} else {document.querySelector('#ia3').innerHTML = "";}      
            
        
        document.querySelector('#ia0').innerHTML = "Answers(Click to check):";
        // Assign correct answer to variable
        
        correctAnswer = data.results[0].correct_answer;

        // // Assign answers to elements
        // document.querySelector('#correct_answer').innerHTML = data.results[0].correct_answer;
        
        // document.querySelector('#ia1').innerHTML = data.results[0].incorrect_answers[0];
        // document.querySelector('#ia2').innerHTML ='';
        // if (data.results[0].incorrect_answers[1] !== undefined)  
        // document.querySelector('#ia2').innerHTML = data.results[0].incorrect_answers[1];
       
        // document.querySelector('#ia3').innerHTML = ''; 
        // if (data.results[0].incorrect_answers[2] !== undefined) 
        // document.querySelector('#ia3').innerHTML = data.results[0].incorrect_answers[2];
        let randomizedAnswers = randomizeAnswers(data.results[0].correct_answer, data.results[0].incorrect_answers);

        document.querySelector('#correct_answer').innerHTML = randomizedAnswers[0];
        document.querySelector('#ia1').innerHTML = randomizedAnswers[1];
        document.querySelector('#ia2').innerHTML ='';
        if (randomizedAnswers[2] !== undefined)
        document.querySelector('#ia2').innerHTML = randomizedAnswers[2];
        document.querySelector('#ia3').innerHTML = ''; 
        if (randomizedAnswers[3] !== undefined)
        document.querySelector('#ia3').innerHTML = randomizedAnswers[3];    
            
    })  
}

pic.addEventListener('click', getQuote)

$(document).ready(function () {

    $('xdiv').hover(
    function () {
        $(this).stop().fadeOut(function () {
            var $temp = $(this).attr('src');
            $(this).attr('src', $(this).attr('data-alt-src'));
            $(this).attr('data-alt-src', $temp);
        });

        $(this).fadeIn();
    },

    function () {
        $(this).stop().fadeOut(function () {
            var $temp = $(this).attr('data-alt-src');
            $(this).attr('data-alt-src', $(this).attr('src'));
            $(this).attr('src', $temp);
        });

        $(this).fadeIn();

    });
});