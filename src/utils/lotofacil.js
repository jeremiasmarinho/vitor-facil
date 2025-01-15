import { posicoesNumeros } from "./lotofacil-coordenadas";

// Função para gerar números aleatórios
export const gerarNumerosAleatorios = () => {
  const numeros = [];
  while (numeros.length < 15) {
    const numero = Math.floor(Math.random() * 25) + 1;
    if (!numeros.includes(numero)) {
      numeros.push(numero);
    }
  }
  return numeros.sort((a, b) => a - b);
};

// Função para dividir os jogos em cartelas de 3 combinações
export const dividirEmCartelas = (combinacoes) => {
  const cartelas = [];
  for (let i = 0; i < combinacoes.length; i += 3) {
    cartelas.push(combinacoes.slice(i, i + 3));
  }
  return cartelas;
};

// Função para preencher o bilhete com até 3 combinações
export const preencherBilhete = (combinacoes) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Configurar o tamanho do canvas
  canvas.width = 800; // Ajuste conforme o tamanho do bilhete
  canvas.height = 350;

  // Carregar a imagem do bilhete como fundo
  const imagemBilhete = new Image();
  imagemBilhete.src = "/volante-lotofacil.jpg"; // Certifique-se de salvar a imagem na pasta `public`

  imagemBilhete.onload = () => {
    // Desenhar o bilhete no canvas
    context.drawImage(imagemBilhete, 0, 0, canvas.width, canvas.height);

    // Configurar o estilo dos quadrados
    context.fillStyle = "black";
    const tamanhoQuadrado = 20;

    // Desenhar cada combinação na cartela
    combinacoes.forEach((jogo, jogoIndex) => {
      jogo.forEach((numero) => {
        const { x, y } = posicoesNumeros[numero];

        // Deslocamento vertical para cada jogo
        const offsetY = jogoIndex * 200;
        context.fillRect(
          x - tamanhoQuadrado / 2,
          y + offsetY - tamanhoQuadrado / 2,
          tamanhoQuadrado,
          tamanhoQuadrado
        );
      });
    });

    // Enviar para impressão
    const url = canvas.toDataURL("image/png");
    const janela = window.open();
    janela.document.write(`<img src="${url}" />`);
    janela.print();
  };
};
