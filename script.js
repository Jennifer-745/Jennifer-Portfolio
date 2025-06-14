// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-link');

navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add click event listeners to all navigation links
[...navLinks, ...mobileLinks].forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        scrollToSection(sectionId);
    });
});

// Active section highlighting
function updateActiveSection() {
    const sections = ['home', 'about', 'skills', 'projects', 'internships', 'certificates', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                // Remove active class from all links
                [...navLinks, ...mobileLinks].forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section links
                [...navLinks, ...mobileLinks].forEach(link => {
                    if (link.getAttribute('data-section') === section) {
                        link.classList.add('active');
                    }
                });
                break;
            }
        }
    }
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.setProperty('--skill-width', width + '%');
                skillBar.style.width = width + '%';
                skillBar.classList.add('animate');
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveSection();
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    updateActiveSection();
});

// Add smooth reveal animations for cards
function addRevealAnimations() {
    const cards = document.querySelectorAll('.project-card, .certificate-card, .internship-card, .skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', () => {
    addRevealAnimations();
});

// Add typing effect for home title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment the following lines if you want a typing effect for the main title
// document.addEventListener('DOMContentLoaded', () => {
//     const homeTitle = document.querySelector('.home-title');
//     const originalText = homeTitle.textContent;
//     typeWriter(homeTitle, originalText, 100);
// });