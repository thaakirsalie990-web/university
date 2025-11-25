document.addEventListener('DOMContentLoaded', () => {
    
    // Selectors
    const headerToggle = document.querySelector('.header__toggle');
    const headerNav = document.querySelector('.header__nav');
    const headerIcon = headerToggle?.querySelector('i');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const navLinks = document.querySelectorAll('.header__menu a[href^="#"]');

    // --- Helper: Close Menu & Reset Dropdowns ---
    const closeMenu = () => {
        // 1. Close Main Menu
        headerNav.classList.remove('active');
        
        // 2. Reset Icon to Bars
        if (headerIcon) {
            headerIcon.classList.remove('fa-xmark');
            headerIcon.classList.add('fa-bars');
        }

        // 3. FIX ISSUE #2: Reset all Dropdowns (Arrows & Lists)
        document.querySelectorAll('.has-dropdown').forEach(item => {
            item.classList.remove('open');
        });
    };

    // --- 1. Mobile Menu Toggle ---
    if (headerToggle && headerNav) {
        headerToggle.addEventListener('click', () => {
            const isOpen = headerNav.classList.contains('active');
            
            if (isOpen) {
                closeMenu(); // Use helper to close & reset
            } else {
                headerNav.classList.add('active');
                headerIcon.classList.remove('fa-bars');
                headerIcon.classList.add('fa-xmark');
            }
        });
    }

    // --- 2. FIX ISSUE #1: Dropdown Toggle Logic ---
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Only apply this logic on mobile (< 1024px)
            if (window.innerWidth < 1024) {
                // STOP the link from jumping to the section
                e.preventDefault(); 
                
                const parent = toggle.parentElement;
                
                // Optional: Close other open dropdowns (Accordion style)
                document.querySelectorAll('.has-dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('open');
                    }
                });

                // Toggle current dropdown
                parent.classList.toggle('open');
            }
        });
    });

    // --- 3. Smooth Scrolling & Closing Menu on Link Click ---
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // If this is a dropdown toggle on mobile, ignore it (handled above)
            if (this.classList.contains('dropdown-toggle') && window.innerWidth < 1024) {
                return; 
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Scroll to section
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close menu after clicking a link
                closeMenu();
            }
        });
    });
});