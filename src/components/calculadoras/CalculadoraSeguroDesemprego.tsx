import { useState } from 'react';
import { calcularSeguroDesemprego, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard
} from '../ui/CalculadoraComponents';

export function CalculadoraSeguroDesemprego() {
  const [ultimosSalarios, setUltimosSalarios] = useState<string>("");
  const [mesesTrabalhados, setMesesTrabalhados] = useState<number>(0);
  const [resultado, setResultado] = useState<{
    elegivel: boolean;
    valorParcela: number;
    numeroParcelas: number;
    motivoInelegibilidade?: string;
  } | null>(null);

  const handleCalcular = () => {
    if (mesesTrabalhados > 0 && ultimosSalarios.trim() !== "") {
      // Converter a string de salários em um array de números
      const salarios = ultimosSalarios
        .split(",")
        .map(s => parseFloat(s.trim()))
        .filter(s => !isNaN(s) && s > 0);
      
      if (salarios.length > 0) {
        const resultadoSeguro = calcularSeguroDesemprego(salarios, mesesTrabalhados);
        setResultado(resultadoSeguro);
      }
    }
  };

  const handleLimpar = () => {
    setUltimosSalarios("");
    setMesesTrabalhados(0);
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Seguro Desemprego</h2>
      
      <InfoCard titulo="O que é o Seguro Desemprego?">
        <p>O Seguro Desemprego é um benefício temporário concedido ao trabalhador desempregado, 
        dispensado sem justa causa. O valor e o número de parcelas dependem do tempo trabalhado 
        e da média salarial dos últimos meses. Para ter direito, é necessário ter trabalhado 
        por pelo menos 12 meses nos últimos 18 meses.</p>
      </InfoCard>
      
      <form onSubmit={(e) => { e.preventDefault(); handleCalcular(); }} className="mb-6">
        <InputField
          label="Últimos Salários (separados por vírgula)"
          id="ultimosSalarios"
          type="text"
          value={ultimosSalarios}
          onChange={(e) => setUltimosSalarios(e.target.value)}
          placeholder="Ex: 2500, 2500, 2600"
          required
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
          
          {resultado.elegivel ? (
            <div className="space-y-3">
              <ResultadoDisplay 
                label="Valor da Parcela:" 
                valor={formatarMoeda(resultado.valorParcela)} 
              />
              
              <ResultadoDisplay 
                label="Número de Parcelas:" 
                valor={resultado.numeroParcelas} 
              />
              
              <ResultadoDisplay 
                label="Valor Total do Benefício:" 
                valor={formatarMoeda(resultado.valorParcela * resultado.numeroParcelas)} 
              />
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Você tem direito a receber {resultado.numeroParcelas} parcelas de {formatarMoeda(resultado.valorParcela)}.</p>
                <p className="mt-2 text-xs">Obs: Esta é uma estimativa. Consulte o Ministério do Trabalho para valores exatos.</p>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-700 font-medium">Você não está elegível para o seguro desemprego.</p>
              {resultado.motivoInelegibilidade && (
                <p className="mt-2 text-red-600">{resultado.motivoInelegibilidade}</p>
              )}
            </div>
          )}
        </div>
      )}
    </CalculadoraContainer>
  );
}
