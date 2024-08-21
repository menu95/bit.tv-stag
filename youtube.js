// youtube.js
export const youtubeChannels = [
  {
    channelName: "YouTube Playlist - picapau",
    videos: [
      {
        src: "https://www.youtube.com/embed/or5h9OugzLI?si=AoMf6iHAxJeZjm0P&amp;controls=0",
        duration: 7 * 60 * 60 + 49 * 60 + 2, // 7 hours 49 min 02 sec
      },
      {
        src: "https://www.youtube.com/embed/C-Vy5T-bGY8?si=Eo8RROXSN3zMBHZ6",
        duration: 2 * 60 * 60 + 34 * 60 + 2, // 2 hours 34 min 02 sec
      },
      {
        src: "https://www.youtube.com/embed/LVE17tSApHI?si=7JwMAxWbDUMJj3jE",
        duration: 2 * 60 * 60 + 33 * 60 + 31, // 2 hours 33 min 31 sec
      },
      {
        src: "https://www.youtube.com/embed/mtCIHV5wuEw?si=Ci_aB7qzVfFi6nGr",
        duration: 2 * 60 * 60 + 33 * 60 + 47, // 2 hours 33 min 47 sec
      },
      {
        src: "https://www.youtube.com/embed/k1b9ND7-jjI?si=tvRp9lgBwDfC00cs",
        duration: 2 * 60 * 60 + 33 * 60 + 31, // 2 hours 33 min 31 sec
      },
      {
        src: "https://www.youtube.com/embed/Wghfy0HGVx0?si=MK4wQEbrPr9njzPJ",
        duration: 2 * 60 * 60 + 33 * 60 + 31, // 2 hours 33 min 31 sec
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
