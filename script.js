'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const HEIGHT = 300;
    const WIDTH = 300;
    let front = false;
    var videoHolder = document.querySelector('.avatar-video-holder');
    var video = document.querySelector('.avatar-video');
    var photo = document.querySelector('.photo');
    var output = document.querySelector('.output');

    function startWebcam(front) {
        var constraints = {
            audio: false,
            video: {
                width: WIDTH,
                height: HEIGHT,
                facingMode: front ? 'user' : 'environment'
            }
        };
        videoHolder.style.display = 'block';
        photo.style.display = 'none';
        output.style.display = 'none';
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

    function takepicture(src) {
        const canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        context.drawImage(src, 0, 0, WIDTH, HEIGHT);
        context.fillStyle = '#fff';
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(HEIGHT / 2, HEIGHT / 2, HEIGHT / 2, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
        // track.stop();
        // video.srcObject = null;
        videoHolder.style.display = 'none';
        photo.style.display = 'block';
        output.style.display = 'block';
    }

    document.querySelector('.takepicture').addEventListener('click', function(){
        takepicture(video);
    });

    // document.querySelector('.camera').addEventListener('change', function(event){
    //         var reader = new FileReader();
    //         reader.onloadend = function() {
    //             photo.setAttribute('src', reader.result);
    //         };
    //         photo.style.display = 'block';
    //         output.style.display = 'block';
    //         reader.readAsDataURL(event.target.files[0]);
    // });

    document.querySelector('.сamera').addEventListener('click', startWebcam);
    document.querySelector('.flip').addEventListener('click', function() {
        startWebcam(front = !front);
    });

    document.querySelector('.upload-file').addEventListener('change', function(event){
        var reader = new FileReader();
        reader.onloadend = function() {
            const image = new Image();
            image.src = reader.result;
            image.style.height = HEIGHT;
            image.style.width = WIDTH;
            const futureParent = document.querySelector('.image-holder');
            futureParent.appendChild(image);
            image.onload = function() {
                takepicture(image);
            };
        };
        
        reader.readAsDataURL(event.target.files[0]);
    })
    // startWebcam()
})