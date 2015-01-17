
var game = new Engine.Game();

game.init = function() {
        // system order is important!
    var physicsSystem = new Engine.Systems.PhysicsSystem();
    var graphicsSystem = new Engine.Systems.GraphicsSystem(400, 300, 0x004466);
    this.world.addSystem(physicsSystem);
    this.world.addSystem(graphicsSystem);

    var bunny = new CES.Entity();
    bunny.addComponent(new Engine.Components.Sprite('/assets/bunny.png', {x: 0.5, y: 0.5}));
    bunny.addComponent(new Engine.Components.PhysicsBody(200, 150, 25, 37, 0.5));

    var leftWall = new CES.Entity();
    leftWall.addComponent(new Engine.Components.Sprite('/assets/bricks.png', {x: 0.5, y: 0.5}));
    leftWall.addComponent(new Engine.Components.PhysicsBody(5, 150, 10, 300));

    var rightWall = new CES.Entity();
    rightWall.addComponent(new Engine.Components.Sprite('/assets/bricks.png', {x: 0.5, y: 0.5}));
    rightWall.addComponent(new Engine.Components.PhysicsBody(395, 150, 10, 300));

    var ground = new CES.Entity();
    ground.addComponent(new Engine.Components.Sprite('/assets/grass.png', {x: 0.5, y: 0.5}));
    ground.addComponent(new Engine.Components.PhysicsBody(200, 292, 400, 16));

    this.world.addEntity(ground);
    this.world.addEntity(leftWall);
    this.world.addEntity(rightWall);
    this.world.addEntity(bunny);

};

game.init();
game.run();