import admin from 'firebase-admin';
import AWS from 'aws-sdk';
import { AdminCreateUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPhoneNumber, initializeAuth, signInWithCustomToken } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZ5WlYzuWeBklpGCE1vIQNwzt3X-UvqIo",
    authDomain: "gymcore-2d6ab.firebaseapp.com",
    projectId: "gymcore-2d6ab",
    storageBucket: "gymcore-2d6ab.appspot.com",
    messagingSenderId: "50444968155",
    appId: "1:50444968155:web:74c7945aba6c0a38a4acfe",
    measurementId: "G-4YFYPJ0LWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'pumpreact' });
AWS.config.region = 'eu-central-1';
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(require("../services/firebase-service-account.json")), // Your Firebase service account key
});

// Function to verify Firebase ID token
async function verifyFirebaseToken(idToken: string) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log(decodedToken);
        const { phone_number } = decodedToken;
        if (!phone_number) {
            throw "No phone number";
        }

        const { Users } = await cognitoIdentityServiceProvider.listUsers({
            UserPoolId: 'eu-central-1_LfGbvt3BI',
            Filter: `phone_number = "+9720${Number(phone_number.substring(4))}"`,
        }).promise()

        if (!Users?.length) {
            throw "NOT FOUND";
        }

        return { success: true, message: 'User authenticated and updated in Cognito', user: Users[0] };
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        return { success: false, message: 'Failed to verify Firebase token' };
    }
}

const auth = getAuth(app);

admin.auth().createCustomToken("wSBF9MPkrkOUKZTTxYAXO19lCSc2")
    .then((customToken) => signInWithCustomToken(auth, customToken))
    .then(({ user }) => user.getIdToken())
    .then(verifyFirebaseToken)
    .then(result => console.log(result))
    .catch(err => console.error('Verification error:', err))

// Example usage
const firebaseIdToken = 'firebase-id-token-from-client';
