$(document).ready(function(){
  
  $("#time-remaining").hide();
  $("#start").on('click', harrypottertrivia.beginGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var harrypottertrivia = {
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
  
  beginGame: function(){

    harrypottertrivia.currentSet = 0;
    harrypottertrivia.correct = 0;
    harrypottertrivia.incorrect = 0;
    harrypottertrivia.unanswered = 0;
    resetTime(harrypottertrivia.timerId);
    
    $('#triviagame').show();
    
    $('#result').html('');
    
    $('#timing').text(harrypottertrivia.timing);
    
    $('#begin').hide();

    $('#time-remaining').show();
 
    harrypottertrivia.questionSwitch();
    
  },
  questionSwitch : function(){
    
    harrypotertrivia.timing = 10;
     $('#timing').removeClass('last-seconds');
    $('#timing').text(harrypottertrivia.timer);
    
    if(!harrypottertrivia.timerOn){
      harrypottertrivia.timerId = setInterval(harrypottertrivia.timerRunning, 1000);
    }
    
    var questionContent = Object.values(harrypottertrivia.questions)[harrypottertrivia.currentSet];
    $('#question').text(questionContent);
    
    var questionOptions = Object.values(harrypottertrivia.options)[harrypottertrivia.currentSet];
    
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },

  timerRunning : function(){
    if(harrypottertrivia.timing > -1 && harrypottertrivia.currentSet < Object.keys(harrypottertrivia.questions).length){
      $('#timing').text(harrypottertrivia.timing);
      trivia.timing--;
        if(trivia.timing === 4){
          $('#timing').addClass('last-seconds');
        }
    }
    else if(harrypottertrivia.timing === -1){
      harrypottertrivia.unanswered++;
      harrypottertrivia.result = false;
      resetTime(harrypottertrivia.timerId);
      resultId = setTimeout(harrypottertrivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(harrypottertrivia.answers)[harrypottertrivia.currentSet] +'</h3>');
    }
    
    else if(harrypottertrivia.currentSet === Object.keys(harrypottertrivia.questions).length){
      
      $('#results')
        .html('<h3>Have a nice day!</h3>'+
        '<p>Correct: '+ harrypottertrivia.correct +'</p>'+
        '<p>Incorrect: '+ harrypottertrivia.incorrect +'</p>'+
        '<p>Unaswered: '+ harrypottertrivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      $('#game').hide();
      

      $('#start').show();
    }
    
  },
  
  guessChecker : function() {
    
    var resultId;
    
    var currentAnswer = Object.values(harrypottertrivia.answers)[harrypottertrivia.currentSet];
    

    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info');
      
      harrypottertrivia.correct++;
      resetTime(harrypottertrivia.timerId);
      resultId = setTimeout(harrypottertrivia.guessResult, 1000);
      $('#results').html('<h3>You are Correct!</h3>');
    }
    else{
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      harrypottertrivia.incorrect++;
      resetTime(harrypottertrivia.timerId);
      resultId = setTimeout(harrypottertrivia.guessResult, 1000);
      $('#results').html('<h3>Close, but no cigar! '+ currentAnswer +'</h3>');
    }
    
  },
  guessResult : function(){
    
    harrypottertrivia.currentSet++;
    
    $('.option').remove();
    $('#results h3').remove();
    
    harrypottertrivia.questionSwitch();
     
  }

}