const audio = new Audio();
const playlist = [
    {
        title: "Summer Walk",
        artist: "Oleg Kyrylkovv",
        src: "https://cdn.pixabay.com/download/audio/2022/03/21/audio_12d8e3d0c5.mp3",
        cover: "https://picsum.photos/300"
    },
    {
        title: "Jazzy Abstract",
        artist: "Benjamin Tissot",
        src: "https://cdn.pixabay.com/download/audio/2023/10/27/audio_e50d25aae3.mp3",
        cover: "https://picsum.photos/301"
    },
    {
        title: "Happy Rock",
        artist: "Bensound",
        src: "https://www.bensound.com/bensound-music/bensound-happyrock.mp3",
        cover: "https://picsum.photos/302"
    }
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(songIndex) {
    const song = playlist[songIndex];
    audio.src = song.src;
    document.querySelector('.song-title').textContent = song.title;
    document.querySelector('.artist').textContent = song.artist;
    document.querySelector('.album-art').src = song.cover;

    audio.play().catch(() => {
        console.error("Failed to load the song. Please check the URL or your internet connection.");
    });
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('playBtn').textContent = '▶';
    } else {
        audio.play().catch(() => {
            console.error("Failed to play the song.");
        });
        document.getElementById('playBtn').textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

function setVolume(volume) {
    audio.volume = volume;
}

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100 || 0;
    document.querySelector('.progress').style.width = `${progressPercent}%`;
    
    const formatTime = (seconds) => {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };
    
    document.querySelector('.current-time').textContent = formatTime(audio.currentTime);
    document.querySelector('.duration').textContent = formatTime(audio.duration);
});

document.querySelector('.progress-container').addEventListener('click', (e) => {
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (!isNaN(duration)) {
        audio.currentTime = (clickX / width) * duration;
    }
});

loadSong(currentSongIndex);

audio.addEventListener('ended', nextSong);

document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            togglePlay();
            break;
        case 'ArrowRight':
            nextSong();
            break;
        case 'ArrowLeft':
            previousSong();
            break;
    }
});

