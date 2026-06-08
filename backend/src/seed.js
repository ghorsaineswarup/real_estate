import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const properties = [
  { title: 'Modern 2-Bed Apartment', price: 180000, bedrooms: 2, city: 'Kathmandu', type: 'apartment', area_sqft: 850, description: 'Bright apartment with mountain views.', image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400' },
  { title: 'Spacious Family House', price: 320000, bedrooms: 4, city: 'Lalitpur', type: 'house', area_sqft: 2100, description: 'Large garden, quiet neighborhood.', image_url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400' },
  { title: 'Studio Near City Center', price: 95000, bedrooms: 1, city: 'Kathmandu', type: 'studio', area_sqft: 420, description: 'Perfect for young professionals.', image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400' },
  { title: 'Luxury Villa with Pool', price: 750000, bedrooms: 5, city: 'Bhaktapur', type: 'villa', area_sqft: 4500, description: 'Premium villa with private pool.', image_url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400' },
  { title: 'Cozy 3-Bed House', price: 240000, bedrooms: 3, city: 'Lalitpur', type: 'house', area_sqft: 1400, description: 'Renovated kitchen, two bathrooms.', image_url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400' },
  { title: 'Budget Studio', price: 65000, bedrooms: 1, city: 'Kathmandu', type: 'studio', area_sqft: 350, description: 'Affordable and clean.', image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400' },
  { title: 'Executive 3-Bed Apartment', price: 390000, bedrooms: 3, city: 'Kathmandu', type: 'apartment', area_sqft: 1600, description: 'High-rise with panoramic views.', image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400' },
  { title: 'Countryside Villa', price: 580000, bedrooms: 4, city: 'Bhaktapur', type: 'villa', area_sqft: 3200, description: 'Peaceful location, large terrace.', image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400' },
  { title: 'Modern 2-Bed House', price: 210000, bedrooms: 2, city: 'Lalitpur', type: 'house', area_sqft: 1100, description: 'New construction, solar panels.', image_url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400' },
  { title: 'City View Apartment', price: 155000, bedrooms: 2, city: 'Kathmandu', type: 'apartment', area_sqft: 780, description: 'Top floor unit, stunning views.', image_url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400' },
];

const { data, error } = await supabase.from('properties').insert(properties).select();
if (error) console.error('Error:', error.message);
else console.log(`Inserted ${data.length} properties!`);