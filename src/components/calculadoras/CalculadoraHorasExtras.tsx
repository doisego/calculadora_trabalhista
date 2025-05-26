import { useState } from 'react';
import { calcularHorasExtras, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard,
  SelectField
} from '../ui/CalculadoraComponents';

export function CalculadoraHorasExtras() {
  const [salarioBruto, setSalarioBruto] = useState<number>(0);
  const [horasExtras, setHorasExtras] = useState<number>(0);
  const [percentualAdicional, setPercentualAdicional] = useState<number>(50);
  const [diasTrabalhados, setDiasTrabalhados] = useState<number>(30);
  const [horasDiarias, setHorasDiarias] = useState<number>(8);
  const [resultado, setResultado] = useState<number | null>(null);

  const handleCalcular = () => {
    if (salarioBruto > 0 && horasExtras > 0) {
      const valorHorasExtras = calcularHorasExtras(
        salarioBruto,
        horasExtras,
        percentualAdicional,
        diasTrabalhados,
        horasDiarias
      );
      setResultado(valorHorasExtras);
    }
  };

  const handleLimpar = () => {
    setSalarioBruto(0);
    setHorasExtras(0);
    setPercentualAdicional(50);
    setDiasTrabalhados(30);
    setHorasDiarias(8);
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Horas Extras</h2>
      
      <InfoCard titulo="O que são Horas Extras?">
        <p>Horas extras são as horas trabalhadas além da jornada normal de trabalho. 
        Pela CLT, elas devem ser remuneradas com acréscimo de no mínimo 50% sobre o valor da hora normal. 
        Em domingos e feriados, o acréscimo é de no mínimo 100%.</p>
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
          label="Quantidade de Horas Extras"
          id="horasExtras"
          type="number"
          value={horasExtras || ''}
          onChange={(e) => setHorasExtras(Number(e.target.value))}
          placeholder="Digite a quantidade de horas extras"
          required
          min={0}
          step={0.5}
        />
        
        <InputField
          label="Percentual Adicional (%)"
          id="percentualAdicional"
          type="number"
          value={percentualAdicional || ''}
          onChange={(e) => setPercentualAdicional(Number(e.target.value))}
          placeholder="Digite o percentual adicional"
          required
          min={0}
          step={1}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            label="Horas Diárias de Trabalho"
            id="horasDiarias"
            type="number"
            value={horasDiarias || ''}
            onChange={(e) => setHorasDiarias(Number(e.target.value))}
            placeholder="Digite as horas diárias"
            required
            min={1}
            max={12}
            step={1}
          />
        </div>
        
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
            label="Valor das Horas Extras:" 
            valor={formatarMoeda(resultado)} 
          />
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Este é o valor total das suas horas extras.</p>
            <p className="mt-2">Valor da hora normal: {formatarMoeda((salarioBruto / (diasTrabalhados * horasDiarias)))}</p>
            <p>Valor da hora extra ({percentualAdicional}%): {formatarMoeda((salarioBruto / (diasTrabalhados * horasDiarias)) * (1 + percentualAdicional/100))}</p>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
