// Global variables
let projects = [];
let certificates = [];
let comments = [];
let showAllProjects = false;
let showAllCertificates = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: false,
        offset: 50
    });

    // Initialize components
    initializeNavigation();
    initializeTypingEffect();
    initializeLottieAnimation();
    initializePortfolio();
    initializeContact();
    initializeModals();
    initializeStats();
    
    // Load data
    loadProjectsAndCertificates();
    loadComments();
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu
            navToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            navToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function updateActiveNavLink() {
    const sections = ['home', 'about', 'portfolio', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = 'home';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
                currentSection = sectionId;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Typing effect
function initializeTypingEffect() {
    const words = ["Information Technology Graduate", "Tech Enthusiast"];
    const typedTextElement = document.getElementById('typed-text');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

// Lottie animation placeholder
function initializeLottieAnimation() {
    const lottieContainer = document.getElementById('lottie-animation');
    
    // Create a simple animated placeholder since we can't use actual Lottie
    lottieContainer.innerHTML = `
        <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #6366f1, #a855f7, #06b6d4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulse 2s ease-in-out infinite alternate;
            position: relative;
            overflow: hidden;
        ">
            <div style="
                width: 80%;
                height: 80%;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: rotate 10s linear infinite;
            ">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                </svg>
            </div>
        </div>
        <style>
            @keyframes pulse {
                0% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(1.05); opacity: 1; }
            }
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
}

// Portfolio functionality
function initializePortfolio() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active panel
            tabPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`${targetTab}-panel`).classList.add('active');
            
            // Refresh AOS animations
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        });
    });

    // Show more/less functionality
    const showMoreProjectsBtn = document.getElementById('show-more-projects');
    const showMoreCertificatesBtn = document.getElementById('show-more-certificates');

    if (showMoreProjectsBtn) {
        showMoreProjectsBtn.addEventListener('click', () => {
            showAllProjects = !showAllProjects;
            renderProjects();
            updateShowMoreButton(showMoreProjectsBtn, showAllProjects);
        });
    }

    if (showMoreCertificatesBtn) {
        showMoreCertificatesBtn.addEventListener('click', () => {
            showAllCertificates = !showAllCertificates;
            renderCertificates();
            updateShowMoreButton(showMoreCertificatesBtn, showAllCertificates);
        });
    }
}

function updateShowMoreButton(button, isShowingAll) {
    const span = button.querySelector('span');
    const icon = button.querySelector('.icon');
    
    if (isShowingAll) {
        span.textContent = 'Show Less';
        button.classList.add('showing-less');
    } else {
        span.textContent = 'Show More';
        button.classList.remove('showing-less');
    }
}

// Load projects and certificates data
function loadProjectsAndCertificates() {
    // Mock data - in a real application, this would come from Firebase
    projects = [
        {
            id: '1',
            Title: 'E-Commerce Platform',
            Description: 'A full-stack e-commerce platform built with modern web technologies, featuring user authentication, product management, and payment integration.',
            Img: '/Photo.png',
            Link: 'https://example.com',
            Github: 'https://github.com/example',
            TechStack: ['React', 'Node.js', 'MongoDB', 'Express'],
            Features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Integration', 'Admin Dashboard']
        },
        {
            id: '2',
            Title: 'Task Management App',
            Description: 'A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.',
            Img: '/Photo.png',
            Link: 'https://example.com',
            Github: 'https://github.com/example',
            TechStack: ['Vue.js', 'Firebase', 'Tailwind CSS'],
            Features: ['Real-time Collaboration', 'Project Management', 'Task Tracking', 'Team Chat', 'File Sharing']
        },
        {
            id: '3',
            Title: 'Weather Dashboard',
            Description: 'A responsive weather dashboard that provides current weather conditions, forecasts, and weather maps for multiple locations.',
            Img: '/Photo.png',
            Link: 'https://example.com',
            Github: 'https://github.com/example',
            TechStack: ['JavaScript', 'API Integration', 'Chart.js'],
            Features: ['Current Weather', '7-Day Forecast', 'Weather Maps', 'Location Search', 'Favorite Locations']
        }
    ];

    certificates = [
        { Img: '/Photo.png' },
        { Img: '/Photo.png' },
        { Img: '/Photo.png' },
        { Img: '/Photo.png' }
    ];

    renderProjects();
    renderCertificates();
    updateStats();
}

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const showMoreBtn = document.getElementById('show-more-projects');
    
    if (!projectsGrid) return;

    const isMobile = window.innerWidth < 768;
    const initialItems = isMobile ? 4 : 6;
    const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);

    projectsGrid.innerHTML = displayedProjects.map((project, index) => `
        <div class="project-card" data-aos="${getAOSAnimation(index)}" data-aos-duration="1000">
            <div class="project-image">
                <img src="${project.Img}" alt="${project.Title}" loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.Title}</h3>
                <p class="project-description">${project.Description}</p>
                <div class="project-actions">
                    ${project.Link ? `
                        <a href="${project.Link}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <span>Live Demo</span>
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="m7 17 10-10M17 7H7v10"/>
                            </svg>
                        </a>
                    ` : '<span style="color: #6b7280; font-size: 0.875rem;">Demo Not Available</span>'}
                    
                    <button class="details-btn" onclick="openProjectModal('${project.id}')">
                        <span>Details</span>
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m9 18 6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Show/hide the "Show More" button
    if (projects.length > initialItems) {
        showMoreBtn.style.display = 'inline-flex';
    } else {
        showMoreBtn.style.display = 'none';
    }

    // Refresh AOS
    AOS.refresh();
}

function renderCertificates() {
    const certificatesGrid = document.getElementById('certificates-grid');
    const showMoreBtn = document.getElementById('show-more-certificates');
    
    if (!certificatesGrid) return;

    const isMobile = window.innerWidth < 768;
    const initialItems = isMobile ? 4 : 6;
    const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

    certificatesGrid.innerHTML = displayedCertificates.map((certificate, index) => `
        <div class="certificate-card" data-aos="${getAOSAnimation(index)}" data-aos-duration="1000" onclick="openCertificateModal('${certificate.Img}')">
            <div class="certificate-image">
                <img src="${certificate.Img}" alt="Certificate" loading="lazy">
            </div>
        </div>
    `).join('');

    // Show/hide the "Show More" button
    if (certificates.length > initialItems) {
        showMoreBtn.style.display = 'inline-flex';
    } else {
        showMoreBtn.style.display = 'none';
    }

    // Refresh AOS
    AOS.refresh();
}

function getAOSAnimation(index) {
    const animations = ['fade-up-right', 'fade-up', 'fade-up-left'];
    return animations[index % 3];
}

// Modal functionality
function initializeModals() {
    const projectModal = document.getElementById('project-modal');
    const certificateModal = document.getElementById('certificate-modal');
    const projectModalClose = document.getElementById('modal-close');
    const certificateModalClose = document.getElementById('certificate-modal-close');

    // Close modals
    projectModalClose.addEventListener('click', () => closeModal('project-modal'));
    certificateModalClose.addEventListener('click', () => closeModal('certificate-modal'));

    // Close modals when clicking outside
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeModal('project-modal');
    });

    certificateModal.addEventListener('click', (e) => {
        if (e.target === certificateModal) closeModal('certificate-modal');
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal('project-modal');
            closeModal('certificate-modal');
        }
    });
}

function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    
    // Populate modal content
    document.getElementById('modal-title').textContent = project.Title;
    document.getElementById('modal-image').src = project.Img;
    document.getElementById('modal-description').textContent = project.Description;
    
    // Tech stack
    const techStackContainer = document.getElementById('modal-tech-stack');
    techStackContainer.innerHTML = project.TechStack.map(tech => 
        `<span class="tech-badge">${tech}</span>`
    ).join('');
    
    // Features
    const featuresContainer = document.getElementById('modal-features');
    if (project.Features && project.Features.length > 0) {
        featuresContainer.innerHTML = `
            <h4>Key Features</h4>
            <ul>
                ${project.Features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
    } else {
        featuresContainer.innerHTML = '<p style="color: #9ca3af;">No features listed.</p>';
    }
    
    // Links
    const liveLink = document.getElementById('modal-live-link');
    const githubLink = document.getElementById('modal-github-link');
    
    if (project.Link) {
        liveLink.href = project.Link;
        liveLink.style.display = 'inline-flex';
    } else {
        liveLink.style.display = 'none';
    }
    
    if (project.Github && project.Github !== 'Private') {
        githubLink.href = project.Github;
        githubLink.style.display = 'inline-flex';
    } else {
        githubLink.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openCertificateModal(imageSrc) {
    const modal = document.getElementById('certificate-modal');
    const modalImage = document.getElementById('certificate-modal-image');
    
    modalImage.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Contact functionality
function initializeContact() {
    const contactForm = document.getElementById('contact-form');
    const commentForm = document.getElementById('comment-form');

    // Contact form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <svg class="icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>Sending...</span>
        `;
        submitBtn.disabled = true;

        try {
            // Show success message
            await Swal.fire({
                title: 'Success!',
                text: 'Your message has been sent successfully!',
                icon: 'success',
                confirmButtonColor: '#6366f1',
                timer: 2000,
                timerProgressBar: true,
                background: '#030014',
                color: '#ffffff'
            });

            // Reset form
            contactForm.reset();
        } catch (error) {
            await Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonColor: '#6366f1',
                background: '#030014',
                color: '#ffffff'
            });
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Comment form submission
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('comment-name').value.trim();
        const message = document.getElementById('comment-message').value.trim();
        const photoFile = document.getElementById('comment-photo').files[0];
        
        if (!name || !message) return;

        const submitBtn = commentForm.querySelector('.comment-submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <svg class="icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
            </svg>
            <span>Posting...</span>
        `;
        submitBtn.disabled = true;

        try {
            // Create new comment
            const newComment = {
                id: Date.now().toString(),
                userName: name,
                content: message,
                createdAt: new Date(),
                profileImage: photoFile ? URL.createObjectURL(photoFile) : null
            };

            // Add to comments array
            comments.unshift(newComment);
            
            // Update localStorage
            localStorage.setItem('comments', JSON.stringify(comments));
            
            // Re-render comments
            renderComments();
            
            // Reset form
            commentForm.reset();
            
            // Show success message
            await Swal.fire({
                title: 'Success!',
                text: 'Your comment has been posted!',
                icon: 'success',
                confirmButtonColor: '#6366f1',
                timer: 1500,
                timerProgressBar: true,
                background: '#030014',
                color: '#ffffff'
            });
        } catch (error) {
            await Swal.fire({
                title: 'Error!',
                text: 'Failed to post comment. Please try again.',
                icon: 'error',
                confirmButtonColor: '#6366f1',
                background: '#030014',
                color: '#ffffff'
            });
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Comments functionality
function loadComments() {
    // Load from localStorage
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
        comments = JSON.parse(storedComments).map(comment => ({
            ...comment,
            createdAt: new Date(comment.createdAt)
        }));
    }
    
    renderComments();
}

function renderComments() {
    const commentsList = document.getElementById('comments-list');
    const commentsCount = document.getElementById('comments-count');
    
    if (!commentsList || !commentsCount) return;

    commentsCount.textContent = `(${comments.length})`;

    if (comments.length === 0) {
        commentsList.innerHTML = `
            <div class="no-comments">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                <p>No comments yet. Start the conversation!</p>
            </div>
        `;
        return;
    }

    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <div class="comment-avatar">
                ${comment.profileImage ? 
                    `<img src="${comment.profileImage}" alt="${comment.userName}'s profile">` :
                    `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>`
                }
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-name">${comment.userName}</span>
                    <span class="comment-time">${formatDate(comment.createdAt)}</span>
                </div>
                <p class="comment-text">${comment.content}</p>
            </div>
        </div>
    `).join('');
}

function formatDate(date) {
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

// Stats functionality
function initializeStats() {
    updateStats();
}

function updateStats() {
    const projectsCountElement = document.getElementById('projects-count');
    const certificatesCountElement = document.getElementById('certificates-count');
    const experienceYearsElement = document.getElementById('experience-years');

    if (projectsCountElement) {
        animateCounter(projectsCountElement, projects.length);
    }
    
    if (certificatesCountElement) {
        animateCounter(certificatesCountElement, certificates.length);
    }
    
    if (experienceYearsElement) {
        // Calculate years of experience from 2021-11-06
        const startDate = new Date('2021-11-06');
        const today = new Date();
        const experience = today.getFullYear() - startDate.getFullYear() - 
            (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);
        animateCounter(experienceYearsElement, experience);
    }
}

function animateCounter(element, targetValue) {
    let currentValue = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 30);
}

// Utility functions
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
    // Re-render projects and certificates with updated mobile detection
    renderProjects();
    renderCertificates();
    
    // Refresh AOS
    AOS.refresh();
}, 250));

// Handle visibility change (for performance optimization)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        AOS.refresh();
    }
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    smoothScrollPolyfill();
}

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}