require('dotenv').config();
const { sequelize, User, Category, DynamicField, Template, CmsContent, Experience } = require('../models');
const { hashPassword } = require('../helper/authHelper');

async function seed() {
    try {
        console.log('🌱 Starting Database Seeding...');
        await sequelize.sync({ force: true }); // Reset DB clean for initial seed

        const superEmail = process.env.SUPERADMIN_EMAIL || 'superadmin@momenta.com';
        const superPassword = process.env.SUPERADMIN_PASSWORD || 'SuperAdmin@123';

        // 1. Seed SuperAdmin User
        const hashedPassword = await hashPassword(superPassword);
        const adminUser = await User.create({
            name: 'Super Admin Owner',
            email: superEmail,
            password: hashedPassword,
            role: 'superadmin',
            status: 'active'
        });

        // Also add admin@momenta.com for convenience
        await User.create({
            name: 'Super Admin',
            email: 'admin@momenta.com',
            password: hashedPassword,
            role: 'superadmin',
            status: 'active'
        });
        console.log(`✅ Super Admin created from .env: ${superEmail}`);

        // 2. Seed Categories
        const weddingCat = await Category.create({
            name: 'Wedding',
            slug: 'wedding',
            description: 'Premium animated wedding invitations, couple stories, and guest RSVP.',
            icon: '💍',
            display_order: 1
        });

        const birthdayCat = await Category.create({
            name: 'Birthday',
            slug: 'birthday',
            description: 'Vibrant neon surprise birthday experiences, wishbooks, and countdowns.',
            icon: '🎂',
            display_order: 2
        });

        const proposalCat = await Category.create({
            name: 'Proposal',
            slug: 'proposal',
            description: 'Interactive surprise proposal invitations with custom interactive buttons.',
            icon: '💖',
            display_order: 3
        });

        const anniversaryCat = await Category.create({
            name: 'Anniversary',
            slug: 'anniversary',
            description: 'Memorable milestone anniversary experience designs.',
            icon: '🥂',
            display_order: 4
        });

        console.log('✅ Categories created.');

        // 3. Seed Dynamic Form Fields for Birthday
        await DynamicField.bulkCreate([
            { category_id: birthdayCat.id, field_name: 'person_name', field_type: 'text', label: 'Birthday Person Name', placeholder: 'e.g. Rahul Sharma', is_required: true, display_order: 1 },
            { category_id: birthdayCat.id, field_name: 'age', field_type: 'number', label: 'Turning Age', placeholder: 'e.g. 25', is_required: true, display_order: 2 },
            { category_id: birthdayCat.id, field_name: 'party_date', field_type: 'date', label: 'Party Date', is_required: true, display_order: 3 },
            { category_id: birthdayCat.id, field_name: 'party_time', field_type: 'time', label: 'Party Time', is_required: true, display_order: 4 },
            { category_id: birthdayCat.id, field_name: 'venue', field_type: 'textarea', label: 'Party Venue Address', placeholder: 'e.g. Grand Celebration Hall, Mumbai', is_required: true, display_order: 5 },
            { category_id: birthdayCat.id, field_name: 'main_photo', field_type: 'single-image', label: 'Main Birthday Photo', is_required: false, display_order: 6 },
            { category_id: birthdayCat.id, field_name: 'bg_music', field_type: 'audio', label: 'Background MP3 Song', is_required: false, display_order: 7 }
        ]);

        // Seed Dynamic Form Fields for Wedding
        await DynamicField.bulkCreate([
            { category_id: weddingCat.id, field_name: 'groom_name', field_type: 'text', label: 'Groom Name', placeholder: 'e.g. Rahul', is_required: true, display_order: 1 },
            { category_id: weddingCat.id, field_name: 'bride_name', field_type: 'text', label: 'Bride Name', placeholder: 'e.g. Priya', is_required: true, display_order: 2 },
            { category_id: weddingCat.id, field_name: 'wedding_date', field_type: 'date', label: 'Wedding Date', is_required: true, display_order: 3 },
            { category_id: weddingCat.id, field_name: 'venue_address', field_type: 'textarea', label: 'Venue Address', is_required: true, display_order: 4 },
            { category_id: weddingCat.id, field_name: 'couple_photo', field_type: 'single-image', label: 'Couple Cover Photo', is_required: false, display_order: 5 }
        ]);
        console.log('✅ Dynamic Form Fields created.');

        // 4. Seed Templates Metadata
        const bdayTemplate = await Template.create({
            category_id: birthdayCat.id,
            name: 'Birthday Neon Surprise',
            slug: 'birthday-neon-surprise',
            description: 'Futuristic glowing neon design with confetti, music player, and wish wall.',
            thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600',
            preview_url: '/e/demo-birthday',
            component_name: 'BirthdayNeonSurprise',
            is_active: true
        });

        const weddingTemplate = await Template.create({
            category_id: weddingCat.id,
            name: 'Royal Animated Wedding',
            slug: 'wedding-animated',
            description: 'Luxury royal wedding invite with animated floral cover and RSVP countdown.',
            thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
            preview_url: '/e/demo-wedding',
            component_name: 'WeddingAnimated',
            is_active: true
        });
        console.log('✅ Templates metadata created.');

        // 5. Seed Initial Live Experiences
        await Experience.create({
            slug: 'demo-birthday',
            template_id: bdayTemplate.id,
            category_id: birthdayCat.id,
            title: 'Rahul\'s 25th Neon Birthday Party',
            client_name: 'Rahul Sharma',
            data: {
                person_name: 'Rahul Sharma',
                age: 25,
                party_date: '2026-08-15',
                party_time: '19:00',
                venue: 'Skyline Lounge & Terrace, Marine Drive, Mumbai',
                main_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
                bg_music: ''
            },
            is_published: true,
            created_by_user_id: adminUser.id
        });

        await Experience.create({
            slug: 'demo-wedding',
            template_id: weddingTemplate.id,
            category_id: weddingCat.id,
            title: 'Rahul & Priya Wedding Celebration',
            client_name: 'Rahul & Priya',
            data: {
                groom_name: 'Rahul',
                bride_name: 'Priya',
                wedding_date: '2026-12-10',
                venue_address: 'The Palace Hotel, Udaipur, Rajasthan',
                couple_photo: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600'
            },
            is_published: true,
            created_by_user_id: adminUser.id
        });
        console.log('✅ Demo Live Experiences created.');

        // 6. Seed CMS Content (Homepage, Hero, Features)
        await CmsContent.create({
            key: 'home_hero',
            section_name: 'Homepage Hero',
            content: {
                headline: 'Turn Special Moments Into Interactive Digital Experiences',
                subheadline: 'Replace static paper & PDF invites with immersive, dynamic web experiences featuring micro-animations, music, RSVP tracking, and Google map directions.',
                cta_primary: 'Explore Templates',
                cta_secondary: 'Create Experience'
            }
        });

        await CmsContent.create({
            key: 'about_page',
            section_name: 'About Us Page Content',
            content: {
                title: 'Reimagining Special Celebrations for the Modern Web',
                subtitle: 'We craft immersive, interactive digital experiences that turn traditional invitations into unforgettable memories.',
                stats: [
                    { number: '10,000+', label: 'Happy Guests Entertained' },
                    { number: '500+', label: 'Experiences Delivered' },
                    { number: '99.9%', label: 'Uptime & Speed' },
                    { number: '4.9★', label: 'Client Satisfaction' }
                ],
                mission: 'Our mission is to eliminate boring PDFs and static image invites. By combining rich micro-animations, music, maps, and real-time RSVPs, we make every milestone event feel grand and magical.'
            }
        });

        await CmsContent.create({
            key: 'contact_info',
            section_name: 'Contact Page Information',
            content: {
                headline: 'Get in Touch with Momenta Team',
                subheadline: 'Have a custom inquiry or need help designing a unique event card? We are here to bring your vision to life.',
                email: 'support@momenta.com',
                phone: '+91 98765 43210',
                address: 'Momenta Studios, Marine Drive, Mumbai, India',
                working_hours: 'Mon - Sat: 9:00 AM - 8:00 PM'
            }
        });

        console.log('✅ CMS Dynamic Content created.');
        console.log('🎉 Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
