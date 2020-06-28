export default function initializeAnalytics() {
  try {
    // Set yours custom env variables
    var firebaseConfig = {
      apiKey: "$FIREBASE_API_KEY$",
      projectId: "$FIREBASE_APP_NAME$",
      measurementId: "$FIREBASE_MEASURE_ID$",
      appId: "$FIREBASE_APP_ID$",
    };

    // Initialize Firebase
    firebaseConfig.apiKey && firebase && firebase.initializeApp(firebaseConfig);
    firebaseConfig.apiKey && firebase && firebase.analytics();
  } catch (error) {
    console.error("Uninitiated analytics");
  }
}
