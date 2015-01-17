this.Engine = this.Engine || {};

(function(CES) {
    Engine.Components = Engine.Components || {};

    var Sprite = CES.Component.extend({
        name: 'sprite',
        init: function(image, anchor) {
            this.image = image;
            this.anchor = anchor;

            this._volatile = {
                sprite: null
            };
        }
    });
    
    Engine.Components.Sprite = Sprite;

})(window.CES);