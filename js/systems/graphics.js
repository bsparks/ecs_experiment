this.Engine = this.Engine || {};

(function(CES) {

    Engine.Systems = Engine.Systems || {};

    var GraphicsSystem = CES.System.extend({
        init: function(width, height, background) {
            this._super();

            // create an new instance of a pixi stage
            this.stage = new PIXI.Stage(background);

            // create a renderer instance
            this.renderer = new PIXI.autoDetectRenderer(width, height);
        },
        addedToWorld: function(world) {
            this._super(world);

            var system = this;

            // add the renderer view element to the DOM
            document.body.appendChild(system.renderer.view);

            world.entityAdded('sprite').add(function(entity) {
                var spriteComponent = entity.getComponent('sprite'),
                    texture = PIXI.Texture.fromImage(spriteComponent.image),
                    sprite;

                sprite = spriteComponent._volatile.sprite = new PIXI.Sprite(texture);

                sprite.anchor.x = spriteComponent.anchor.x;
                sprite.anchor.y = spriteComponent.anchor.y;

                system.stage.addChild(sprite);
            });

            world.entityRemoved('sprite').add(function(entity) {
                // TODO: handle sprite removal
            });

        },
        update: function() {
            // render the stage
            this.renderer.render(this.stage);
        }
    });

    Engine.Systems.GraphicsSystem = GraphicsSystem;

})(window.CES);