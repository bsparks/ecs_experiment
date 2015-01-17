
Engine = Engine || {};

(function(CES) {
    var Game = function() {
        this.world = new CES.World();
    };

    Game.prototype.run = function() {
        requestAnimFrame(animate);

        function animate() {
            requestAnimFrame(animate);

            this.world.update();
        }
    };

    Engine.Game = Game;
    
})(window.CES)