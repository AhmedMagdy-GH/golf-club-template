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
