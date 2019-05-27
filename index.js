new Vue({
    el: '#app',
    data: {
        startGame: false,
        playerLife: 100,
        monsterLife: 100,
        combatLog: []
    },
    computed: {
        playerStyle: function() {
            return {
                width: this.playerLife + '%'
            }
        },
        monsterStyle: function() {
            return {
                width: this.monsterLife + '%'
            }
        }
    },
    watch: {
        monsterLife: function() {
            if (this.monsterLife <= 0) {
                this.newGame()
            }
        },
        playerStyle: function() {
            if (this.playerLife <= 0) {
                this.newGame()
            }
        }
    },
    methods: {
        btnActions: function(event) {
            if (event.target.id === 'attack') {
                this.monsterLife -= 10;
                this.monsterAttackandLog(10);
            } else if (event.target.id === 'special-attack') {
                this.monsterLife -= 30;
                this.monsterAttackandLog(30);
            } else if (event.target.id === 'heal') {
                if(this.playerLife >= 100) return;
                this.playerLife += 15;
                this.monsterAttackandLog(15);
                if(this.playerLife > 100) this.playerLife = 100;
            } else {
                this.newGame();
            };
        },
        monsterAttackandLog: function(playerDMG) {
            let dmg = playerDMG;
            let min = 8;
            let max = 15;

            let attack = Math.floor(Math.random() * (max - min + 1) + min);
            this.playerLife -= attack;

            this.combatLog = [[` ${dmg === 15 ? 'PLAYER HEAL FOR PLAYER' : ' PLAYER HITS MONSTER FOR'} ${dmg}`, `MONSTER HITS MONSTER FOR ${attack}`], ...this.combatLog, ]
        },
        newGame: function() {
            let answer = confirm('Do you really want to start a new game?');
            if(answer) {
                this.playerLife = 100;
                this.monsterLife = 100;
                this.startGame = false;
                this.combatLog = [];
            }
        }
    }
})