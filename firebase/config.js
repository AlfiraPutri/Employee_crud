import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD2hKPy9Krso1WxQ3BJei4PAhw1nkt0x2I",
  authDomain: "login-auth-ac12d.firebaseapp.com",
  projectId: "login-auth-ac12d",
  storageBucket: "login-auth-ac12d.appspot.com",
  messagingSenderId: "721278233186",
  appId: "1:721278233186:web:087bfab69c1c5c62247f3b"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)

export {app, auth}