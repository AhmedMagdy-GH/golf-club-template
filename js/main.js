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

const loginBtn = document.getElementById('login-btn');
const closeBtn = document.getElementById('close-btn');
const loginPanel = document.getElementById('login-panel');
const overlay = document.getElementById('login-panel-overlay');

// لما أضغط على زرار Login في الناف
loginBtn.addEventListener('click', () => {
    loginPanel.classList.add('active');
    overlay.classList.add('active');
});

// لما أضغط على X أو برة البانل
closeBtn.addEventListener('click', closeLoginPanel);
overlay.addEventListener('click', closeLoginPanel);

function closeLoginPanel() {
    loginPanel.classList.remove('active');
    overlay.classList.remove('active');
}







// اختر الهامبرجر والمينيو
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// تحقق إن العناصر موجودة
if (hamburger && navMenu) {
    // عند الضغط على الهامبرجر
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active'); // يحول الهامبرجر لـ X
        navMenu.classList.toggle('active');   // يفتح/يقفل المينيو
    });

    // إغلاق المينيو عند الضغط على أي رابط
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active'); // يرجع الهامبرجر للوضع الطبيعي
            navMenu.classList.remove('active');   // يغلق المينيو
        });
    });
}
