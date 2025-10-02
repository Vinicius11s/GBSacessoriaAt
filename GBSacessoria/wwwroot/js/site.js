// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            hamburger.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle menu visibility
            mobileMenu.classList.toggle('show');
            
            // Toggle hamburger animation (optional)
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('active');
            }
        });
    }
});
