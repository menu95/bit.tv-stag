//googleDrive.js

export const googleDriveChannels = [
  {
    channelName: "The Big Bang Theory - Temporada 8",
    videos: [
      {
        src: "https://drive.google.com/file/d/1app5Yc_gE8uo-9VDnfqR6slB0o0HCBzs/preview",
        duration: 7 * 3600 + 49 * 60 + 53,
      },
    ],
  },
  {
    channelName: "The Big Bang Theory - Temporada 9 (Parte 1)",
    videos: [
      {
        src: "https://drive.google.com/file/d/18-w4L94B7aEIHDYHMPFr-wz_euZkEqWe/preview",
        duration: 2 * 3600 + 50 * 60 + 56,
      },
    ],
  },
];

const startTime = new Date("2024-05-28T11:10:00Z");

export const getCurrentVideoGoogleDrive = (channelIndex) => {
  const videos = googleDriveChannels[channelIndex].videos;
  const now = new Date();
  const elapsedTime = Math.floor((now - startTime) / 1000);
  const totalDuration = videos.reduce((acc, video) => acc + video.duration, 0);
  const loopTime = elapsedTime % totalDuration;
  let currentTime = 0;

  for (let video of videos) {
    currentTime += video.duration;
    if (loopTime < currentTime) {
      const startOffset = loopTime - (currentTime - video.duration);
      return {
        src: video.src,
        startOffset,
        duration: video.duration - startOffset,
      };
    }
  }
};

export const playGoogleDriveVideo = (playerContainer, channelIndex) => {
  let currentVideo = getCurrentVideoGoogleDrive(channelIndex);
  playerContainer.innerHTML = `
    <iframe 
      id="current-video"
      src="${currentVideo.src}#t=${currentVideo.startOffset}" 
      width="100%" 
      height="100%" 
      allow="autoplay" 
      style="border:none;" 
      tabindex="0"></iframe>`;

  let currentPlayer = document.getElementById("current-video");
  currentPlayer.focus();
};
