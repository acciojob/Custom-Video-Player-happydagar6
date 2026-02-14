const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* ================= PLAY / PAUSE ================= */

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);


/* ================= PROGRESS BAR ================= */

function handleProgress() {
  if (!video.duration) return; // safety check
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);


/* ================= VOLUME + SPEED ================= */

function handleRangeUpdate() {
  video[this.name] = this.value;
}

ranges.forEach(range => {
  range.addEventListener('input', handleRangeUpdate);
});


/* ================= SKIP BUTTONS ================= */

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button =>
  button.addEventListener('click', skip)
);


/* ================= ERROR HANDLING ================= */

// Remove annoying alert and handle gracefully
video.addEventListener('error', () => {
  console.error("Video failed to load. Check download.mp4 path.");
});
