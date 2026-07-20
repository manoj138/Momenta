const { User } = require('../models');
const { hashPassword } = require('../helper/authHelper');

async function initSuperAdmin() {
    try {
        const superEmail = process.env.SUPERADMIN_EMAIL || 'superadmin@momenta.com';
        const superPassword = process.env.SUPERADMIN_PASSWORD || 'SuperAdmin@123';

        const existingAdmin = await User.findOne({ role: 'superadmin' });

        if (!existingAdmin) {
            const hashedPassword = await hashPassword(superPassword);
            await User.create({
                name: 'Super Admin Owner',
                email: superEmail,
                password: hashedPassword,
                role: 'superadmin',
                status: 'active'
            });
            console.log(`✅ Initialized Super Admin account cleanly from .env: ${superEmail}`);
        } else {
            console.log(`✅ Super Admin account ready: ${existingAdmin.email}`);
        }
    } catch (error) {
        console.error('⚠️ Super Admin initialization notice:', error.message);
    }
}

module.exports = initSuperAdmin;
