let score = 0;
let number = 0;

function endingQuiz() {
  $('.questionBlock').html(`<p>Sua pontuação final é ${score} de 10</p><p>Se quiser  tentar de novo, clique aqui</p><button type="button" class="restartButton">Recomeçar</button>`);
  $('.scoreBlock').hide();
}

function callQuestion () {
  if (number<6) {
  return `<div class="question-${number}">
    <h2>${questions[number].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${questions[number].answers[0]}" name="answer" required>
    <span>${questions[number].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questions[number].answers[1]}" name="answer" required>
    <span>${questions[number].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questions[number].answers[2]}" name="answer" required>
    <span>${questions[number].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questions[number].answers[3]}" name="answer" required>
    <span>${questions[number].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Enviar</button>
    </fieldset>
    </form>
    </div>`;
} else {
    endingQuiz();
  }
}

function advanceQuestion() {
 if (number<6){
   number = number+1;
   $('.number').text(number+1);
 }
}

$('.questionBlock').on('click', '.submitButton', function (event) {
  rightAnswer();
});

function rightAnswer() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let rightAnswer = `${questions[number].right}`;    
    if (answer === rightAnswer){
      great();
    } else {
      notGreat();
    };
  });
}

function currentScore() {
  $('.scoreBlock').html(`<p>Sua pontuação é ${score} de 10</p>`);
}

function upScore() {
 score = score+1;
}

function great() {
  upScore();
  $('.questionBlock').html('<p>Você acertou!</p><button type="button" class="nextButton">Continuar</button>');
  $('.scoreBlock').html(currentScore());
}

function proceedQuiz() {
  $('.questionBlock').on('click', '.nextButton', function (event) {
    event.preventDefault();
    $('.questionBlock').html(advanceQuestion());
    $('.questionBlock').html(callQuestion());
  });
}

function notGreat() {
  let rightAnswer = `${questions[number].right}`;
  $('.questionBlock').html(`<p>A resposta correta é ${rightAnswer}.</p><button type="button" class="nextButton">Continuar</button>`);
  $('.scoreBlock').html(currentScore());
}


function backToBeginning () {
  $('.questionBlock').on('click', '.restartButton', function (event) {
    score = 0;
    number = 0;
    $('.questionBlock').html(callQuestion());
    $('.scoreBlock').html(currentScore());
    $('.scoreBlock').show();
  });
}

function renderInitialHtml() {
  $('.questionBlock').on('click', '.restartButton', function (event) {
  });
}

function beginQuiz () {
  $('.questionBlock').on('click', '.quizStart', function (event) {
    event.preventDefault();
    $('.questionBlock').html(callQuestion());
  });
}

function generateQuestion() {
  return `<h3>${questions[number].question}</h3><ul>${questions[number].answers}</ul>`
}

function renderQuestion () {
  $('.questionAnswerForm').remove()
  .html(callQuestion());
}

function firstProcedure () {
  beginQuiz();
  renderQuestion();
  rightAnswer();
  currentScore();
  proceedQuiz();
  backToBeginning();
  currentScore();
}

$(firstProcedure)
