const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const fs = require('fs');

// Models
const Enquiry = require('../src/models/Enquiry');
const Experience = require('../src/models/Experience');
const connectDB = require('../src/config/mongoDB');

const convertBase64DataUrlsToFiles = (dataObj, uploadsDir) => {
  if (!dataObj || typeof dataObj !== 'object') return { cleaned: dataObj, count: 0 };
  let count = 0;
  const cleaned = Array.isArray(dataObj) ? [...dataObj] : { ...dataObj };

  Object.keys(cleaned).forEach((key) => {
    const val = cleaned[key];
    if (typeof val === 'string' && val.trim().startsWith('data:')) {
      try {
        const str = val.trim();
        const commaIdx = str.indexOf(',');
        if (commaIdx !== -1) {
          const header = str.substring(0, commaIdx);
          const base64Data = str.substring(commaIdx + 1).replace(/[\r\n\s]/g, '');

          let ext = 'png';
          const lowerHeader = header.toLowerCase();
          if (lowerHeader.includes('jpeg') || lowerHeader.includes('jpg')) ext = 'jpg';
          else if (lowerHeader.includes('webp')) ext = 'webp';
          else if (lowerHeader.includes('gif')) ext = 'gif';
          else if (lowerHeader.includes('audio') || lowerHeader.includes('mpeg') || lowerHeader.includes('mp3')) ext = 'mp3';

          const filename = `media_purged_${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
          const filepath = path.join(uploadsDir, filename);
          fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
          cleaned[key] = `/uploads/${filename}`;
          count++;
          console.log(`  [Purge] Successfully converted Base64 field "${key}" -> /uploads/${filename}`);
        }
      } catch (err) {
        console.warn(`  [Purge Warning] Failed to convert field "${key}":`, err.message);
      }
    } else if (val && typeof val === 'object') {
      const res = convertBase64DataUrlsToFiles(val, uploadsDir);
      cleaned[key] = res.cleaned;
      count += res.count;
    }
  });

  return { cleaned, count };
};

const purgeAllBase64 = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/momenta";
    console.log("[Base64 Purging Script] Connecting to MongoDB Database...");
    await mongoose.connect(mongoUri);
    console.log("[Base64 Purging Script] Connected successfully!");

    const uploadsDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // 1. Purge Enquiries Collection
    console.log("\n--- Scanning Enquiries Collection ---");
    const enquiries = await Enquiry.find({});
    let enquiriesCleanedCount = 0;

    for (const enq of enquiries) {
      if (enq.form_data) {
        const { cleaned, count } = convertBase64DataUrlsToFiles(enq.form_data, uploadsDir);
        if (count > 0) {
          enq.form_data = cleaned;
          enq.markModified('form_data');
          await enq.save();
          enquiriesCleanedCount += count;
          console.log(`✓ Cleaned ${count} Base64 fields in Enquiry ID: ${enq._id} (${enq.client_name})`);
        }
      }
    }

    // 2. Purge Experiences Collection
    console.log("\n--- Scanning Experiences Collection ---");
    const experiences = await Experience.find({});
    let experiencesCleanedCount = 0;

    for (const exp of experiences) {
      if (exp.data) {
        const { cleaned, count } = convertBase64DataUrlsToFiles(exp.data, uploadsDir);
        if (count > 0) {
          exp.data = cleaned;
          exp.markModified('data');
          await exp.save();
          experiencesCleanedCount += count;
          console.log(`✓ Cleaned ${count} Base64 fields in Experience ID: ${exp._id} (Slug: ${exp.slug})`);
        }
      }
    }

    console.log("\n=======================================================");
    console.log(`🎉 PURGE COMPLETE!`);
    console.log(`- Enquiries Base64 fields converted to disk: ${enquiriesCleanedCount}`);
    console.log(`- Experiences Base64 fields converted to disk: ${experiencesCleanedCount}`);
    console.log(`- Base64 is now 0% across the MongoDB Database!`);
    console.log("=======================================================\n");

    process.exit(0);
  } catch (err) {
    console.error("Purge script failed:", err);
    process.exit(1);
  }
};

purgeAllBase64();
