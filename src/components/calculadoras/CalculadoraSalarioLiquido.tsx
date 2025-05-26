import { useState } from 'react';
import { calcularSalarioLiquido, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard
} from '../ui/CalculadoraComponents';

export function CalculadoraSalarioLiquido() {
  const [salarioBruto, setSalarioBruto] = useState<number>(0);
  const [numeroDependentes, setNumeroDependentes] = useState<number>(0);
  const [outrosDescontos, setOutrosDescontos] = useState<number>(0);
  const [resultado, setResultado] = useState<{
    salarioBruto: number;
    descontoINSS: number;
    descontoIRRF: number;
    outrosDescontos: number;
    salarioLiquido: number;
  } | null>(null);

  const handleCalcular = () => {
    if (salarioBruto > 0) {
      const resultadoSalario = calcularSalarioLiquido(
        salarioBruto,
        numeroDependentes,
        outrosDescontos
      );
      setResultado(resultadoSalario);
    }
  };

  const handleLimpar = () => {
    setSalarioBruto(0);
    setNumeroDependentes(0);
    setOutrosDescontos(0);
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Salário Líquido</h2>
      
      <InfoCard titulo="O que é o Salário Líquido?">
        <p>O salário líquido é o valor que o trabalhador efetivamente recebe após todos os descontos legais 
        e contratuais. Os principais descontos são o INSS, o Imposto de Renda (IRRF) e outros descontos 
        como plano de saúde, vale-transporte, pensão alimentícia, etc.</p>
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
        
        <InputField
          label="Outros Descontos (R$)"
          id="outrosDescontos"
          type="number"
          value={outrosDescontos || ''}
          onChange={(e) => setOutrosDescontos(Number(e.target.value))}
          placeholder="Digite o valor de outros descontos"
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
          
          <div className="space-y-3">
            <ResultadoDisplay 
              label="Salário Bruto:" 
              valor={formatarMoeda(resultado.salarioBruto)} 
            />
            
            <ResultadoDisplay 
              label="Desconto INSS:" 
              valor={formatarMoeda(resultado.descontoINSS)} 
            />
            
            <ResultadoDisplay 
              label="Desconto IRRF:" 
              valor={formatarMoeda(resultado.descontoIRRF)} 
            />
            
            {resultado.outrosDescontos > 0 && (
              <ResultadoDisplay 
                label="Outros Descontos:" 
                valor={formatarMoeda(resultado.outrosDescontos)} 
              />
            )}
            
            <ResultadoDisplay 
              label="Salário Líquido:" 
              valor={formatarMoeda(resultado.salarioLiquido)} 
            />
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Este é o valor líquido que você receberá após todos os descontos.</p>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
