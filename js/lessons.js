// Lessons Data Loader
// This file manages loading lesson content from separate HTML files

const lessonsData = {};

// Fetch lesson content from HTML files
async function loadLessonContent(lessonId) {
    if (lessonsData[lessonId]) {
        return lessonsData[lessonId];
    }
    
    try {
        const module = lessonId.split(' ')[1].split('.')[0]; // Extract module number
        const response = await fetch(`lessons/module${module}/${lessonId.replace(' ', '-').toLowerCase()}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load lesson: ${lessonId}`);
        }
        const content = await response.text();
        lessonsData[lessonId] = content;
        return content;
    } catch (error) {
        console.error('Error loading lesson:', error);
        return '<p class="text-red-700">Error loading lesson content. Please try again.</p>';
    }
}

// Export for use in access.html
window.loadLessonContent = loadLessonContent;
window.lessonsData = lessonsData;
