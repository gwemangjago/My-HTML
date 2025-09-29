// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Fix: Set initial body overflow to hidden during loading
    document.body.style.overflow = 'hidden';
    
    // Simulate loading
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        document.body.style.overflow = 'visible';
        initializeAnimations();
    }, 3000);
});

// Initialize all animations and interactions
function initializeAnimations() {
    initParticles();
    initCursorTrail();
    initNavigation();
    initScrollEffects();
    initTypingAnimation();
    initStatsCounter();
    initSkillBars();
    initFormAnimations();
    initAOS();
    initLogoAnimation();
}

// Logo Animation - NEW
function initLogoAnimation() {
    // Add hover effect to nav logo
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('mouseenter', () => {
            const rowletLogo = navLogo.querySelector('.rowlet-logo-nav');
            if (rowletLogo) {
                rowletLogo.style.transform = 'scale(1.1) rotate(10deg)';
            }
        });
        
        navLogo.addEventListener('mouseleave', () => {
            const rowletLogo = navLogo.querySelector('.rowlet-logo-nav');
            if (rowletLogo) {
                rowletLogo.style.transform = '';
            }
        });
    }
    
    // Add click effect to avatar
    const avatar = document.querySelector('.rowlet-avatar');
    if (avatar) {
        avatar.addEventListener('click', () => {
            avatar.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                avatar.style.transform = '';
            }, 600);
        });
    }
}

// Particle Background System
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, 6000 + Math.random() * 3000);
}

// Cursor Trail Effect
function initCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    if (!trail) return;
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.style.opacity = '1';
        trail.style.transform = 'scale(1)';
    });
    
    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    });
    
    // Smooth trail animation
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX - 10 + 'px';
        trail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Navigation Functionality - FIXED
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar || !hamburger || !navMenu) return;
    
    // Scroll effect - FIXED with throttling
    const handleScroll = throttle(() => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 16);
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle - FIXED
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Fix: Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    });
    
    // Close mobile menu when clicking outside - FIXED
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    });
    
    // Close mobile menu when clicking on links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fix: Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    });
}

// Scroll Effects - FIXED
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Highlight active navigation link - FIXED
    const handleScrollHighlight = throttle(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 16);
    
    window.addEventListener('scroll', handleScrollHighlight);
    
    // Initial check
    handleScrollHighlight();
    
    // Parallax effect for floating shapes - FIXED with performance optimization
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length > 0) {
        const handleParallax = throttle(() => {
            const scrolled = window.pageYOffset;
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }, 16);
        
        window.addEventListener('scroll', handleParallax);
    }
}

// Typing Animation - FIXED
function initTypingAnimation() {
    const heroName = document.getElementById('heroName');
    const heroRole = document.getElementById('heroRole');
    const heroDesc = document.getElementById('heroDesc');
    
    if (!heroName || !heroRole || !heroDesc) return;
    
    // Store original text content
    const nameText = heroName.textContent;
    const roleText = heroRole.textContent;
    const descText = heroDesc.innerHTML; // Use innerHTML to preserve line breaks
    
    // Clear initial text
    heroName.textContent = '';
    heroRole.textContent = '';
    heroDesc.innerHTML = '';
    
    // Add cursor class for typing effect
    heroName.classList.add('typing-cursor');
    
    // Type name
    setTimeout(() => {
        typeWriter(heroName, nameText, 100, () => {
            heroName.classList.remove('typing-cursor');
            heroRole.classList.add('typing-cursor');
        });
    }, 500);
    
    // Type role
    setTimeout(() => {
        typeWriter(heroRole, roleText, 80, () => {
            heroRole.classList.remove('typing-cursor');
            heroDesc.classList.add('typing-cursor');
        });
    }, 2000);
    
    // Type description
    setTimeout(() => {
        typeWriter(heroDesc, descText, 30, () => {
            heroDesc.classList.remove('typing-cursor');
        });
    }, 3500);
}

function typeWriter(element, text, speed, callback) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            if (element.tagName === 'P') {
                element.innerHTML += text.charAt(i);
            } else {
                element.textContent += text.charAt(i);
            }
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Stats Counter Animation - FIXED
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count')) || 0;
                let current = 0;
                const increment = target / 50;
                const duration = 2000; // 2 seconds
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, stepTime);
            });
        }
    }
    
    // Use throttled scroll listener
    const throttledAnimateStats = throttle(animateStats, 100);
    window.addEventListener('scroll', throttledAnimateStats);
    
    // Initial check
    animateStats();
}

// Skill Bars Animation - FIXED
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return;
    
    let animated = false;
    
    function animateSkills() {
        if (animated) return;
        
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;
        
        const rect = skillsSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            animated = true;
            
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width') || '0';
                    bar.style.width = width + '%';
                }, index * 200);
            });
        }
    }
    
    // Use throttled scroll listener
    const throttledAnimateSkills = throttle(animateSkills, 100);
    window.addEventListener('scroll', throttledAnimateSkills);
    
    // Initial check
    animateSkills();
}

// Form Animations and Handling - FIXED
function initFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Handle input focus/blur - FIXED
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    group.classList.remove('focused');
                    group.classList.remove('filled');
                } else {
                    group.classList.add('filled');
                }
            });
            
            // Handle input changes - FIXED
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    group.classList.add('filled');
                } else {
                    group.classList.remove('filled');
                }
            });
            
            // Check initial state
            if (input.value.trim()) {
                group.classList.add('filled');
            }
        }
    });
}

// Form Submission Handler - FIXED
function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const form = event.target;
    
    if (!submitBtn || !form) return;
    
    // Validate form
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.focus();
            showNotification('Please fill in all required fields', 'error');
            return false;
        }
    });
    
    if (!isValid) return;
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Message sent successfully! 🦉', 'success');
        
        // Reset form
        form.reset();
        
        // Remove filled classes
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('filled', 'focused');
        });
    }, 2000);
}

// Notification System - FIXED
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    const styles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        background: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#6366F1',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        fontSize: '0.9rem',
        fontWeight: '500',
        maxWidth: '300px',
        wordWrap: 'break-word'
    };
    
    Object.assign(notification.style, styles);
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Initialize AOS (Animate On Scroll) - FIXED
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    function checkElements() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('aos-animate')) {
                const delay = element.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }
    
    // Initial check
    setTimeout(checkElements, 100);
    
    // Check on scroll with throttling
    const throttledCheck = throttle(checkElements, 100);
    window.addEventListener('scroll', throttledCheck);
}

// Button Ripple Effect - FIXED
document.addEventListener('click', function(e) {
    const button = e.target.closest('.btn');
    if (!button) return;
    
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
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
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Ensure button has relative positioning
    const originalPosition = button.style.position;
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
        if (!originalPosition) {
            button.style.position = '';
        }
    }, 600);
});

// Add ripple animation keyframes - FIXED
if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .typing-cursor::after {
            content: '|';
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll for all anchor links - FIXED
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
});

// Performance optimization: Throttle function - FIXED
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Intersection Observer for better performance - FIXED
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Trigger specific animations based on element
            if (entry.target.classList.contains('stat-number') && !entry.target.hasAttribute('data-animated')) {
                entry.target.setAttribute('data-animated', 'true');
            }
        }
    });
}, observerOptions);

// Observe all sections - FIXED
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (observer) {
                observer.observe(section);
            }
        });
    }, 1000);
});

// Add loading states for images - FIXED
function handleImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                img.classList.add('error');
                console.warn('Failed to load image:', img.src);
            });
        }
    });
}

// Add resize handler for responsive adjustments - FIXED
window.addEventListener('resize', throttle(() => {
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile', isMobile);
    
    // Close mobile menu on resize to desktop
    if (!isMobile) {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    }
}, 250));

// Initialize mobile class on load - FIXED
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile', isMobile);
    handleImageLoading();
});

// Error handling - FIXED
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Prevent FOUC (Flash of Unstyled Content) - FIXED
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
});

// Export functions for global access if needed
window.showNotification = showNotification;
window.handleFormSubmit = handleFormSubmit;
