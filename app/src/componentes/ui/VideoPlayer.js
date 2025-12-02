// Componente de reproductor de video

class VideoPlayer extends HTMLElement {
  connectedCallback() {
    const videoUrl = this.getAttribute('videoUrl') || '';
    const thumbnail = this.getAttribute('thumbnail') || '';
    const height = this.getAttribute('height') || 'h-96';

    const esYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
    const esVimeo = videoUrl.includes('vimeo.com');

    this.innerHTML = `
      <div class="video-player-container ${height} rounded-2xl overflow-hidden shadow-lg mb-6">
        ${this.renderVideo(videoUrl, thumbnail, esYouTube, esVimeo, height)}
      </div>
    `;
  }

  renderVideo(videoUrl, thumbnail, esYouTube, esVimeo, height) {
    if (esYouTube || esVimeo) {
      const embedUrl = this.getEmbedUrl(videoUrl, esYouTube, esVimeo);
      return `
        <iframe
          src="${embedUrl}"
          class="w-full ${height}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;
    } else if (videoUrl) {
      return `
        <video 
          class="w-full ${height} object-cover"
          controls
          ${thumbnail ? `poster="${thumbnail}"` : ''}>
          <source src="${videoUrl}" type="video/mp4">
          Tu navegador no soporta el elemento de video.
        </video>
      `;
    } else {
      return `
        <div class="w-full ${height} bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <div class="text-center text-white">
            <svg class="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-lg opacity-75">Video no disponible</p>
          </div>
        </div>
      `;
    }
  }

  getEmbedUrl(url, esYouTube, esVimeo) {
    if (esYouTube) {
      const videoId = this.extractYouTubeId(url);
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (esVimeo) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  }

  extractYouTubeId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : url;
  }
}

customElements.define('video-player', VideoPlayer);
