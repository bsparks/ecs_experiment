this.Engine = this.Engine || {};

(function(CES) {
    Engine.Components = Engine.Components || {};
    
    var PhysicsBody = CES.Component.extend({
        name: 'physicsBody',
        init: function(x, y, width, height, density) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.density = density;

            // store state items like references to the body
            this._volatile = {
                body: null
            };
        }
    });
    
    Engine.Components.PhysicsBody = PhysicsBody;
})(window.CES);