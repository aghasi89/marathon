import Sound from "react-native-sound";

export const workoutStartSound = new Sound('start.mp3', Sound.MAIN_BUNDLE, (error) => {    
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  })