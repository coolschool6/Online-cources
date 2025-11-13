// ========================================
// COURSE DATA
// ========================================
const courses = [
    {
        id: 0,
        title: "The Genius of the Prompt (AI)",
        description: "Master AI communication and prompt engineering across 5 focused modules.",
        icon: "🧠",
        rating: 5.0,
        reviews: 5021,
        price: "FREE",
        gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
        link: "course-sales.html",
        type: "free"
    },
    {
        id: 1,
        title: "Web Development From Scratch",
        description: "Master HTML, CSS, JavaScript, and build real-world projects from the ground up.",
        icon: "�",
        rating: 4.9,
        reviews: 2847,
        price: "Paid Soon",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        type: "paid"
    },
    {
        id: 2,
        title: "Mastering Digital Art (Graphics)",
        description: "Create stunning digital illustrations and visual assets using modern tools.",
        icon: "🎨",
        rating: 4.8,
        reviews: 1923,
        price: "Paid Soon",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        type: "paid"
    },
    {
        id: 3,
        title: "Financial Literacy for Beginners",
        description: "Understand budgeting, saving, investing and building long-term wealth.",
        icon: "�",
        rating: 4.9,
        reviews: 1456,
        price: "Paid Soon",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        type: "paid"
    },
    {
        id: 4,
        title: "Data Science Fundamentals",
        description: "Learn analysis, statistics, and data storytelling to extract insights.",
        icon: "📊",
        rating: 4.7,
        reviews: 2134,
        price: "Paid Soon",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        type: "paid"
    },
    {
        id: 5,
        title: "Business Strategy & Growth",
        description: "Frameworks for scaling operations, revenue and market positioning.",
        icon: "�",
        rating: 4.9,
        reviews: 1678,
        price: "Paid Soon",
        gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        type: "paid"
    },
    {
        id: 6,
        title: "Effective Communication Skills",
        description: "Improve clarity, persuasion and collaboration in professional settings.",
        icon: "🗣️",
        rating: 4.8,
        reviews: 1892,
        price: "Paid Soon",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        type: "paid"
    },
    {
        id: 7,
        title: "Mobile App Development",
        description: "Build performant cross-platform apps with modern toolchains.",
        icon: "�",
        rating: 4.7,
        reviews: 1234,
        price: "Paid Soon",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        type: "paid"
    },
    {
        id: 8,
        title: "Advanced Leadership",
        description: "Develop strategic thinking, team motivation and executive presence.",
        icon: "🏆",
        rating: 4.8,
        reviews: 1567,
        price: "Paid Soon",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        type: "paid"
    },
    // Legacy example replaced by leadership; keep array length consistent for carousel logic
];

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Close mobile menu when clicking on a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// RENDER COURSES
// ========================================
let currentPage = 0;
const coursesPerPage = 6;

function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = '';
    
    const start = currentPage * coursesPerPage;
    const end = start + coursesPerPage;
    const coursesToShow = courses.slice(start, end);
    
    coursesToShow.forEach(course => {
        const stars = '★'.repeat(Math.floor(course.rating)) + 
                     (course.rating % 1 !== 0 ? '☆' : '');
        
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        const isFree = course.type === 'free';
        const buttonLabel = isFree ? 'Enroll Now - FREE' : 'Details';
        const buttonAction = isFree ? `window.location.href='${course.link}'` : `alert('This course requires payment. Check back soon!')`;
        courseCard.innerHTML = `
            <div class="course-image" style="background: ${course.gradient}">
                <span style="font-size: 4rem;">${course.icon}</span>
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <div class="course-rating">
                        <span class="stars">${stars}</span>
                        <span>${course.rating}</span>
                        <span style="color: var(--text-light); font-size: 0.9rem;">(${course.reviews.toLocaleString()})</span>
                    </div>
                    <div class="course-price">${course.price}</div>
                </div>
                <button class="course-btn" onclick="${buttonAction}">${buttonLabel}</button>
            </div>
        `;
        
        coursesGrid.appendChild(courseCard);
    });
}

// ========================================
// COURSE CAROUSEL
// ========================================
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        renderCourses();
        scrollToSection('courses');
    }
});

nextBtn.addEventListener('click', () => {
    const maxPage = Math.ceil(courses.length / coursesPerPage) - 1;
    if (currentPage < maxPage) {
        currentPage++;
        renderCourses();
        scrollToSection('courses');
    }
});

function scrollToSection(id) {
    const element = document.getElementById(id);
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// ========================================
// ENROLL FUNCTION
// ========================================
// Legacy enroll function kept for backward compatibility if needed
function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    if (course.type === 'free' && course.link) {
        window.location.href = course.link;
    } else {
        alert('This course requires payment. Check back soon!');
    }
}

// ========================================
// SMOOTH SCROLL FOR ALL LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.categories, .courses, .testimonials, .cta');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Initial render of courses
    renderCourses();
});

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
