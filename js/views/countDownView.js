var Backbone = require('backbone');
var Hub = require('../hub');
var CountDownTemplate = require('../templates/countDown.hbs');
var Velocity = require('velocity');

var CountDownView = Backbone.View.extend({

    className: 'count-down',

    initialize: function() {
        this.listenTo(Hub, 'remove:views', this.remove);
        this.listenTo(Hub, 'countDown:updated', this.render);
        this.listenTo(Hub, 'dint:gameStarted', this.remove);
        this.render();
        this.animateIn();
    },

    render: function(startGameCountDown) {
        var data = {
            startGameCountDown: startGameCountDown
        }
        this.$el.html(CountDownTemplate(data));
    },

    animateIn: function() {
        Velocity(this.$el, {
            top: [0, -50] 
        });
    }

});

module.exports = CountDownView;