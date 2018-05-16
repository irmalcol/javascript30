/* ************ */
/* Get Elements */
/* ************ */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* *************** */
/* Build Functions */
/* *************** */

function togglePlay() {
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
    // Identical to the logic above
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton () {
    // console.log(`paused: ${this.paused}`);
    const icon = this.paused ?  '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
    // console.log(video.currentTime);
}

function handleRangeUpdate(e) {
    console.log(this.value);
    console.log(e);
    // HTML is structured so that name and value 
    // are valid properties/values for the video element.
    video[this.name] = this.value;
}

function handleProgress() {
    // console.log(video.currentTime);
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    // console.log(e);
    const scrubTime = ( e.offsetX / progress.offsetWidth ) * video.duration;
    video.currentTime = scrubTime;
}

/* *********************** */
/* Hook Up Event Listeners */
/* *********************** */

// Toggling play/pause
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Skip video
skipButtons.forEach(button => button.addEventListener('click', skip));

// Sliders
ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate));

// Update progress bar
video.addEventListener('timeupdate', handleProgress);

// Scrub
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true );
progress.addEventListener('mouseup', () => mousedown = false );
progress.addEventListener('mousemove', (e) => mousedown && scrub(e) ); // Will check mousedown condition before scrub function
