"use client";
import { useState } from "react";
import {
  gerarNumerosAleatorios,
  dividirEmCartelas,
  preencherBilhete,
} from "../utils/lotofacil";

export default function Home() {
  const [quantidadeJogos, setQuantidadeJogos] = useState(3);
  const [combinacoes, setCombinacoes] = useState([]);
  const [cartelas, setCartelas] = useState([]);

  const gerarApostas = () => {
    const novasCombinacoes = [];
    for (let i = 0; i < quantidadeJogos; i++) {
      novasCombinacoes.push(gerarNumerosAleatorios());
    }
    setCombinacoes(novasCombinacoes);
    setCartelas(dividirEmCartelas(novasCombinacoes));
  };

  const imprimirCartela = (cartela) => {
    preencherBilhete(cartela);
  };

  const voltarInicio = () => {
    setQuantidadeJogos(3);
    setCombinacoes([]);
    setCartelas([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-700 p-6">
      <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
        Vitor Fácil - Gerador de Apostas
      </h1>

      {combinacoes.length === 0 ? (
        <>
          <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md text-center mb-6">
            <label className="block text-lg font-semibold text-gray-700 m-2">
              Quantidade de jogos desejada:
            </label>
            <input
              type="number"
              value={quantidadeJogos}
              onChange={(e) => {
                const valor = parseInt(e.target.value, 10);
                setQuantidadeJogos(Number.isNaN(valor) ? 1 : valor);
              }}
              min={1}
              className="px-4 py-2 border text-gray-900 border-gray-300 rounded-lg w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={gerarApostas}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            Gerar Apostas
          </button>
        </>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          <h2 className="text-3xl font-semibold text-white mb-4 text-center">
            Cartelas Geradas:
          </h2>
          {cartelas.map((cartela, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-8 rounded-lg transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Cartela {index + 1}
              </h3>
              <ul className="list-disc space-y-2">
                {cartela.map((jogo, jogoIndex) => (
                  <li key={jogoIndex} className="text-lg text-gray-900">
                    <strong className="text-blue-500">
                      Jogo {jogoIndex + 1}:
                    </strong>{" "}
                    {jogo.join(", ")}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => imprimirCartela(cartela)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 mt-4 transition-transform transform hover:scale-105"
              >
                Imprimir Cartela
              </button>
            </div>
          ))}
          <div className="text-center">
            <button
              onClick={voltarInicio}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-700 mt-4 transition-transform transform hover:scale-105"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
