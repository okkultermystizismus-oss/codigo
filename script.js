document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            if (window.scrollY < lastScrollY) {
                // Scrolling up
                navbar.classList.remove('hidden');
            } else {
                // Scrolling down
                navbar.classList.add('hidden');
            }
        } else {
            // At the top
            navbar.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after it has animated once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Staggered animations for code cards
    const staggerElements = document.querySelectorAll('.stagger-in');
    
    // We can use a different observer for staggered items if we want them to animate one by one
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Stagger delay
                staggerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    staggerElements.forEach(el => staggerObserver.observe(el));
});
