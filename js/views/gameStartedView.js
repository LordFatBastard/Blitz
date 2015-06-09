var Backbone = require('backbone');
var Hub = require('../hub');
var Velocity = require('velocity');
var GameStartedTemplate = require('../templates/gameStarted.hbs');

var GameStartedView = Backbone.View.extend({

    className: 'game-started',

    initialize: function() {
        this.listenTo(Hub, 'remove:views', this.remove);
        this.listenTo(Hub, 'dint:gameStarted', this.render);
        this.listenTo(Hub, 'dint:youLost', this.remove);
        this.listenTo(Hub, 'dint:youWon', this.remove);
    },

    render: function() {
        var data = {};
        this.$el.html(GameStartedTemplate(data));
        this.animateIn();
    },

    animateIn: function() {
        Velocity(this.$el, {
            translateY: [0, -50] 
        });
    }

});

module.exports = GameStartedView;