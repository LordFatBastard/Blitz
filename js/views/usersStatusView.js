var Backbone = require('backbone');
var Hub = require('../hub');
var UsersStatusTemplate = require('../templates/usersStatus.hbs');
var Velocity = require('velocity');

var UsersStatusView = Backbone.View.extend({

    className: 'users-status',

    initialize: function() {
        this.listenTo(Hub, 'remove:views', this.remove);
        this.listenTo(Hub, 'users:updated', this.render);
        this.listenTo(Hub, 'dint:youLost', this.remove);
        this.listenTo(Hub, 'dint:youWon', this.remove);
        this.render();
        this.animateIn();
    },

    render: function(usersLength) {
        var data = {
            usersLength: usersLength || 0
        }
        this.$el.html(UsersStatusTemplate(data));
    },

    animateIn: function() {
        Velocity(this.$el, {
            bottom: [0, -50] 
        });
    }

});

module.exports = UsersStatusView;