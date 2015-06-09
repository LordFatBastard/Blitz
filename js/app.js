var Hub = require('./hub');
var socket = io.connect();
var uniqueID;
var UsersStatusView = require('./views/usersStatusView');
var CountDownView = require('./views/countDownView');
var GameStartedView = require('./views/gameStartedView');
var DintView = require('./views/dintView');
var ScoreView = require('./views/scoreView');
var LostView = require('./views/lostView');
var WonView = require('./views/wonView');

socket.on('connect', function() {
    Hub.trigger('remove:views');
    $('#wrapper').append(new UsersStatusView().$el);
    $('#wrapper').append(new CountDownView().$el);
    $('#wrapper').append(new GameStartedView().$el);
    $('#wrapper').append(new DintView().$el);
    $('#wrapper').append(new ScoreView().$el);
    $('#wrapper').append(new LostView().$el);
    $('#wrapper').append(new WonView().$el);
})

socket.on('dint:newUserAdded', function(data) {
    Hub.trigger('users:updated', data.usersLength);
    Hub.trigger('countDown:updated', data.startGameCountDown);
});

socket.on('dint:userLeft', function(data) {
    Hub.trigger('users:updated', data.usersLength);
});

socket.on('dint:startGameCountDown', function(data) {
    Hub.trigger('countDown:updated', data.startGameCountDown);
});

socket.on('dint:gameStarted', function() {
    Hub.trigger('dint:gameStarted');
});

socket.on('dint:itsMe', function() {
    Hub.trigger('dint:itsMe');
});

Hub.on('dint:clicked', function() {
    socket.emit('dint:clicked');
});

socket.on('dint:scoreUpdated', function(data) {
    Hub.trigger('dint:scoreUpdated', data.score);
});

socket.on('dint:youLost', function() {
    socket.disconnect();
    Hub.trigger('dint:youLost');
});

socket.on('dint:youWon', function() {
    Hub.trigger('dint:youWon');
})