//youtube.js
export const youtubeChannels = [
  {
    channelName: "YouTube Playlist - TBBT Best Moments",
    videos: [
      {
        src: "https://www.youtube.com/embed/zhQesrPE_zA?controls=0",
        duration: 10 * 60 + 30,
      },
    ],
  },
  {
    channelName: "YouTube Playlist - Bob Esponja",
    videos: [
      {
        src: "https://www.youtube.com/embed/x3A7NsFaezU?si=t0Pw-0vwKOHgihxO&amp;controls=0",
        duration: 9 * 60 + 45,
      },
    ],
  },
];

const startTime = new Date("2024-05-28T11:10:00Z");

export const getCurrentVideoYouTube = (channelIndex) => {
  const videos = youtubeChannels[channelIndex].videos;
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

export const playYouTubeVideo = (playerContainer, channelIndex) => {
  let currentVideo = getCurrentVideoYouTube(channelIndex);
  playerContainer.innerHTML = `
    <iframe 
      id="current-video"
      src="${currentVideo.src}&start=${currentVideo.startOffset}" 
      width="100%" 
      height="100%" 
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`;

  let currentPlayer = document.getElementById("current-video");
  currentPlayer.focus();
};
