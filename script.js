// script.js
import { playGoogleDriveVideo } from "./googleDrive.js";
import { playYouTubeVideo } from "./youtube.js";
// Evento que é disparado quando o conteúdo da página é carregado
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os elementos do DOM que serão usados no script
  const playerContainer = document.getElementById("player-container");
  const videoPlayer = document.getElementById("video-player");

  // Configura o player de vídeo usando a biblioteca Video.js
  const videoJsPlayer = videojs(videoPlayer, {
    autoplay: true,
    controls: true,
    controlBar: {
      fadeIn: true,
      fadeOut: true,
    },
    fluid: true, // Garante que o player de vídeo seja responsivo
  });

  let currentPlayer = null;
  let isGoogleDriveVideoSelected = false;

  // Lista de canais e vídeos
  const channelList = document.getElementById("channel-list");
  const channelItems = channelList.querySelectorAll("li");
  let currentIndex = 0;
  let closeListTimeout;

  // Atualiza a seleção visual dos canais
  const updateVisualSelection = () => {
    channelItems.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add("selected");
        item.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        item.classList.remove("selected");
      }
    });
  };

  // Para o player atual
  const stopCurrentPlayer = () => {
    if (currentPlayer) {
      if (currentPlayer.tagName.toLowerCase() === "video") {
        const videoJsPlayer = videojs(currentPlayer);
        videoJsPlayer.dispose();
      } else if (currentPlayer.tagName.toLowerCase() === "iframe") {
        currentPlayer.remove();
      }
    }
  };

  // Inicia o tempo limite para fechar a lista de canais
  const startCloseListTimeout = () => {
    clearTimeout(closeListTimeout);
    closeListTimeout = setTimeout(() => {
      channelList.style.left = "-300px";
    }, 4000);
  };

  // Atualiza a fonte do vídeo com base na seleção do canal
  const updateVideoSource = () => {
    const selectedItem = channelItems[currentIndex];
    const newSrc = selectedItem.getAttribute("data-src");
    const newType = selectedItem.getAttribute("data-type");

    stopCurrentPlayer();

    if (newType === "m3u8") {
      //aqui entra a logica para carregar o canal do m3u8 na tela
      playerContainer.innerHTML =
        '<video id="video-player" class="video-js vjs-default-skin" controls autoplay></video>';
      currentPlayer = document.getElementById("video-player");
      const videoJsPlayer = videojs(currentPlayer, {
        autoplay: true,
        controls: true,
        controlBar: {
          fadeIn: true,
          fadeOut: true,
        },
        fluid: true,
      });
      videoJsPlayer.src({ type: "application/x-mpegURL", src: newSrc });
      videoJsPlayer.play();
      isGoogleDriveVideoSelected = false;
    } else if (newType === "iframe") {
      if (selectedItem.getAttribute("data-channel") === "google-drive-video") {
        //aqui entra a logica para carregar o canal do googledrive na tela
        const channelIndex = parseInt(
          selectedItem.getAttribute("data-channel-index"),
          10
        );
        console.log(playerContainer); //é a div com a url e os demais informações
        console.log("entrei no google drive");
        playGoogleDriveVideo(playerContainer, channelIndex);
        isGoogleDriveVideoSelected = true;
      } else if (
        selectedItem.getAttribute("data-channel") === "youtube-video"
      ) {
        //aqui entra a logica para carregar o canal do youtube na tela
        console.log("entrei no youtube");

        const channelIndex = parseInt(
          selectedItem.getAttribute("data-channel-index"),
          10
        );
        playYouTubeVideo(playerContainer, channelIndex);
        isGoogleDriveVideoSelected = false;

        //channel index é o numero do canal na lista 0,1,2
      } else {
        // Handle other iframe videos if needed
        playerContainer.innerHTML = `<iframe src="${newSrc}" width="100%" height="100%" allow="autoplay" style="border:none;" tabindex="0"></iframe>`;
        currentPlayer = playerContainer.querySelector("iframe");
        currentPlayer.focus();
        isGoogleDriveVideoSelected = false;
        console.log("seleção de canal falhou");
      }
    }
  };

  // Atualiza a seleção visual ao carregar
  updateVisualSelection();

  // Função para abrir o menu de canais
  const openChannelMenu = () => {
    if (channelList.style.left === "0px") {
      updateVideoSource();
      channelList.style.left = "-300px";
    } else if (
      isGoogleDriveVideoSelected &&
      document.activeElement === currentPlayer
    ) {
      currentPlayer.focus(); // Garante que o foco está no iframe para reproduzir
      document.activeElement.blur(); // Remove o foco para permitir que o iframe receba entrada
      currentPlayer.contentWindow.document.querySelector("video").play();
      isGoogleDriveVideoSelected = false;
    } else {
      channelList.style.left = "0";
      startCloseListTimeout();
    }
  };

  // Eventos de teclado para navegar e selecionar canais
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "Backspace") {
      openChannelMenu();
    } else if (e.key === "ArrowDown") {
      if (channelList.style.left === "0px") {
        currentIndex = (currentIndex + 1) % channelItems.length;
        updateVisualSelection();
        startCloseListTimeout();
      }
    } else if (e.key === "ArrowUp") {
      if (channelList.style.left === "0px") {
        currentIndex =
          (currentIndex - 1 + channelItems.length) % channelItems.length;
        updateVisualSelection();
        startCloseListTimeout();
      }
    }
  });

  // Evento de clique para selecionar canais
  channelItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      updateVisualSelection();
      updateVideoSource();
    });
  });

  // Evento de movimento do mouse para reiniciar o tempo limite para fechar a lista de canais
  channelList.addEventListener("mousemove", startCloseListTimeout);
});
