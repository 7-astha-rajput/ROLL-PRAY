class Dice {
    type = 1;
    count = 0;
    r = new Red();
    g = new Green();
    y = new Yellow();
    b = new Blue();
    rctns = new Array();
    gctns = new Array();
    yctns = new Array();
    bctns = new Array();
    rollSound = new Audio('/src/assests/roll.mp3');     


    roll() {
        this.rollSound.play();
        if (this.type == 1) {
            msg.innerHTML = "Red";
            msg.style.color = "Red";
        }
        if (this.type == 2) {
            msg.innerHTML = "Green";
            msg.style.color = "Green";
        }
        if (this.type == 3) {
            msg.innerHTML = "Yellow";
            msg.style.color = "rgb(255, 200, 0)";
        }
        if (this.type == 4) {
            msg.innerHTML = "Blue";
            msg.style.color = "Blue";
        }
        this.count = Math.floor(Math.random() * 6 + 1);
        if (this.count == 1) {
            document.getElementById("die").style.backgroundImage = 'url("/src/assests/1.png")';
        }
        if (this.count == 2) {
            document.getElementById("die").style.backgroundImage = 'url("/src/assests/2.png")';
        }
        if (this.count == 3) {
            document.getElementById("die").style.backgroundImage = 'url("/src/assests/3.png")';
        }
        if (this.count == 4) {
            document.getElementById("die").style.backgroundImage = 'url("/src/assests/4.png")';
        }
        if (this.count == 5) {
            document.getElementById("die").style.backgroundImage = 'url("/src/assests/5.png")';
        }
        if (this.count == 6) {
            document.getElementById("die").style.backgroundImage = 'url("/src/assests/6.png")';
        }
        if (this.type == 1) {
            if (this.r.checker()) {
                document.getElementById("die").disabled = true;
            }
            this.rctns.push(this.count);
            this.bctns.splice(0, this.bctns.length);
            this.yctns.splice(0, this.yctns.length);
            this.gctns.splice(0, this.gctns.length);
            if (this.count != 6) {
                this.type++;
            }
            console.log("Red");
        }
        else if (this.type == 2) {
            if (this.g.checker()) {
                document.getElementById("die").disabled = true;
            }
            this.gctns.push(this.count);
            this.rctns.splice(0, this.rctns.length);
            this.bctns.splice(0, this.bctns.length);
            this.yctns.splice(0, this.yctns.length);
            if (this.count != 6) {
                this.type++;
            }
            console.log("Green");
        }
        else if (this.type == 3) {
            if (this.y.checker()) {
                document.getElementById("die").disabled = true;
            }
            this.yctns.push(this.count);
            this.rctns.splice(0, this.rctns.length);
            this.bctns.splice(0, this.bctns.length);
            this.gctns.splice(0, this.gctns.length);
            if (this.count != 6) {
                this.type++;
            }
            console.log("Yellow");
        }
        else if (this.type == 4) {
            if (this.b.checker()) {
                document.getElementById("die").disabled = true;
            }
            this.bctns.push(this.count);
            this.rctns.splice(0, this.rctns.length);
            this.yctns.splice(0, this.yctns.length);
            this.gctns.splice(0, this.gctns.length);
            if (this.count != 6) {
                this.type = 1;
            }
            console.log("Blue");
        }
    }
}
class Red_g {

    j = 0;
    move = 0;
    home = true;
    return = false;
    constructor(G_NO) {
        this.G_NO = G_NO;
    }
}
class Green_g {

    j = 0;
    move = 0;
    home = true;
    constructor(G_NO) {
        this.G_NO = G_NO;
    }
}
class Yellow_g {

    j = 0;
    move = 0;
    home = true;
    constructor(G_NO) {
        this.G_NO = G_NO;
    }
}
class Blue_g {

    j = 0;
    move = 0;
    home = true;
    constructor(G_NO) {
        this.G_NO = G_NO;
    }
}
var R1 = new Red_g(document.getElementById('r1'));
var R2 = new Red_g(document.getElementById('r2'));
var R3 = new Red_g(document.getElementById('r3'));
var R4 = new Red_g(document.getElementById('r4'));
class Red {
    cnt = 0;
    y = null;
    a = 0;
    x = null;

    mover(RN, count) {
        this.y = RN.G_NO;
        console.log("Check:" + (RN.move + count));
        if (RN.move + count <= 57) {
            if (RN.j !== 0 && RN.home === false) {
                count += RN.j;
                for (let i = RN.j; i <= count; i++) {
                    this.a++;
                    ((step) => {
                        setTimeout(() => this.movefunc(i, RN.move, RN), 1000 * this.a);
                    })(i);
                    RN.move++;
                }
                RN.move--;
                RN.j = count;
                this.killcheck(count);
                this.a = 0;

                this.checkWin();

                return true;
            } else if (count === 6) {
                this.x = document.getElementById(1);
                this.x.appendChild(this.y);
                RN.j = 1;
                RN.home = false;
                return true;
            }
        }
        return false;
    }
    movefunc(i, move, RN) {
        const jn = move >= 51 && i === 57 ? "out" : move >= 51 ? `rf${i}` : i;
        this.x = document.getElementById(jn);
        this.x.appendChild(this.y);
        RN.j = i;
    }

    choose(i) {
        if (roll.rctns.length === 0) return;

        const RN = [R1, R2, R3, R4][i - 1];
        if (RN && this.mover(RN, roll.rctns[this.cnt])) {
            if (this.cnt === roll.rctns.length - 1) {
                document.getElementById("die").disabled = false;
                roll.rctns = [];
                this.cnt = 0;
            } else {
                this.cnt++;
            }
        }
    }

    checkWin() {
        if (R1.home && R2.home && R3.home && R4.home) {
            const msg = document.getElementById("message");
            msg.innerText = "Red Wins! 🎉";
            msg.style.color = "red";
            document.getElementById("die").disabled = true; 
        }
    }

    checker() {
        const allHome = R1.home && R2.home && R3.home && R4.home;
        const lastRollNotSix = roll.rctns[roll.rctns.length - 1] !== 6;
        return !(allHome && lastRollNotSix);
    }

    killcheck(j) {
        const safeZones = [22, 27, 14, 9, 40, 35, 48, 1];
        if (safeZones.includes(j)) return;

        const tokens = [G1, G2, G3, G4, Y1, Y2, Y3, Y4, B1, B2, B3, B4];
        tokens.forEach(token => {
            if (j === token.j && token.home === false) {
                token.j = 0;
                token.home = true;
                token.move = 0;
                document.getElementById(`g_${token.G_NO.id}`).appendChild(token.G_NO);
                roll.type--;
            }
        });
    }
}

var B1 = new Blue_g(document.getElementById('b1'));
var B2 = new Blue_g(document.getElementById('b2'));
var B3 = new Blue_g(document.getElementById('b3'));
var B4 = new Blue_g(document.getElementById('b4'));
class Blue {
    cnt = 0;
    y = null;
    a = 0;
    x = null;

    mover(RN, count) {
        console.log("Check:" + (RN.move + count));
        this.y = RN.G_NO;
        if (RN.move + count < 57) {
            if (RN.j != 0 && RN.home == false) {
                count = count + RN.j;
                for (let i = RN.j; i <= count; i++) {
                    if (i == 53) {
                        count = count - i + 1;
                        RN.j = 1;
                        this.movefunc(1, RN.move);
                        RN.move = 1;
                        break;
                    }
                    this.a++;
                    setTimeout(() => this.movefunc(i, RN.move), 1000 * this.a);
                    RN.move++;
                }
                RN.move--;
                RN.j = count;
                this.killcheck(count);
                this.a = 0;
                this.checkWin();

                return true;
            } else {
                if (count == 6) {
                    this.x = document.getElementById(40);
                    this.x.appendChild(this.y);
                    RN.j = 40;
                    RN.home = false;
                    return true;
                }
            }
        }
        return false;
    }

    movefunc(i, move) {
        if (move >= 51) {
            if (i == 44) {
                this.x = document.getElementById("out");
            } else {
                let jn = "bf" + i;
                this.x = document.getElementById(jn);
            }
        } else {
            this.x = document.getElementById(i);
        }
        this.x.appendChild(this.y);
    }

    choose(i) {
        let token;
        switch (i) {
            case 1:
                token = B1;
                break;
            case 2:
                token = B2;
                break;
            case 3:
                token = B3;
                break;
            case 4:
                token = B4;
                break;
            default:
                return;
        }

        if (roll.bctns.length != 0) {
            let moved = this.mover(token, roll.bctns[this.cnt]);
            if (moved) {
                if (this.cnt == roll.bctns.length - 1) {
                    document.getElementById("die").disabled = false;
                    roll.bctns = [];
                    this.cnt = 0;
                } else {
                    this.cnt++;
                }
            }
        }
    }

    checkWin() {
        if (B1.home && B2.home && B3.home && B4.home) {
            const msg = document.getElementById("message");
            msg.innerText = "Blue Wins! 🎉";
            msg.style.color = "blue";
            document.getElementById("die").disabled = true; 
        }
    }

    checker() {
        if (roll.count == 6 || (B1.home && B2.home && B3.home && B4.home && roll.bctns[roll.bctns.length - 1] != 6)) {
            return false;
        }
        return true;
    }

    killcheck(j) {
        const safeZones = [22, 27, 14, 9, 40, 35, 48, 1];
        if (safeZones.includes(j)) return;

        const tokens = [G1, G2, G3, G4, Y1, Y2, Y3, Y4, R1, R2, R3, R4];
        tokens.forEach((token) => {
            if (j == token.j) {
                token.j = 0;
                token.home = true;
                token.move = 0;
                document.getElementById(`g_${token.G_NO.id}`).appendChild(token.G_NO);
                roll.type = 4;
            }
        });
    }
}

var G1 = new Green_g(document.getElementById('g1'));
var G2 = new Green_g(document.getElementById('g2'));
var G3 = new Green_g(document.getElementById('g3'));
var G4 = new Green_g(document.getElementById('g4'));
class Green {
    cnt = 0;
    y = null;
    a = 0;
    x = null;

    mover(RN, count) {
        console.log("Check:" + (RN.move + count));
        this.y = RN.G_NO;
        if (RN.move + count < 57) {
            if (RN.j !== 0 && !RN.home) {
                count = count + RN.j;
                for (let i = RN.j; i <= count; i++) {
                    if (i === 53) {
                        count = count - i + 1;
                        RN.j = 1;
                        i = 1;
                    }
                    this.a++;
                    setTimeout(() => this.movefunc(i, RN.move), 1000 * this.a);
                    RN.move++;
                }
                RN.move--;
                RN.j = count;
                this.killcheck(count);
                this.a = 0;

                this.checkWin();

                return true;
            } else if (count === 6) {
                this.x = document.getElementById(14);
                this.x.appendChild(this.y);
                RN.j = 14;
                RN.home = false;
                return true;
            }
        }
        return false;
    }

    movefunc(i, move) {
        if (move >= 51) {
            const elementId = i === 18 ? "out" : `gf${i}`;
            this.x = document.getElementById(elementId);
        } else {
            this.x = document.getElementById(i);
        }
        this.x.appendChild(this.y);
    }

    choose(i) {
        if (roll.gctns.length !== 0) {
            const tokenMap = [G1, G2, G3, G4];
            const selectedToken = tokenMap[i - 1];

            let ck = this.mover(selectedToken, roll.gctns[this.cnt]);
            console.log(ck);

            if (ck) {
                if (this.cnt === roll.gctns.length - 1) {
                    document.getElementById("die").disabled = false;
                    roll.gctns.splice(0, roll.gctns.length);
                    this.cnt = 0;
                } else {
                    this.cnt++;
                }
            }
        }
    }

    checker() {
        if (G1.home && G2.home && G3.home && G4.home && roll.count !== 6 && roll.gctns[roll.gctns.length - 1] !== 6) {
            return false;
        }
        return roll.count !== 6;
    }

    killcheck(j) {
        const pieces = [R1, R2, R3, R4, Y1, Y2, Y3, Y4, B1, B2, B3, B4];
        const safeZones = [22, 27, 14, 9, 40, 35, 48, 1];

        if (!safeZones.includes(j)) {
            pieces.forEach(piece => {
                if (j === piece.j) {
                    piece.j = 0;
                    piece.home = true;
                    piece.move = 0;
                    document.getElementById(`g_${piece.color}${piece.number}`).appendChild(piece.G_NO);
                    roll.type--;
                }
            });
        }
    }

    checkWin() {
        if (G1.home && G2.home && G3.home && G4.home) {
            const msg = document.getElementById("message");
            msg.innerText = "Green Wins! 🎉";
            msg.style.color = "green";
            document.getElementById("die").disabled = true; 
        }
    }
}

var Y1 = new Yellow_g(document.getElementById('y1'));
var Y2 = new Yellow_g(document.getElementById('y2'));
var Y3 = new Yellow_g(document.getElementById('y3'));
var Y4 = new Yellow_g(document.getElementById('y4'));
class Yellow {
    cnt = 0;
    y = null;
    a = 0;
    x = null;

    mover(RN, count) {
        this.y = RN.G_NO;
        if (RN.move + count < 57) {
            if (RN.j != 0 && RN.home == false) {
                count = count + RN.j;
                for (let i = RN.j; i <= count; i++) {
                    if (i == 53) {
                        count = count - i + 1;
                        RN.j = 1;
                        i = 1;
                    }
                    this.a++;
                    setTimeout(() => this.movefunc(i, RN.move), 1000 * this.a);
                    RN.move++;
                }
                RN.move--;
                RN.j = count;
                this.killcheck(count);
                this.a = 0;

                this.checkWin();

                return true;
            } else {
                if (count == 6) {
                    this.x = document.getElementById(27);
                    this.x.appendChild(this.y);
                    RN.j = 27;
                    RN.home = false;
                    return true;
                }
            }
        }
        return false;
    }

    movefunc(i, move) {
        if (move >= 51) {
            if (i == 31) {
                this.x = document.getElementById("out");
            } else {
                var jn = "yf" + i;
                this.x = document.getElementById(jn);
            }
        } else {
            this.x = document.getElementById(i);
        }
        this.x.appendChild(this.y);
    }

    choose(i) {
        var ck;
        if (roll.yctns.length != 0) {
            if (this.cnt < roll.yctns.length) {
                if (i == 1) {
                    ck = this.mover(Y1, roll.yctns[this.cnt]);
                } else if (i == 2) {
                    ck = this.mover(Y2, roll.yctns[this.cnt]);
                } else if (i == 3) {
                    ck = this.mover(Y3, roll.yctns[this.cnt]);
                } else if (i == 4) {
                    ck = this.mover(Y4, roll.yctns[this.cnt]);
                }

                if (ck) {
                    if (this.cnt == roll.yctns.length - 1) {
                        document.getElementById("die").disabled = false;
                        roll.yctns.splice(0, roll.yctns.length);
                        this.cnt = 0;
                    } else {
                        this.cnt++;
                    }
                }
            }
        }
    }

    checker() {
        if (Y1.home && Y2.home && Y3.home && Y4.home && roll.count != 6 && roll.yctns[roll.yctns.length - 1] != 6) {
            return false;
        } else {
            return roll.count != 6;
        }
    }

    killcheck(j) {
        const safePositions = [22, 27, 14, 9, 40, 35, 48, 1];

        if (safePositions.includes(j)) {
            return;
        }

        const players = [G1, G2, G3, G4, R1, R2, R3, R4, B1, B2, B3, B4];

        players.forEach(player => {
            if (player.j === j) {
                player.j = 0;
                player.home = true;
                player.move = 0;
                document.getElementById(`g_${player.G_NO.id}`).appendChild(player.G_NO);
                roll.type--;
            }
        });
    }

    checkWin() {
        if (Y1.home && Y2.home && Y3.home && Y4.home) {
            const msg = document.getElementById("message");
            msg.innerText = "Yellow Wins! 🎉";
            msg.style.color = "yellow";
            document.getElementById("die").disabled = true; 
        }
    }
}

var roll = new Dice();
var red = new Red();
var green = new Green();
var yellow = new Yellow();
var blue = new Blue();
var msg = document.getElementById("message")
msg.style.fontSize = "35px";
msg.style.textAlign = "center";