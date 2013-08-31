$(function () {
    $('.check-player').button();
});

function MyCtrl($scope, $filter) {
    
    $scope.selecting = false;
    $scope.goalkeeper = true;
    $scope.players = Player.getPlayers();
    
    var getPlayersPerTeam = function() {
        var playersPerTeam = 4;
        if ($scope.goalkeeper) {
            playersPerTeam++;
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

    $scope.getSelectedPlayers = function () {
        var classifiedPlayers = getSelectedPlayers().map(mapPriority);
        return $filter('orderBy')(classifiedPlayers, '-priority')
    };
    
    $scope.getSelectedCount = function () {
        return getSelectedPlayers().length;
    };
    
    $scope.getTeamCount = function () {
        return Math.floor(getSelectedPlayers().length / getPlayersPerTeam());
    };

    $scope.selectPlayers = function() {
        $scope.selecting = true;
    };
    
    $scope.endSelection = function() {
        $scope.selecting = false;
    };
}