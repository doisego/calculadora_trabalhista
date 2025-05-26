import { useState } from 'react';
import { calcularIRRF, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard
} from '../ui/CalculadoraComponents';

export function CalculadoraIRRF() {
  const [salarioBruto, setSalarioBruto] = useState<number>(0);
  const [numeroDependentes, setNumeroDependentes] = useState<number>(0);
  const [resultado, setResultado] = useState<number | null>(null);

  const handleCalcular = () => {
    if (salarioBruto > 0) {
      const valorIRRF = calcularIRRF(salarioBruto, numeroDependentes);
      setResultado(valorIRRF);
    }
  };

  const handleLimpar = () => {
    setSalarioBruto(0);
    setNumeroDependentes(0);
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de IRRF (Imposto de Renda)</h2>
      
      <InfoCard titulo="O que é o IRRF?">
        <p>O Imposto de Renda Retido na Fonte (IRRF) é um tributo federal que incide sobre os rendimentos 
        recebidos por pessoas físicas. O cálculo considera o salário bruto, descontos do INSS e número de 
        dependentes. O valor é retido pelo empregador e repassado à Receita Federal.</p>
      </InfoCard>
      
      <form onSubmit={(e) => { e.preventDefault(); handleCalcular(); }} className="mb-6">
        <InputField
          label="Salário Bruto (R$)"
          id="salarioBruto"
          type="number"
          value={salarioBruto || ''}
          onChange={(e) => setSalarioBruto(Number(e.target.value))}
          placeholder="Digite o valor do salário bruto"
          required
          min={0}
          step={0.01}
        />
        
        <InputField
          label="Número de Dependentes"
          id="numeroDependentes"
          type="number"
          value={numeroDependentes || ''}
          onChange={(e) => setNumeroDependentes(Number(e.target.value))}
          placeholder="Digite o número de dependentes"
          min={0}
          step={1}
        />
        
        <div className="flex space-x-4 mt-6">
          <Button type="submit" variant="primary">
            Calcular
          </Button>
          <Button type="button" variant="outline" onClick={handleLimpar}>
            Limpar
          </Button>
        </div>
      </form>
      
      {resultado !== null && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Resultado</h3>
          <ResultadoDisplay 
            label="Valor do IRRF a ser descontado:" 
            valor={formatarMoeda(resultado)} 
          />
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Este é o valor que será descontado do seu salário para o Imposto de Renda.</p>
            <p className="mt-2">Alíquotas do IRRF (2023):</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Até R$ 2.112,00: Isento</li>
              <li>De R$ 2.112,01 até R$ 2.826,65: 7,5% (dedução de R$ 158,40)</li>
              <li>De R$ 2.826,66 até R$ 3.751,05: 15% (dedução de R$ 370,40)</li>
              <li>De R$ 3.751,06 até R$ 4.664,68: 22,5% (dedução de R$ 651,73)</li>
              <li>Acima de R$ 4.664,68: 27,5% (dedução de R$ 884,96)</li>
            </ul>
            <p className="mt-2">Dedução por dependente: R$ 189,59</p>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
