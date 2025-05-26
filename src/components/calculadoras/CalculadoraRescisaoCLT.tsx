import { useState } from 'react';
import { calcularRescisaoCLT, formatarMoeda } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  ResultadoDisplay,
  InfoCard,
  SelectField
} from '../ui/CalculadoraComponents';

export function CalculadoraRescisaoCLT() {
  const [salarioBruto, setSalarioBruto] = useState<number>(0);
  const [mesesTrabalhados, setMesesTrabalhados] = useState<number>(0);
  const [avisoPreviolndenizado, setAvisoPreviolndenizado] = useState<string>("sim");
  const [feriasVencidas, setFeriasVencidas] = useState<number>(0);
  const [saldoSalarioDias, setSaldoSalarioDias] = useState<number>(0);
  const [tipoRescisao, setTipoRescisao] = useState<string>("sem_justa_causa");
  const [resultado, setResultado] = useState<{
    saldoSalario: number;
    decimoTerceiro: number;
    feriasVencidas: number;
    feriasProporcionais: number;
    avisoPreviolndenizado: number;
    multaFGTS: number;
    total: number;
  } | null>(null);

  const handleCalcular = () => {
    if (salarioBruto > 0 && mesesTrabalhados > 0) {
      const resultadoRescisao = calcularRescisaoCLT(
        salarioBruto,
        mesesTrabalhados,
        avisoPreviolndenizado === "sim",
        feriasVencidas,
        saldoSalarioDias,
        tipoRescisao as 'pedido' | 'sem_justa_causa' | 'com_justa_causa'
      );
      setResultado(resultadoRescisao);
    }
  };

  const handleLimpar = () => {
    setSalarioBruto(0);
    setMesesTrabalhados(0);
    setAvisoPreviolndenizado("sim");
    setFeriasVencidas(0);
    setSaldoSalarioDias(0);
    setTipoRescisao("sem_justa_causa");
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Rescisão Trabalhista CLT</h2>
      
      <InfoCard titulo="O que é a Rescisão Trabalhista?">
        <p>A rescisão trabalhista é o encerramento do contrato de trabalho entre empregador e empregado. 
        Os valores a receber dependem do tipo de rescisão (sem justa causa, com justa causa ou pedido de demissão), 
        do tempo de serviço e de outros fatores como férias vencidas e saldo de salário.</p>
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
          step={1}
        />
        
        <SelectField
          label="Tipo de Rescisão"
          id="tipoRescisao"
          value={tipoRescisao}
          onChange={(e) => setTipoRescisao(e.target.value)}
          options={[
            { value: "sem_justa_causa", label: "Demissão sem justa causa" },
            { value: "com_justa_causa", label: "Demissão com justa causa" },
            { value: "pedido", label: "Pedido de demissão" }
          ]}
        />
        
        <SelectField
          label="Aviso Prévio Indenizado"
          id="avisoPreviolndenizado"
          value={avisoPreviolndenizado}
          onChange={(e) => setAvisoPreviolndenizado(e.target.value)}
          options={[
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" }
          ]}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Férias Vencidas (períodos)"
            id="feriasVencidas"
            type="number"
            value={feriasVencidas || ''}
            onChange={(e) => setFeriasVencidas(Number(e.target.value))}
            placeholder="Digite o número de períodos de férias vencidas"
            min={0}
            step={1}
          />
          
          <InputField
            label="Saldo de Salário (dias)"
            id="saldoSalarioDias"
            type="number"
            value={saldoSalarioDias || ''}
            onChange={(e) => setSaldoSalarioDias(Number(e.target.value))}
            placeholder="Digite os dias trabalhados no mês da rescisão"
            min={0}
            max={31}
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
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Resultado da Rescisão</h3>
          
          <div className="space-y-3">
            {resultado.saldoSalario > 0 && (
              <ResultadoDisplay 
                label="Saldo de Salário:" 
                valor={formatarMoeda(resultado.saldoSalario)} 
              />
            )}
            
            {resultado.decimoTerceiro > 0 && (
              <ResultadoDisplay 
                label="Décimo Terceiro Proporcional:" 
                valor={formatarMoeda(resultado.decimoTerceiro)} 
              />
            )}
            
            {resultado.feriasVencidas > 0 && (
              <ResultadoDisplay 
                label="Férias Vencidas:" 
                valor={formatarMoeda(resultado.feriasVencidas)} 
              />
            )}
            
            {resultado.feriasProporcionais > 0 && (
              <ResultadoDisplay 
                label="Férias Proporcionais:" 
                valor={formatarMoeda(resultado.feriasProporcionais)} 
              />
            )}
            
            {resultado.avisoPreviolndenizado > 0 && (
              <ResultadoDisplay 
                label="Aviso Prévio Indenizado:" 
                valor={formatarMoeda(resultado.avisoPreviolndenizado)} 
              />
            )}
            
            {resultado.multaFGTS > 0 && (
              <ResultadoDisplay 
                label="Multa FGTS (40%):" 
                valor={formatarMoeda(resultado.multaFGTS)} 
              />
            )}
            
            <ResultadoDisplay 
              label="Total da Rescisão:" 
              valor={formatarMoeda(resultado.total)} 
            />
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Este é o valor bruto da sua rescisão. Sobre alguns valores ainda podem incidir descontos de INSS e Imposto de Renda.</p>
            <p className="mt-2 text-xs">Obs: Esta é uma estimativa. Consulte um profissional especializado para valores exatos.</p>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
