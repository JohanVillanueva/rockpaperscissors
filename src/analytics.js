export default function initializeAnalytics() {
  // Set yours custom env variables
  var firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    projectId: FIREBASE_APP_NAME,
    measurementId: FIREBASE_MEASURE_ID,
  };

  // Initialize Firebase
  console.log("firebaseConfig", firebaseConfig);
  firebaseConfig.apiKey && firebase && firebase.initializeApp(firebaseConfig);
  firebaseConfig.apiKey && firebase && firebase.analytics();
}
