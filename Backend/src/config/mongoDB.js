const mongoose = require('mongoose');
const dns = require('dns');

// Force Node.js DNS resolver to use Cloudflare and Google public DNS to prevent querySrv ECONNREFUSED issues
try {
    dns.setServers(['1.1.1.1', '8.8.8.8']);
} catch (e) {
    console.warn('DNS server override failed, using default system DNS:', e.message);
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected successfully to host: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
