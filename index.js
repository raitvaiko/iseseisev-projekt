function changeBackground(color) {
  document.body.style.background = color;
}

window.addEventListener("load",function() { changeBackground('#70B4F2'); });

(function() {
  var questions = [{
    question: "Mis on Eesti pealinn?",
    choices: ["Tartu", "Pärnu", "Tallinn", "Põlva", "Narva"],
    correctAnswer: 2
  }, {
    question: "Mis on Eesti pindala? (km²)",
    choices: [14325, 50392, 41292, 45227, 40293],
    correctAnswer: 3
  }, {
    question: "Kes on Eesti president?",
    choices: ["Kersti Kaljulaid", "Toomas-Hendrik Ilves", "Alo Mets", "Taavi Rõivas", "Konstantin Päts"],//
    correctAnswer: 0
  }, {
    question: "Kes on Eesti peaminister?",
    choices: ["Juhan Liiv", "Arnold Mägi", "Kaja Kallas", "Jüri Ratas", "Taavi Rõivas"],
    correctAnswer: 3
  }, {
    question: "Kes on Eesti rahandusminister?",
    choices: ["Kaja Kallas", "Edgar Savisaar", "Jürgen Ligi", "Sven Sester", "Martin Helme"],
    correctAnswer: 4
  }];
  
  var questionCounter = 0; //Küsimuse number
  var selections = []; //Massiiv kasutaja vastustevalikutest
  var quiz = $('#quiz'); //Div objekt
  
  //Järgmine küsimus
  displayNext();
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    //Kui ei ole vastuse varianti valitud
    if (isNaN(selections[questionCounter])) {
      alert('Palun valige vastus!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  //Liikudes nupule, tekib animatsioon
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  //Loob ja tagastab div'i, milles on küsimused ja valitud vastused
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Küsimus ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  //Loob listi vastusevalikutest
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  //Pushib kasutaja valitud vastused massiivi
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  //Väljastab järgmise elemendi
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        //"Eelmine" nupp ja selle display kontroll
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  //Arvutab tulemused ja väljastab palju õigeid vastuseid oli
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Tubli! Vastasite ' + numCorrect + ' küsimust ' +
                 questions.length + 'st õigesti!');
    return score;
  }
})();
