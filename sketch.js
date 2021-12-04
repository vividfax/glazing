let masks = [];
let maskIndex = 0;

let layers = [];

let glazeColor = "#fff";

let hiddenCanvas;

let fired = false;

function preload() {

    masks.push(loadImage("./svg/cup.svg"));
    //masks.push(loadImage("./svg/plate.svg"));
    masks.push(loadImage("./svg/pot.svg"));
    masks.push(loadImage("./svg/puffer.svg"));
    masks.push(loadImage("./svg/vase.svg"));
}

function setup() {

    createCanvas(700, 700);
    imageMode(CENTER);
    colorMode(HSB);
    //frameRate(2);

    background("#585161");

    select("#fire-button").mousePressed(() => doFire());
    select("#reset-button").mousePressed(() => reset());

    hiddenCanvas = createGraphics(700, 700);
    hiddenCanvas.imageMode(CENTER);
    hiddenCanvas.colorMode(HSB);

    layers.push(createGraphics(700, 700));
    glazeColor = color(random(255), 15, 100);

    maskIndex = int(random(masks.length));
}

function draw() {

    if (frameCount == 1) {
        background("#F3EFDF");
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
}

function doFire() {

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
    }
    hiddenCanvas.filter(BLUR, 2);

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

    fired = false;
    layers = [];
    loop();
    background("#F3EFDF");
    layers.push(createGraphics(700, 700));
    glazeColor = color(random(255), 15, 100);
    maskIndex = int(random(masks.length));

    draw();
}
