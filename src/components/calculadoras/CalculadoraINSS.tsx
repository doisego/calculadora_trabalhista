import { useState } from 'react';
import { calcularINSS, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard
} from '../ui/CalculadoraComponents';

export function CalculadoraINSS() {
  const [salarioBruto, setSalarioBruto] = useState<number>(0);
  const [resultado, setResultado] = useState<number | null>(null);

  const handleCalcular = () => {
    if (salarioBruto > 0) {
      const valorINSS = calcularINSS(salarioBruto);
      setResultado(valorINSS);
    }
  };

  const handleLimpar = () => {
    setSalarioBruto(0);
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de INSS</h2>
      
      <InfoCard titulo="O que é o INSS?">
        <p>O INSS (Instituto Nacional do Seguro Social) é uma contribuição obrigatória que incide sobre o salário 
        do trabalhador. O valor é descontado mensalmente e varia conforme faixas salariais, com alíquotas 
        progressivas. Esta contribuição garante benefícios como aposentadoria, auxílio-doença, salário-maternidade, 
        entre outros.</p>
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
            label="Valor do INSS a ser descontado:" 
            valor={formatarMoeda(resultado)} 
          />
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Este é o valor que será descontado do seu salário para contribuição ao INSS.</p>
            <p className="mt-2">Alíquotas do INSS (2023):</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Até R$ 1.320,00: 7,5%</li>
              <li>De R$ 1.320,01 até R$ 2.571,29: 9%</li>
              <li>De R$ 2.571,30 até R$ 3.856,94: 12%</li>
              <li>De R$ 3.856,95 até R$ 7.507,49: 14%</li>
              <li>Acima de R$ 7.507,49: valor fixo de R$ 876,97</li>
            </ul>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
