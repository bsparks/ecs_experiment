
this.Engine = this.Engine || {};

(function(CES) {
    var Game = function() {
        this.world = new CES.World();
    };

    Game.prototype.run = function() {
        var world = this.world;
        
        requestAnimFrame(animate);

        function animate() {
            requestAnimFrame(animate);

            world.update();
        }
    };

    Engine.Game = Game;
    
})(window.CES)