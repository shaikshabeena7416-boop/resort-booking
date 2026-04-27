-- Beach Resort Database Schema
-- Run this SQL to create the necessary tables in PostgreSQL

-- Drop existing tables if they exist
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS rooms;

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    image TEXT,
    features TEXT[],
    badge VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    src TEXT NOT NULL,
    large BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    room_type VARCHAR(255),
    guests INTEGER DEFAULT 1,
    requests TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default rooms data
INSERT INTO rooms (name, description, price, image, features, badge) VALUES
('Deluxe Sea View', 'Spacious room with private balcony and stunning ocean views. Perfect for couples seeking romance.', 199, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop', ARRAY['King Size Bed', 'Free WiFi', 'Air Conditioning', 'Smart TV'], 'Popular'),
('Premium Beach Villa', 'Luxurious villa with direct beach access, private pool, and exclusive amenities.', 399, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop', ARRAY['King Size Bed', 'Private Pool', 'Beach Access', 'Mini Bar'], 'Best Value'),
('Family Suite', 'Spacious suite perfect for families with separate living area and kids amenities.', 299, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop', ARRAY['2 Queen Beds', 'Living Area', 'Kids Friendly', 'Kitchenette'], ''),
('Honeymoon Suite', 'Ultimate romantic getaway with champagne, rose petals, and private dining.', 499, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop', ARRAY['King Size Bed', 'Jacuzzi', 'Champagne', 'Butler Service'], 'Romantic');

-- Insert default gallery data
INSERT INTO gallery (src, large) VALUES
('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop', true),
('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop', false),
('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop', false),
('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop', false),
('https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop', true),
('https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&h=600&fit=crop', false),
('https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop', false),
('https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop', false);