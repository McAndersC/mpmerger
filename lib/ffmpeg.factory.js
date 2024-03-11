/*

    McAnders - 2024

    A merge function that takes two files, an audio and a video file, and merges them into a single file.

*/

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const ffmpegFactory = {}

ffmpegFactory.merge = (audio, video, fileName, callback, options = {
    // options
    muteVideo : false,
    muteAudio : false,
    volume: 1,
}) => {

    console.log('\n--- ffmpegFactory ---');
    console.log('Merging files...\n');
    let vid = options.muteVideo ? 0 : options.volume;
    let aud = options.muteAudio ? 0 : options.volume;

     // .complexFilter(commandArray)
     let commandArray = ['[0:a]volume='+aud+';[1:a]volume='+vid+';[0][1]amix=inputs=2[1:a]']; // Default Mute Video
     if(options.muteAudio) {
        commandArray = ['[0:a]volume='+aud+';[1:a]volume='+vid+';[0][1]amix=inputs=2[0:a]'];
     } else if (options.muteVideo) {
        commandArray = ['[0:a]volume='+aud+';[1:a]volume='+vid+';[1][0:a]amix=inputs=2[1:a]'];
     }
    
    const command = ffmpeg()
                    .addInput(audio)
                    .addInput(video)
                    .complexFilter(commandArray)
                    .addOptions(['-c:v copy', '-c:a aac'])
                    .format('mp4')
                    .on('error', error => callback(error, null))
                    .on('end', done => 
                        callback(null, 
                                {
                                    files: `Audio: ${audio}\nVideo:${video}\nResult:./output/${fileName}.mp4`,
                                    options : options,
                                    done: done,
                                }
                            )
                        )
                    .saveToFile(`./output/${fileName}.mp4`);
}

module.exports = ffmpegFactory;

