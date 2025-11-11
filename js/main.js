/*=================== hamburger animation========================*/
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* =====================login-panel========================*/

let loginBtns = document.querySelectorAll('.login-btn');
let closeBtn = document.getElementById('close-btn');
let loginPanel = document.getElementById('login-panel');
let overlay = document.getElementById('login-panel-overlay');

for (let i = 0; i < loginBtns.length; i++) {
    loginBtns[i].addEventListener('click', function (e) {
        e.preventDefault();
        loginPanel.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    });
}

function closeLoginPanel() {
    loginPanel.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
}

closeBtn.addEventListener('click', closeLoginPanel);
overlay.addEventListener('click', closeLoginPanel);

/* ==========================text animation======================*/

const words = document.querySelectorAll('.hero-text-animation span');
let currentIndex = 0;

setInterval(() => {
    words[currentIndex].classList.remove('is-visible');
    words[currentIndex].classList.add('is-hidden');

    currentIndex = (currentIndex + 1) % words.length;
    words[currentIndex].classList.remove('is-hidden');
    words[currentIndex].classList.add('is-visible');
}, 2400);

/*================== avtive links and pages ======================*/

const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop();

let isDropdownPage = false;

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
        link.classList.add('active');
        isDropdownPage = true;
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

if (!isDropdownPage) {
    window.addEventListener('scroll', () => {
        let current = "";
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        if (!current) return;

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active')
            }
        });
    });
}

/*==========================Transparent navbar=========================*/

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const upperWave = document.querySelector('.upper-wave');

    if (!navbar || !upperWave) return;

    function handleScroll() {
        const windowWidth = window.innerWidth;
        const navbarHeight = navbar.offsetHeight;
        const waveRect = upperWave.getBoundingClientRect();
        const waveBottom = waveRect.bottom + window.scrollY;


        if (windowWidth <= 992) {
            navbar.classList.remove('transparent');
            navbar.classList.remove('scrolled');
            return;
        }

        if (navbarHeight + window.scrollY < waveBottom) {
            navbar.classList.add('transparent');
            navbar.classList.remove('scrolled');
        } else {
            navbar.classList.remove('transparent');
            navbar.classList.add('scrolled');
        }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
});

/*============================scroll animation =================================*/

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.offsetTop - 100;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 300;
        let start = null;

        function easeInOut(t) {
            return t < 0.5
                ? t
                : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOut(progress);
            window.scrollTo(0, startPosition + (distance * ease));

            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    });

    document.body.style.overflow = 'hidden';

});