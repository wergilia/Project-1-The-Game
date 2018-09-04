function Game(canvas) {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth - 20;
    this.canvas.height = window.innerHeight - 20;

    this.newGame();
    
}

Game.prototype.start = function() {
    this.interval = setInterval(function() {
        this.clear();
        this.draw();
        this.move();

        this.player.setListeners();
        this.collectGoodies() ? this.goodies.pop() : 0;

        this.framesCounter++;
        if (this.framesCounter > 1000) {
            this.frameCounter = 0;
               }               
    }.bind(this), 1000/60) //this z setInterval jest poza scope game wiec trzeba jemu to przypomiec stosujac .bind
}


Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
    this.background.draw();
    this.player.draw();
    this.goodies.forEach(function(goodie) {
        goodie.draw();
    })
}

Game.prototype.move = function() {
    this.goodies.forEach(function(goodie) {
        goodie.move();
    })
}

Game.prototype.newGame = function() {
    this.background = new Background(this);
    this.player = new Player(this);
    this.goodies = [];
    this.goodies.push(new Goodies(this));
    this.framesCounter = 0;
}

Game.prototype.collectGoodies = function() {
    return  this.goodies.some(function(goodie) {
        return (
            (this.player.x + this.player.weight) >= goodie.x && 
            (goodie.x + goodie.weight) > this.player.x &&
            (this.player.y + this.player.height) > goodie.y &&
            (goodie.y + goodie.height) > this.player.y)
    }.bind(this));
}

