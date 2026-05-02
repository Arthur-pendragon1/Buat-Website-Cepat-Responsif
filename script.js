// ===================================
// FAQ ACCORDION FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ===================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just a hash
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            
            // Add offset for sticky navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards for animation
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// ===================================
// WHATSAPP LINK HANDLER
// ===================================

document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Optional: Add analytics or tracking here
        console.log('WhatsApp link clicked');
    });
});

// ===================================
// ACTIVE NAVIGATION HIGHLIGHT
// ===================================

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.navbar-menu a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================

function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                
                const finalValue = entry.target.textContent;
                const numericValue = parseInt(finalValue);
                
                if (!isNaN(numericValue)) {
                    let currentValue = 0;
                    const increment = Math.ceil(numericValue / 50);
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            entry.target.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            const suffix = finalValue.replace(/[0-9]/g, '');
                            entry.target.textContent = currentValue + suffix;
                        }
                    }, 20);
                }
                
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => counterObserver.observe(stat));
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ===================================
// MOBILE MENU TOGGLE (if needed in future)
// ===================================

function handleMobileMenu() {
    const navbar = document.querySelector('.navbar');
    
    // Add mobile menu toggle if navbar gets too crowded
    if (window.innerWidth <= 768) {
        // Mobile-specific handling can go here
    }
}

window.addEventListener('resize', handleMobileMenu);
handleMobileMenu();

// ===================================
// LOADING OPTIMIZATION
// ===================================

// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// UTILITY: Add smooth fade-in on page load
// ===================================

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease-in';
