var symbolSize = 13;
var streams = [];
var fadeInterval = 1.6;

function setup() {
  createCanvas(
      window.innerWidth, 
      window.innerHeight
      );
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize;
  }

  textFont('Consolas')
  textSize(symbolSize);
}

function draw() {
  background(0, 140);
  streams.forEach(function (stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  // Change Speed of Character Fall
  this.speed = speed;
  this.first = first;
  // Change Rate of Symbol Switching
  this.switchInterval = round(random(7, 28));
  this.opacity = opacity;

  this.setToRandomSymbol = function () {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
        if(charType > 1) {
            // Set it to Katana
            this.value = String.fromCharCode(
                0x30a0 + round(random(0, 96)));
        } else {
            // set it to numeric
            this.value = floor(random(0, 10));
        }
    }
  };

  this.rain = function () {
    this.y = this.y >= height ? 0 : (this.y += this.speed);
  };
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  // Change Rain Speed
  this.speed = random(2, 6.2);

  this.generateSymbols = function (x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  };

  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first) {
        fill(180, 255, 180, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  };
}
