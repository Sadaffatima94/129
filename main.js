song="";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){

song= loadSound("music.mp3");    

}

function setup(){

canvas= createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelloaded);
poseNet.on('pose',gotposes);

}

function draw(){

    image(video,0,0,600,500);
 
    fill("#ff0000");
    stroke("#ff0000");

    if(scoreleftwrist > 0.2){

        circle(leftWristX,leftWristY,20);
        numbery = Number(leftWristY);
        remove_decimal = floor(numbery);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    

}

function play(){

song.play();
song.setVolume(1);
song.rate(1);

}


function modelloaded(){

console.log("model is loaded");

}


function gotposes(result){

if(result.length > 0){

console.log(result);
scoreleftwrist = result[0].pose.keypoint[9].score;
console.log("scoreleftWrist = " + scoreleftwrist);
leftWristX = result[0].pose.leftWrist.x;
leftWristY = result[0].pose.leftWrist.y;

console.log("leftWristX =" + leftWristX + "leftWristY = " + leftWristY);

rightWristX = result[0].pose.rightWrist.x;
rightWristY = result[0].pose.rightWrist.y;

console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY); 

}

}