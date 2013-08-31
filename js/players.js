Player = {
    getPlayers: function() {

        var players = []
        
        var levelDescription = {
            6: 'GOLEIRO BOM',
            5: 'GOLEIRO REGULAR',
            4: 'MAIS HABILIDOSO', 
            3: 'HABILIDOSO',
            2: 'BOM',
            1: 'APRENDENDO'
        }
            
        var add = function(name, level, outsider) {
        
            if (outsider === undefined) {
                outsider = false
            }
            
            players.push({
                'id': players.length + 1,
                'name': name,
                'level': level,
                'checked': false,
                'outsider': outsider
            });
        }
         
        add('Silvio Boia - amigo Icaro', 6, true)
        add('Victor - amigo JJ', 6, true)
        add('Tiago Vignoli', 5)
        add('Romano', 5)
        add('Iuri no gol', 5)
        add('Iuri na linha', 3)
        add('Eduardo', 4)
        add('R�mulo', 4)
        add('Icaro', 4)
        add('Rogerson', 4)
        add('Ramon - amigo Brauner', 4, true)
        add('Fernando Para�ba - amigo Icaro', 4, true)
        add('Fabiano - amigo Icaro', 4, true)
        add('Pedro Paulo - amigo Rogerson', 4, true)
        add('Thiago Mello', 3)
        add('Brauner', 3)
        add('Gabriel', 3)
        add('Daniel', 3)
        add('Raphael Neves', 3)
        add('JJ', 3)
        add('Vitor Cabral', 3)
        add('Giovanni', 3)
        add('Rodrigo', 3)
        add('Evandro', 3, true)
        add('Luis Felipe - amigo Icaro', 3, true)
        add('Igor - amigo Evandro', 3, true)
        add('Italo', 2)
        add('Brian', 2)
        add('Fl�vio Almeida', 1)
        add('Bernardo', 1, true)
        add('S�rgio', 1)
        add('Jogador 1A', 1, true)
        add('Jogador 1B', 1, true)
        add('Jogador 2A', 2, true)
        add('Jogador 2B', 2, true)
        add('Jogador 3A', 3, true)
        add('Jogador 3B', 3, true)
        add('Jogador 4A', 4, true)
        add('Jogador 4B', 4, true)
        add('Jogador 5', 5, true)
        add('Jogador 6', 6, true)
        
        return players
        
    }
}