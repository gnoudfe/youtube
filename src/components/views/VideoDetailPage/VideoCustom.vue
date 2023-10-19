<script setup>
import { useRoute } from "vue-router";
import { formatDuration } from "../../../composables/formatDuration";
import VideoSettingsOptions from "./VideoSettingsOptions.vue";
import LoadingVideo from "../../Loading/LoadingVideo.vue";
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  watch,
  reactive,
  watchEffect,
  onBeforeMount,
} from "vue";
import { xmlToSubtitle } from "../../../composables/xmlToSubtitle";
import { useDetailVideoStore } from "../../../stores/useDetailVideo";
import { useSettingsStore } from "../../../stores/useSettings";
const { SettingsState } = useSettingsStore();
const { state } = useDetailVideoStore();
const isControls = ref(false);
const isVideoPlaying = ref(true);
const video = ref(null);
const audio = ref(null);
const seekBar = ref(null);
const progressBar = ref(null);
const bufferBar = ref(null);
const seekVol = ref(null);
const volumeProgressBar = ref(null);
const videoCurrentTime = ref("00:00");
const storeVolume = ref(null);
const isMutedVolume = ref(false);
const isLargeVolume = ref(true);
const isLowVolume = ref(false);
const isLoadingVideo = ref(false);
const isIconPlay = ref(false);
const isIconPause = ref(false);
const defaultQuality = ref("480p");
const route = useRoute();

import { inject } from "vue";
const eventBus = inject("eventBus");

const indexVideo = ref(
  state.isDetailVideos?.videoStreams?.find(
    (video) => video.quality === defaultQuality.value
  )
);
watchEffect(() => {
  indexVideo.value = state.isDetailVideos?.videoStreams.find(
    (video) => video.quality === defaultQuality.value
  );
});

const videoSource = ref(indexVideo.value?.url);
watchEffect(() => {
  videoSource.value = indexVideo.value?.url;
});

const audioSource = ref(state.isDetailVideos.audioStreams[0]?.url);
watchEffect(() => {
  audioSource.value = state.isDetailVideos.audioStreams[0]?.url;
});

const substitleContainer = ref([]);
const substileContent = ref("");
const currentTimeSeek = ref(null);
const isHoveringTimebar = ref(false);
const newValue = ref(null);
const previewContainer = ref(null);
const preview = ref(null);
const currentIndexSubstitle = ref(0);
const isVideoLoop = ref(false);
const FullScreenToolkit = ref(false);
const LoopToolkit = ref(false);
const VolumeToolkit = ref(false);
const substileName = ref("");
const videoBox = ref(null);

const handleShowVolumeToolkit = () => {
  VolumeToolkit.value = true;
};
const handleHideVolumeToolkit = () => {
  VolumeToolkit.value = false;
};
const handleShowFSToolkit = () => {
  FullScreenToolkit.value = true;
};
const handleHideFSToolkit = () => {
  FullScreenToolkit.value = false;
};

const handleShowLoopToolKit = () => {
  LoopToolkit.value = true;
};
const handleHideLoopToolKit = () => {
  LoopToolkit.value = false;
};

const handleVideoInit = () => {
  if (video.value) {
    if (isVideoPlaying.value === false) {
      audio.value.play();
      video.value.play();
      isVideoPlaying.value = true;
    }
    video.value.currentTime = state.currentTime;
    audio.value.currentTime = state.currentTime;
  }
};

const handleWaittingLoaded = () => {
  if (isVideoPlaying.value === true) {
    audio.value.pause();
    video.value.pause();
    isLoadingVideo.value = true;
  }
};
const handlePlayLoaded = () => {
  if (video.value) {
    if (isVideoPlaying.value === false) {
      audio.value.pause();
      video.value.pause();
      isLoadingVideo.value = false;
    } else {
      audio.value.play();
      video.value.play();
      isLoadingVideo.value = false;
    }
  }
};

const togglePlayPauseVideo = () => {
  if (!video.value.paused || isLoadingVideo.value === true) {
    isVideoPlaying.value = false;
    video.value.pause();
    audio.value.pause();
    isIconPause.value = true;
    setTimeout(() => {
      isIconPause.value = false;
    }, 700);
  } else {
    isVideoPlaying.value = true;
    audio.value.play();
    video.value.play();
    isIconPlay.value = true;
    setTimeout(() => {
      isIconPlay.value = false;
    }, 700);
  }
};

const setupSeekbarPreview = (e) => {
  isHoveringTimebar.value = true;
  const maxValue = seekBar.value.max;
  const minValue = seekBar.value.min;
  const seekBarWidth = seekBar.value.clientWidth;
  // Lấy vị trí của chuột trong thanh input
  const mouseX = e.clientX - seekBar.value.getBoundingClientRect().left;

  // Tính toán giá trị dựa trên vị trí của chuột
  newValue.value =
    (mouseX / seekBarWidth) * (maxValue - minValue) + parseFloat(minValue);

  showSeekbarPreview(newValue.value * video.value.duration * 10);
};

const loadImage = (url) => {
  return new Promise((r) => {
    const i = new Image();
    i.onload = () => r(i);
    i.src = url;
  });
};
const showSeekbarPreview = async (position) => {
  const frame = getFrame(position);
  const originalImage = await loadImage(frame?.url);
  if (!isHoveringTimebar.value) return;

  const container = previewContainer.value;
  const canvas = preview.value;

  const ctx = canvas.getContext("2d");

  const offsetX = frame.positionX * frame.frameWidth;
  const offsetY = frame.positionY * frame.frameHeight;

  canvas.width = 260;
  canvas.height = 160;
  // draw the thumbnail preview into the canvas by cropping only the relevant part
  ctx.drawImage(
    originalImage,
    offsetX,
    offsetY,
    frame.frameWidth,
    frame.frameHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );

  // calculate the thumbnail preview offset and display it
  const centerOffset = position / video.value.duration / 10;

  const left =
    centerOffset - ((0.5 * canvas.width) / seekBar.value.clientWidth) * 100;
  const maxLeft =
    ((seekBar.value.clientWidth - canvas.clientWidth) /
      seekBar.value.clientWidth) *
      100 -
    2;

  container.style.left = `max(${0.5}%, min(${left}%, ${maxLeft}%))`;
  container.style.display = "flex";
  currentTimeSeek.value = formatDuration(
    newValue.value * (video.value.duration / 100)
  );
};

const getFrame = (position) => {
  let startPosition = 0;
  const framePage = state.isDetailVideos.previewFrames.at(-1);
  for (let i = 0; i < framePage.urls.length; i++) {
    for (let positionY = 0; positionY < framePage.framesPerPageY; positionY++) {
      for (
        let positionX = 0;
        positionX < framePage.framesPerPageX;
        positionX++
      ) {
        const endPosition = startPosition + framePage.durationPerFrame;

        if (position >= startPosition && position <= endPosition) {
          return {
            url: framePage.urls[i],
            positionX: positionX,
            positionY: positionY,
            frameWidth: framePage.frameWidth,
            frameHeight: framePage.frameHeight,
          };
        }
        startPosition = endPosition;
      }
    }
  }

  return null;
};

const cancelSeekBarPreivew = () => {
  isHoveringTimebar.value = false;
};
// duration video
const videoTimeUpdate = () => {
  if (video.value) {
    const currentTime = video.value?.currentTime;
    videoCurrentTime.value = formatDuration(currentTime);
    seekBar.value.value = currentTime * (100 / video.value.duration);
    progressBar.value.value = seekBar.value.value;
  }
};
// seekBar
const videoSeekBar = () => {
  if (newValue.value) {
    video.value.currentTime = newValue.value * (video.value.duration / 100);
    audio.value.currentTime = video.value.currentTime;
  }
  videoTimeUpdate();
};

// buffering video
const buffering = () => {
  const videoElement = video.value;
  if (videoElement) {
    if (videoElement.buffered.length > 0) {
      const bufferEnd = videoElement.buffered.end(
        videoElement.buffered.length - 1
      );
      const duration = videoElement.duration;
      if (duration > 0) {
        bufferBar.value.value = (bufferEnd / duration) * 100;
      }
    }
  }
};

// detect Volume icon
const detectVolumeBtn = () => {
  if (audio.value.volume === 0) {
    isMutedVolume.value = true;
    isLowVolume.value = false;
    isLargeVolume.value = false;
    audio.value.muted = true;
  } else if (audio.value.volume > 0 && audio.value.volume < 0.5) {
    isLowVolume.value = true;
    isMutedVolume.value = false;
    isLargeVolume.value = false;
    audio.value.muted = false;
  } else {
    isLowVolume.value = false;
    isMutedVolume.value = false;
    audio.value.muted = false;
    isLargeVolume.value = true;
  }
};
// seeking volume
const volumeSeek = () => {
  audio.value.volume = seekVol.value.value / 100;
  volumeProgressBar.value.value = seekVol.value.value;
  storeVolume.value = seekVol.value.value;
  detectVolumeBtn();
};

// toggle volume video

const toggleVolume = () => {
  if (audio.value.muted && audio.value.volume === 0) {
    audio.value.volume = storeVolume.value / 100;
    volumeProgressBar.value.value = storeVolume.value;
    seekVol.value.value = storeVolume.value;
    audio.value.muted = false;
    isMutedVolume.value = false;
    detectVolumeBtn();
  } else {
    audio.value.volume = 0;
    audio.value.muted = true;
    isMutedVolume.value = true;
    isLargeVolume.value = false;
    isLowVolume.value = false;
    volumeProgressBar.value.value = 0;
    seekVol.value.value = 0;
  }
};

const fullScreenMode = () => {
  // Kiểm tra xem trình duyệt có hỗ trợ chế độ toàn màn hình không
  const BoxElm = videoBox.value;
  const isFullScreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;

  if (!isFullScreen) {
    // Phóng to video và audio vào chế độ toàn màn hình
    if (BoxElm.requestFullscreen) {
      BoxElm.requestFullscreen();
    } else if (BoxElm.mozRequestFullScreen) {
      BoxElm.mozRequestFullScreen();
    } else if (BoxElm.webkitRequestFullscreen) {
      BoxElm.webkitRequestFullscreen();
    } else if (BoxElm.msRequestFullscreen) {
      BoxElm.msRequestFullscreen();
    }
  } else {
    // Thoát khỏi chế độ toàn màn hình
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};

const enterPictureInPictureMode = () => {
  // check picture in picture is support user browser
  if (document.pictureInPictureEnabled) {
    // check video is in picture in picture mode
    if (video.value !== document.pictureInPictureElement) {
      video.value.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  } else {
    alert("Picture-in-picture is not supported in your browser");
  }
};

const handlePIPExit = () => {
  isVideoPlaying.value = !video.value.paused;
};

// keydown function

const handleKeyDown = (e) => {
  if (e.key === "ArrowRight") {
    video.value.currentTime += 5;
    audio.value.currentTime += 5;
  }
  if (e.key === "ArrowLeft") {
    video.value.currentTime -= 5;
    audio.value.currentTime -= 5;
  }
  if (e.key === " ") {
    togglePlayPauseVideo();
    e.preventDefault();
  }
  if (e.keyCode === 77) {
    toggleVolume();
  }
  if (e.keyCode === 70) {
    fullScreenMode();
  }
};
const handlePauseAudio = () => {
  if (video.value) {
    audio.value.pause();
  }
};
const handlePlayVideo = () => {
  if (video.value) {
    audio.value.play();
  }
};
let isMouseMoving = false;
let timeoutId = null;

const handleMouseMove = () => {
  if (!isMouseMoving) {
    isControls.value = true;
  }
  isMouseMoving = true;
  // Hủy hẹn giờ hiện tại (nếu có) và thiết lập hẹn giờ mới
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    isControls.value = false;
    isMouseMoving = false; // Đặt lại trạng thái di chuyển chuột
  }, 4000); // 4 giây
};

const qualityVideos = computed(() => {
  const uniqueResolution = new Set();
  return state.isDetailVideos.videoStreams.filter((video) => {
    const resolution = video.quality.split("p")[0];
    if (!uniqueResolution.has(resolution)) {
      uniqueResolution.add(resolution);

      return true;
    }
    return false;
  });
});

const updateVideoSource = (newSource) => {
  videoSource.value = newSource.url;
  state.currentTime = video.value.currentTime;
  defaultQuality.value = newSource.quality;
  video.value.addEventListener("loadedmetadata", () => {
    video.value.currentTime = state.currentTime;
    audio.value.currentTime = state.currentTime;
  });
};

const updatePlaybackRate = (playbackRate) => {
  if (playbackRate === "Chuẩn") {
    playbackRate = "1.0";
  }
  const speed = parseFloat(playbackRate);
  video.value.playbackRate = speed;
  audio.value.playbackRate = speed;
};

const OpenSubstile = (SubstitleValue, index) => {
  substitleContainer.value = SubstitleValue;
  currentIndexSubstitle.value = index;
};

const ToggleSubstitle = async (subURl) => {
  SettingsState.isOpenSubstile = !SettingsState.isOpenSubstile;
  const res = await fetch(subURl[currentIndexSubstitle.value].url);
  if (SettingsState.isOpenSubstile) {
    substileName.value = subURl[currentIndexSubstitle.value].name;
  } else {
    substileName.value = "";
  }
  substitleContainer.value = xmlToSubtitle(await res.text());
};
const substileVideo = () => {
  if (video.value) {
    const currentSubstitle = substitleContainer.value.find((substitle) => {
      return (
        video.value.currentTime >= substitle.startTime - 0.5 &&
        video.value.currentTime <= substitle.endTime
      );
    });
    if (currentSubstitle) {
      substileContent.value = currentSubstitle.text;
    } else {
      substileContent.value = "";
    }
  }
};

const toggleLoopVideo = () => {
  isVideoLoop.value = !isVideoLoop.value;
};
const handleVideoEnded = () => {
  if (isVideoLoop.value === true) {
    video.value.play();
    audio.value.play();
    isVideoPlaying.value = true;
  } else {
    video.value.pause();
    audio.value.pause();
    isVideoPlaying.value = false;
  }
};
onMounted(() => {
  eventBus.on("time-updated", (time) => {
    video.value.currentTime = time;
    audio.value.currentTime = time;
    videoTimeUpdate();
  });

  if (!state.isDetailVideos.livestream) {
    storeVolume.value = seekVol.value.value;
    document.addEventListener("leavepictureinpicture", handlePIPExit);
    document.addEventListener("keydown", handleKeyDown);
    video.value.addEventListener("timeupdate", substileVideo);
  }
});
onBeforeMount(() => {
  document.removeEventListener("leavepictureinpicture", handlePIPExit);
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("timeupdate", substileVideo);
});
</script>

<template>
  <div ref="videoBox" class="w-full relative" @mousemove="handleMouseMove">
    <video
      v-if="!state.isDetailVideos.livestream"
      id="customVideo"
      class="w-full rounded-[10px] h-full"
      ref="video"
      @loadedmetadata="handleVideoInit"
      @timeupdate="videoTimeUpdate"
      @progress="buffering"
      @click="togglePlayPauseVideo"
      @dblclick="fullScreenMode"
      @waiting="handleWaittingLoaded"
      @canplay="handlePlayLoaded"
      @pause="handlePauseAudio"
      @play="handlePlayVideo"
      @ended="handleVideoEnded"
      autoplay
      :poster="state.isDetailVideos.thumbnailUrl"
      :src="videoSource"
      type="video/*"
    ></video>
    <iframe
      v-if="state.isDetailVideos.livestream"
      :src="`https://www.youtube-nocookie.com/embed/${route.query.v}?autoplay=1&amp;modestbranding=1`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen=""
      style="width: 100%; aspect-ratio: 16 / 9; border-radius: 8px"
    ></iframe>
    <audio
      v-if="!state.isDetailVideos.livestream"
      type="audio/*"
      ref="audio"
      style="transform: translateY(200px)"
      :src="audioSource"
      @waiting="handleWaittingLoaded"
      @canplay="handlePlayLoaded"
      @ended="handleVideoEnded"
      autoplay
    ></audio>
    <LoadingVideo v-if="isLoadingVideo" />
    <!-- preview thumbnail -->
    <div v-if="!state.isDetailVideos.livestream">
      <!-- substile -->
      <div
        v-if="SettingsState.isOpenSubstile"
        class="bg-[#080808bf] rounded-sm px-2 text-white whitespace-nowrap text-[24px] text-center absolute left-[50%] translate-x-[-50%] bottom-[90px]"
        v-html="substileContent"
      ></div>
      <!-- preview thumbnail -->
      <span
        v-if="isHoveringTimebar"
        id="preview-container"
        ref="previewContainer"
        class="absolute bottom-[90px] z-[2000] max-h-[160px] flex-col items-center"
      >
        <canvas
          id="preview"
          ref="preview"
          class="w-full h-full max-w-[260px] max-h-[160px] rounded-lg"
        />
        <span
          class="font-semibold text-white z-50 px-2 flex items-center justify-center text-sm rounded-lg translate-y-[5px]"
        >
          {{ currentTimeSeek }}
        </span>
      </span>
      <div
        v-if="isIconPlay"
        class="absolute w-[100px] h-[100px] bg-[#00000094] flex items-center justify-center rounded-full top-[50%] left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer icon-animation"
      >
        <div class="max-h-[80px] max-w-[80px]">
          <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
            <use class="ytp-svg-shadow" xlink:href="#ytp-id-303"></use>
            <path
              fill="white"
              class="ytp-svg-fill"
              d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
              id="ytp-id-303"
            ></path>
          </svg>
        </div>
      </div>
      <div
        v-if="isIconPause"
        class="absolute w-[100px] h-[100px] bg-[#00000094] flex items-center justify-center rounded-full top-[50%] left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer icon-animation"
      >
        <div class="max-h-[80px] max-w-[80px]">
          <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
            <use class="ytp-svg-shadow" xlink:href="#ytp-id-575"></use>
            <path
              fill="white"
              class="ytp-svg-fill"
              d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
              id="ytp-id-575"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Controls  -->
    <div
      v-if="!state.isDetailVideos.livestream"
      class="opacity-0 transition-opacity duration-200 ease-in relative"
      :class="{ '!opacity-100': isControls }"
    >
      <div class="video-seekbar absolute bottom-[56px]">
        <input
          type="range"
          ref="seekBar"
          id="seekBar"
          value="0"
          min="0"
          max="100"
          step="0.1"
          class="seekBar cursor-pointer"
          @change="videoSeekBar"
          @input="videoSeekBar"
          @mousemove="setupSeekbarPreview"
          @mouseout="cancelSeekBarPreivew"
        />
        <progress
          value="0"
          max="100"
          step="1"
          id="progressBar"
          class="progressBar"
          ref="progressBar"
        ></progress>
        <progress
          value="0"
          max="100"
          step="1"
          id="bufferBar"
          ref="bufferBar"
          class="bufferBar"
        ></progress>
      </div>

      <div
        class="flex items-center absolute bottom-0 w-full justify-between max-h-[52px] h-[52px] rounded-b-[10px] bg-[#0000001c] px-[10px]"
      >
        <div class="flex items-center">
          <!-- play pause video icon -->
          <div
            class="ml-[10px] max-w-[42px] max-h-[42px] cursor-pointer"
            @click="togglePlayPauseVideo"
          >
            <svg
              v-if="!isVideoPlaying"
              height="100%"
              version="1.1"
              viewBox="0 0 36 36"
              width="100%"
            >
              <use class="ytp-svg-shadow" xlink:href="#ytp-id-303"></use>
              <path
                fill="white"
                class="ytp-svg-fill"
                d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
                id="ytp-id-303"
              ></path>
            </svg>
            <svg
              v-else
              height="100%"
              version="1.1"
              viewBox="0 0 36 36"
              width="100%"
            >
              <use class="ytp-svg-shadow" xlink:href="#ytp-id-575"></use>
              <path
                fill="white"
                class="ytp-svg-fill"
                d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
                id="ytp-id-575"
              ></path>
            </svg>
          </div>

          <!-- next video icon -->
          <div class="ml-[10px] max-w-[52px] max-h-[52px] cursor-pointer">
            <svg height="100%" version="1.1" viewBox="0 0 34 34" width="100%">
              <use class="ytp-svg-shadow" xlink:href="#ytp-id-13"></use>
              <path
                fill="white"
                class="ytp-svg-fill"
                d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"
                id="ytp-id-13"
              ></path>
            </svg>
          </div>
          <!-- video volume icon -->
          <div
            class="ml-[10px] max-w-[52px] max-h-[52px] cursor-pointer flex items-center relative"
            @mouseover="handleShowVolumeToolkit"
            @mouseout="handleHideVolumeToolkit"
          >
            <svg
              height="100%"
              version="1.1"
              viewBox="0 0 36 36"
              width="100%"
              v-if="isLargeVolume"
              @click="toggleVolume"
            >
              <use class="ytp-svg-shadow" xlink:href="#ytp-id-56"></use>
              <use class="ytp-svg-shadow" xlink:href="#ytp-id-57"></use>
              <defs>
                <clipPath id="ytp-svg-volume-animation-mask">
                  <path
                    d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"
                  ></path>
                  <path
                    d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"
                  ></path>
                  <path
                    class="ytp-svg-volume-animation-mover"
                    d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z"
                    transform="translate(0, 0)"
                  ></path>
                </clipPath>
                <clipPath id="ytp-svg-volume-animation-slash-mask">
                  <path
                    class="ytp-svg-volume-animation-mover"
                    d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z"
                    transform="translate(0, 0)"
                  ></path>
                </clipPath>
              </defs>
              <path
                class="ytp-svg-fill ytp-svg-volume-animation-speaker"
                clip-path="url(#ytp-svg-volume-animation-mask)"
                d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"
                fill="#fff"
                id="ytp-id-56"
              ></path>
              <path
                class="ytp-svg-fill ytp-svg-volume-animation-hider"
                clip-path="url(#ytp-svg-volume-animation-slash-mask)"
                d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z"
                fill="#fff"
                id="ytp-id-57"
                style="display: none"
              ></path>
            </svg>

            <svg
              height="100%"
              version="1.1"
              viewBox="0 0 36 36"
              width="100%"
              v-if="isLowVolume"
              @click="toggleVolume"
            >
              <use class="ytp-svg-shadow" xlink:href="#ytp-id-15"></use>
              <use class="ytp-svg-shadow" xlink:href="#ytp-id-16"></use>
              <defs>
                <clipPath id="ytp-svg-volume-animation-mask">
                  <path
                    d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"
                  ></path>
                  <path
                    d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"
                  ></path>
                  <path
                    class="ytp-svg-volume-animation-mover"
                    d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z"
                    transform="translate(0, 0)"
                  ></path>
                </clipPath>
                <clipPath id="ytp-svg-volume-animation-slash-mask">
                  <path
                    class="ytp-svg-volume-animation-mover"
                    d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z"
                    transform="translate(0, 0)"
                  ></path>
                </clipPath>
              </defs>
              <path
                class="ytp-svg-fill ytp-svg-volume-animation-speaker"
                clip-path="url(#ytp-svg-volume-animation-mask)"
                d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z"
                fill="#fff"
                id="ytp-id-15"
              ></path>
              <path
                class="ytp-svg-fill ytp-svg-volume-animation-hider"
                clip-path="url(#ytp-svg-volume-animation-slash-mask)"
                d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z"
                fill="#fff"
                id="ytp-id-16"
                style="display: none"
              ></path>
            </svg>

            <svg
              height="100%"
              version="1.1"
              viewBox="0 0 36 36"
              width="100%"
              v-if="isMutedVolume"
              @click="toggleVolume"
            >
              <use class="ytp-svg-shadow" xlink:href="#ytp-id-308"></use>
              <path
                class="ytp-svg-fill"
                fill="white"
                d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"
                id="ytp-id-308"
              ></path>
            </svg>

            <div
              class="absolute bg-black bottom-[60px] left-[-100%] min-w-[110px] font-normal text-center rounded-md transition-opacity opacity-0"
              :class="{ 'opacity-100': VolumeToolkit }"
            >
              <span class="text-white">Âm lượng (m)</span>
            </div>
          </div>
          <div class="volume-seekbar">
            <input
              type="range"
              id="seekVol"
              ref="seekVol"
              min="0"
              value="100"
              max="100"
              step="1"
              class="volumeSeekBar"
              @change="volumeSeek"
              @input="volumeSeek"
            />
            <progress
              value="100"
              max="100"
              step="1"
              id="volumeProgressBar"
              class="volumeProgressBar"
              ref="volumeProgressBar"
            ></progress>
          </div>
          <!-- video duration -->
          <div class="flex items-center ml-[42px]">
            <label for="" id="currentTime" class="text-white text-sm">{{
              videoCurrentTime
            }}</label>
            <span class="block mx-[5px] text-white text-sm">/</span>
            <label id="videoTime" class="text-white text-sm">{{
              formatDuration(state.isDetailVideos.duration)
            }}</label>
          </div>
        </div>

        <div class="flex items-center">
          <!-- Loop icon -->
          <div
            class="flex items-center mr-[10px] relative"
            @mouseover="handleShowLoopToolKit"
            @mouseout="handleHideLoopToolKit"
          >
            <input
              type="checkbox"
              class="toggle-loop"
              id="switch"
              @click="toggleLoopVideo"
            /><label class="label-toggle-loop" for="switch">Toggle</label>
            <div
              class="absolute text-white min-w-[200px] font-normal rounded-md text-center bottom-[50px] left-[-200%] bg-[#000] transition-opacity opacity-0"
              :class="{ 'opacity-100': LoopToolkit }"
            >
              <span v-if="isVideoLoop">Chế độ vòng lặp đang bật</span>
              <span v-else> Chế độ vòng lặp đang tắt</span>
            </div>
          </div>
          <!-- subtitles icon -->
          <div
            class="max-w-[48px] max-h-[48px] cursor-pointer ml-[10px] relative border-custom"
            :class="{ 'border-custom-clicked': SettingsState.isOpenSubstile }"
            @click="ToggleSubstitle(state.isDetailVideos.subtitles)"
          >
            <svg
              class="ytp-subtitles-button-icon"
              height="100%"
              version="1.1"
              viewBox="0 0 36 36"
              width="100%"
              fill-opacity="1"
            >
              <use class="ytp-svg-shadow" xlink:href="#ytp-id-70"></use>
              <path
                d="M11,11 C9.9,11 9,11.9 9,13 L9,23 C9,24.1 9.9,25 11,25 L25,25 C26.1,25 27,24.1 27,23 L27,13 C27,11.9 26.1,11 25,11 L11,11 Z M11,17 L14,17 L14,19 L11,19 L11,17 L11,17 Z M20,23 L11,23 L11,21 L20,21 L20,23 L20,23 Z M25,23 L22,23 L22,21 L25,21 L25,23 L25,23 Z M25,19 L16,19 L16,17 L25,17 L25,19 L25,19 Z"
                fill="#fff"
                id="ytp-id-70"
              ></path>
            </svg>
          </div>
          <!-- settings icon -->
          <VideoSettingsOptions
            :substileName="substileName"
            :qualityVideos="qualityVideos"
            @select-quality="updateVideoSource"
            @select-playbackrate="updatePlaybackRate"
            @select-substitle="OpenSubstile"
          />
          <!-- picture in picture icons -->
          <div
            class="ml-[10px] max-w-[45px] max-h-[45px] cursor-pointer"
            @click="enterPictureInPictureMode"
          >
            <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
              <use class="ytp-svg-shadow" xlink:href="#ytp-id-21"></use>
              <path
                d="M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z"
                fill="#fff"
                id="ytp-id-21"
              ></path>
            </svg>
          </div>

          <!-- full screen icon -->
          <div
            class="ml-[10px] max-w-[45px] max-h-[45px] cursor-pointer relative"
            id="fullScreen"
            @click="fullScreenMode"
            @mouseover="handleShowFSToolkit"
            @mouseout="handleHideFSToolkit"
          >
            <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
              <g class="ytp-fullscreen-button-corner-0">
                <use class="ytp-svg-shadow" xlink:href="#ytp-id-7"></use>
                <path
                  class="ytp-svg-fill"
                  d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"
                  id="ytp-id-7"
                  fill="#fff"
                ></path>
              </g>
              <g class="ytp-fullscreen-button-corner-1">
                <use class="ytp-svg-shadow" xlink:href="#ytp-id-8"></use>
                <path
                  class="ytp-svg-fill"
                  d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"
                  id="ytp-id-8"
                  fill="#fff"
                ></path>
              </g>
              <g class="ytp-fullscreen-button-corner-2">
                <use class="ytp-svg-shadow" xlink:href="#ytp-id-9"></use>
                <path
                  class="ytp-svg-fill"
                  d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"
                  id="ytp-id-9"
                  fill="#fff"
                ></path>
              </g>
              <g class="ytp-fullscreen-button-corner-3">
                <use class="ytp-svg-shadow" xlink:href="#ytp-id-10"></use>
                <path
                  class="ytp-svg-fill"
                  d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"
                  id="ytp-id-10"
                  fill="#fff"
                ></path>
              </g>
            </svg>

            <div
              class="absolute bg-black bottom-[67px] left-[-230%] rounded-md transition-opacity opacity-0"
              :class="{ 'opacity-100': FullScreenToolkit }"
            >
              <span class="block w-full min-w-[150px] text-white text-center"
                >Toàn màn hình (f)</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"],
progress {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  outline: 0;
  border: 0;
  width: 100%;
}
.seekBar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  border-radius: 50%;
  opacity: 0;
  height: 0px;
  width: 0px;
  background: red;
  cursor: pointer;
  transition: all 0.2s ease;
}
.video-seekbar:hover .seekBar::-webkit-slider-thumb {
  height: 14px;
  width: 14px;
  opacity: 1;
}

.seekBar::-moz-range-thumb {
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;
  height: 14px;
  width: 14px;
  background: red;
  margin-top: -5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.seekBar::-ms-thumb {
  appearance: none;
  border-radius: 50%;
  height: 14px;
  width: 14px;
  background: red;
  margin-top: -5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.video-seekbar {
  position: relative;
  display: block;
  width: 100%;
}

.video-seekbar .seekBar,
.video-seekbar progress {
  height: 5px;
  position: absolute;
  width: 100%;
  transition: all 0.2s ease;
  left: 0;
  border-radius: 16px;
}

.video-seekbar:hover .seekBar,
.video-seekbar:hover progress {
  height: 6px;
}

.video-seekbar .bufferBar::-webkit-progress-bar {
  background-color: #646363;
  border-radius: 16px;
}

.video-seekbar .progressBar::-webkit-progress-value {
  background-color: red;
  border-radius: 16px;
}

.video-seekbar .bufferBar::-webkit-progress-value {
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
}

.video-seekbar .seekBar {
  z-index: 3;
}

.video-seekbar .progressBar {
  z-index: 2;
  opacity: 0.8;
}

.video-seekbar .bufferBar {
  z-index: 1;
}

.volume-seekbar {
  position: relative;
  display: block;
  width: 100%;
}
.volumeSeekBar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  border-radius: 50%;
  height: 12px;
  width: 12px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}
.volume-seekbar .volumeSeekBar,
.volume-seekbar progress {
  width: 60px;
  cursor: pointer;
  height: 3px;
  left: 0;
  top: 0;
  right: 0;
  transition: all 0.2s ease;
  position: absolute;
}
.volume-seekbar .volumeProgressBar::-webkit-progress-bar {
  background-color: rgb(182, 180, 180);
}
.volume-seekbar .volumeProgressBar::-webkit-progress-value {
  background-color: #fff;
}
.volume-seekbar .volumeSeekBar {
  z-index: 3;
}
.volume-seekbar .volumeProgressBar {
  z-index: 2;
}

.icon-animation {
  animation: fadeOut 1.2s ease;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) scale(0.5);
  }

  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) scale(1.2);
  }
}

.border-custom::after {
  display: block;
  content: "";
  position: absolute;
  background-color: red;
  height: 4px;
  width: 28px;
  border-radius: 5px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  bottom: 5px;
  transition: all 0.3s ease;
}
.border-custom-clicked::after {
  transform: translateX(-50%) scaleX(1) !important;
}

/* looop */

.toggle-loop[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}

.label-toggle-loop {
  cursor: pointer;
  text-indent: -9999px;
  width: 36px;
  height: 12px;
  background: rgb(137, 135, 135);
  display: block;
  border-radius: 100px;
  position: relative;
}

.label-toggle-loop:after {
  content: "";
  position: absolute;
  top: -2px;
  left: 0px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s ease;
}

input:checked + .label-toggle-loop {
  background: #abacaa;
}

input:checked + .label-toggle-loop:after {
  left: calc(100%);
  transform: translateX(-100%);
}
</style>
