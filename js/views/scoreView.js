var Backbone = require('backbone');
var Hub = require('../hub');
var ScoreTemplate = require('../templates/score.hbs');
var Velocity = require('velocity');

var ScoreView = Backbone.View.extend({

    className: 'score',

    initialize: function() {
        this.listenTo(Hub, 'remove:views', this.remove);
        this.listenTo(Hub, 'dint:scoreUpdated', this.render);
        this.listenTo(Hub, 'dint:youLost', this.remove);
        this.listenTo(Hub, 'dint:youWon', this.remove);
        this.hasRendered = false;
    },

    render: function(score) {
        var data = {
            score: score
        };
        this.$el.html(ScoreTemplate(data));
        this.animateIn();
    },

    animateIn: function() {
        if (this.hasRendered) return;
        this.hasRendered = true;
        Velocity(this.$el, {opacity: [1, 0]})
    }

});

module.exports = ScoreView;