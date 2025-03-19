$('.game-body').hide();
const firstGame = $('.game-body')[0];
$(firstGame).show();
let originalParent;
let correctAnswers = 0;
let modalCorreto = new bootstrap.Modal(document.getElementById('modalCorreto'))
let modalErrado = new bootstrap.Modal(document.getElementById('modalErrado'))

// Aqui você adiciona ou remove os containers pra onde devem ir os cards
var containers = [
  // Container com os cards que serão realocados
  // Não mexer
  document.querySelectorAll(".card-pile")[0],
  document.querySelectorAll(".card-pile")[1],
  document.querySelectorAll(".card-pile")[2],
  document.querySelectorAll(".card-pile")[3],
  document.querySelectorAll(".card-pile")[4],
  document.querySelectorAll(".card-pile")[5],
  document.querySelectorAll(".card-pile")[6],

  // Containers que irão receber os cards
  document.querySelector("#slot-1"),
  document.querySelector('#slot-2'),
  document.querySelector('#slot-3'),
  document.querySelector('#slot-4'),
  document.querySelector('#slot-5'),
  document.querySelector('#slot-6'),
  document.querySelector('#slot-7'),
  document.querySelector('#slot-8'),
  document.querySelector('#slot-9'),
  document.querySelector('#slot-10'),
  document.querySelector('#slot-11'),
  document.querySelector('#slot-12'),
  document.querySelector('#slot-13'),
  document.querySelector('#slot-14'),
  document.querySelector('#slot-15'),
  document.querySelector('#slot-16'),
  document.querySelector('#slot-17'),
  document.querySelector('#slot-18'),
  document.querySelector('#slot-19'),
  document.querySelector('#slot-20'),
  document.querySelector('#slot-21'),
];
var audio = new Audio();
var erro = 0;

// Solução ao dragindrop
var scrollable = true;

var listener = function (e) {
  console.log(scrollable)
  if (!scrollable) {
    e.preventDefault();
  }
}

document.addEventListener('touchmove', listener, { passive: false });

// Solução ao dragindrop

dragula({
  containers: containers,
  revertOnSpill: true,
  direction: 'vertical',
  accepts: function (el, target, source, sibling) {
    return el.dataset.target == target.id;
  }
}).on('drag', function (el, source) {
  // On mobile this prevents the default page scrolling while dragging an item.
  scrollable = false;
  $('body').addClass('no-scroll');
  originalParent = el.parentNode;
}).on("drop", function (el, target) {
  $('body').removeClass('no-scroll');
  scrollable = true;
  let slotArray = $(target).parents('.slots').find('.slot');
  if (slotArray[0].children.length && slotArray[1].children.length && slotArray[2].children.length) {
    $('.check-answer-btn').removeClass('disabled');
  } else {
    $('.check-answer-btn').addClass('disabled');
  }

  if (target.children.length > 1) {
    if (target.children[0] == el) {
      originalParent.appendChild(target.children[1]);
    } else {
      originalParent.appendChild(target.children[0]);
    }
  }

  el.addEventListener('click', function () {
    originalParent.appendChild(el);
  }, { once: true });

}).on("cancel", function () {
  $('body').removeClass('no-scroll');
  scrollable = true;

});

$('.check-answer-btn').click(function () {
  correctAnswers = 0;
  let slotArray = $(this).parents('.game-body').find('.slot');

  for (let i = 0; i < slotArray.length; i++) {
    if ($(slotArray[i]).children()[0].classList.contains('correct')) {
      correctAnswers = correctAnswers + 1;
      let cardCorreto = $(slotArray[i]).children()[0];
      $(cardCorreto).addClass('inside-slot');
    }
  }
  console.log(`correctAnswers = ${correctAnswers}`);
  if (correctAnswers == slotArray.length) {

    modalCorreto.show();

  } else {

    modalErrado.toggle();
    for (let i = 0; i < slotArray.length; i++) {
      if ($(slotArray[i]).children()[0].classList.contains('correct') == false) {
        $('#cardPile').append($(slotArray[i]).children()[0]);
      }
    }

  }
});
$('#modalCorreto').on('hidden.bs.modal', function () {
  let gamebodyArray = $('.game-body');
  let next;
  let current;
  for (let i = 0; i < gamebodyArray.length; i++) {
    if (gamebodyArray[i].style.display != 'none') {
      current = gamebodyArray[i];
      next = $(gamebodyArray[i]).next();
    }
  }
  $('.check-answer-btn').addClass('disabled');
  console.log('current:');
  console.log(current);
  console.log('next:');
  console.log(next);
  $(current).fadeOut();

  setTimeout(() => {
    $(next).fadeIn();
  }, 500);
});

$('.restart-btn').click(function () {
  let primeiraTela = $('.game-body')[0];
  let gameBodyArray = $('.game-body');
  $('.tela-final').fadeOut();

  $('.slot .card').removeClass('correct');
  $('.slot .card').removeClass('inside-slot');
  for (let i = 0; i != gameBodyArray.length; i++) {
    const slotArray = $($('.game-body')[i]).find('.slot');
    console.log(slotArray)
    for (let o = 0; o < slotArray.length; o++) {
      // $('.game-body')[i].children('.card-pile').appendChild($(slotArray[i]).children('.slot .card'));
      const cardPile = $($('.game-body')[i]).find('.card-pile')[0];
      const card = $(slotArray[o]).find('.card');
      console.log(card)
      console.log(card[0])
      cardPile.appendChild(card[0]);
    }
  }


  setTimeout(() => {
    $(primeiraTela).fadeIn();
  }, 500);
})