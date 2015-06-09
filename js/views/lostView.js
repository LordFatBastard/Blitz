var Backbone = require('backbone');
var Hub = require('../hub');
var LostTemplate = require('../templates/lost.hbs');
var Velocity = require('velocity');

var LostView = Backbone.View.extend({

    className: 'lost',

    initialize: function() {
        this.listenTo(Hub, 'remove:views', this.remove);
        this.listenTo(Hub, 'dint:youLost', this.render);
        this.listenTo(Hub, 'dint:youWon', this.remove);
    },

    render: function() {
        var data = {};
        this.$el.html(LostTemplate(data));
        this.animateIn();
    },

    animateIn: function() {
        Velocity(this.$el, {marginTop: '-40px'});
    }

});

module.exports = LostView;