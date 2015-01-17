this.Engine = this.Engine || {};

(function(CES) {
    Engine.Systems = Engine.Systems || {};

    var PhysicsSystem = CES.System.extend({
        init: function() {
            this._super();

            // setup axis-aligned bounding box
            var worldAABB = new b2AABB();
            worldAABB.minVertex.Set(-1000, -1000);
            worldAABB.maxVertex.Set(1000, 1000);
            // define gravity
            var gravity = new b2Vec2(0, 300);
            // body can sleep
            var doSleep = true;
            // create world
            this.physicsWorld = new b2World(worldAABB, gravity, doSleep);
            // frame duration
            this.timeStep = 1 / 60;
            // how many iteration for collisions calculations
            this.iteration = 1;
        },
        addedToWorld: function(world) {
            var physicsWorld = this.physicsWorld;

            world.entityAdded('physicsBody').add(function(entity) {
                var physicsBodyComponent = entity.getComponent('physicsBody'),
                    body,
                    width = physicsBodyComponent.width,
                    height = physicsBodyComponent.height,
                    density = physicsBodyComponent.density,
                    x = physicsBodyComponent.x,
                    y = physicsBodyComponent.y;

                var shapeDef = new b2BoxDef();
                shapeDef.extents.Set(width * 0.5, height * 0.5);
                var bodyDef = new b2BodyDef();
                bodyDef.AddShape(shapeDef);
                bodyDef.position.Set(x, y);
                if (density) {
                    shapeDef.density = density;
                    shapeDef.friction = 0.4;
                    shapeDef.restitution = 1.2;
                    bodyDef.rotation = 0.8;
                }
                body = physicsBodyComponent._volatile.body = physicsWorld.CreateBody(bodyDef);
            });

            this._super(world);
        },
        update: function() {
            this.physicsWorld.Step(this.timeStep, this.iteration);

            // sync up sprites
            var entities = this.world.getEntities('sprite', 'physicsBody');
            entities.forEach(function(entity) {
                var sprite = entity.getComponent('sprite')._volatile.sprite,
                    body = entity.getComponent('physicsBody')._volatile.body;

                sprite.position = body.GetCenterPosition();
                sprite.rotation = body.GetRotation();
            });
        }
    });

    Engine.Systems.PhysicsSystem = PhysicsSystem;

})(window.CES);