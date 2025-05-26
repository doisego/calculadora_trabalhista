import { Link } from 'react-router-dom';
import { CalculadoraCard } from '../components/ui/CalculadoraComponents';

export function HomePage() {
  const calculadoras = [
    {
      titulo: "Calculadora de FGTS",
      descricao: "Calcule o valor do FGTS mensal com base no seu salário bruto.",
      link: "/fgts"
    },
    {
      titulo: "Calculadora de Décimo Terceiro Proporcional",
      descricao: "Calcule o valor proporcional do décimo terceiro salário.",
      link: "/decimo-terceiro-proporcional"
    },
    {
      titulo: "Calculadora de Décimo Terceiro Salário",
      descricao: "Calcule o valor integral do décimo terceiro salário.",
      link: "/decimo-terceiro"
    },
    {
      titulo: "Calculadora de Férias",
      descricao: "Calcule o valor das férias, incluindo o terço constitucional.",
      link: "/ferias"
    },
    {
      titulo: "Calculadora de Rescisão Trabalhista CLT",
      descricao: "Calcule os valores da rescisão do contrato de trabalho.",
      link: "/rescisao"
    },
    {
      titulo: "Calculadora de Horas Extras",
      descricao: "Calcule o valor das horas extras trabalhadas.",
      link: "/horas-extras"
    },
    {
      titulo: "Simulador de Escala de Trabalho",
      descricao: "Simule sua escala de trabalho e folgas.",
      link: "/escala-trabalho"
    },
    {
      titulo: "Calculadora de INSS",
      descricao: "Calcule o valor da contribuição ao INSS.",
      link: "/inss"
    },
    {
      titulo: "Calculadora de IRRF",
      descricao: "Calcule o valor do Imposto de Renda Retido na Fonte.",
      link: "/irrf"
    },
    {
      titulo: "Calculadora de Salário Empregado Doméstico",
      descricao: "Calcule o salário líquido do empregado doméstico.",
      link: "/domestico"
    },
    {
      titulo: "Calculadora de Salário Líquido",
      descricao: "Calcule o salário líquido após todos os descontos.",
      link: "/salario-liquido"
    },
    {
      titulo: "Calculadora de Seguro Desemprego",
      descricao: "Calcule o valor e o número de parcelas do seguro desemprego.",
      link: "/seguro-desemprego"
    }
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 rounded-lg mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Calculadoras Trabalhistas</h1>
          <p className="text-xl mb-8">Ferramentas completas para cálculos trabalhistas conforme a legislação brasileira</p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/sobre" 
              className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Nossas Calculadoras</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculadoras.map((calc, index) => (
            <Link to={calc.link} key={index} className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full">
                <h3 className="text-lg font-semibold text-blue-600">{calc.titulo}</h3>
                <p className="mt-2 text-gray-600">{calc.descricao}</p>
                <div className="mt-4">
                  <span className="text-blue-600 font-medium">Acessar →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg mb-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Por que usar nossas calculadoras?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-blue-600 text-xl mb-2">✓</div>
              <h3 className="font-semibold text-gray-800 mb-2">Cálculos Precisos</h3>
              <p className="text-gray-600">Todas as calculadoras seguem a legislação trabalhista brasileira atualizada.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-blue-600 text-xl mb-2">✓</div>
              <h3 className="font-semibold text-gray-800 mb-2">Fácil de Usar</h3>
              <p className="text-gray-600">Interface intuitiva e amigável, sem complicações.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-blue-600 text-xl mb-2">✓</div>
              <h3 className="font-semibold text-gray-800 mb-2">Gratuito</h3>
              <p className="text-gray-600">Todas as calculadoras são gratuitas e sem limitações.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-blue-600 text-xl mb-2">✓</div>
              <h3 className="font-semibold text-gray-800 mb-2">Resultados Detalhados</h3>
              <p className="text-gray-600">Veja todos os detalhes dos cálculos e entenda como chegamos aos valores.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
