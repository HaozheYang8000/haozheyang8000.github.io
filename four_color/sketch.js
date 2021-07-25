let V, E, F;
let C, T;
let l = 6;
let ST = true;
let but;

function setup() {
    createCanvas(800, 800);
    V = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            V.push([i*100+65+Math.floor(Math.random()*70)+100, j*100+65+Math.floor(Math.random()*70)]);
        }
    }

    E = [];
    for (let i = 0; i < l*l; i++) {
        if (i == 0) E.push([1, l]);
        else if (i == l-1) E.push([i-1, i+l, i+l-1]);
        else if (i == l*(l-1)) E.push([i-l, i+1, i-l+1]);
        else if (i == l*l-1) E.push([i-l, i-1]);
        else if (i < l) E.push([i-1, i+l, i+l-1, i+1]);
        else if (i > l*(l-1)) E.push([i-1, i-l, i-l+1, i+1]);
        else if (i%l == 0) E.push([i+l, i-l, i-l+1, i+1]);
        else if (i%l == l-1) E.push([i+l, i-l, i+l-1, i-1]);
        else E.push([i+1, i-1, i+l, i-l, i+l-1, i-l+1]);
    }

    F = [];
    for (let i = 0; i < l-1; i++) {
        for (let j = 0; j < l-1; j++) {
            F.push([i*6+j, i*6+j+1, i*6+j+6]);
            F.push([i*6+j+1, i*6+j+6, i*6+j+7]);
        }
    }

    let r = 10;
    while (r > 0) {
        let x = Math.floor(Math.random()*l);
        let y = Math.floor(Math.random()*l);
        if (E[x*l+y].length <= 4) continue;
        let ind = Math.floor(Math.random()*(E[x*l+y].length));
        if (E[E[x*l+y][ind]].length <= 4) continue;
        let ind2;
        for (let i = 0; i < E[E[x*l+y][ind]].length; i++) {
            if (E[E[x*l+y][ind]][i] == x*l+y) {
                ind2 = i;
                break;
            }
        }

        let CV1 = E[x*l+y][ind];
        let CV2 = E[E[x*l+y][ind]][ind2];
        let CI1 = -1, CI2 = -1;
        for (let i = 0; i < F.length; i++) {
            if (F[i].includes(CV1) && F[i].includes(CV2)) {
                if (CI1 == -1) CI1 = i;
                else CI2 = i;
            }
        }

        let S1 = true, S2 = true;
        for (let i = 1; i < F[CI1].length; i++) {
            if (F[CI1][i] == CV1 && F[CI1][i-1] == CV2) S1 = false;
        } if (F[CI1][F[CI1].length-1] == CV2 && F[CI1][0] == CV1) S1 = false;
        for (let i = 1; i < F[CI2].length; i++) {
            if (F[CI2][i] == CV1 && F[CI2][i-1] == CV2) S2 = false;
        } if (F[CI2][F[CI2].length-1] == CV2 && F[CI2][0] == CV1) S2 = false;

        let tmp = [CV1];
        for (let i = 0; i < F[CI1].length; i++) {
            if (F[CI1][i] == CV1) {
                if (S1) {
                    for (let j = 0; j < F[CI1].length - 1; j++) {
                        let curP = i-j-1;
                        if (curP < 0) curP += F[CI1].length;
                        tmp.push(F[CI1][curP]);
                    }
                } else {
                    for (let j = 0; j < F[CI1].length - 1; j++) {
                        let curP = i+j+1;
                        if (curP >= F[CI1].length) curP -= F[CI1].length;
                        tmp.push(F[CI1][curP]);
                    }
                }
                break;
            }
        }
        for (let i = 0; i < F[CI2].length; i++) {
            if (F[CI2][i] == CV2) {
                if (S2) {
                    for (let j = 0; j < F[CI2].length - 2; j++) {
                        let curP = i+j+1;
                        if (curP >= F[CI2].length) curP -= F[CI2].length;
                        tmp.push(F[CI2][curP]);
                    }
                } else {
                    for (let j = 0; j < F[CI2].length - 2; j++) {
                        let curP = i-j-1;
                        if (curP < 0) curP += F[CI2].length;
                        tmp.push(F[CI2][curP]);
                    }
                }
                break;
            }
        }

        E[E[x*l+y][ind]].splice(ind2, 1);
        E[x*l+y].splice(ind, 1);
        if (CI1 > CI2) {
            F.splice(CI1, 1);
            F.splice(CI2, 1);
        } else {
            F.splice(CI2, 1);
            F.splice(CI1, 1);
        }
        F.push(tmp);
        r--;
    }

    C = [];
    for (let i = 0; i < F.length; i++) {
        C.push('white');
    }

    T = 0;
    but = createButton("Hide timer");
    but.position(270, 60);
    but.mousePressed(hide);
}

function hide() {
    ST = false;
    but.remove();
    but = createButton("Show timer");
    but.position(270, 30);
    but.mousePressed(show);
}

function show() {
    ST = true;
    but.remove();
    but = createButton("Hide timer");
    but.position(270, 60);
    but.mousePressed(hide);
}

function draw() {
    background(255);
    
    noStroke();
    for (let i = 0; i < F.length; i++) {
        fill(C[i]);
        beginShape();
        for (let j = 0; j < F[i].length; j++) {
            vertex(V[F[i][j]][0], V[F[i][j]][1]);
        }
        endShape(CLOSE);
    }

    stroke('black');
    strokeWeight(2);
    for (let i = 0; i < l*l; i++) {
        for (let j = 0; j < E[i].length; j++) {
            line(V[i][0], V[i][1], V[E[i][j]][0], V[E[i][j]][1]);
        }
    }

    fill('yellow');
    rect(20,20,80,40);
    fill('blue');
    rect(20,120,80,40);
    fill('red');
    rect(20,220,80,40);
    fill('green');
    rect(20,320,80,40);
    fill('white');
    rect(20,420,80,40);
    rect(20,520,80,40);

    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Erase', 60, 440);
    text('Submit', 60, 540);

    T++;
    if (ST) text('Time: ' + Math.floor(T/60) + ' seconds', 300, 30);

    let Cd = 0;
    for (let i = 0; i < C.length; i++) {
        if (C[i] != 'white') Cd++;
    }
    text('Colored: ' + Cd + '/40', 600, 30);
}