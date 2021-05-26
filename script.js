const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const songs = [
    'bensound-betterdays',
    'bensound-memories',
    'bensound-pianomoment',
    'bensound-slowmotion',
    'bensound-tomorrow'
]

let songIndex = 3;

//load song in DOM

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause();
}

function prevSong() {
    songIndex--;
    songIndex = songIndex < 0? songs.length - 1: songIndex

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++
    songIndex = songIndex % songs.length

    loadSong(songs[songIndex])
    playSong()
}

function playPause() {
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    }
    else {
        playSong()
    }
}

function updateProgress(evt) {
    const { duration, currentTime} = evt.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(evt) {
    const width = this.clientWidth
    const clickX = evt.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

//handle all events
playBtn.addEventListener('click', playPause)
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)