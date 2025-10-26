// text animation====================================

const words = document.querySelectorAll('.hero-text-animation span');
let currentIndex = 0;

setInterval(() => {
    words[currentIndex].classList.remove('is-visible');
    words[currentIndex].classList.add('is-hidden');

    currentIndex = (currentIndex + 1) % words.length;
    words[currentIndex].classList.remove('is-hidden');
    words[currentIndex].classList.add('is-visible');
}, 2500);


//scroll animation =====================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.offsetTop - 100; // 🟡 هنا طرحت 100px
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 300; // تقدر تزود الوقت لو عايز الحركة أبطأ
        let start = null;

        function easeInOut(t) {
            return t < 0.5
                ? t  // 🌀 حركة سلسة في البداية
                : 1 - Math.pow(-2 * t + 2, 2) / 2; // 🌀 بطيئة في النهاية
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
});

//================== avtive links and pages ========================
const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split("/").pop(); // اسم الصفحة الحالية

// ✅ أولاً: فعل اللينك الخاص بالصفحة الحالية (لو هي صفحة من dropdown)
let isDropdownPage = false;
navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
        link.classList.add('active');
        isDropdownPage = true; // نعلم إننا في صفحة من dropdown
    }
});

// ✅ ثانياً: عند الضغط على أي لينك
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ✅ ثالثاً: لو إحنا في index.html فقط نفعل تأثير السكاشن
if (!isDropdownPage) {
    window.addEventListener('scroll', () => {
        let current = '';
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
                link.classList.add('active');
            }
        });
    });
}

/* =========================login-panel========================*/

const loginBtns = document.querySelectorAll('.login-btn');
const closeBtn = document.getElementById('close-btn');
const loginPanel = document.getElementById('login-panel');
const overlay = document.getElementById('login-panel-overlay');

loginBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault(); // يمنع القفز لأعلى الصفحة
        loginPanel.classList.add('active');
        overlay.classList.add('active');
    });
});

closeBtn.addEventListener('click', closeLoginPanel);
overlay.addEventListener('click', closeLoginPanel);

function closeLoginPanel() {
    loginPanel.classList.remove('active');
    overlay.classList.remove('active');
}

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

/////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const upperWave = document.querySelector(".upper-wave");

    if (!navbar || !upperWave) return;

    function handleScroll() {
        const windowWidth = window.innerWidth;
        const waveRect = upperWave.getBoundingClientRect();
        const waveBottom = waveRect.bottom + window.scrollY;
        const navbarHeight = navbar.offsetHeight;

        // لو الشاشة أصغر من 991px، خلي الناف بار لونه طبيعي
        if (windowWidth < 992) {
            navbar.classList.remove("transparent");
            navbar.classList.remove("scrolled");
            return;
        }

        // لو الناف فوق الموجة أو جزء منها ظاهر
        if (window.scrollY + navbarHeight < waveBottom) {
            navbar.classList.add("transparent");
            navbar.classList.remove("scrolled");
        } else {
            navbar.classList.remove("transparent");
            navbar.classList.add("scrolled");
        }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
});
