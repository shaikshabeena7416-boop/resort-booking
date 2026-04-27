// ===== Admin Panel JavaScript =====

// Default rooms data
const defaultRooms = [
    {
        id: 1,
        name: 'Deluxe Sea View',
        description: 'Spacious room with private balcony and stunning ocean views. Perfect for couples seeking romance.',
        price: 199,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
        features: ['King Size Bed', 'Free WiFi', 'Air Conditioning', 'Smart TV'],
        badge: 'Popular'
    },
    {
        id: 2,
        name: 'Premium Beach Villa',
        description: 'Luxurious villa with direct beach access, private pool, and exclusive amenities.',
        price: 399,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
        features: ['King Size Bed', 'Private Pool', 'Beach Access', 'Mini Bar'],
        badge: 'Best Value'
    },
    {
        id: 3,
        name: 'Family Suite',
        description: 'Spacious suite perfect for families with separate living area and kids amenities.',
        price: 299,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
        features: ['2 Queen Beds', 'Living Area', 'Kids Friendly', 'Kitchenette'],
        badge: ''
    },
    {
        id: 4,
        name: 'Honeymoon Suite',
        description: 'Ultimate romantic getaway with champagne, rose petals, and private dining.',
        price: 499,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
        features: ['King Size Bed', 'Jacuzzi', 'Champagne', 'Butler Service'],
        badge: 'Romantic'
    }
];

let rooms = [];
let gallery = [];
let messages = [];
let bookings = [];

// Admin phone number (owner's WhatsApp)
const adminPhone = '917416552469';

// ===== Tab Navigation =====
document.querySelectorAll('.nav-item[data-tab]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = item.getAttribute('data-tab');
        
        // Update sidebar
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        
        // Update main content
        document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        
        // Update header title
        const titles = {
            'dashboard': 'Admin Dashboard',
            'messages': 'WhatsApp Messages',
            'rooms': 'Rooms & Prices',
            'gallery': 'Gallery Management'
        };
        document.querySelector('.admin-header h1').textContent = titles[tabId] || 'Admin Dashboard';
    });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    renderDashboardStats();
    renderRooms();
    renderGallery();
    renderMessages();
});

async function loadData() {
    try {
        const [roomsRes, galleryRes, bookingsRes, messagesRes] = await Promise.all([
            fetch('/api/rooms'),
            fetch('/api/gallery'),
            fetch('/api/bookings'),
            fetch('/api/messages')
        ]);
        
        rooms = await roomsRes.json();
        gallery = await galleryRes.json();
        bookings = await bookingsRes.json();
        messages = await messagesRes.json();
    } catch (err) {
        console.error('Error loading data:', err);
        rooms = defaultRooms;
    }
}

// ===== Dashboard =====
function renderDashboardStats() {
    document.getElementById('totalMessages').textContent = bookings.length + messages.length;
    document.getElementById('totalRooms').textContent = rooms.length;
    document.getElementById('totalPhotos').textContent = gallery.length;
    document.getElementById('recentBookings').textContent = bookings.length;
}

// ===== Messages =====
function renderMessages() {
    const messagesList = document.getElementById('messagesList');
    const badge = document.getElementById('messageBadge');
    
    const allMessages = [...bookings, ...messages];
    const totalCount = allMessages.length;
    
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'block' : 'none';
    
    if (totalCount === 0) {
        messagesList.innerHTML = `
            <div class="empty-state">
                <i class="fab fa-whatsapp"></i>
                <p>No messages yet. When someone books, it will appear here.</p>
                <p class="help-text">
                    Current WhatsApp number: +${adminPhone}<br>
                    Share this number with guests to receive messages.
                </p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    if (bookings.length > 0) {
        html += bookings.map(booking => `
            <div class="message-item booking-item" onclick="fillReplyPhone('${booking.phone}')">
                <div class="message-header">
                    <span class="message-sender"><i class="fas fa-calendar-check"></i> ${booking.name}</span>
                    <span class="message-time">${new Date(booking.created_at).toLocaleString()}</span>
                    <span class="booking-status">${booking.status || 'new'}</span>
                </div>
                <div class="message-content">
                    <strong>Booking Request:</strong><br>
                    <i class="fas fa-phone"></i> ${booking.phone}<br>
                    Room: ${booking.room_type}<br>
                    Check-in: ${booking.checkin} | Check-out: ${booking.checkout}<br>
                    Guests: ${booking.guests}<br>
                    ${booking.requests ? `Requests: ${booking.requests}` : ''}
                </div>
            </div>
        `).join('');
    }
    
    if (messages.length > 0) {
        html += messages.map(msg => `
            <div class="message-item" onclick="fillReplyPhone('${msg.phone}')">
                <div class="message-header">
                    <span class="message-sender">${msg.name}</span>
                    <span class="message-time">${new Date(msg.created_at).toLocaleString()}</span>
                </div>
                <div class="message-content">
                    <i class="fas fa-phone"></i> ${msg.phone}<br>
                    ${msg.message}
                </div>
            </div>
        `).join('');
    }
    
    messagesList.innerHTML = html;
}

function refreshMessages() {
    loadData().then(() => {
        renderMessages();
        alert('Messages refreshed!');
    });
}

function fillReplyPhone(phone) {
    document.getElementById('replyPhone').value = phone;
}

function sendWhatsAppReply() {
    const phone = document.getElementById('replyPhone').value.trim();
    const message = document.getElementById('replyMessage').value.trim();
    
    if (!phone || !message) {
        alert('Please enter phone number and message.');
        return;
    }
    
    const cleanPhone = phone.replace(/\D/g, '');
    const whatsappURL = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
    
    document.getElementById('replyMessage').value = '';
    alert('WhatsApp opened! Send your reply from there.');
}

// ===== Rooms =====
function renderRooms() {
    const grid = document.getElementById('roomsAdminGrid');
    
    grid.innerHTML = rooms.map((room, index) => `
        <div class="room-admin-card">
            <div class="room-admin-image">
                <img src="${room.image}" alt="${room.name}">
            </div>
            <div class="room-admin-content">
                <h3>${room.name}</h3>
                <p>${room.description}</p>
                
                <div class="room-form-group">
                    <label>Room Name</label>
                    <input type="text" id="roomName${index}" value="${room.name}">
                </div>
                
                <div class="room-form-group">
                    <label>Description</label>
                    <textarea id="roomDesc${index}" rows="3">${room.description}</textarea>
                </div>
                
                <div class="room-form-group">
                    <label>Price per night ($)</label>
                    <div class="room-price-input">
                        <span>$</span>
                        <input type="number" id="roomPrice${index}" value="${room.price}" min="0">
                    </div>
                </div>
                
                <div class="room-form-group">
                    <label>Image URL</label>
                    <input type="url" id="roomImage${index}" value="${room.image}">
                </div>
                
                <div class="room-form-group">
                    <label>Features</label>
                    <div class="room-features-edit" id="roomFeatures${index}">
                        ${room.features.map((feat, featIndex) => `
                            <span class="feature-tag">
                                ${feat}
                                <i class="fas fa-times" onclick="removeFeature(${index}, ${featIndex})"></i>
                            </span>
                        `).join('')}
                        <span class="feature-tag add-feature" onclick="addFeaturePrompt(${index})">
                            <i class="fas fa-plus"></i> Add
                        </span>
                    </div>
                </div>
                
                <div class="room-form-group">
                    <label>Badge (optional)</label>
                    <select id="roomBadge${index}">
                        <option value="" ${!room.badge ? 'selected' : ''}>None</option>
                        <option value="Popular" ${room.badge === 'Popular' ? 'selected' : ''}>Popular</option>
                        <option value="Best Value" ${room.badge === 'Best Value' ? 'selected' : ''}>Best Value</option>
                        <option value="Romantic" ${room.badge === 'Romantic' ? 'selected' : ''}>Romantic</option>
                    </select>
                </div>
            </div>
        </div>
    `).join('');
}

function saveRooms() {
    rooms = rooms.map((room, index) => ({
        ...room,
        name: document.getElementById(`roomName${index}`).value,
        description: document.getElementById(`roomDesc${index}`).value,
        price: parseInt(document.getElementById(`roomPrice${index}`).value) || 0,
        image: document.getElementById(`roomImage${index}`).value,
        badge: document.getElementById(`roomBadge${index}`).value
    }));
    
    Promise.all(rooms.map(room => 
        fetch(`/api/rooms/${room.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(room)
        })
    )).then(() => {
        renderDashboardStats();
        alert('Rooms saved successfully!');
    }).catch(err => {
        console.error('Error saving rooms:', err);
        alert('Error saving rooms');
    });
}

function addFeaturePrompt(roomIndex) {
    const feature = prompt('Enter feature name:');
    if (feature && feature.trim()) {
        rooms[roomIndex].features.push(feature.trim());
        renderRooms();
    }
}

function removeFeature(roomIndex, featureIndex) {
    rooms[roomIndex].features.splice(featureIndex, 1);
    renderRooms();
}

// ===== Gallery =====
function renderGallery() {
    const grid = document.getElementById('galleryAdminGrid');
    
    grid.innerHTML = gallery.map((photo, index) => `
        <div class="gallery-admin-item">
            <img src="${photo.src}" alt="Gallery Image ${index + 1}">
            <div class="gallery-admin-overlay">
                <button class="btn-edit" onclick="editPhoto(${index})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deletePhoto(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('') + `
        <div class="gallery-admin-item upload-new" onclick="document.getElementById('galleryUpload').click()">
            <i class="fas fa-cloud-upload-alt"></i>
            <span>Click to upload</span>
        </div>
    `;
}

function handleGalleryUpload(event) {
    const files = event.target.files;
    
    if (files.length === 0) return;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.startsWith('image/')) {
            alert('Please select image files only.');
            continue;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ src: e.target.result, large: false })
            }).then(() => {
                loadData().then(() => {
                    renderGallery();
                    renderDashboardStats();
                });
            });
        };
        reader.readAsDataURL(file);
    }
    
    event.target.value = '';
}

function editPhoto(index) {
    const newUrl = prompt('Enter new image URL:', gallery[index].src);
    if (newUrl && newUrl.trim()) {
        fetch(`/api/gallery/${gallery[index].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ src: newUrl.trim() })
        }).then(() => {
            loadData().then(() => renderGallery());
        });
    }
}

function deletePhoto(index) {
    if (confirm('Are you sure you want to delete this photo?')) {
        fetch(`/api/gallery/${gallery[index].id}`, {
            method: 'DELETE'
        }).then(() => {
            loadData().then(() => {
                renderGallery();
                renderDashboardStats();
            });
        });
    }
}

// Console info for admin
console.log('%c🏖️ Admin Panel Loaded', 'font-size: 20px; color: #0077b6;');

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}