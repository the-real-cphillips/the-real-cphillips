/*
* JavaScript for Light/Dark Mode Toggle and Initial Preference Check
*/

document.addEventListener('DOMContentLoaded', () => {
    // We must target the document element (<html>) for Tailwind's dark mode strategy
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');

    // Check if the toggle button exists before proceeding
    if (!themeToggle) return;

    // Function to update the icon based on the current theme state
    function updateThemeIcon(isDark) {
        // SVG definitions for moon (dark) and sun (light) icons
        const moonIcon = '<svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"></path></svg>';
        const sunIcon = '<svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>';

        // If it's currently dark, show the sun icon (indicating clicking switches to light)
        if (isDark) {
            themeToggle.innerHTML = sunIcon;
        } else {
            // If it's currently light, show the moon icon (indicating clicking switches to dark)
            themeToggle.innerHTML = moonIcon;
        }
    }

    // --- Initial Theme Setup (Respecting saved preference and system preference) ---
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial state: saved preference wins, then system preference, default to dark
    let initialIsDark = false;

    if (savedTheme === 'light') {
        initialIsDark = false;
    } else if (savedTheme === 'dark') {
        initialIsDark = true;
    } else if (systemPrefersDark) {
        initialIsDark = true;
    }
    
    // Apply the class to the <html> element
    if (initialIsDark) {
        htmlElement.classList.add('dark');
        // Save the initial state if no preference was found (defaulting to dark)
        if (!savedTheme) {
            localStorage.setItem('theme', 'dark');
        }
    } else {
        htmlElement.classList.remove('dark');
        // Save the initial state if no preference was found (defaulting to light if system preference was not dark)
        if (!savedTheme) {
            localStorage.setItem('theme', 'light');
        }
    }

    // Set the correct icon after initial load
    updateThemeIcon(initialIsDark);


    // --- Toggle Handler ---
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });
});