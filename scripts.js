
const players = [
    {
        team: 'Barcelona',
        games: 0,
        goals: 0,        
        points: 0,
    },
    {
        team: 'Real Madrid',
        games: 0,
        goals: 0,        
        points: 0,
    },
    {
        team: 'AC Milan',
        games: 0,
        goals: 0,        
        points: 0,
    },
    {
        team: 'FC Bayern',
        games: 0,
        goals: 0,        
        points: 0,
    },
    {
        team: 'Man United',
        games: 0,
        goals: 0,        
        points: 0,
    }
];



let p = localStorage.getItem('player');

if(p) {
    for(let i = 0; i < players.length; i++) {
        players[i] = JSON.parse(p)[i];
    }
}
    

const table = document.getElementsByTagName('table')[0];

const scores1 = document.getElementById('scores1');
const scores2 = document.getElementById('scores2');

const shot1 = document.getElementById('shot1');
const shot2 = document.getElementById('shot2');

const scoreDiv = document.getElementById('scores');
const playMatch = document.getElementById('play');
const btnDiv = document.querySelector('.play');

const shots = document.querySelector('span');


function render(p) {

    for(let i = 0; i < p.length; i++) {
        let tr = document.createElement('tr');
        table.tBodies[0].appendChild(tr);
        for(let k in p[i]) {
            let td = document.createElement('td');
            tr.appendChild(td);
            td.textContent = p[i][k];
        } 
    }
} 



function sortByPoints(p){
    function compareNumbers(a, b) {
        if(a.points < b.points) {
            return 1;
        } else {
            if(a.points === b.points) {
                if(a.goals < b.goals) {
                    return 1;
                } else {
                    return -1;
                }
            }
            return -1;
        }
    }
    p.sort(compareNumbers);
}

sortByPoints(players);
render(players);

for(let i = 0; i < players.length; i++) {
    let opt1 = document.createElement('option');
    opt1.textContent = players[i].team;
    opt1.value = players[i].team;
    scores1.appendChild(opt1);

    let opt2 = document.createElement('option');
    opt2.textContent = players[i].team;
    opt2.value = players[i].team;
    scores2.appendChild(opt2);
}

btnDiv.style.display = "none";

shots.style.display = 'none';

function showBtn() {
    if(scores1.value !== "0"  && scores2.value !== "0"  && scores1.value !== scores2.value) {
        shots.style.display = 'inline';
        btnDiv.style.display = "block";
    }
} let int = setInterval(showBtn, 500);

function result(){
    
    if(shot1.value >= 0 && shot2.value >= 0 && scores2.value !== "0" && scores1.value !== "0") {
        table.tBodies[0].innerHTML = '';
        if(shot1.value > shot2.value){
            for(let i = 0; i < players.length; i++) {
                if(scores1.value == players[i].team && scores1.value !== scores2.value) {
                    players[i].points+=3;
                    players[i].games+=1;
                    players[i].goals = players[i].goals + (shot1.value - shot2.value);
                }
            }
            for(let i = 0; i < players.length; i++) {
                if(scores2.value == players[i].team && scores2.value !== scores1.value) {
                    players[i].games+=1;
                    players[i].goals = players[i].goals + (shot2.value - shot1.value);
                }
            }
        } 
        if(shot1.value < shot2.value) {
            for(let i = 0; i < players.length; i++) {
                if(scores2.value == players[i].team && scores2.value !== scores1.value) {
                    players[i].points+=3;
                    players[i].games+=1;
                    players[i].goals = players[i].goals + (shot2.value - shot1.value);
                }
            }
            for(let i = 0; i < players.length; i++) {
                if(scores1.value == players[i].team && scores1.value !== scores2.value) {
                    players[i].games+=1;
                    players[i].goals = players[i].goals + (shot1.value - shot2.value);
                }
            }
        } 

        if(shot1.value == shot2.value) {
            for(let i = 0; i < players.length; i++) {
                if(scores1.value == players[i].team && scores1.value !== scores2.value) {
                    players[i].points+=1;
                    players[i].games+=1;
                } 
            } 

            for(let i = 0; i < players.length; i++) {
                if(scores2.value == players[i].team && scores2.value !== scores1.value) {
                    players[i].points+=1;
                    players[i].games+=1;
                } 
            } 
        }
    
    shots.style.display = 'none';
    btnDiv.style.display = "none";
    scores1.value = '0';
    scores2.value = '0';
    shot1.value = '';
    shot2.value = '';
    
    sortByPoints(players);
    render(players);

    localStorage.setItem("player", JSON.stringify(players));
    }
}

playMatch.addEventListener('click', result);

