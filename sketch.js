let masks = [];
let maskIndex = 0;

let layers = [];

let glazeColor = "#fff";

let hiddenCanvas;

let fired = false;

let maxBlurs = 2;
let blurLevels = [2, 3, 4];

// let drips;
let drops;
let fireAudio;
let resetAudio;
let switchAudio;

let mouseOverButton = false;

function preload() {

    masks.push(loadImage("./svg/cup.svg"));
    //masks.push(loadImage("./svg/plate.svg"));
    masks.push(loadImage("./svg/pot.svg"));
    masks.push(loadImage("./svg/puffer.svg"));
    masks.push(loadImage("./svg/vase.svg"));

    // drips = new Audio("./drips2.ogg");
    // drips.loop = true;
    drops = new Audio("./drops.ogg");
    drops.loop = true;

    fireAudio = new Audio("./fire.wav");
    resetAudio = new Audio("./reset2.wav");
    switchAudio = new Audio("./switch.wav");
}

function setup() {

    createCanvas(700, 700);
    imageMode(CENTER);
    colorMode(HSB);
    textAlign(CENTER);
    textFont("Caveat Brush");
    textSize(20);
    //frameRate(2);

    background("#585161");

    select("#fire-button").mousePressed(() => triggerFireSound());
    select("#fire-button").mouseReleased(() => doFire());
    select("#reset-button").mouseReleased(() => reset());

    select("#fire-button").mouseOver(() => mouseOverButton = true);
    select("#reset-button").mouseOver(() => mouseOverButton = true);
    select("#fire-button").mouseOut(() => mouseOverButton = false);
    select("#reset-button").mouseOut(() => mouseOverButton = false);

    hiddenCanvas = createGraphics(700, 700);
    hiddenCanvas.imageMode(CENTER);
    hiddenCanvas.colorMode(HSB);

    layers.push(createGraphics(700, 700));
    glazeColor = color(random(255), 15, 100);

    maskIndex = int(random(masks.length));

    blurLevels = shuffle(blurLevels);

    // drips.play();
    drops.play();
}

function draw() {

    if (frameCount == 1) {
        background("#F3EFDF");
        fill("#B3A8C0");
        text("Click anywhere\nto change colour", width/2, height/2);
    }

    if (fired) {
        return;
    }

    // if (frameCount % 10 == 1) {
    //     layers.push(createGraphics(700, 700));
    //     glazeColor = color(random(255), 15, 100);
    //     dripSize = 160;
    // }

    if (layers.length > 0) {
        let pg = layers[layers.length-1];
        pg.colorMode(HSB);
        pg.noStroke();
        pg.fill(glazeColor);
        pg.ellipse(mouseX - (width-700)/2, mouseY - (height-700)/2, random(30, 90));

        image(pg, width/2, height/2);
    }
    //filter(POSTERIZE, 40);
    displayMask();
}

function mousePressed() {

    layers.push(createGraphics(700, 700));
    glazeColor = color(random(255), 15, 100);

    if (!mouseOverButton && !fired) {
        switchAudio.pause();
        switchAudio.currentTime = 0;
        switchAudio.play();
    }
}

function triggerFireSound() {

    // drips.pause();
    fireAudio.pause();
    fireAudio.currentTime = 0;
    fireAudio.play();
}

function doFire() {

    maxBlurs = 2;
    blurLevels = shuffle(blurLevels);

    layers = shuffle(layers);

    if (frameCount < 5) {
        return;
    }

    fired = true;

    hiddenCanvas.clear();
    //hiddenCanvas.blendMode(SCREEN);

    for (let i = 0; i < layers.length; i++) {

        let randomInt = int(random(4));

        if (randomInt == 0) {
            hiddenCanvas.blendMode(MULTIPLY);
        } else if (randomInt == 1) {
            hiddenCanvas.blendMode(SCREEN);
        } else if (randomInt == 2) {
            hiddenCanvas.blendMode(SOFT_LIGHT);
        } else if (randomInt == 2) {
            hiddenCanvas.blendMode(HARD_LIGHT);
        }

        hiddenCanvas.image(layers[i], 700/2, 700/2);
        hiddenCanvas.tint(random(255), 30, 100);

        if (maxBlurs > 0 && random() < 0.5) {
            hiddenCanvas.filter(BLUR, int(blurLevels[maxBlurs]));
            maxBlurs--;
        }
    }
    hiddenCanvas.filter(BLUR, int(blurLevels[maxBlurs]));

    noLoop();

    clear();
    background("#F0DFCA");

    image(hiddenCanvas, width/2, height/2);

    displayMask();
}

function displayMask() {

    image(masks[maskIndex], width/2, height/2);

    // fill("#B3A8C0");
    // noStroke();
    // rect(0, 0, (width-500)/2, height);
    // rect(width/2 + 500/2, 0, (width-500)/2, height);
    // rect(0, 0, width, (height-500)/2);
    // rect(0, height/2 + 500/2, width, (height-500)/2);
}

function reset() {

    // drips.play();
    resetAudio.pause();
    resetAudio.currentTime = 0;
    resetAudio.play();

    fired = false;
    layers = [];
    loop();
    background("#F3EFDF");
    layers.push(createGraphics(700, 700));
    glazeColor = color(random(255), 15, 100);
    maskIndex = int(random(masks.length));

    draw();
}
