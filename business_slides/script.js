// ============================
// Topic Data - 24 Slides for Class 7
// ============================
const topics = [
    { icon: 'fa-home', title: 'Welcome', slide: 0 },
    { icon: 'fa-graduation-cap', title: 'What is Business Studies?', slide: 1 },
    { icon: 'fa-store', title: 'What is a Business?', slide: 2 },
    { icon: 'fa-rocket', title: 'How to Start a Business', slide: 3 },
    { icon: 'fa-balance-scale', title: 'Needs vs Wants', slide: 4 },
    { icon: 'fa-box', title: 'Consumer vs Producer Goods', slide: 5 },
    { icon: 'fa-user', title: 'Sole Trader', slide: 6 },
    { icon: 'fa-user-friends', title: 'Partnership', slide: 7 },
    { icon: 'fa-building', title: 'Limited Companies', slide: 8 },
    { icon: 'fa-hands-helping', title: 'Cooperatives', slide: 9 },
    { icon: 'fa-store-alt', title: 'Franchise', slide: 10 },
    { icon: 'fa-users-cog', title: 'Stakeholders', slide: 11 },
    { icon: 'fa-industry', title: 'Industry Sectors', slide: 12 },
    { icon: 'fa-chalkboard-teacher', title: 'Training Types', slide: 13 },
    { icon: 'fa-balance-scale-left', title: 'Training: Pros & Cons', slide: 14 },
    { icon: 'fa-user-plus', title: 'Recruitment Process', slide: 15 },
    { icon: 'fa-search', title: 'Internal vs External Recruitment', slide: 16 },
    { icon: 'fa-file-signature', title: 'Employment Contracts', slide: 17 },
    { icon: 'fa-exchange-alt', title: 'Privatisation', slide: 18 },
    { icon: 'fa-shopping-bag', title: 'Retailers', slide: 19 },
    { icon: 'fa-globe-americas', title: 'International Trade', slide: 20 },
    { icon: 'fa-globe', title: 'Trade Blocs & Multinationals', slide: 21 },
    { icon: 'fa-calculator', title: 'Balance of Payments', slide: 22 },
    { icon: 'fa-trophy', title: 'Summary & Congratulations', slide: 23 }
];

// ============================
// DOM Elements
// ============================
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const topicList = document.getElementById('topicList');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// ============================
// State
// ============================
let currentSlide = 0;
const totalSlides = slides.length;

// ============================
// Initialize
// ============================
function init() {
    populateTopicList();
    updateSlide();
    setupEventListeners();
    applySlideBackground();
    
    // Add bounce animation to icons on load
    setTimeout(() => {
        addBounceAnimations();
    }, 500);
}

// ============================
// Populate Topic List
// ============================
function populateTopicList() {
    topics.forEach((topic, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas ${topic.icon}"></i> ${topic.title}`;
        li.addEventListener('click', () => goToSlide(index));
        topicList.appendChild(li);
    });
}

// ============================
// Event Listeners
// ============================
function setupEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Start button
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            nextSlide();
        });
    }
    
    // Restart button
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            goToSlide(0);
        });
    }
    
    // Menu toggle
    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    
    // Click outside menu to close
    document.addEventListener('click', (e) => {
        if (sideMenu.classList.contains('active') && 
            !sideMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sideMenu.classList.remove('active');
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
    
    // Touch/Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// ============================
// Keyboard Handler
// ============================
function handleKeyboard(e) {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            prevSlide();
            break;
        case 'm':
        case 'M':
            toggleMenu();
            break;
        case 'Escape':
            if (sideMenu.classList.contains('active')) {
                sideMenu.classList.remove('active');
            }
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(totalSlides - 1);
            break;
    }
}

// ============================
// Navigation Functions
// ============================
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    sideMenu.classList.remove('active');
}

// ============================
// Update Slide
// ============================
function updateSlide() {
    // Update slides visibility
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
    
    // Update progress bar
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentSlide + 1} / ${totalSlides}`;
    
    // Update topic list active state
    const listItems = topicList.querySelectorAll('li');
    listItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentSlide) {
            item.classList.add('active');
        }
    });
    
    // Apply background color
    applySlideBackground();
    
    // Trigger animations for active slide
    triggerSlideAnimations();
    
    // Check if last slide and trigger confetti
    if (currentSlide === totalSlides - 1) {
        setTimeout(triggerConfetti, 500);
    }
}

// ============================
// Apply Slide Background
// ============================
function applySlideBackground() {
    const activeSlide = slides[currentSlide];
    const colorClass = activeSlide.dataset.color;
    
    // Remove all gradient classes from body
    document.body.className = '';
    
    // Apply the gradient class
    if (colorClass) {
        document.body.classList.add(colorClass);
    }
}

// ============================
// Trigger Slide Animations
// ============================
function triggerSlideAnimations() {
    const activeSlide = slides[currentSlide];
    
    // Re-trigger animations by removing and adding animation classes
    const animatedElements = activeSlide.querySelectorAll(
        '.slide-in-left, .slide-in-right, .info-card, .comparison-box, ' +
        '.sector, .training-card, .step-card, .goods-card, .company-card, ' +
        '.timeline-step, .summary-item, .icon-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = '';
        
        // Add staggered animation delay
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// ============================
// Add Bounce Animations
// ============================
function addBounceAnimations() {
    const bounceElements = document.querySelectorAll('.bounce-in');
    bounceElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.15}s`;
    });
}

// ============================
// Toggle Menu
// ============================
function toggleMenu() {
    sideMenu.classList.toggle('active');
}

// ============================
// Confetti effect on last slide
// ============================
function triggerConfetti() {
    const colors = ['#f093fb', '#f5576c', '#ffd200', '#10b981', '#6366f1', '#ff6b6b', '#38ef7d'];
    const container = document.body;
    
    // Create more confetti pieces
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomSize = 8 + Math.random() * 8;
            const randomLeft = Math.random() * 100;
            const randomDuration = 2 + Math.random() * 3;
            const randomRotation = Math.random() * 360;
            
            confetti.style.cssText = `
                position: fixed;
                width: ${randomSize}px;
                height: ${randomSize}px;
                background: ${randomColor};
                top: -20px;
                left: ${randomLeft}%;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                pointer-events: none;
                z-index: 9999;
                transform: rotate(${randomRotation}deg);
                animation: confettiFall ${randomDuration}s linear forwards;
            `;
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), randomDuration * 1000);
        }, i * 30);
    }
}

// Add confetti animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .bounce-in {
        animation: bounceIn 0.6s ease forwards;
        opacity: 0;
    }
`;
document.head.appendChild(style);

// ============================
// Fun Sound Effects (Optional)
// ============================
function playClickSound() {
    // Can be enabled if sound files are added
    // const audio = new Audio('click.mp3');
    // audio.volume = 0.3;
    // audio.play();
}

// ============================
// Preload Images (if any)
// ============================
function preloadImages() {
    // Add image preloading if needed
}

// ============================
// Initialize App
// ============================
document.addEventListener('DOMContentLoaded', init);

// ============================
// Service Worker for Offline Support (Optional)
// ============================
if ('serviceWorker' in navigator) {
    // Service worker can be added for offline support
    // navigator.serviceWorker.register('/sw.js');
}

// ============================
// Performance Optimization
// ============================
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any size-dependent elements
    applySlideBackground();
}, 250));

// ============================
// Accessibility Features
// ============================
// Add aria labels dynamically
function updateAriaLabels() {
    prevBtn.setAttribute('aria-label', `Go to previous slide (${currentSlide} of ${totalSlides})`);
    nextBtn.setAttribute('aria-label', `Go to next slide (${currentSlide + 2} of ${totalSlides})`);
}

// Call on slide change
const originalUpdateSlide = updateSlide;
updateSlide = function() {
    originalUpdateSlide();
    updateAriaLabels();
};
