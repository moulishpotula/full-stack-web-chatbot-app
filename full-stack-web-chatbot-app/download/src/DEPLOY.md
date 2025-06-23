# Deploying to Firebase App Hosting

This guide provides step-by-step instructions for deploying your Chatmatic project to Firebase App Hosting on the free Spark plan.

## 1. Prerequisites

Before you begin, ensure you have the following installed and configured:

- **Node.js and npm**: Required for running the project and installing dependencies.
- **Firebase CLI**: The command-line interface for Firebase. If you don't have it, install it globally:
  ```bash
  npm install -g firebase-tools
  ```
- **Logged into Firebase**: Authenticate the Firebase CLI with your Google account:
  ```bash
  firebase login
  ```

## 2. Firebase Project Setup

1.  **Create a Firebase Project**:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Click "Add project" and follow the on-screen instructions. The Spark plan is free and includes all the services needed for this project.

2.  **Get Firebase Config for your Web App**:
    - In your Firebase project, go to **Project Settings** (click the gear icon ⚙️ near the top left).
    - Under the **General** tab, scroll down to the "Your apps" section.
    - Click the Web icon (`</>`) to create a new Web App.
    - Give it a nickname (e.g., "Chatmatic Web") and click "Register app".
    - After registration, you will be shown the Firebase SDK configuration. It will look like this:
      ```javascript
      const firebaseConfig = {
        apiKey: "AIza...",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "...",
        appId: "1:..."
      };
      ```
    - Copy these values into the `.env` file in the root of your project directory. The file should look like this:
      ```env
      NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
      NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project"
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
      NEXT_PUBLIC_FIREBASE_APP_ID="1:..."
      ```
    - **Note**: The `.env` file is used for local development. App Hosting uses a more secure way to handle these keys for production, which is handled automatically.

## 3. Enable Required Google Cloud APIs

This project uses Genkit for AI features, which requires the **Vertex AI API**.

1.  Go to the [Google Cloud Console API Library for Vertex AI](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com).
2.  Make sure you have the correct project selected.
3.  Click the **Enable** button.

## 4. Configure CORS for Firebase Storage

To allow your live application to fetch the knowledge base `.txt` files you upload, you must configure Cross-Origin Resource Sharing (CORS) on your Cloud Storage bucket.

1.  Create a file named `cors.json` in your local project directory with the following content:
    ```json
    [
      {
        "origin": ["https://your-app-name--your-project-id-12ab3c.web.app"],
        "method": ["GET"],
        "maxAgeSeconds": 3600
      }
    ]
    ```
    **Important**: You will need to replace the `origin` URL with your actual deployed app's URL after you deploy for the first time.

2.  Install the `gsutil` tool if you haven't already by following the [installation instructions](https://cloud.google.com/storage/docs/gsutil_install).

3.  Run the following command in your terminal to apply the CORS settings. Replace `<YOUR_STORAGE_BUCKET>` with the value from your `.env` file (e.g., `your-project.appspot.com`).
    ```bash
    gsutil cors set cors.json gs://<YOUR_STORAGE_BUCKET>
    ```

## 5. Deploy the Application

1.  **Initialize App Hosting**:
    - In your terminal, at the root of the project, run:
      ```bash
      firebase init apphosting
      ```
    - The CLI will guide you through:
        - Selecting the Firebase project you created.
        - Choosing a region for your backend.
    - This links your local code to your Firebase project.

2.  **Deploy**:
    - Run the deploy command:
      ```bash
      firebase apphosting:backends:deploy
      ```
    - The CLI will build your Next.js application and deploy it to App Hosting. This may take a few minutes.

## 6. Final Steps

1.  **Get Your Live URL**:
    - Once deployment is complete, the CLI will output the URL of your live application.

2.  **Update CORS**:
    - Copy your new live URL.
    - Paste it into the `cors.json` file you created earlier, replacing the placeholder URL.
    - Re-run the `gsutil` command to apply the updated CORS policy:
      ```bash
      gsutil cors set cors.json gs://<YOUR_STORAGE_BUCKET>
      ```

Your application is now live! You can visit the URL to see it in action.
