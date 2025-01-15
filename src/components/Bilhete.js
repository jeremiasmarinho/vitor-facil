// components/Bilhete.js
export default function Bilhete({ combinacoes }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Bilhete da Lotofácil</h2>
      <div className="grid grid-cols-3 gap-4">
        {combinacoes.map((combinacao, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-medium">Jogo {index + 1}</h3>
            <ul className="mt-2 space-y-2">
              {combinacao.map((numero) => (
                <li key={numero} className="text-lg">
                  {numero}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
