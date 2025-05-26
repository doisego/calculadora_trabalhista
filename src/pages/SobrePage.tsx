export function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sobre as Calculadoras Trabalhistas</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Nosso Objetivo</h2>
        <p className="text-gray-700 mb-4">
          Desenvolvemos este conjunto de calculadoras trabalhistas com o objetivo de facilitar o acesso a informações 
          e cálculos relacionados aos direitos trabalhistas no Brasil. Nossa missão é proporcionar ferramentas 
          precisas e fáceis de usar para que trabalhadores e empregadores possam realizar seus cálculos de forma 
          rápida e confiável.
        </p>
        <p className="text-gray-700">
          Todas as calculadoras foram desenvolvidas seguindo a legislação trabalhista brasileira vigente, 
          incluindo a CLT (Consolidação das Leis do Trabalho) e suas atualizações.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Calculadoras Disponíveis</h2>
        <p className="text-gray-700 mb-4">
          Oferecemos uma ampla variedade de calculadoras para atender às diferentes necessidades dos usuários:
        </p>
        
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-gray-800">Calculadora de FGTS</h3>
            <p className="text-gray-600">Calcula o valor do depósito mensal do FGTS com base no salário bruto.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800">Calculadoras de Décimo Terceiro</h3>
            <p className="text-gray-600">Calculam o valor integral ou proporcional do décimo terceiro salário.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800">Calculadora de Férias</h3>
            <p className="text-gray-600">Calcula o valor das férias, incluindo o terço constitucional e dias vendidos.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800">Calculadora de Rescisão</h3>
            <p className="text-gray-600">Calcula os valores devidos na rescisão do contrato de trabalho.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800">Calculadoras de Impostos e Contribuições</h3>
            <p className="text-gray-600">Calculam os valores de INSS, IRRF e outros descontos.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800">Simulador de Escala de Trabalho</h3>
            <p className="text-gray-600">Simula diferentes escalas de trabalho e folgas.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Aviso Legal</h2>
        <p className="text-gray-700 mb-4">
          As calculadoras disponibilizadas neste site são apenas para fins informativos e educacionais. 
          Os resultados apresentados são estimativas baseadas nas informações fornecidas pelo usuário 
          e na legislação vigente no momento do desenvolvimento.
        </p>
        <p className="text-gray-700 mb-4">
          Recomendamos sempre consultar um profissional especializado (contador, advogado trabalhista) 
          para obter orientações específicas sobre sua situação particular.
        </p>
        <p className="text-gray-700">
          Não nos responsabilizamos por decisões tomadas com base nos cálculos realizados através destas ferramentas.
        </p>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Contato</h2>
        <p className="text-gray-700 mb-4">
          Para dúvidas, sugestões ou reportar problemas, entre em contato conosco através do formulário 
          disponível em nosso site ou pelo e-mail contato@calculadorastrabalhistas.com.br.
        </p>
        <p className="text-gray-700">
          Agradecemos por utilizar nossas calculadoras e esperamos que elas sejam úteis para você!
        </p>
      </div>
    </div>
  );
}
