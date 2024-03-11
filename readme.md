/*

    MediaCollege.
    Anders Christensen

    ffmpeg library for video and audio handling..

*/


### Referencer
 * https://ffmpeg.org/
 * https://www.npmjs.com/package/fluent-ffmpeg
 * https://www.npmjs.com/package/ffmpeg

### ffmpeg installers. (server)

```
https://ffmpeg.org/download.html
```

### CLI Commands (ffmpeg)

Add `audio.mp3` to `video.mp4`.
```
ffmpeg -i ./assets/audio/audio.mp3 -i ./assets/video/video.mp4 -c:v copy -c:a aac -shortest ./output/merged-cli-file.mp4
```

### Packages (node)

```
npm i ffmpeg
npm i fluent-ffmpeg
```

