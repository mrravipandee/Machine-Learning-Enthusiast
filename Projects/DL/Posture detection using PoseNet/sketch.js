let capture;
let posenet;
let singlePose, skeleton;
let actor_img;
let specs, smoke;

function preload() {
    // Preload images
    actor_img = loadImage('images/shahrukh.png');
    specs = loadImage('images/spects.png');
    smoke = loadImage('images/cigar.png');
}

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
}

function receivedPoses(poses) {
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('PoseNet Model Loaded');
}

function draw() {
    image(capture, 0, 0); // Draw video feed

    if (singlePose) {
        // Draw keypoints
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            fill(255, 0, 0);
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 20);
        }

        // Draw skeleton
        stroke(255, 255, 255);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            line(
                skeleton[j][0].position.x,
                skeleton[j][0].position.y,
                skeleton[j][1].position.x,
                skeleton[j][1].position.y
            );
        }

        // Draw accessories
        image(specs, singlePose.nose.x - 35, singlePose.nose.y - 50, 80, 80);
        image(smoke, singlePose.nose.x - 35, singlePose.nose.y + 10, 40, 40);
    }
}
