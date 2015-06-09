var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var serveStatic = require('serve-static')
// Game variables
var users = [];
var isGameCountingDown = false;
var isGameInProgress = false;
var startGameTimer;
var startGameCountDown = 5;
var gameCounterRatio = 100;
var pointsLostRatio = 50;
var initialScore = 5000;

app.use(serveStatic('build', {'index': ['default.html', 'default.htm']}))

server.listen(5555, function(){
    console.log('Express server listening on port ' + 5555);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', function (socket) {
    
    if (isGameInProgress) return;
    
    var user = {
        score: initialScore, 
        socket: socket
    };

    users.push(user);

    io.emit('dint:newUserAdded', {
        startGameCountDown: startGameCountDown,
        usersLength: users.length
    });

    socket.on('disconnect', function() {
        var i = users.indexOf(user);
        users.splice(i, 1);
        io.emit('dint:userLeft', {usersLength: users.length});
    });

    if (isGameCountingDown) return;

    isGameCountingDown = true;
    
    startGameTimer = setInterval(function() {
        startGameCountTimer();
    }, 1000);
  
});

function startGameCountTimer() {
    
    startGameCountDown --;
    
    io.emit('dint:startGameCountDown', {
        startGameCountDown: startGameCountDown
    });
    
    // If the timer reaches zero - start the game
    if (startGameCountDown == 0) {
        isGameInProgress = true;
        clearInterval(startGameTimer);
        io.emit('dint:gameStarted');
        startGame();
    }

}

function startGame() {
    var randomUser;
    var gameTimer;
    var gameTimerCount = 0;

    function pickNewUser() {
        gameTimerCount = 0;
        randomUser = users[Math.floor(Math.random()*users.length)];

        gameTimer = setInterval(function() {
            gameCounter();
        }, gameCounterRatio);

        randomUser.socket.once('dint:clicked', function() {
            // When a user clicks dint - remove their points
            clearInterval(gameTimer);
            randomUser.score = randomUser.score - (gameTimerCount * pointsLostRatio);
            randomUser.socket.emit('dint:scoreUpdated', {
                score: randomUser.score
            });

            if (randomUser.score <= 0) {
                randomUser.socket.emit('dint:youLost');
                setTimeout(function() {
                    // Should check if users is last user
                    if (users.length === 1) {
                        users[0].socket.emit('dint:youWon');
                    } else {
                        pickNewUser();
                    }
                }, 2000);
            } else {
                pickNewUser();
            }


        });

        randomUser.socket.emit('dint:itsMe');

    }

    function gameCounter() {
        gameTimerCount ++;
        console.log('counting');
    }

    // kick it off
    pickNewUser();
}