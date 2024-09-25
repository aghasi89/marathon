import {Platform} from 'react-native';

export default (
  src,
  thumbnail,
  autoplay = false,
  showControls = true,
  muted = false,
) => {
  //=========================================JAVASCRIPT===================================================
  const script = `
const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
videoTimeline = container.querySelector(".video-timeline"),
progressBar = container.querySelector(".progress-bar"),
volumeBtn = container.querySelector(".volume i"),
volumeSlider = container.querySelector(".left input");
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
skipBackward = container.querySelector(".skip-backward i"),
skipForward = container.querySelector(".skip-forward i"),
playPauseBtn = container.querySelector(".play-pause i"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
fullScreenBtn = container.querySelector(".fullscreen i"),
screenControllerContainer = document.querySelector(".controlsContainer "),
screenControllerVolumeBtn = container.querySelector(".controlVolumeBtn i"),
screenControllerPlayPauseBtn = container.querySelector(".controlPlayPauseBtn i"),
screenControllerFullScreenBtn = container.querySelector(".controlFullScreenBtn i"),
playButtonOnPause = container.querySelector(".playButtonContainer");
let timer;

if(Hls.isSupported()&&${(Platform.OS==='ios'&&parseInt(Platform.Version)<=16.7)||Platform.OS!=='ios'}) {
    var hls = new Hls();
    hls.loadSource('${src}');
    hls.attachMedia(mainVideo);
  }
  else if (mainVideo.canPlayType('application/vnd.apple.mpegurl')) {
    mainVideo.src = '${src}';
  }

const hideControls = () => {
    // if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
        mainVideo.paused&&window.ReactNativeWebView.postMessage("controls:hide");
        mainVideo.paused &&
        playButtonOnPause.classList.remove("hidePlayButtonContainer");
    }, 3000);
}
hideControls();

const showControls = () => {
    container.classList.add("show-controls");
    window.ReactNativeWebView.postMessage("controls:show");
    hideControls()
}

container.addEventListener("mousemove", () => {
    if(${showControls}){
        mainVideo.play();
        container.classList.add("show-controls");
        clearTimeout(timer);
        hideControls();  
    }else{
        clearTimeout(timer);
        screenControllerContainer.classList.remove("screenVideoControlsHide");
        timer = setTimeout(() => {
          screenControllerContainer.classList.add("screenVideoControlsHide");
        }, 1500);  
    }
});

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? "0"+seconds : seconds;
    minutes = minutes < 10 ? "0"+minutes : minutes;
    hours = hours < 10 ? "0"+hours : hours;

    if(hours == 0) {
        return minutes+":"+seconds
    }
    return hours+":"+minutes+":"+seconds;
}

function openFullScreen(){
    mainVideo.pause(),
    mainVideo.removeAttribute("playsinline");
    mainVideo.play(),
    window.ReactNativeWebView.postMessage("state:playing");
    setTimeout(()=>{
        mainVideo.setAttribute("playsinline",true);
    },100)
}

function closeFullScreen(){
    mainVideo.setAttribute("playsinline",true);
}
screenControllerPlayPauseBtn.addEventListener("click", () => {
    if(mainVideo.paused){
        window.ReactNativeWebView.postMessage("state:playing");
        mainVideo.play();
    }else{
        window.ReactNativeWebView.postMessage("state:pause");
        mainVideo.pause()
    }  
  });
  screenControllerVolumeBtn.addEventListener("click", () => {
    if (!screenControllerVolumeBtn.classList.contains("fa-volume-high")) {
      mainVideo.volume = 1;
      mainVideo.muted = false
      screenControllerVolumeBtn.classList.replace(
        "fa-volume-xmark",
        "fa-volume-high"
      );
    } else {
      mainVideo.volume = 0.0;
      mainVideo.muted = true;
      screenControllerVolumeBtn.classList.replace(
        "fa-volume-high",
        "fa-volume-xmark"
      );
    }
  });
  screenControllerFullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if (document.fullscreenElement) {
      screenControllerFullScreenBtn.classList.replace(
        "fa-compress",
        "fa-expand"
      );
      ${Platform.OS === 'ios'}&& closeFullScreen();
      return document.exitFullscreen();
    }
    screenControllerFullScreenBtn.classList.replace(
      "fa-expand",
      "fa-compress"
    );
    ${Platform.OS === 'ios'}&&openFullScreen()
    container.requestFullscreen();
  });

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = ''+offsetX +'px';
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = ""+percent + "%";
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
    window.ReactNativeWebView.postMessage("duration:"+mainVideo.duration);
    ${autoplay}&&volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark");
    container.classList.remove("show-controls");
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = ""+e.offsetX +"px";
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        mainVideo.muted = false
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click", e => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
});

fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
       ${Platform.OS === 'ios'}&& closeFullScreen();
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    ${
      Platform.OS !== 'ios'
    }&&fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    ${Platform.OS === 'ios'}&&openFullScreen()
    container.requestFullscreen();    
});

speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
skipBackward.addEventListener("click", () => mainVideo.currentTime -= 5);
skipForward.addEventListener("click", () => mainVideo.currentTime += 5);
mainVideo.addEventListener("play", () => {
    window.ReactNativeWebView.postMessage("state:playing");
        playPauseBtn.classList.replace("fa-play", "fa-pause");
        screenControllerPlayPauseBtn.classList.replace("fa-play", "fa-pause");
        playButtonOnPause.classList.add("hidePlayButtonContainer");
      });
mainVideo.addEventListener("pause", () => {
        window.ReactNativeWebView.postMessage("state:pause");
        playPauseBtn.classList.replace("fa-pause", "fa-play");
        screenControllerPlayPauseBtn.classList.replace("fa-pause", "fa-play");
      });
playPauseBtn.addEventListener("click", () => {
    if(mainVideo.paused){
        window.ReactNativeWebView.postMessage("state:playing");
        mainVideo.play();
    }else{
        window.ReactNativeWebView.postMessage("state:pause");
        mainVideo.pause()
    }  
});
videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));
`;

  //=========================================CSS===================================================

  const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    display:flex;
    height:100vh;
}
.video-controls,
.video-timer,
.options {
   display: flex;
   align-items: center;
   justify-content: center
}

.container {
    width: 100%;
    height:100vh;
    user-select: none;
    overflow: hidden;
    /* max-width: 900px; */
    /*border-radius: 5px;*/
    background: #000;
    aspect-ratio: 3.6/2;
    position: relative;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    display: flex;
}

.container.fullscreen {
    max-width: 100%;
    width: 100%;
    height: 100vh;
    border-radius: 0px;
}

.wrapper {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 3;
    opacity: 0;
    bottom: -15px;
    transition: all 0.08s ease;
}

.container.show-controls .wrapper {
    opacity: 1;
    bottom: 0;
    transition: all 0.13s ease;
}

.wrapper::before {
    content: "";
    bottom: 0;
    width: 100%;
    z-index: -1;
    position: absolute;
    height: calc(100% + 35px);
    pointer-events: none;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}
.videoPlayer{
    z-index: 1;
}
.video-timeline {
    height: 7px;
    width: 100%;
    cursor: pointer;
}

.video-timeline .progress-area {
    height: 3px;
    position: relative;
    background: rgba(255, 255, 255, 0.6);
}

.progress-area span {
    position: absolute;
    left: 50%;
    top: -25px;
    font-size: 13px;
    color: #fff;
    pointer-events: none;
    transform: translateX(-50%);
}

.progress-area .progress-bar {
    width: 0%;
    height: 100%;
    position: relative;
    background: #2289ff;
}

.progress-bar::before {
    content: "";
    right: 0;
    top: 50%;
    height: 13px;
    width: 13px;
    position: absolute;
    border-radius: 50%;
    background: #2289ff;
    transform: translateY(-50%);
}

.progress-bar::before,
.progress-area span {
    display: none;
}

.video-timeline:hover .progress-bar::before,
.video-timeline:hover .progress-area span {
    display: block;
}

.wrapper .video-controls {
    padding: 5px 20px 10px;
}

.video-controls .options {
    width: 100%;
}

.video-controls .options:first-child {
    justify-content: flex-start;
}

.video-controls .options:last-child {
    justify-content: flex-end;
}

.options button {
    height: 40px;
    width: 40px;
    font-size: 19px;
    border: none;
    cursor: pointer;
    background: none;
    color: #efefef;
    border-radius: 3px;
    transition: all 0.3s ease;
}

.options button :where(i, span) {
    height: 100%;
    width: 100%;
    line-height: 40px;
}

.options button:hover :where(i, span) {
    color: #fff;
}

.options button:active :where(i, span) {
    transform: scale(0.9);
}

.options button span {
    font-size: 23px;
}

.options input {
    height: 4px;
    margin-left: 3px;
    max-width: 75px;
    accent-color: #0078FF;
}

.options .video-timer {
    color: #efefef;
    margin-left: 15px;
    font-size: 14px;
}

.video-timer .separator {
    margin: 0 5px;
    font-size: 16px;
    font-family: "Open sans";
}

.playback-content {
    display: flex;
    position: relative;
}

.playback-content .speed-options {
    position: absolute;
    list-style: none;
    left: -40px;
    bottom: 40px;
    width: 95px;
    overflow: hidden;
    opacity: 0;
    border-radius: 4px;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: opacity 0.13s ease;
}

.playback-content .speed-options.show {
    opacity: 1;
    pointer-events: auto;
}

.speed-options li {
    cursor: pointer;
    color: #000;
    font-size: 14px;
    margin: 2px 0;
    padding: 5px 0 5px 15px;
    transition: all 0.1s ease;
}

.speed-options li:where(:first-child, :last-child) {
    margin: 0px;
}

.speed-options li:hover {
    background: #dfdfdf;
}

.speed-options li.active {
    color: #fff;
    background: #3e97fd;
}

.container video {
    width: 100%;
}

.controlsContainer {
    position: absolute;
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0,0.2);
    z-index: 2;
    height: 100%;
    width: 100%;
  }
  .screenVideoControlsHide {
    bottom: -900px;
  }
  .controlMiddleButton {
    display: flex;
    height: 80px;
    width: 80px;
    margin: 0 30px 0 30px;
    background-color: rgba(0, 0, 0,0.3);
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border-width: 0;
    color: white;
    font-size: 32px;
  }
  .controlSideButtons {
    display: flex;
    height: 50px;
    width: 50px;
    background-color: rgba(0, 0, 0,0.3);
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border-width: 0;
    color: white;
    font-size: 20px;
    z-index: 5;
  }
@media screen and (max-width: 540px) {
    .wrapper .video-controls {
        padding: 3px 10px 7px;
    }

    .options input,
    .progress-area span {
        display: none !important;
    }

    .options button {
        height: 30px;
        width: 30px;
        font-size: 17px;
    }

    .options .video-timer {
        margin-left: 5px;
    }

    .video-timer .separator {
        font-size: 14px;
        margin: 0 2px;
    }

    .options button :where(i, span) {
        line-height: 30px;
    }

    .options button span {
        font-size: 21px;
    }

    .options .video-timer,
    .progress-area span,
    .speed-options li {
        font-size: 12px;
    }

    .playback-content .speed-options {
        width: 75px;
        left: -30px;
        bottom: 30px;
    }

    .speed-options li {
        margin: 1px 0;
        padding: 3px 0 3px 10px;
    }

    .right .pic-in-pic {
        display: none;
    }
    .playButtonContainer {
        position: absolute;
        align-items: center;
        display: flex;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 100;
        height: 100%;
        width: 100%;
    }
    .play_button_on_pause {
        display: flex;
        height: 80px;
        width: 80px;
        margin: 0 30px 0 30px;
        background-color: rgb(88, 156, 254);
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border-width: 0;
        color: white;
        font-size: 32px;
        padding-left: 8px;
    }
    .hidePlayButtonContainer {
        bottom: -920px;
    }
}`;
  //=========================================HTML===================================================

  //=========================================CONTROLS===================================================
  const controls = `<div class="wrapper">
    <div class="video-timeline">
        <div class="progress-area">
            <span>00:00</span>
            <div class="progress-bar"></div>
        </div>
    </div>
    <ul class="video-controls">
        <li class="options left">
            <button class="volume"><i class="fa-solid fa-volume-high"></i></button>
            <input type="range" min="0" max="1" step="any">
            <div class="video-timer">
                <p class="current-time">00:00</p>
                <p class="separator"> / </p>
                <p class="video-duration">00:00</p>
            </div>
        </li>
        <li class="options center">
            <button class="skip-backward"><i class="fas fa-backward"></i></button>
            <button class="play-pause"><i class="fas fa-play"></i></button>
            <button class="skip-forward"><i class="fas fa-forward"></i></button>
        </li>
        <li class="options right">
            <div class="playback-content">
                <button class="playback-speed"><span
                        class="material-symbols-rounded">slow_motion_video</span></button>
                <ul class="speed-options">
                    <li data-speed="2">2x</li>
                    <li data-speed="1.5">1.5x</li>
                    <li data-speed="1" class="active">Normal</li>
                    <li data-speed="0.75">0.75x</li>
                    <li data-speed="0.5">0.5x</li>
                </ul>
            </div>
            <button class="fullscreen"><i class="fa-solid fa-expand"></i></button>
        </li>
    </ul>
    </div>`;
  const controlsOnVideoPress = `
    <div>
        <div class="playButtonContainer">
            <button class="play_button_on_pause">
                <i class="fas fa-play"></i>
            </button>
        </div>
        <div class="controlsContainer screenVideoControlsHide">
            <button class="controlSideButtons controlVolumeBtn">
                <i class="fa-solid fa-volume-xmark"></i>
            </button>
            <button class="controlMiddleButton controlPlayPauseBtn">
                <i class="fas fa-pause"></i>
            </button>
            <button class="controlSideButtons controlFullScreenBtn">
                <i class="fa-solid fa-expand"></i>
            </button>
        </div>
    </div>
    `;
  //=========================================MAIN_HTML===================================================

  const HTML = `<!DOCTYPE html>
<!-- Coding By CodingNepal - youtube.com/codingnepal -->
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Custom Video Player in JavaScript | CodingNepal</title>
  <link rel="stylesheet" href="style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- These 3 links are only for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
  <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  <style>
      ${CSS}
  </style>
</head>
<body>
  <div class="container ">
      ${controls}
      ${controlsOnVideoPress}
      <video
        class="videoPlayer"
        playsinline="true"
       ${!autoplay ? 'paused="true"' : 'paused="false"'}
       ${autoplay ? 'autoplay="true"' : ''}
       ${autoplay ? 'muted="true"' : ''} 
       ${autoplay ? 'loop="true"' : ''} 
       poster="${thumbnail}"
       ></video>
  </div>   
  <script >
  ${script}
  </script>
</body>
</html>`;
  return HTML;
};
