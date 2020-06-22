// Set yours custom env variables
var { FIREBASE_APP_NAME, FIREBASE_MEASURE_ID, FIREBASE_API_KEY } = process
  ? process.env
  : {};

var firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_APP_NAME,
  measurementId: FIREBASE_MEASURE_ID,
};
// Initialize Firebase
firebase && firebase.initializeApp(firebaseConfig);
firebase && firebase.analytics();
