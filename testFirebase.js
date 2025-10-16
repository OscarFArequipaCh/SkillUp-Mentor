import { db } from "./database/firebase.js";

async function testConnection() {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.get();

  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
}

testConnection();
