// var ffmpeg = require('ffmpeg');
// try {
// 	new ffmpeg('video.mp4', function (err, video) {
// 		if (!err) {
// 			console.log('The video is ready to be processed');
//             video.addInput()
// 		} else {
// 			console.log('Error: ' + err);
// 		}
// 	});
// } catch (e) {
// 	console.log(e.code);
// 	console.log(e.msg);
// }

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const commandArray = []
// let ffmpegKeys = '[0:a]volume=0.5;[1:a]volume=1;[0][1]amix=inputs=2[a]'
// let ffmpegKeys = '[0:a]volume=1[TEMP0], [1:a]volume=1[TEMP1],[TEMP0][TEMP1]amix=inputs=2,loudnorm=i=-16[a]'
// let ffmpegKeys = '[0:a]volume=1[TEMP0],[1:a]volume=0[TEMP1],[TEMP0][TEMP1]amix=inputs=2[0:a]'
let ffmpegKeys = '[0:a]volume=1;[1:a]volume=1;[0][1]amix=inputs=2[0:a]'
// let ffmpegKeys = '[0:a][1:a]amix=inputs=2,loudnorm=i=-16[0:a]'
// let ffmpegKeys = '[1]volume=0.1[a1],[1]amix=inputs[a1]'
commandArray.push(ffmpegKeys)


var command = ffmpeg()
.addInput('./assets/audio/audio.mp3')
.addInput('./assets/video/video2.mp4')
// .audioBitrate('128k')
// .audioChannels(2)
// .videoCodec("libx264") 
// .audioFilters('volume=1')
.complexFilter(commandArray)
// .addOptions(['-map 0:v', '-map 1:a', '-c:v copy'])
// .addOptions(['-af afade=t=in:st=0:d=3,afade=t=out:st=47:d=4'])
.addOptions(['-c:v copy', '-c:a aac'])
.format('mp4')
.on('error', error => console.log(error))
.on('end', done => console.log(' finished !'))
.saveToFile('merged.mp4');
// console.log(command)
// function merge(video, audio) {
//     command
//         .addInput(video)
//         .addInput(audio)
//         .addOptions(['-map 0:v', '-map 1:a', '-c:v copy'])
//         .format('mp4')
//         // .on('error', error => console.log(error))
//         // .on('end', console.log(' finished !'))
//         .saveToFile('merged.mp4')
// }
// merge('./video.mp4', './audio.mp3')


//Commands.

/* 
ffmpeg -i audio.mp3 -i video.mp4 -c:v copy -c:a aac -shortest output.mp4
-af afade=t=in:st=0:d=3,afade=t=out:st=47:d=4 
*/