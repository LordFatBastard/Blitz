var Backbone = require('backbone');
var Hub = require('../hub');
var WonTemplate = require('../templates/won.hbs');
var Velocity = require('velocity');

var WonView = Backbone.View.extend({

    className: 'won',

    initialize: function() {
        this.listenTo(Hub, 'remove:views', this.remove);
        this.listenTo(Hub, 'dint:youWon', this.render);
    },

    render: function() {
        console.log('loggin here');
        var data = {};
        this.$el.html(WonTemplate(data));
        this.animateIn();
    },

    animateIn: function() {
        Velocity(this.$el, {marginTop: '-40px'});
    }

});

module.exports = WonView;