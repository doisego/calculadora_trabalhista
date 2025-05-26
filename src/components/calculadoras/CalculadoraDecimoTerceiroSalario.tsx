import { useState } from 'react';
import { calcularDecimoTerceiroSalario, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard
} from '../ui/CalculadoraComponents';

export function CalculadoraDecimoTerceiroSalario() {
  const [salarioBruto, setSalarioBruto] = useState<number>(0);
  const [resultado, setResultado] = useState<number | null>(null);

  const handleCalcular = () => {
    if (salarioBruto > 0) {
      const valorDecimoTerceiro = calcularDecimoTerceiroSalario(salarioBruto);
      setResultado(valorDecimoTerceiro);
    }
  };

  const handleLimpar = () => {
    setSalarioBruto(0);
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Décimo Terceiro Salário</h2>
      
      <InfoCard titulo="O que é o Décimo Terceiro Salário?">
        <p>O décimo terceiro salário é uma gratificação salarial que equivale a 1/12 da remuneração por mês trabalhado. 
        É um direito de todo trabalhador com carteira assinada, sendo pago em duas parcelas: a primeira até 30 de novembro 
        e a segunda até 20 de dezembro.</p>
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
            label="Valor do Décimo Terceiro Salário:" 
            valor={formatarMoeda(resultado)} 
          />
          <div className="mt-4 text-sm text-gray-600">
            <p>Este é o valor integral do seu décimo terceiro salário, considerando um ano completo de trabalho.</p>
            <p className="mt-2">Primeira parcela (até 30/nov): {formatarMoeda(resultado/2)}</p>
            <p>Segunda parcela (até 20/dez): {formatarMoeda(resultado/2)}</p>
            <p className="mt-2 text-xs">Obs: Na segunda parcela serão descontados INSS e Imposto de Renda, quando aplicáveis.</p>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
