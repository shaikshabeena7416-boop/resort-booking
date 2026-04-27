#   Beach Resort Website

A modern, responsive beach resort website built with clean HTML, CSS, and minimal JavaScript. Features a tropical design with beach color palette, smooth animations, and WhatsApp booking integration.

## 🏖️ Features

### Homepage

- Full-width hero section with beach background
- Resort name, tagline, and "Book Now" button
- Smooth scrolling navigation

### About Section

- Resort description
- Amenities grid (pool, spa, restaurant, water sports, etc.)

### Rooms & Pricing

- 4 room types with images and pricing
- Room features and amenities
- "Book Now" buttons for each room

### Gallery

- Grid layout with beach, rooms, and resort images
- Lightbox modal for image viewing
- Hover effects and animations

### Location

- Interactive Google Maps embed
- Address and directions
- "Get Directions" button

### Booking System

- Complete booking form with:
  - Name
  - Phone number
  - Check-in/Check-out dates
  - Room type selection
  - Number of guests
  - Special requests
- WhatsApp API integration
- Form validation
- Dynamic message formatting

### Contact Section

- Phone, email, address
- 24/7 reception hours
- Floating WhatsApp chat button

### UI/UX Design

- Beach color palette (sand, blue, white)
- Smooth animations and hover effects
- Mobile-friendly responsive design
- Sticky navbar
- Testimonials section
- Footer with social media links

## 📁 Project Structure

```
resort/
├── index.html      # Main HTML file
├── styles.css      # All CSS styles
├── script.js       # JavaScript interactions
└── README.md       # This file
```

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Customize** the content as needed (see below)

## ⚙️ Customization

### WhatsApp Number

To change the admin WhatsApp number for bookings:

1. Open `index.html`
2. Find the WhatsApp floating button:
   ```html
   <a href="https://wa.me/15551234567" class="whatsapp-float" ...></a>
   ```
3. Replace `15551234567` with your actual WhatsApp number (with country code, no + or spaces)

4. Open `script.js`
5. Find the `adminNumber` variable:
   ```javascript
   const adminNumber = "15551234567";
   ```
6. Replace with your WhatsApp number

### Google Maps Location

To update the map location:

1. Open `index.html`
2. Find the `<iframe>` in the location section
3. Replace the `src` attribute with your actual Google Maps embed URL:
   - Go to Google Maps
   - Search for your resort location
   - Click "Share" → "Embed a map"
   - Copy the iframe code and replace the existing one

### Resort Information

Update the following in `index.html`:

- Resort name and tagline
- Contact information (phone, email, address)
- Room types and pricing
- Amenities
- Testimonials

### Images

Replace the Unsplash image URLs with your own images:

- Hero background
- Room images
- Gallery images
- Testimonial author photos

### Colors

To change the color scheme, edit the CSS variables in `styles.css`:

```css
:root {
  --primary-blue: #0077b6;
  --secondary-blue: #00b4d8;
  --light-blue: #90e0ef;
  --sand: #f4e4c1;
  --sand-dark: #d4c4a1;
  /* ... other colors */
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🎨 Color Palette

- **Primary Blue**: #0077b6 (Ocean blue)
- **Secondary Blue**: #00b4d8 (Light blue)
- **Light Blue**: #90e0ef (Sky blue)
- **Sand**: #f4e4c1 (Beach sand)
- **Sand Dark**: #d4c4a1 (Dark sand)
- **White**: #ffffff
- **Off White**: #f8f9fa
- **Dark**: #1a1a2e (Text color)

## 📦 Dependencies

- **Fonts**: Google Fonts (Playfair Display, Poppins)
- **Icons**: Font Awesome 6.4.0
- **No JavaScript frameworks required**

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Booking Flow

1. User fills out the booking form
2. Form validates all required fields
3. On submit, a WhatsApp message is formatted with:
   - Guest name
   - Phone number
   - Check-in/Check-out dates
   - Number of nights
   - Room type
   - Number of guests
   - Special requests
4. User is redirected to WhatsApp with the pre-filled message
5. Admin receives the booking request on WhatsApp

## 🎯 Key Features

### Smooth Scrolling

- Navigation links smoothly scroll to sections
- Active link highlighting on scroll

### Sticky Navbar

- Transparent on hero section
- Becomes solid white on scroll
- Mobile hamburger menu

### Animations

- Fade-in animations on scroll
- Hover effects on cards
- Image zoom on hover
- Smooth transitions throughout

### Form Validation

- Required field validation
- Date validation (no past dates, checkout after checkin)
- Phone number format validation

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For customization help or questions, please refer to the documentation or contact your web developer.

---

**  Beach Resort** - Where the Ocean Meets Luxury 🌊
