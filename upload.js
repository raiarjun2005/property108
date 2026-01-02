const admin = require("firebase-admin");
const fs = require("fs");

// 1. Load your credentials
const serviceAccount = require("./service-account.json");

// 2. Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prop108-default-rtdb.firebaseio.com/" // ⚠️ REPLACE WITH YOUR DB URL
});

const db = admin.database();

// 3. Read and Upload
const rawData = fs.readFileSync("./Indian_Cities_In_States.json");
const jsonData = JSON.parse(rawData);

async function upload() {
  console.log("🚀 Uploading cities...");
  try {
    await db.ref("locations").set(jsonData);
    console.log("✅ Upload Complete! Check your Firebase Console.");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

upload();