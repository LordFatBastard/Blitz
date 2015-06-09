var Backbone = require('backbone');
var Hub = require('../hub');
var DintTemplate = require('../templates/dint.hbs');
var Velocity = require('velocity');

var DintView = Backbone.View.extend({

    className: 'dint',

    events: {
        'click .dint-button': 'onDintClicked'
    },

    initialize: function() {
        this.listenTo(Hub, 'remove:views', this.remove);
        this.listenTo(Hub, 'dint:itsMe', this.render);
        this.listenTo(Hub, 'dint:youLost', this.remove);
        this.listenTo(Hub, 'dint:youWon', this.remove);
    },

    render: function() {
        var data = {};
        this.$el.html(DintTemplate(data));
        this.animateIn();
    },

    onDintClicked: function(event) {
        event.preventDefault();
        Hub.trigger('dint:clicked');
        this.$el.empty();
    },

    animateIn: function() {
        Velocity(this.$el, {
            opacity: [1, 0.8],
            scale: [1, 0.8]
        })
    }

});

module.exports = DintView;