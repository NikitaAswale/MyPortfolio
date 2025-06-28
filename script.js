// Enhanced Particle.js Configuration with Theme Support
function initializeParticles() {
    const isDarkTheme = !document.documentElement.hasAttribute('data-theme') || 
                       document.documentElement.getAttribute('data-theme') === 'dark';
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: isDarkTheme ? '#2563eb' : '#1d4ed8'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: isDarkTheme ? '#2563eb' : '#1d4ed8',
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// Initialize particles on load
initializeParticles();

// Enhanced Smooth Scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Scroll Animations with Staggered Effects
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const staggeredObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple elements
            setTimeout(() => {
                entry.target.classList.add('in-view');
                
                // Special handling for skill cards with progress animation
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillProgress(entry.target);
                }
                
                // Special handling for project cards
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }, index * 150);
            
            staggeredObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.project-card, .skill-card, .contact-container, .journey-card')
    .forEach(el => staggeredObserver.observe(el));

// Skill progress animation
function animateSkillProgress(skillCard) {
    const progressBar = skillCard.querySelector('.skill-progress');
    if (progressBar) {
        const width = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.width = width;
        }, 300);
    }
}

// Project card animation
function animateProjectCard(projectCard) {
    const techTags = projectCard.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.opacity = '1';
        }, index * 100);
    });
}

// Enhanced form submission with better UX
function handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Construct email body
    const emailBody = `Name: ${name}%0D%0A%0D%0AMessage: ${message}%0D%0A%0D%0AFrom: ${email}`;
    const mailtoLink = `mailto:nikitaaswale@gmail.com?subject=Portfolio Contact from ${name}&body=${emailBody}`;
    
    // Simulate sending delay for better UX
    setTimeout(() => {
        window.location.href = mailtoLink;
        
        // Reset form and button
        document.getElementById('contactForm').reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        showNotification('Email client opened successfully!', 'success');
    }, 1500);
    
    return false;
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(45deg, #10b981, #059669);' : 'background: linear-gradient(45deg, #ef4444, #dc2626);'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced Theme Switcher with smooth transitions
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'light';

// Enhanced theme switch handler
themeToggle.addEventListener('change', function() {
    const newTheme = this.checked ? 'light' : 'dark';
    
    // Add transition class
    document.body.style.transition = 'all 0.3s ease';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Refresh particles with new theme
    if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
        setTimeout(initializeParticles, 100);
    }
    
    // Remove transition class after animation
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
});

// Magnetic cursor effect for interactive elements
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.primary-btn, .secondary-btn, .social-link, .floating-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Typing animation for hero text
function initTypingAnimation() {
    const titleElement = document.querySelector('.hero h1');
    if (titleElement) {
        const originalText = titleElement.innerHTML;
        titleElement.innerHTML = '';
        titleElement.style.opacity = '1';
        
        let i = 0;
        const typeSpeed = 50;
        
        function typeWriter() {
            if (i < originalText.length) {
                titleElement.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// Enhanced scroll-triggered animations
function initScrollAnimations() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform += ` translateY(${scrolled * speed}px)`;
        });
    });
}

// Enhanced navigation highlight
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Preloader animation
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <span class="highlight">DEV</span>FOLIO
            </div>
            <div class="preloader-progress">
                <div class="progress-bar"></div>
            </div>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-dark);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(preloader);
    
    // Simulate loading
    const progressBar = preloader.querySelector('.progress-bar');
    progressBar.style.cssText = `
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        transition: width 0.3s ease;
        border-radius: 2px;
    `;
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(preloader);
                }, 500);
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 200);
}

// Enhanced button click effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple effect keyframes to document
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .preloader-content {
        text-align: center;
        color: var(--text);
    }
    
    .preloader-logo {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 2rem;
        letter-spacing: 2px;
    }
    
    .preloader-progress {
        width: 200px;
        height: 3px;
        background: var(--border);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .nav-link.active {
        color: var(--primary) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(rippleStyles);

// Initialize all enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Don't show preloader in development, but keep it for production
    // initPreloader();
    
    setTimeout(() => {
        initMagneticEffect();
        initScrollAnimations();
        initNavigationHighlight();
        initButtonEffects();
        
        // Initialize typing animation after a delay
        setTimeout(initTypingAnimation, 2000);
    }, 100);
});

// Enhanced window load event
window.addEventListener('load', () => {
    // Trigger initial animations
    document.body.classList.add('loaded');
    
    // Initialize any remaining animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
            element.classList.add('animate-in');
        });
    }, 500);
});

// Cursor Follower Effect
function initCursorFollower() {
    const cursorFollower = document.querySelector('.cursor-follower');
    if (!cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor following
    function animateCursor() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .floating-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
        });
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
    });
}

// Enhanced Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-card, .bg-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    });
}

// Enhanced Form Validation with Real-time Feedback
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
        
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let message = '';
    
    // Remove existing validation styling
    field.classList.remove('valid', 'invalid');
    
    if (fieldType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        message = isValid ? 'Valid email' : 'Please enter a valid email';
    } else if (field.required) {
        isValid = value.length > 0;
        message = isValid ? 'Looks good!' : 'This field is required';
    }
    
    // Add validation styling
    field.classList.add(isValid ? 'valid' : 'invalid');
    
    // Show/hide validation message
    showFieldMessage(field, message, isValid);
}

function showFieldMessage(field, message, isValid) {
    let messageElement = field.parentNode.querySelector('.field-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'field-message';
        field.parentNode.appendChild(messageElement);
    }
    
    messageElement.textContent = message;
    messageElement.className = `field-message ${isValid ? 'valid' : 'invalid'}`;
    messageElement.style.cssText = `
        font-size: 0.8rem;
        margin-top: 0.5rem;
        padding: 0.25rem 0;
        transition: all 0.3s ease;
        color: ${isValid ? '#10b981' : '#ef4444'};
    `;
}

// Enhanced Theme Particles Integration
function updateParticlesTheme() {
    const isDarkTheme = !document.documentElement.hasAttribute('data-theme') || 
                       document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (window.pJSDom && window.pJSDom[0]) {
        const particles = window.pJSDom[0].pJS.particles;
        particles.color.value = isDarkTheme ? '#2563eb' : '#1d4ed8';
        particles.line_linked.color = isDarkTheme ? '#2563eb' : '#1d4ed8';
    }
}

// Intersection Observer for Advanced Animations
function initAdvancedAnimations() {
    const animatedElements = document.querySelectorAll(
        '.hero-text > *, .journey-card, .project-card, .skill-card, .floating-card'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillCard(entry.target);
                }
                
                if (entry.target.classList.contains('journey-card')) {
                    animateJourneyCard(entry.target);
                }
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
}

function animateSkillCard(skillCard) {
    const icon = skillCard.querySelector('.skill-icon');
    const progress = skillCard.querySelector('.skill-progress');
    
    setTimeout(() => {
        if (icon) {
            icon.style.animation = 'bounceIn 0.6s ease';
        }
        if (progress) {
            const width = progress.style.width;
            progress.style.width = '0%';
            setTimeout(() => {
                progress.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                progress.style.width = width;
            }, 200);
        }
    }, 300);
}

function animateJourneyCard(journeyCard) {
    const highlights = journeyCard.querySelectorAll('.journey-highlights li');
    
    highlights.forEach((highlight, index) => {
        setTimeout(() => {
            highlight.style.transform = 'translateX(0)';
            highlight.style.opacity = '1';
        }, index * 150);
    });
}

// Enhanced Button Click Effects
function initAdvancedButtonEffects() {
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Existing ripple effect code...
            
            // Add pulse effect
            this.style.animation = 'buttonPulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
        
        // Add magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// Performance Optimization
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    }, { passive: true });
    
    // Optimize animations for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01s');
    }
}

// Easter Egg: Konami Code
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.code);
        userInput = userInput.slice(-10);
        
        if (userInput.join(',') === konamiCode.join(',')) {
            triggerEasterEgg();
        }
    });
}

function triggerEasterEgg() {
    // Add rainbow effect to gradient text
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        gradientText.style.background = 'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)';
        gradientText.style.backgroundSize = '200% 200%';
        gradientText.style.animation = 'rainbow 2s linear infinite';
        
        showNotification('🎉 Easter egg activated! Rainbow mode enabled!', 'success');
    }
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initCursorFollower();
        initScrollProgress();
        initParallaxEffects();
        initFormValidation();
        initAdvancedAnimations();
        initAdvancedButtonEffects();
        initPerformanceOptimizations();
        initKonamiCode();
        
        // Update particles theme
        updateParticlesTheme();
    }, 100);
});

// Add enhanced CSS animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes buttonPulse {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
    
    @keyframes rainbow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .field-message {
        font-size: 0.8rem;
        margin-top: 0.5rem;
        transition: all 0.3s ease;
    }
    
    .form-group input.valid,
    .form-group textarea.valid {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .form-group input.invalid,
    .form-group textarea.invalid {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;
document.head.appendChild(enhancedStyles); 