Showcase app for react-native-diffusers.js: Generate images on your mobile device using the diffusers.js library.

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn install
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```


## Step 3: First run

During the first run the app will download an optimized model from huggingface. This will take a few minutes. Subsequent runs will be faster. The LCM model used in this can be found here: https://huggingface.co/venetanji/ds8lcm (Dreamshaper 8 LCM).

## Session handling

Make sure to call .release() on the pipeline once the app closes.
