$(function () {
    $('.check-player').button();
});

function MyCtrl($scope, $filter) {
    
    $scope.selecting = false;
    $scope.goalkeeper = true;
    $scope.players = Player.getPlayers();
    $scope.teams = [];
    
    var getPlayersPerTeam = function() {
        var playersPerTeam = 4;
        if ($scope.goalkeeper) {
            playersPerTeam = 5;
        }
        return playersPerTeam
    }
    
    var getSelectedPlayers = function () {
        return $filter('filter')($scope.players, {checked: true});
    };
    
    var mapPriority = function(player) { 
        var getPriority = function(level) {
            switch (level) {
                case 1: return 20; break;
                case 2: return 10; break;
                default: return 0;
            }
        }
        player.priority = player.level + getPriority(player.level) + Math.random()
        return player
    }
    
    var getSelectedCount = function () {
        return getSelectedPlayers().length;
    };
    
    var getTeamCount = function() {
        return Math.floor(getSelectedCount() / getPlayersPerTeam());
    }
    
    var getWaitingCount = function() {
        return Math.floor(getSelectedCount() % getPlayersPerTeam());
    }
    
    $scope.selectPlayers = function() {
        $scope.selecting = true;
    };
    
    $scope.endSelection = function() {
        $scope.distribute();
        $scope.selecting = false;
    };
    
    $scope.getSelectionMessage = function() {
        var selectedCount = getSelectedCount(),
            total = $scope.players.length,
            message = "";
        
        if (selectedCount === 0) {
            message = total + " jogadores estão disponíveis para seleção";
        }
        else {            
            message = "Você selecionou " + selectedCount + " de " + total + " jogadores, ";
            
            var teamCount = getTeamCount()
            if (teamCount === 0) {
                message += "o que não dá um time ainda"
            }
            else {
                message += "que serão divididos em " + teamCount + " time" + (teamCount > 1 ? "s" : "");
                if (getWaitingCount() > 0) {
                    message += ", deixando " + getWaitingCount() + " de fora";
                }
            }
        
        }
        
        return message + '.';
    }
    
    $scope.distribute = function() {
        var classifiedPlayers = getSelectedPlayers().map(mapPriority),
            players = $filter('orderBy')(classifiedPlayers, '-priority'),
            teamCount = getTeamCount(),
            waitingCount = getWaitingCount(),
            playersPerTeam = getPlayersPerTeam();
            
        if (waitingCount > 0) {
            teamCount++;
        }
        
        $scope.teams = [];
    
        for (var i = 1; i <= teamCount; i++) {
            $scope.teams.push({
                'name': i,
                'players': [],
                'max': ((i === teamCount && waitingCount > 0) ? waitingCount : playersPerTeam)
            });
        };
        
        var team = -1;
        var waiting = false;
        for (var i = 0; i < players.length; i++) {

            team++;
        
            if (players[i].priority < 10.0 && waitingCount > 0) {
                waiting = true;
            }

            if (team >= (teamCount - (waiting ? 0 : 1))) {
                team = 0;
            }
                    
            if ($scope.teams[team].players.length >= $scope.teams[team].max) {
                team++
            }
            
            // duplicação terrível, eu sei - vou resolver depois
            if (team >= (teamCount - (waiting ? 0 : 1))) {
                team = 0;
            }
            
            $scope.teams[team].players.push(players[i]);
        };
    }
}