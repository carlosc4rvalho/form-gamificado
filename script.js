const secoesFormulario = document.querySelectorAll(".form-section");
const canvasDiv = document.getElementById("canvas");
const elementosDeEntrada = document.querySelectorAll("input");
const barraDeProgresso = document.getElementById("progress_bar");
const btnProximo = document.getElementById("btn_prosseguir");
const campoDataNascimento = document.getElementById("data_nascimento");
const campoNumero = document.getElementById("numero");
const campoCodigoPostal = document.getElementById("codigo_postal");
const campoCPF = document.getElementById("cpf");

const campos = [
  { id: "nome", tamanhoMinimo: 2, alerta: "* mínimo 2 caracteres." },
  { id: "sobrenome", tamanhoMinimo: 3, alerta: "* mínimo 3 caracteres." },
  { id: "email", tamanhoMinimo: 11, alerta: "* mínimo 11 caracteres." },
  { id: "data_nascimento", tamanhoMinimo: 6, alerta: "* mínimo 6 caracteres." },
  { id: "numero", tamanhoMinimo: 10, alerta: "* mínimo 10 caracteres." },
  { id: "endereco", tamanhoMinimo: 5, alerta: "* mínimo 5 caracteres." },
  { id: "complemento", tamanhoMinimo: 0 }, // ganha algo se o valor dele for maior do 0 pois o campo é opcional
  { id: "codigo_postal", tamanhoMinimo: 8, alerta: "* mínimo 8 caracteres." },
  { id: "cpf", tamanhoMinimo: 11, alerta: "* mínimo 1 caracteres." },
  { id: "senha", tamanhoMinimo: 8, alerta: "* mínimo 8 caracteres." },
  { id: "comentarios", tamanhoMinimo: 0 }, // ganha algo se o valor dele for maior do que 0 pois o campo é opcional
];

const classesProgresso = [
  "progress10 progress_bar",
  "progress30 progress_bar",
  "progress60 progress_bar",
  "progress100 progress_bar",
];

let indiceSecaoAtual = 0;

const validarCampo = (campo) => {
  const campoElement = document.getElementById(campo.id);
  const campoValue = campoElement.value;

  const isCampoValido =
    campoValue.length >= campo.tamanhoMinimo &&
    campoValue.trim() !== "";

  campoElement.style.borderColor = isCampoValido ? "lightgreen" : "red";

  const alertaElement = document.querySelector(`label[id="${campo.id}"]`);

  if (isCampoValido) {
    alertaElement.style.display = "none";
  } else {
    alertaElement.textContent = `${campo.alerta}`;
    alertaElement.style.display = "block";
    alertaElement.style.color = "red";
  }
};

elementosDeEntrada.forEach((elemento) => {
  elemento.addEventListener("input", () => {
    const campo = campos.find((c) => c.id === elemento.id);
    validarCampo(campo);
  });
});

const formatarData = (data) => {
  return data.replace(/(\d{2})(\d{2})(\d{2,6})/, "$1/$2/$3");
}

const formatarNumero = (numero) => {
  return numero.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
}

const formatarCodigoPostal = (codigoPostal) => {
  return codigoPostal.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

const formatarCPF = (cpf) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
}

const avancarParaProximaSecao = async () => {
  const camposPreenchidos = Array.from(elementosDeEntrada).every((campo) => {
    const preenchido = campo.value.trim() !== '';
    return preenchido;
  });

  if (indiceSecaoAtual === 2) {
    barraDeProgresso.className = classesProgresso[3];

    await new Promise(resolve => setTimeout(resolve, 1200));

    document.getElementById("img").style.display = "none";
    document.querySelector("form").style.display = "none";

    const mensagemAgradecimento = '<h5>Obrigado por preencher o formulário!</h5>';
    const mensagemCompleta = '<h5>Parabéns! Você preencheu todos os campos. 🎉</h5><br><h5>Nova conquista desbloqueada: <strong>Formulário Completo</strong>!</h5>';

    canvasDiv.innerHTML = camposPreenchidos ? mensagemCompleta : mensagemAgradecimento;
    canvasDiv.style.display = "flex";

    // função confetti
    const duration = 30 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }
  else {
    secoesFormulario[indiceSecaoAtual].style.display = "none";
    indiceSecaoAtual = (indiceSecaoAtual + 1) % secoesFormulario.length;
    secoesFormulario[indiceSecaoAtual].style.display = "flex";

    barraDeProgresso.className = classesProgresso[indiceSecaoAtual];
    btnProximo.style.display = indiceSecaoAtual === 3 ? "none" : "flex";
  }
};

campoDataNascimento.addEventListener("input", () => {
  campoDataNascimento.value = formatarData(campoDataNascimento.value);
});

campoNumero.addEventListener("input", () => {
  campoNumero.value = formatarNumero(campoNumero.value);
});

campoCPF.addEventListener("input", () => {
  campoCPF.value = formatarCPF(campoCPF.value);
});

campoCodigoPostal.addEventListener("input", () => {
  campoCodigoPostal.value = formatarCodigoPostal(campoCodigoPostal.value);
});

btnProximo.addEventListener("click", avancarParaProximaSecao);

window.addEventListener("load", async function () {
  const greetings = ["Hello", "bonjour", "なれ", "Ciao", "يكون", "Olá"];
  const greetingText = document.getElementById("greetingText");
  const sectionHello = document.getElementById("section_hello");

  let currentIndex = 0;

  function changeGreeting() {
    greetingText.textContent = greetings[currentIndex];
    currentIndex++;
  }

  setInterval(changeGreeting, 300);

  await new Promise(resolve => setTimeout(resolve, 3000));

  sectionHello.style.transform = "translateY(-100%)";

  await new Promise(resolve => setTimeout(resolve, 2000));

  sectionHello.style.display = "none";
});
