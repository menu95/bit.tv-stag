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
        src: "https://www.youtube.com/embed/C-Vy5T-bGY8?si=6auUxeff16Mso8sF&amp;controls=0",
        duration: 2 * 60 * 60 + 34 * 60 + 2, // 2 hours 34 min 02 sec
      },
      {
        src: "https://www.youtube.com/embed/LVE17tSApHI?si=X4tBcTc3hBFy0KQl&amp;controls=0",
        duration: 2 * 60 * 60 + 33 * 60 + 31, // 2 hours 33 min 31 sec
      },
      {
        src: "https://www.youtube.com/embed/mtCIHV5wuEw?si=Qb_WF5FHmr6kYH6x&amp;controls=0",
        duration: 2 * 60 * 60 + 33 * 60 + 47, // 2 hours 33 min 47 sec
      },
      {
        src: "https://www.youtube.com/embed/k1b9ND7-jjI?si=Bsn0SXuKLyaM4URW&amp;controls=0",
        duration: 2 * 60 * 60 + 33 * 60 + 31, // 2 hours 33 min 31 sec
      },
      {
        src: "https://www.youtube.com/embed/Wghfy0HGVx0?si=Ew62qUkn0-MIuEGy&amp;controls=0",
        duration: 2 * 60 * 60 + 33 * 60 + 31, // 2 hours 33 min 31 sec
      },
    ],
  },

  {
    channelName: "YouTube Playlist - Tom e Jerry",
    videos: [
      {
        src: "https://www.youtube.com/embed/aGUaNqitFPA?si=Tb5URe909bOnEKx7&amp;controls=0",
        duration: 59 * 60 + 29, // 59 min 29 sec
      },
      {
        src: "https://www.youtube.com/embed/px0whOy_BCE?si=Cq91fQWR5jyRhSn1&amp;controls=0",
        duration: 59 * 60 + 5, // 59 min 05 sec
      },
      {
        src: "https://www.youtube.com/embed/AnrlzQyYapY?si=sA-m-d1nkwi-Qkgo&amp;controls=0",
        duration: 59 * 60 + 50, // 59 min 50 sec
      },
      {
        src: "https://www.youtube.com/embed/e0zxuBzGYnI?si=sUJGaWjj7lWJZAw8&amp;controls=0",
        duration: 1 * 60 * 60 + 1 * 60 + 23, // 1 hours 01 min 23 sec
      },
      {
        src: "https://www.youtube.com/embed/rLbY-xZQUyw?si=sHRo9yUH6-ZA2660&amp;controls=0",
        duration: 58 * 60 + 33, // 58 min 33 sec
      },
      {
        src: "https://www.youtube.com/embed/zpSHhkvLQMA?si=QZEzejxpyd64xFk9&amp;controls=0",
        duration: 59 * 60 + 51, // 59 min 51 sec
      },
    ],
  },

  {
    channelName: "YouTube Playlist - Todo mundo odeia o chris",
    videos: [
      {
        src: "https://www.youtube.com/embed/0ssLZUuPQpM?si=9ave2_2IMLITtXop&amp;controls=0",
        duration: 33,
      },
    ],
  },
  {
    channelName: "YouTube Playlist - Eu a patroa e as crianças",
    videos: [
      {
        src: "https://www.youtube.com/embed/KT0u74pyo3Q?si=7gYLwPk_uY8c9zOe&amp;controls=0",
        duration: 3 * 60 * 60 + 57 * 60 + 40, // 1 temporada 3 horas 57 min 40 seg
      },
      {
        src: "https://www.youtube.com/embed/ZIsq7WWTu7s?si=4bQAMzwAGLw-jH-V&amp;controls=0",
        duration: 10 * 60 * 60 + 12 * 60 + 57, // 2 temporada 10 horas 12 min 57 seg
      },
      {
        src: "https://www.youtube.com/embed/c-XVaNOouQk?si=6BFA-iYMFk4FWgYI&amp;controls=0",
        duration: 9 * 60 * 60 + 38 * 60 + 28, // 3 temporada 9 horas 38 min 28 seg
      },
      {
        src: "https://www.youtube.com/embed/mrtD9U3zTso?si=a1xLG_f3DpDt4nce&amp;controls=0",
        duration: 10 * 60 * 60 + 40 * 60 + 5, // 4 temporada 10 horas 40 min 05 seg
      },
      {
        src: "https://www.youtube.com/embed/rDohXLxqcdw?si=2ETG_OWHf-R7gNdg&amp;controls=0",
        duration: 9 * 60 * 60 + 26 * 60 + 52, // 5 temporada 9 horas 26 min 52 seg
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
