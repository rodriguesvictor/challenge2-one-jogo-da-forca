const palavras = [
  'brasil', 'pernambuco', 'desafio', 'nordeste'
];

const letrasPress = [];
let palavraSorteada;
let tentativa = 0;

const btnTrocarTela = document.querySelectorAll(".trocarTela");
const salvarPalavra = document.querySelector(".salvar-palavra");
const texto = document.querySelector(".texto-novo");
const novoJogo = document.querySelector("#jogar-novamente");
const certa = document.querySelector(".certas");
const errada = document.querySelector(".erradas");
let telaJogo = document.querySelector(".tela-jogo");
let telaAdd = document.querySelector(".principal-adicionar");
let principal = document.querySelector(".principal");

window.addEventListener("load", function () {
  btnTrocarTela.forEach((botao) => {
    botao.addEventListener("click", trocaTela);
  });
});

salvarPalavra.addEventListener("click", verificaSePalavraExiste);
novoJogo.addEventListener("click", resetaJogo);
window.addEventListener("keypress", validacaoLetras);
texto.addEventListener("keypress", validaTexto);

function trocaTela(botao) {

  if (this.parentNode.tagName == "SECTION") {
    this.parentNode.style.display = "none";
  } else {
    this.parentNode.parentNode.style.display = "none";
  }

  if (botao.target.classList.contains("jogar")) {
    telaJogo.style.display = "flex";
    resetaJogo();

  } else if (botao.target.classList.contains("adicionar")) {
    telaAdd.style.display = "flex";
    texto.focus();
    texto.addEventListener("keypress", validaTexto);

  } else {
    principal.style.display = "flex";
    texto.addEventListener("keypress", validaTexto);
    limpaTexto();
  }
}

function sorteiaNumeroAleatorio() {
  let numeroAleatorio = Math.floor(Math.random() * palavras.length);

  return geraPalavra(numeroAleatorio);
}

function geraPalavra(numero) {
  palavraSorteada = palavras[numero];

  for (let i = 0; i < palavraSorteada.length; i++) {
    certa.append(criaSpan());
  }
}

function criaSpan() {
  let span = document.createElement("span");

  return span;
}

function validacaoLetras(evento) {
  if (certa.parentElement.style.display == "flex") {
    if (validaSeTeclaELetra(evento)) {
      let letra = String.fromCharCode(evento.keyCode);
      let temNoArray = validaSeLetraDigitada(
        letra,
        letrasPress
      );

      if (!temNoArray) {
        letrasPress.push(letra);

        if (validaSeLetraTemNaPalavra(letra)) {
          let indexDaLetraNaPalavraSorteada = gerarIndex(letra);
          exibirLetrasCorretasNaTela(
            letra,
            indexDaLetraNaPalavraSorteada
          );
          checaVitoria();
        } else {
          console.log("A palavra não possui essa letra");
          exibirLetraErradaNaTela(letra);
          checaDerrota(tentativa);
          validaTentativa(tentativa);
          tentativa++;
        }
      } else {
        return console.log("Letra já Precionada anteriomente");
      }
    }
  }
}

function validaSeLetraDigitada(letra, callback) {
  let temNoArray = false;

  callback.forEach((caractere) => {
    if (letra == caractere) {
      temNoArray = true;
    }
  });

  return temNoArray;
}

function validaSeLetraTemNaPalavra(letra) {
  let temNaPalavra = false;

  if (certa.parentElement.style.display == "flex") {
    if (palavraSorteada.includes(letra)) {
      temNaPalavra = true;
    }
    return temNaPalavra;
  }
}

function gerarIndex(letra) {
  let arr = [];

  for (let i = 0; i < palavraSorteada.length; i++) {
    if (palavraSorteada[i] == letra) {
      arr.push(i);
    }
  }
  return arr;
}

function exibirLetrasCorretasNaTela(caractere, arr) {
  let letra = caractere.toUpperCase();

  for (let i = 0; i < arr.length; i++) {
    certa.children[arr[i]].textContent = letra;
  }
}

function exibirLetraErradaNaTela(caractere) {
  let letra = caractere.toUpperCase();
  let span = criaSpan();
  span.append(letra);
  document.querySelector(".erradas").append(span);
}

function checaVitoria() {
  let resultado = "";
  let numeroDeCasas = certa.childElementCount;

  for (let i = 0; i < numeroDeCasas; i++) {
    if (certa.children[i] != "") {
      resultado += certa.children[i].textContent;
    }
  }

  if (resultado.toLowerCase() == palavraSorteada) {
    window.removeEventListener("keypress", validacaoLetras);
    texto.removeEventListener("keypress", validaTexto);
    console.log("Parabéns, você venceu!!!");
    desenhaTexto(300, 250, 1);


  }
}

function validaSeTeclaELetra(evento) {
  if (evento.keyCode >= 97 && evento.keyCode <= 122 || evento.keyCode == 186) {
    return true;
  } else {
    return false;
  }
}

function checaDerrota(n) {
  if (n >= 6) {
    window.removeEventListener("keypress", validacaoLetras);
    texto.removeEventListener("keypress", validaTexto);
    console.log("Você perdeu...");
    desenhaTexto(300, 250, 0);

  }
}

function resetaJogo() {
  let qtdFilhos = certa.childElementCount;

  for (let i = 0; i < qtdFilhos; i++) {
    let pFilho = certa.firstElementChild;
    certa.removeChild(pFilho);
  }

  qtdFilhos = errada.childElementCount;

  for (let i = 0; i < qtdFilhos; i++) {
    pFilho = errada.firstElementChild;
    errada.removeChild(pFilho);
  }

  letrasPress.splice(0);
  tentativa = 0;
  sorteiaNumeroAleatorio();
  limpaCanvas();
  window.focus();
  window.addEventListener("keypress", validacaoLetras);
  texto.addEventListener("keypress", validaTexto);

}


function verificaSePalavraExiste() {
  if (texto.value !== "") {
    let palavra = texto.value.toLowerCase();

    let novaPalavra;

    if (palavra.length <= 8 && palavra.length >= 3 && validaSePalavra(palavra)) {
      for (let i = 0; i < palavras.length; i++) {
        if (palavra == palavras[i]) {
          console.log("A palavra não pode ser adicionada");
          texto.focus();
          novaPalavra = false;
          break;
        } else {
          novaPalavra = true;
        }
      }

      if (novaPalavra) {
        adicionaPalavraNoArray(palavra);
        texto.value = "";
        telaAdd.style.display = "none";
        telaJogo.style.display = "flex";
        resetaJogo();
      }
    } else {
      texto.focus();
      console.log("Não permitida!");
      texto.focus();
    }
  } else {
    texto.focus();
  }
}

function validaSePalavra(palavra) {
  let regra = /[^A-z]/g;

  if (!palavra.match(regra)) {
    return true;
  } else {
    return false;
  }
}

function adicionaPalavraNoArray(palavra) {
  palavras.push(palavra);
  console.log("Palavra Adicionada: " + palavra);
  limpaTexto();
}

function limpaTexto() {
  texto.value = "";
  texto.style.border = "none";
}

function validaTexto(evento) {
  if (!validaSeTeclaELetra(evento) || texto.value.length >= 8) {
    evento.preventDefault();
  }
}