let ffmpegFactory = require('./lib/ffmpeg.factory.js');

let audioFile = './assets/audio/audio.mp3';
let videoFile = './assets/video/video2.mp4';

ffmpegFactory.merge(audioFile, videoFile, 'newFileName', (err, result) => {

    if (err) {
        console.log('Merge files error!');
        console.log(err);
    } else {

        console.log('Merge files success!\n');
        console.log('Files:');
        console.log(result.files);
        console.log('\nOptions:');
        console.log(result.options);
        console.log(' \n-----------\n');
    }
}, {
    // options
    muteVideo : false,
    muteAudio : false,
    volume: 1,
});