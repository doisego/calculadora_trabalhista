import { useState } from 'react';
import { calcularFerias, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard,
  SelectField
} from '../ui/CalculadoraComponents';

export function CalculadoraFerias() {
  const [salarioBruto, setSalarioBruto] = useState<number>(0);
  const [diasVendidos, setDiasVendidos] = useState<number>(0);
  const [adicionarTerco, setAdicionarTerco] = useState<string>("sim");
  const [resultado, setResultado] = useState<{
    valorFerias: number;
    valorTercoConstitucional: number;
    valorDiasVendidos: number;
    valorTotal: number;
  } | null>(null);

  const handleCalcular = () => {
    if (salarioBruto > 0) {
      const resultadoFerias = calcularFerias(
        salarioBruto, 
        diasVendidos, 
        adicionarTerco === "sim"
      );
      setResultado(resultadoFerias);
    }
  };

  const handleLimpar = () => {
    setSalarioBruto(0);
    setDiasVendidos(0);
    setAdicionarTerco("sim");
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Férias</h2>
      
      <InfoCard titulo="O que são as Férias Remuneradas?">
        <p>Todo trabalhador com carteira assinada tem direito a 30 dias de férias remuneradas após 
        completar 12 meses de trabalho. Além do salário normal, o trabalhador recebe um adicional 
        de 1/3 do salário (terço constitucional). É possível vender até 10 dias das férias.</p>
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
          label="Dias Vendidos (máximo 10)"
          id="diasVendidos"
          type="number"
          value={diasVendidos || ''}
          onChange={(e) => setDiasVendidos(Number(e.target.value))}
          placeholder="Digite o número de dias vendidos"
          min={0}
          max={10}
          step={1}
        />
        
        <SelectField
          label="Adicionar Terço Constitucional"
          id="adicionarTerco"
          value={adicionarTerco}
          onChange={(e) => setAdicionarTerco(e.target.value)}
          options={[
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" }
          ]}
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
          
          <div className="space-y-3">
            <ResultadoDisplay 
              label="Valor das Férias:" 
              valor={formatarMoeda(resultado.valorFerias)} 
            />
            
            <ResultadoDisplay 
              label="Terço Constitucional:" 
              valor={formatarMoeda(resultado.valorTercoConstitucional)} 
            />
            
            {resultado.valorDiasVendidos > 0 && (
              <ResultadoDisplay 
                label="Valor dos Dias Vendidos:" 
                valor={formatarMoeda(resultado.valorDiasVendidos)} 
              />
            )}
            
            <ResultadoDisplay 
              label="Valor Total das Férias:" 
              valor={formatarMoeda(resultado.valorTotal)} 
            />
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Este é o valor bruto das suas férias. Sobre este valor ainda incidem descontos de INSS e Imposto de Renda.</p>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
