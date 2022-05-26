const tela = document.querySelector("canvas");
const pincel = tela.getContext("2d");
const msgTexto = ["Você perdeu!", "Você venceu!"];
const movimentos = [
    [{ x: 18, y: 490, x1: 18, y1: 18 }],
    [{ x: 18, y: 18, x1: 250, y1: 18 }],
    [{ x: 250, y: 18, x1: 250, y1: 50 }],
    [{ x: 250, y: 80, x1: 30, y1: 0 }],
    [{ x: 250, y: 110, x1: 250, y1: 230 }],
    [
        { x: 250, y: 120, x1: 210.5, y1: 205 },
        { x: 250, y: 120, x1: 290.5, y1: 205 },
    ],
    [
        { x: 250, y: 230, x1: 210.5, y1: 310 },
        { x: 250, y: 230, x1: 290.5, y1: 310 },
    ],
];


pincel.beginPath();
pincel.strokeStyle = '#0A3871';
pincel.moveTo(5, 490);
pincel.lineWidth = 3;
pincel.lineTo(445, 490);
pincel.stroke();

function validaTentativa(numero) {
    if (movimentos[numero].length == 1) {
        desenhaLinha(numero, movimentos[numero][0]);
    } else {
        for (let i = 0; i < movimentos[numero].length; i++) {
            desenhaLinha(numero, movimentos[numero][i]);
        }
    }
}

function desenhaLinha(n, { x, y, x1, y1 }) {
    if (n == 3) {
        pincel.beginPath();
        pincel.arc(x, y, x1, y1, 2 * Math.PI);
        pincel.stroke();
    } else {
        pincel.beginPath();
        pincel.moveTo(x, y);
        pincel.lineTo(x1, y1);
        pincel.stroke();
    }
}

function limpaCanvas() {
    pincel.clearRect(5, 5, 450, 483.5);
}

function desenhaTexto(x, y, n) {
    pincel.font = '1.5em Inter';
    if (n == 0) {
        pincel.fillStyle = 'red';
    } else {
        pincel.fillStyle = 'green';
    }
    pincel.fillText(msgTexto[n], x, y);
}
