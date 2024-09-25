import AudioRecorderPlayer, { PlayBackType } from 'react-native-audio-recorder-player';

class AudioPlayerService {
  private player = new AudioRecorderPlayer()
  private subscribers: Map<string, (() => void)>;
  constructor() {
    this.subscribers = new Map<string, () => void>();
  }
  stopPlayer() {
    console.log(this.subscribers.size);

    this.subscribers.forEach((cb) => {
      cb();
    })
    return this.player.stopPlayer()
  }
  onPouse(url: string, cb: () => void) {
    console.log(url, cb);

    this.subscribers.set(url, cb);
  }
  seekToPlayer(value: number) {
    return this.player.seekToPlayer(value);
  }
  startPlayer(url: string) {
    return this.player.startPlayer(url)
  }
  addPlayBackListener(cb: (playbackMeta: PlayBackType) => void) {

    return this.player.addPlayBackListener(cb)
  }
  mmssss(value: number) {
    return this.player.mmssss(value)
  }
  pausePlayer() {
    return this.player.pausePlayer()
  }
  removePlayBackListener() {
    return this.player.removePlayBackListener()
  }

}

export default new AudioPlayerService();