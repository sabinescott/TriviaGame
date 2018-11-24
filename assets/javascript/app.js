$(document).ready(function(){
  

  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',
  
  questions: {
    q1: 'What is the name of the aunt that Harry lives with?',
    q2: 'Who is Minister of Magic when Harry is a fourth-year?',
    q3: 'Where was the entrance to the Chamber of Secrets located?',
    q4: 'What is the color of the potion Felix Felicious?',
    q5: 'Who was stealing mail from Harry at the beginning of the Order of the Phoenix?',
    q6: 'What is the name of the witch who prepared chocolates dosed with a love potion for Harry?',
    q7: 'Which House Founder was the original diadem that Voldemort cursed into a horcrux?'
  },
  options: {
    q1: ['Jennifer', 'Shannon', 'Petunia', 'Beatrice'],
    q2: ['Henry Fishtown', 'Cornelius Fudge', 'Anna Sharptown', 'Albus Dumbledore'],
    q3: ['Behind the Portrait of the Fat Lady', 'The Slytherin common room', 'Beneath the kitchens','The third floor girls bathroom'],
    q4: ['Blue', 'Gold', 'Red', 'Silver'],
    q5: ['Draco Malfoy','Bellatrix Lestrange','Dobby','Kreature'],
    q6: ['Romilda Vane','Hermione Granger','J K Rowling','Padma Patil'],
    q7: ['Salazar Slytherin', 'Rowena Ravenclaw', 'Godric Gryffindor','Helga Hufflepuff']
  },
  answers: {
    q1: 'Petunia',
    q2: 'Cornelius Fudge',
    q3: 'the third floor girls bathroom',
    q4: 'gold',
    q5: 'Dobby',
    q6: 'Romilda Vane',
    q7: 'Rowena Ravenclaw'
  },
 
  startGame: function(){
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
  
    $('#game').show();
    
    $('#results').html('');
    
    $('#timer').text(trivia.timer);
    
    $('#start').hide();

    $('#remaining-time').show();
    
    trivia.nextQuestion();
    
  },
  nextQuestion : function(){
    
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  timerRunning : function(){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');

      $('#game').hide();
      
      $('#start').show();
    }
    
  },
  guessChecker : function() {

    var resultId;
    
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    else{
 
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
    
  },
  guessResult : function(){
    
    trivia.currentSet++;
    
    $('.option').remove();
    $('#results h3').remove();
    
    trivia.nextQuestion();
     
  }

}
