/* Get Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

/* Build Functions */
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();
}

/* Hook Up Event Listeners */