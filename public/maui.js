document.getElementById('revealButton').addEventListener('click', function() {
    // Find the first hidden section
    const hiddenSections = document.querySelectorAll('.reveal-section.hidden');
    if (hiddenSections.length > 0) {
        // Reveal the first hidden section
        hiddenSections[0].classList.remove('hidden');
        
        // If that was the last section, hide the reveal button and show the home button
        if (hiddenSections.length === 1) {
            this.style.display = 'none';
            document.getElementById('homeButton').style.display = 'block';
        }
    }
});

// Assuming the homepage is at the root. Adjust the href as necessary.
document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = '/';
});