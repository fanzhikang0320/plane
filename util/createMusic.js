function createMusic (src) {
    let box = document.querySelector('.box');
    let audio = document.createElement('audio');
    audio.src = src;
    // audio.autoplay = true;
    audio.loop = true;
    // audio.play();
    audio.style.display = 'none';
    box.appendChild(audio);
    return audio;
}

export default createMusic;