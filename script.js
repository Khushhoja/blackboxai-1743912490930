// Shared functionality for MathSolver Pro

// Dark mode toggle
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const icon = themeToggle.querySelector('i');
        if (html.classList.contains('dark')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        const icon = themeToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', initDarkMode);

// Solution history management
function saveSolution(type, data) {
    let history = JSON.parse(localStorage.getItem('mathSolverHistory') || '[]');
    
    // Add new solution to history
    history.unshift({
        type,
        data,
        timestamp: new Date().toISOString()
    });

    // Keep only last 5 items
    history = history.slice(0, 5);
    localStorage.setItem('mathSolverHistory', JSON.stringify(history));
}

function getSolutionHistory() {
    return JSON.parse(localStorage.getItem('mathSolverHistory') || '[]');
}

// Common display functions
function displayError(containerId, message) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="bg-red-50 p-4 rounded-md">
            <h3 class="font-medium text-red-800">Error:</h3>
            <p class="text-lg my-2">${message}</p>
            <p class="text-sm">Please check your inputs and try again.</p>
        </div>
    `;
}

function displaySuccess(containerId, title, content, steps = []) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="bg-blue-50 p-4 rounded-md">
            <h3 class="font-medium text-blue-800">${title}:</h3>
            <p class="text-lg my-2">${content}</p>
        </div>
        <div class="bg-green-50 p-4 rounded-md">
            <h3 class="font-medium text-green-800">Result:</h3>
            <p class="text-lg my-2">${steps[steps.length - 1] || content}</p>
        </div>
        ${steps.length > 0 ? `
        <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="font-medium text-gray-800">Steps:</h3>
            <ol class="list-decimal pl-5 space-y-2 mt-2">
                ${steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        ` : ''}
    `;
}