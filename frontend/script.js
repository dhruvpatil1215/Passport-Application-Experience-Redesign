// ========================================
// Passport Seva+ — Script
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.style.background = 'rgba(10, 14, 26, 0.96)';
            } else {
                navbar.style.background = 'rgba(10, 14, 26, 0.85)';
            }
        });
    }

    // --- Step cards reveal on scroll ---
    const stepCards = document.querySelectorAll('.step-card');
    if (stepCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        stepCards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(28px)';
            card.style.transition = `all 0.5s ease ${i * 0.15}s`;
            observer.observe(card);
        });
    }

    // --- Demo credentials ---
    const DEMO_EMAIL = 'hire-me@anshumat.org';
    const DEMO_PASSWORD = 'HireMe@2025!';

    // --- Login form handling ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Remove any existing error
        const removeError = () => {
            const existing = document.querySelector('.login-error');
            if (existing) existing.remove();
        };

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            removeError();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const btn = document.getElementById('loginBtn');

            if (!email || !password) return;

            btn.textContent = 'Logging in...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                    // Store login state
                    localStorage.setItem('passportSeva_loggedIn', 'true');
                    localStorage.setItem('passportSeva_email', email);

                    // Redirect to application
                    window.location.href = 'application.html';
                } else {
                    // Show error
                    btn.textContent = 'Login';
                    btn.disabled = false;
                    btn.style.opacity = '1';

                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'login-error';
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid email or password. Please try again.';
                    loginForm.insertBefore(errorDiv, loginForm.firstChild);
                }
            }, 1000);
        });
    }
});
