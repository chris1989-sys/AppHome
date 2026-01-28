# Firebase Setup Guide for AppHome

## 1. Setup Firestore Database
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or select an existing one.
3. In the left menu, navigate to **Build** -> **Firestore Database**.
4. Click **Create Database**.
5. Start in **Test Mode** (for development) or **Production Mode**.
6. Select a location closer to your users (e.g., `eur3` or `us-central`).

## 2. Create the Collection
1. Once the database is ready, click **+ Start collection**.
2. Collection ID: `apps`
3. Click **Next**.

## 3. Add App Documents (Manual Entry)
To add an app, click **Add document**. You can let Firestore generate the Document ID (Auto-ID), or specify one manually.

Add the following **fields** for each app:

| Field | Type | Description | Example Value |
|-------|------|-------------|---------------|
| `name` | string | The app title | "TaskMaster" |
| `description` | string | Short description | "AI-powered to-do list." |
| `category` | string | App category | "Productivity" |
| `appUrl` | string | Link to the web app | "https://taskmaster.com" |
| `iconUrl` | string | URL to image (PNG/JPG) | "https://imgur.com/example.png" |

## 4. Example JSON Structure
If you were to import this programmatically, it looks like this:

```json
{
  "name": "ZenFocus",
  "description": "Ambient sounds for deep work.",
  "category": "Health",
  "appUrl": "https://example.com/zen",
  "iconUrl": "https://picsum.photos/200"
}
```

## 5. Security Rules (Optional for Dev)
If you are having trouble fetching data, check the **Rules** tab in Firestore.
For development:
```
allow read, write: if true;
```
For production, you should restrict write access.