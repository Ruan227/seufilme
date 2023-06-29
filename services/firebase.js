import { initializeApp, getApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import sequelize from '../db';
import { DataTypes } from 'sequelize';

let app;

try {
  app = getApp();
} catch (error) {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  app = initializeApp(firebaseConfig);
}

const db = getDatabase(app);

const syncUserDataWithFirebase = async (userData) => {
  const { email, password } = userData;

  try {
    const firebaseRef = ref(db, "usuarios");
    const firebaseUserRef = push(firebaseRef);
    set(firebaseUserRef, { email, password });

    console.log("Novo usuário criado:", { email, password });

  } catch (error) {
    console.error("Erro ao criar conta:", error);
    setMessage("Ocorreu um erro ao criar a conta.");
  }
};

export { db, syncUserDataWithFirebase };