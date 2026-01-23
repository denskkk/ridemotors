// ============================================
// RideMotors - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // NAVIGATION
    // ============================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navigation
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Create mailto link
            const subject = encodeURIComponent('Заявка з сайту RideMotors');
            const body = encodeURIComponent(
                `Ім'я: ${formData.name}\n` +
                `Телефон: ${formData.phone}\n` +
                `Послуга: ${formData.service}\n\n` +
                `Повідомлення:\n${formData.message}`
            );
            
            // Open email client
            window.location.href = `mailto:info@ridemotors.com.ua?subject=${subject}&body=${body}`;
            
            // Show success message
            showNotification('Дякуємо! Ваша заявка відправлена.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ============================================
    // SMOOTH SCROLL TO ANCHORS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(139, 92, 246, 0.5);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 600;
        `;
        
        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // ============================================
    // PARALLAX EFFECT FOR BACKGROUND ORBS
    // ============================================
    const glowOrbs = document.querySelectorAll('.glow-orb');
    
    if (glowOrbs.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            glowOrbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // ============================================
    // CURSOR GLOW EFFECT (Desktop only)
    // ============================================
    if (window.innerWidth > 768) {
        let cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        cursorGlow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursorGlow);
        
        let cursorX = 0;
        let cursorY = 0;
        let glowX = 0;
        let glowY = 0;
        
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorGlow.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
        
        // Smooth follow animation
        function animateCursorGlow() {
            glowX += (cursorX - glowX) * 0.1;
            glowY += (cursorY - glowY) * 0.1;
            
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            
            requestAnimationFrame(animateCursorGlow);
        }
        
        animateCursorGlow();
    }
    
    // ============================================
    // LOADING ANIMATION
    // ============================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ============================================
    // SERVICE CARDS TILT EFFECT
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // ============================================
    // PHONE NUMBER FORMATTING
    // ============================================
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.startsWith('380')) {
                    value = value.substring(3);
                }
                
                let formatted = '+380';
                if (value.length > 0) formatted += ' (' + value.substring(0, 2);
                if (value.length >= 2) formatted += ') ' + value.substring(2, 5);
                if (value.length >= 5) formatted += '-' + value.substring(5, 7);
                if (value.length >= 7) formatted += '-' + value.substring(7, 9);
                
                e.target.value = formatted;
            }
        });
    }
    
    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const scrollTopButton = document.createElement('button');
    scrollTopButton.className = 'scroll-to-top';
    scrollTopButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
    `;
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
    `;
    
    scrollTopButton.querySelector('svg').style.cssText = `
        width: 24px;
        height: 24px;
    `;
    
    document.body.appendChild(scrollTopButton);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.transform = 'scale(1)';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.transform = 'scale(0)';
        }
    });
    
    // Scroll to top on click
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollTopButton.addEventListener('mouseenter', () => {
        scrollTopButton.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.5)';
    });
    
    scrollTopButton.addEventListener('mouseleave', () => {
        scrollTopButton.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)';
    });
    
    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    
    // Lazy load images when they are about to enter viewport
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log(
        '%cRideMotors',
        'font-size: 50px; font-weight: bold; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); -webkit-background-clip: text; color: transparent;'
    );
    console.log(
        '%cТехнологічний сервіс нового покоління 🏍️⚡',
        'font-size: 16px; color: #8b5cf6;'
    );
    console.log(
        '%cШукаєте таланти? Напишіть нам: info@ridemotors.com.ua',
        'font-size: 14px; color: #94a3b8;'
    );
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
