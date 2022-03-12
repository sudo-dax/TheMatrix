var symbol;
var symbolSize = 18;
var streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);
}

function draw() {
  background(0, 140);
  streams.forEach(function (stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;

  // Change Speed of Character Fall
  this.speed = speed;
  // Change Rate of Symbol Switching
  this.switchInterval = round(random(7, 28));
  this.first = first;

  this.setToRandomSymbol = function () {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(0x30a0 + round(random(0, 96)));
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
    var first = round(random(0, 4)) == 1;
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  };

  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first) {
        fill(180, 255, 180);
      } else {
        fill(0, 255, 70);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  };
}
