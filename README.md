# Nuxt 3 VueFire SSR + Vercel Experiment

## Overview

This project is an experiment designed to investigate issues encountered when configuring a Nuxt 3 application with VueFire while enabling Server-Side Rendering (SSR) on Vercel. The primary objective is to identify potential challenges and find a working solution.

## Expected Challenges

- Deployment issues specific to Vercel.

## Experiment Steps

### 1. Update Package Manager and Dependencies

Ensure you have the latest versions of npm and nuxi installed:

```bash
sudo npm install -g npm@latest nuxi@latest
```

### 2. [Initialize the Nuxt 3 Project](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/)

```bash
npx nuxi init . --package-manager npm --force --no-telemetry --no-git-init
```

### 903. Deploy the Project to Vercel

Follow the official Vercel guide: [Getting Started with Vercel](https://vercel.com/docs/get-started).

### 904. [Enable SSR](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/bff592c73e5c1bf9ab2f6ad4e048c7bf4ee46684)

Modify `nuxt.config.ts` to enable SSR:

```typescript
export default defineNuxtConfig({
  ssr: true,
  // Other configuration options...
});
```

### 905. [First SSR Request](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/421f00dac2c7eafcc5faf43a67e88f9d9c123419)

Create the file `server/api/hello.ts`:

```typescript
export default defineEventHandler((event) => {
  return {
    hello: "world",
  };
});
```

In `app.vue`, add the following code to fetch and display the data:

```html
<script setup lang="ts">
  const { data } = await useFetch("/api/hello");
</script>

<template>
  <pre>{{ data }}</pre>
</template>
```

### 906. [Firebase Admin SDK Setup](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/1218d59a5aa9573a6c07b4c7cbe6047cbed461cf)

- Download the secret key from [Firebase Console](https://console.firebase.google.com/).
- Rename the downloaded file to `service-account.json` and place it in the project root.
- Add `service-account.json` to `.gitignore` to prevent accidental commits.

### 907. [Determine the Absolute Path to `service-account.json`](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/e206a0229f609005e364ffa2ece304cdafaaed10)

VueFire in SSR mode requires the absolute path to `service-account.json`. Modify `hello.ts` to retrieve it:

```typescript
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

export default defineEventHandler((event) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return { path: resolve(__dirname, "../../service-account.json") };
});
```

**Result:** `"/service-account.json"`.

### 908. Revert `hello.ts` to its Previous Version

Run the following commands:

```bash
git reset --hard 1218d59a5aa9573a6c07b4c7cbe6047cbed461cf^C
git push --force
```

### 909. [Install VueFire](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/b5889f5ba15feda9aab6a290bf20a745bdb7c179)

Install necessary dependencies:

```bash
npm install firebase
```

```bash
npx nuxi@latest module add vuefire
```

```bash
npm install firebase-admin firebase-functions @firebase/app-types
```

### 910. Configure VueFire

Update `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  vuefire: {
    config: {
      apiKey: process.env.GOOGLE_FIREBASE_CONFIG_API_KEY,
      authDomain: process.env.GOOGLE_FIREBASE_CONFIG_AUTH_DOMAIN,
      projectId: process.env.GOOGLE_FIREBASE_CONFIG_PROJECT_ID,
      appId: process.env.GOOGLE_FIREBASE_CONFIG_APP_ID,
    },
  },
  // Other configuration options...
});
```

Add Firebase credentials to the `.env` file:

```
GOOGLE_FIREBASE_CONFIG_API_KEY="..."
GOOGLE_FIREBASE_CONFIG_AUTH_DOMAIN="....firebaseapp.com"
GOOGLE_FIREBASE_CONFIG_PROJECT_ID="..."
GOOGLE_FIREBASE_CONFIG_APP_ID="..."
GOOGLE_APPLICATION_CREDENTIALS=/service-account.json
```

### 911. Test VueFire

## Result

??? We will see...
