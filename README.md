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

### 2. [Initialize the Nuxt 3 Project](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/59c8496c65b26fad920c81c68ede7db1ace34001)

```bash
npx nuxi init . --package-manager npm --force --no-telemetry --no-git-init
```

### 3. Installing Vercel CLI

To download and [install Vercel CLI](https://vercel.com/docs/cli#installing-vercel-cli), run the following command:

```bash
sudo npm i -g vercel
```

### 4. Sign up on [Vercel Page](https://vercel.com/login)

Sign up on [Vercel](https://vercel.com/login) using your GitHub account. SMS verification is required.

### 5. Authentication via Vercel CLI

Follow the [instructions on the official page](https://vercel.com/docs/cli/login#github) and authenticate in Vercel CLI using your GitHub account:

```bash
vercel login --github
```

### 6. Project Initialization and First Deployment to Vercel

Continue following the [instructions from the official page](https://vercel.com/docs/cli/deploy) and run the following command in the project's root directory:

```bash
vercel
```

### 7. [Enable SSR](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/ae2bcbab16ceebde83e909165a4d5edb842af277)

Modify `nuxt.config.ts` to enable SSR:

```typescript
export default defineNuxtConfig({
  ssr: true,
  // Other configuration options...
});
```

### 8. [First SSR Request](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/d358f20c5ea99a49739b6a9e50c744e418149b14)

Create the file `server/api/hello.ts`:

```typescript
export default defineEventHandler((event) => {
  console.log("Hello, world!");

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

### 9. [Firebase Admin SDK Setup](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/283c1ddae05bd85f41a70303e6bf20438502ec5b)

- Download the secret key from [Firebase Console](https://console.firebase.google.com/).
- Rename the downloaded file to `service-account.json` and place it in the project root.
- Add `service-account.json` to `.gitignore` to prevent accidental commits.

### 10. [Install VueFire](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/14b16e3116d8a7ad1890a13d8b7dc1d051ff707b)

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

### 11. [Configure VueFire](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/3865af01f1a0f449a50c651a068fd203cae4446d)

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

### 12. [Adding VueFire in nuxt.config.ts](https://github.com/Laboratorynotices/Vercel_VueFire_SSR/tree/e95775f806c01734c3d38bc6848cd6e5e43aa3c0)

Update `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ["nuxt-vuefire"],
  // Other configuration options...
});
```

### 13. Testing VueFire

Add the following code to the nuxt.config.ts file:

```typescript
export default defineNuxtConfig({
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: true,
    },
  },
});
```

Next, update the app.vue file with the following:

```typescript
<script setup lang="ts">
import { useCurrentUser } from "vuefire";
const user = useCurrentUser();
</script>

<template>
  <pre>{{ user }}</pre>
</template>
```

No errors appear, which suggests that the test was successful.

### 907. [Determine the Absolute Path to `service-account.json`](https://github.com/Laboratorynotices/Vercel_VueFire_SSR)

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

## Result

It works.
