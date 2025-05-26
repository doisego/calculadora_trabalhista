import { useState } from 'react';
import { gerarEscalaTrabalho, formatarData } from '../../lib/calculadoras';
import { 
  CalculadoraContainer, 
  InputField, 
  Button, 
  InfoCard,
  SelectField
} from '../ui/CalculadoraComponents';

export function SimuladorEscalaTrabalho() {
  const [tipoEscala, setTipoEscala] = useState<string>("5x2");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [diasTotais, setDiasTotais] = useState<number>(30);
  const [resultado, setResultado] = useState<{
    data: Date;
    tipo: 'trabalho' | 'folga';
  }[] | null>(null);

  const handleCalcular = () => {
    if (dataInicio && diasTotais > 0) {
      const dataInicioObj = new Date(dataInicio);
      const resultadoEscala = gerarEscalaTrabalho(
        tipoEscala as '5x2' | '6x1' | '12x36' | '4x2',
        dataInicioObj,
        diasTotais
      );
      setResultado(resultadoEscala);
    }
  };

  const handleLimpar = () => {
    setTipoEscala("5x2");
    setDataInicio("");
    setDiasTotais(30);
    setResultado(null);
  };

  return (
    <CalculadoraContainer>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Simulador de Escala de Trabalho</h2>
      
      <InfoCard titulo="O que é uma Escala de Trabalho?">
        <p>A escala de trabalho é um cronograma que define os dias de trabalho e folga do empregado. 
        Existem diversos tipos de escalas, como 5x2 (cinco dias de trabalho e dois de folga), 
        6x1 (seis dias de trabalho e um de folga), 12x36 (doze horas de trabalho e trinta e seis de folga) 
        e 4x2 (quatro dias de trabalho e dois de folga).</p>
      </InfoCard>
      
      <form onSubmit={(e) => { e.preventDefault(); handleCalcular(); }} className="mb-6">
        <SelectField
          label="Tipo de Escala"
          id="tipoEscala"
          value={tipoEscala}
          onChange={(e) => setTipoEscala(e.target.value)}
          options={[
            { value: "5x2", label: "5x2 (Segunda a Sexta)" },
            { value: "6x1", label: "6x1 (Folga no Domingo)" },
            { value: "12x36", label: "12x36 (Um dia sim, um dia não)" },
            { value: "4x2", label: "4x2 (Quatro dias trabalho, dois folga)" }
          ]}
          required
        />
        
        <InputField
          label="Data de Início"
          id="dataInicio"
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          required
        />
        
        <InputField
          label="Dias Totais a Simular"
          id="diasTotais"
          type="number"
          value={diasTotais || ''}
          onChange={(e) => setDiasTotais(Number(e.target.value))}
          placeholder="Digite o número de dias a simular"
          required
          min={1}
          max={90}
          step={1}
        />
        
        <div className="flex space-x-4 mt-6">
          <Button type="submit" variant="primary">
            Gerar Escala
          </Button>
          <Button type="button" variant="outline" onClick={handleLimpar}>
            Limpar
          </Button>
        </div>
      </form>
      
      {resultado !== null && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Escala de Trabalho</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Data</th>
                  <th className="py-2 px-4 border-b text-left">Dia da Semana</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {resultado.map((dia, index) => {
                  const dataFormatada = formatarData(dia.data);
                  const diaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(dia.data);
                  
                  return (
                    <tr key={index} className={dia.tipo === 'folga' ? 'bg-green-50' : ''}>
                      <td className="py-2 px-4 border-b">{dataFormatada}</td>
                      <td className="py-2 px-4 border-b">{diaSemana}</td>
                      <td className={`py-2 px-4 border-b font-medium ${dia.tipo === 'folga' ? 'text-green-600' : 'text-blue-600'}`}>
                        {dia.tipo === 'folga' ? 'Folga' : 'Trabalho'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Esta é a simulação da sua escala de trabalho para os próximos {diasTotais} dias.</p>
            <p className="mt-2">Tipo de escala: {tipoEscala}</p>
          </div>
        </div>
      )}
    </CalculadoraContainer>
  );
}
