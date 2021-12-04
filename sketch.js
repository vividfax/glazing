let cup;

let layers = [];

let glazeColor = "#fff";

let hiddenCanvas;

let fired = false;

function preload() {

    cup = loadImage("./cup.svg")
}

function setup() {

    createCanvas(700, 700);
    imageMode(CENTER);
    colorMode(HSB);
    frameRate(2);

    background("#B3A8C0");

    select("#fire-button").mousePressed(() => doFire());


    hiddenCanvas = createGraphics(500, 500);
    hiddenCanvas.imageMode(CENTER);
    hiddenCanvas.colorMode(HSB);

    glazeColor = color(random(255), 15, 100);
}

function draw() {

    if (frameCount == 1) {
        background("#F3EFDF");
    }

    if (fired) {
        return;
    }

    if (frameCount % 10 == 1) {
        layers.push(createGraphics(500, 500));
        glazeColor = color(random(255), 15, 100);
    }

    let pg = layers[layers.length-1];
    pg.colorMode(HSB);
    pg.noStroke();
    pg.fill(glazeColor);
    pg.ellipse(mouseX - (width-500)/2, mouseY - (height-500)/2, random(30, 160));

    image(pg, width/2, height/2);
    //filter(POSTERIZE, 40);
    displayMask();
}

function doFire() {

    if (fired || frameCount < 5) {
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

        hiddenCanvas.image(layers[i], 500/2, 500/2);
        hiddenCanvas.tint(random(255), 30, 100);
    }
    hiddenCanvas.filter(BLUR, 2);

    noLoop();

    clear();
    background("#F0DFCA");

    image(hiddenCanvas, width/2, height/2);

    displayMask();
}

function displayMask() {

    image(cup, width/2, height/2);

    // fill("#B3A8C0");
    // noStroke();
    // rect(0, 0, (width-500)/2, height);
    // rect(width/2 + 500/2, 0, (width-500)/2, height);
    // rect(0, 0, width, (height-500)/2);
    // rect(0, height/2 + 500/2, width, (height-500)/2);
}
