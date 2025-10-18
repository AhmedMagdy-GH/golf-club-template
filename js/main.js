const words = document.querySelectorAll('.hero-text-animation span');
let currentIndex = 0;

setInterval(() => {
    words[currentIndex].classList.remove('is-visible');
    words[currentIndex].classList.add('is-hidden');

    currentIndex = (currentIndex + 1) % words.length;
    words[currentIndex].classList.remove('is-hidden');
    words[currentIndex].classList.add('is-visible');
}, 2500);
