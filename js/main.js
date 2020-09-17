const cartas = document.querySelectorAll(".carta");
let possuiAlgumaCartaVirada = false;
let primeiraCartaVirada, segundaCartaVirada;
let bloquearTabuleiro = false;

function virarCarta() {
  if (bloquearTabuleiro) return;

  if (this === primeiraCartaVirada) return;

  this.classList.add("giro-carta");

  if (!possuiAlgumaCartaVirada) {
    possuiAlgumaCartaVirada = true;
    primeiraCartaVirada = this;
    return;
  }

  segundaCartaVirada = this;
  possuiAlgumaCartaVirada = false;
  checarSeCartasCombinam();
}

function checarSeCartasCombinam() {
  if (primeiraCartaVirada.dataset.card === segundaCartaVirada.dataset.card) {
    desabilitarCartas();
    return;
  }

  desvirarCartas();
}

function desabilitarCartas() {
  primeiraCartaVirada.removeEventListener("click", virarCarta);
  segundaCartaVirada.removeEventListener("click", virarCarta);

  resetarJogo();
}

function desvirarCartas() {
  bloquearTabuleiro = true;

  setTimeout(() => {
    primeiraCartaVirada.classList.remove("giro-carta");
    segundaCartaVirada.classList.remove("giro-carta");

    resetarJogo();
  }, 1500);
}

function resetarJogo() {
  [possuiAlgumaCartaVirada, bloquearTabuleiro] = [false, false];
  [primeiraCartaVirada, segundaCartaVirada] = [null, null];
}

cartas.forEach((carta) => {
  carta.addEventListener("click", virarCarta);
});

(function embaralharCartas() {
  cartas.forEach((carta) => {
    let posicaoAleatoria = Math.floor(Math.random() * 12);
    carta.style.order = posicaoAleatoria;
  });
})(); //Conceito de 'Immediately Invoked Function Expression'
