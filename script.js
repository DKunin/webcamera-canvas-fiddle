var videoHolder = document.querySelector('.avatar-video-holder');
var video = document.querySelector('.avatar-video');
var photo = document.querySelector('.photo');

function startWebcam() {
    var constraints = { audio: false, video: { width: 640, height: 480 } };
    videoHolder.style.display = 'block';
    photo.style.display = 'none';
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(mediaStream) {
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
                video.play();
            };
        })
        .catch(function(err) {
            console.log(err.name + ': ' + err.message);
        });
}

function takepicture() {
    const canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    const track = video.srcObject.getTracks()[0];
    context.drawImage(video, 0, 0, 640, 480);
    context.fillStyle = '#fff';
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(480 / 2, 480 / 2, 480 / 2, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
    track.stop();
    video.srcObject = null;
    videoHolder.style.display = 'none';
    photo.style.display = 'block';
}
startWebcam();

document.querySelector('.takepicture').addEventListener('click', takepicture);
document.querySelector('.takenew').addEventListener('click', startWebcam);
