import { useState } from 'react';
import { calcularDecimoTerceiroProporcional, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard
} from '../ui/CalculadoraComponents';

export function CalculadoraDecimoTerceiroProporcional() {
  const [salarioBruto, setSalarioBruto] = useState<number>(0);
  const [mesesTrabalhados, setMesesTrabalhados] = useState<number>(0);
  const [resultado, setResultado] = useState<number | null>(null);

  const handleCalcular = () => {
    if (salarioBruto > 0 && mesesTrabalhados > 0) {
      const valorDecimoTerceiro = calcularDecimoTerceiroProporcional(salarioBruto, mesesTrabalhados);
      setResultado(valorDecimoTerceiro);
    }
  };

  const handleLimpar = () => {
    setSalarioBruto(0);
    setMesesTrabalhados(0);
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Décimo Terceiro Proporcional</h2>
      
      <InfoCard titulo="O que é o Décimo Terceiro Proporcional?">
        <p>O décimo terceiro proporcional é calculado com base nos meses trabalhados durante o ano. 
        Cada mês trabalhado ou fração superior a 15 dias dá direito a 1/12 do salário. 
        É pago quando o trabalhador não completou o ano inteiro na empresa.</p>
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
          label="Meses Trabalhados"
          id="mesesTrabalhados"
          type="number"
          value={mesesTrabalhados || ''}
          onChange={(e) => setMesesTrabalhados(Number(e.target.value))}
          placeholder="Digite o número de meses trabalhados"
          required
          min={0}
          max={12}
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
            label="Valor do Décimo Terceiro Proporcional:" 
            valor={formatarMoeda(resultado)} 
          />
          <div className="mt-4 text-sm text-gray-600">
            <p>Este é o valor proporcional do seu décimo terceiro salário, considerando {mesesTrabalhados} meses trabalhados.</p>
            <p className="mt-2">Cálculo: Salário Bruto × (Meses Trabalhados ÷ 12)</p>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
