import { useState } from 'react';
import { calcularSalarioEmpregadoDomestico, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard
} from '../ui/CalculadoraComponents';

export function CalculadoraSalarioEmpregadoDomestico() {
  const [salarioBruto, setSalarioBruto] = useState<number>(0);
  const [diasTrabalhados, setDiasTrabalhados] = useState<number>(30);
  const [valorValeTransporte, setValorValeTransporte] = useState<number>(0);
  const [outrosDescontos, setOutrosDescontos] = useState<number>(0);
  const [resultado, setResultado] = useState<{
    salarioBruto: number;
    descontoINSS: number;
    descontoIRRF: number;
    descontoValeTransporte: number;
    outrosDescontos: number;
    salarioLiquido: number;
  } | null>(null);

  const handleCalcular = () => {
    if (salarioBruto > 0) {
      const resultadoSalario = calcularSalarioEmpregadoDomestico(
        salarioBruto,
        diasTrabalhados,
        valorValeTransporte,
        outrosDescontos
      );
      setResultado(resultadoSalario);
    }
  };

  const handleLimpar = () => {
    setSalarioBruto(0);
    setDiasTrabalhados(30);
    setValorValeTransporte(0);
    setOutrosDescontos(0);
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Salário Empregado Doméstico</h2>
      
      <InfoCard titulo="O que é o Empregado Doméstico?">
        <p>O empregado doméstico é aquele que presta serviços de forma contínua, subordinada, onerosa e pessoal, 
        de finalidade não lucrativa, à pessoa ou à família, no âmbito residencial destas. Desde 2015, com a 
        Lei Complementar 150, os empregados domésticos passaram a ter direitos equiparados aos demais trabalhadores.</p>
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
          label="Dias Trabalhados no Mês"
          id="diasTrabalhados"
          type="number"
          value={diasTrabalhados || ''}
          onChange={(e) => setDiasTrabalhados(Number(e.target.value))}
          placeholder="Digite os dias trabalhados"
          required
          min={1}
          max={31}
          step={1}
        />
        
        <InputField
          label="Valor do Vale Transporte (R$)"
          id="valorValeTransporte"
          type="number"
          value={valorValeTransporte || ''}
          onChange={(e) => setValorValeTransporte(Number(e.target.value))}
          placeholder="Digite o valor do vale transporte"
          min={0}
          step={0.01}
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
            
            {resultado.descontoValeTransporte > 0 && (
              <ResultadoDisplay 
                label="Desconto Vale Transporte:" 
                valor={formatarMoeda(resultado.descontoValeTransporte)} 
              />
            )}
            
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
            <p>Este é o valor líquido que o empregado doméstico receberá após todos os descontos.</p>
            <p className="mt-2">Obs: O desconto do vale transporte é limitado a 6% do salário bruto.</p>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
