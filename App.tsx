import React, { useEffect, useState, useRef } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  Image
} from 'react-native';
import { LCMStableDiffusionPipeline } from '@venetanji/diffusers.js'
import { Skia, AlphaType, ColorType } from "@shopify/react-native-skia";


const App = () => {
  const [pipe, setPipe] = useState(null);
  const createSession = async () => {
    // download model if the file does not exist
    if (pipe === null) {

      const apipe = await LCMStableDiffusionPipeline.fromPretrained('venetanji/ds8lcm')
      setPipe(apipe)

    } else {
      console.log('Session already created')
    }
  };

  const [imageUri, setImageUri] = useState({uri: 'https://reactnative.dev/img/tiny_logo.png'});


  const generate = async () => {
    if (pipe === null) {
      console.log('Session not created')
      return
    }
    //await createSession()
    console.log("Generating image...")
    const square = 384  
    const {width, height} = {width: square, height: square}

    const progressCallback = (payload:any) => {
      console.log(payload)
    }

    const images = await pipe.run({
      prompt: "A photograph of an astronaut riding a horse on mars, highly detailed",
      negativePrompt: "low res, bad quality",
      width: width,
      height: height,
      numInferenceSteps: 5,
      guidanceScale: 1.4,
      sdV1: true,
      //beta_schedule: "scaled_linear",
      progressCallback: progressCallback
    })
    const pixels = new Uint8Array(images[0].data);

    const imagedata = Skia.Data.fromBytes(pixels)
    // console.log("Creating skia image")
    const img = Skia.Image.MakeImage(
      {
        width: width,
        height: height,
        colorType: ColorType.RGBA_8888,
        alphaType: AlphaType.Premul,
      },
      imagedata,
      width * 4
    );
    if (!img) {
      console.error('Failed to create image');
      return;
    }

    setImageUri({uri: `data:image/png;base64,${img?.encodeToBase64()}`})
    console.log('Image encoded and sent to Image component')
  }

  const GeneratedImage = () => {
    useEffect(() => {
      createSession()
      return () => {
        console.log('cleanup')
        if (pipe !== null) {
          pipe.release()
          setPipe(null)
        }
      }
    }, []);

    return (
      <Image
        style={{width: 400, height: 400}}
        source={imageUri}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>React native diffusion</Text>
      <GeneratedImage></GeneratedImage>
      <Button
        title="Generate"
        onPress={() => {
          generate();
        }}
        ></Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: { width: '90%' },
});
export default App;