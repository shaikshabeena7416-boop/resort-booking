// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const bookingForm = document.getElementById('bookingForm');
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const roomButtons = document.querySelectorAll('.room-card .btn-secondary');

// ===== Sticky Navbar =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===== Smooth Scrolling =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Room Selection =====
roomButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const roomType = button.getAttribute('data-room');
        const roomSelect = document.getElementById('roomType');
        
        // Set the room type in the booking form
        if (roomSelect) {
            const options = roomSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].text.includes(roomType)) {
                    roomSelect.selectedIndex = i;
                    break;
                }
            }
        }
        
        // Scroll to booking section
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            const offsetTop = bookingSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Booking Form - WhatsApp Integration =====
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const roomType = document.getElementById('roomType').value;
    const guests = document.getElementById('guests').value;
    const requests = document.getElementById('requests').value.trim();
    
    // Validate form
    if (!name || !phone || !checkin || !checkout || !roomType) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate dates
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkinDate < today) {
        alert('Check-in date cannot be in the past.');
        return;
    }
    
    if (checkoutDate <= checkinDate) {
        alert('Check-out date must be after check-in date.');
        return;
    }
    
    // Format dates for display
    const formatDate = (dateString) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    // Calculate number of nights
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    
    // Create WhatsApp message
    const message = `*New Booking Request -   Beach Resort*%0A%0A` +
        `*Guest Name:* ${name}%0A` +
        `*Phone:* ${phone}%0A` +
        `*Check-in:* ${formatDate(checkin)}%0A` +
        `*Check-out:* ${formatDate(checkout)}%0A` +
        `*Number of Nights:* ${nights}%0A` +
        `*Room Type:* ${roomType}%0A` +
        `*Number of Guests:* ${guests}%0A` +
        (requests ? `*Special Requests:* ${requests}%0A` : '') +
        `%0A_Please confirm availability and send payment details._`;
    
    // WhatsApp admin number (replace with actual number)
    const adminNumber = '917416552469';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${adminNumber}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Save booking to PostgreSQL database via API
    fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            phone: phone,
            checkin: checkin,
            checkout: checkout,
            roomType: roomType,
            guests: guests,
            requests: requests
        })
    }).catch(err => console.error('Error saving booking:', err));
    
    // Show success message
    alert('Thank you for your booking request! You will be redirected to WhatsApp to complete your reservation.');
    
    // Reset form
    bookingForm.reset();
});

// ===== Gallery Modal =====
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        modal.style.display = 'block';
        modalImage.src = img.src;
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// ===== Set minimum date for date inputs =====
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput) {
        checkinInput.setAttribute('min', today);
    }
    
    // Update checkout min date when checkin changes
    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', () => {
            const checkinDate = new Date(checkinInput.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            const minCheckout = checkinDate.toISOString().split('T')[0];
            checkoutInput.setAttribute('min', minCheckout);
            
            // Clear checkout if it's before new min date
            if (checkoutInput.value && checkoutInput.value < minCheckout) {
                checkoutInput.value = '';
            }
        });
    }
});

// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        }
    });
}

// ===== Scroll Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.amenity-card, .room-card, .testimonial-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link style
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .nav-link.active {
            color: var(--secondary-blue);
        }
        .nav-link.active::after {
            width: 100%;
        }
    </style>
`);

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Console Welcome Message =====
console.log('%c🏖️   Beach Resort', 'font-size: 24px; font-weight: bold; color: #0077b6;');
console.log('%cWelcome to our website! For bookings, please use the booking form or contact us via WhatsApp.', 'font-size: 14px; color: #6c757d;');
