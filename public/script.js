// Truly Dramatic Interactive Logic

// 3D Tilt Effect
const heroTilt = document.getElementById('hero-tilt');
const heroScene = document.getElementById('hero-scene');
const debris = document.querySelectorAll('.debris');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate rotation (-10 to 10 degrees)
    const xPos = (clientX / innerWidth) - 0.5;
    const yPos = (clientY / innerHeight) - 0.5;

    const rotateX = yPos * -20; 
    const rotateY = xPos * 20;

    if (heroTilt) {
        heroTilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    // Parallax Debris
    debris.forEach((item, index) => {
        const speed = (index + 1) * 20;
        const x = xPos * speed;
        const y = yPos * speed;
        item.style.transform = `translate(${x}px, ${y}px) rotate(${xPos * 10}deg)`;
    });
});

// Copy CA Functionality
function copyCA() {
    const ca = "0x9580b3CB0781317371a643EECd7f2188E70492f9";
    navigator.clipboard.writeText(ca).then(() => {
        showToast("CA Copied to Clipboard! 🚀");
    });
}

// Sticker-Style Toast
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'sticker';
    toast.style.position = 'fixed';
    toast.style.bottom = '40px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '12px 24px';
    toast.style.zIndex = '1000';
    toast.style.fontFamily = 'Fredoka';
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 2000);
}

// Reveal Animations on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.sticker, .section-title, .story-card');
    revealElements.forEach(el => {
        if (!el.classList.contains('hero-img')) { // Don't hide the main hero
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            observer.observe(el);
        } else {
            el.style.opacity = '1';
        }
    });
});
