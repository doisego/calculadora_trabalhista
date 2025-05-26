import { useState } from 'react';
import { calcularFGTS, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard
} from '../ui/CalculadoraComponents';

export function CalculadoraFGTS() {
  const [salarioBruto, setSalarioBruto] = useState<number>(0);
  const [resultado, setResultado] = useState<number | null>(null);

  const handleCalcular = () => {
    if (salarioBruto > 0) {
      const valorFGTS = calcularFGTS(salarioBruto);
      setResultado(valorFGTS);
    }
  };

  const handleLimpar = () => {
    setSalarioBruto(0);
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de FGTS</h2>
      
      <InfoCard titulo="O que é o FGTS?">
        <p>O Fundo de Garantia do Tempo de Serviço (FGTS) é um direito do trabalhador com carteira assinada. 
        O empregador deposita mensalmente 8% do salário bruto em uma conta vinculada ao trabalhador na Caixa Econômica Federal.</p>
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
            label="Valor do FGTS mensal:" 
            valor={formatarMoeda(resultado)} 
          />
          <div className="mt-4 text-sm text-gray-600">
            <p>Este é o valor que o empregador deve depositar mensalmente na sua conta do FGTS.</p>
            <p className="mt-2">Alíquota aplicada: 8% do salário bruto.</p>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
