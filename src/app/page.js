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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-8">
        Vitor Fácil - Gerador de Apostas
      </h1>

      {combinacoes.length === 0 ? (
        <>
          <div className="mb-4">
            <label className="mr-2 text-lg font-medium text-gray-700">
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
              className="px-4 text-gray-950 py-2 border rounded-lg w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={gerarApostas}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 mb-6"
          >
            Gerar Apostas
          </button>
        </>
      ) : (
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Cartelas Geradas:
          </h2>
          {cartelas.map((cartela, index) => (
            <div
              key={index}
              className="bg-gray-100 p-10 rounded-lg shadow-lg mb-6"
            >
              <h3 className="text-xl font-medium text-gray-700 mb-4">
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
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 mt-4"
              >
                Imprimir Cartela
              </button>
            </div>
          ))}
          <button
            onClick={voltarInicio}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 mt-4"
          >
            Voltar ao Início
          </button>
        </div>
      )}
    </div>
  );
}
