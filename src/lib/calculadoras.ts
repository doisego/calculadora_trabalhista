// Funções de cálculo para as calculadoras trabalhistas

// Calculadora de FGTS
export function calcularFGTS(salarioBruto: number): number {
  return salarioBruto * 0.08;
}

// Calculadora de décimo terceiro proporcional
export function calcularDecimoTerceiroProporcional(
  salarioBruto: number,
  mesesTrabalhados: number
): number {
  return (salarioBruto * mesesTrabalhados) / 12;
}

// Calculadora de décimo terceiro salário
export function calcularDecimoTerceiroSalario(salarioBruto: number): number {
  return salarioBruto;
}

// Calculadora de férias
export function calcularFerias(
  salarioBruto: number,
  diasVendidos: number = 0,
  adicionarTerco: boolean = true
): {
  valorFerias: number;
  valorTercoConstitucional: number;
  valorDiasVendidos: number;
  valorTotal: number;
} {
  const valorFerias = salarioBruto;
  const valorTercoConstitucional = adicionarTerco ? salarioBruto / 3 : 0;
  const valorDiasVendidos = (salarioBruto / 30) * diasVendidos;
  const valorTotal = valorFerias + valorTercoConstitucional + valorDiasVendidos;

  return {
    valorFerias,
    valorTercoConstitucional,
    valorDiasVendidos,
    valorTotal,
  };
}

// Calculadora de horas extras
export function calcularHorasExtras(
  salarioBruto: number,
  horasExtras: number,
  percentualAdicional: number = 50,
  diasTrabalhados: number = 30,
  horasDiarias: number = 8
): number {
  const valorHoraNormal = salarioBruto / (diasTrabalhados * horasDiarias);
  const valorHoraExtra = valorHoraNormal * (1 + percentualAdicional / 100);
  return valorHoraExtra * horasExtras;
}

// Tabela de alíquotas do INSS 2023
const tabelaINSS2023 = [
  { limite: 1320.0, aliquota: 7.5 },
  { limite: 2571.29, aliquota: 9.0 },
  { limite: 3856.94, aliquota: 12.0 },
  { limite: 7507.49, aliquota: 14.0 },
];

// Calculadora de INSS
export function calcularINSS(salarioBruto: number): number {
  if (salarioBruto <= 0) return 0;

  let descontoINSS = 0;
  let faixaAnterior = 0;

  for (const faixa of tabelaINSS2023) {
    if (salarioBruto > faixaAnterior) {
      const baseCalculo = Math.min(salarioBruto, faixa.limite) - faixaAnterior;
      descontoINSS += (baseCalculo * faixa.aliquota) / 100;
      faixaAnterior = faixa.limite;
    }
  }

  // Teto de contribuição
  if (salarioBruto > tabelaINSS2023[tabelaINSS2023.length - 1].limite) {
    const tetoContribuicao = 876.97; // Valor máximo de contribuição em 2023
    return tetoContribuicao;
  }

  return descontoINSS;
}

// Tabela de alíquotas do IRRF 2023
const tabelaIRRF2023 = [
  { limite: 2112.0, aliquota: 0, deducao: 0 },
  { limite: 2826.65, aliquota: 7.5, deducao: 158.40 },
  { limite: 3751.05, aliquota: 15, deducao: 370.40 },
  { limite: 4664.68, aliquota: 22.5, deducao: 651.73 },
  { limite: Infinity, aliquota: 27.5, deducao: 884.96 },
];

// Calculadora de IRRF (Imposto de Renda)
export function calcularIRRF(
  salarioBruto: number,
  numeroDependentes: number = 0
): number {
  if (salarioBruto <= 0) return 0;

  // Desconto do INSS
  const descontoINSS = calcularINSS(salarioBruto);
  
  // Desconto por dependente
  const descontoPorDependente = 189.59 * numeroDependentes;
  
  // Base de cálculo
  const baseCalculo = salarioBruto - descontoINSS - descontoPorDependente;
  
  if (baseCalculo <= 0) return 0;
  
  // Encontrar a faixa de alíquota
  const faixa = tabelaIRRF2023.find(f => baseCalculo <= f.limite);
  
  if (!faixa) return 0;
  
  // Cálculo do IRRF
  const valorIRRF = (baseCalculo * faixa.aliquota) / 100 - faixa.deducao;
  
  return Math.max(0, valorIRRF);
}

// Calculadora de salário líquido
export function calcularSalarioLiquido(
  salarioBruto: number,
  numeroDependentes: number = 0,
  outrosDescontos: number = 0
): {
  salarioBruto: number;
  descontoINSS: number;
  descontoIRRF: number;
  outrosDescontos: number;
  salarioLiquido: number;
} {
  const descontoINSS = calcularINSS(salarioBruto);
  const descontoIRRF = calcularIRRF(salarioBruto, numeroDependentes);
  const salarioLiquido = salarioBruto - descontoINSS - descontoIRRF - outrosDescontos;

  return {
    salarioBruto,
    descontoINSS,
    descontoIRRF,
    outrosDescontos,
    salarioLiquido,
  };
}

// Calculadora de rescisão trabalhista CLT
export function calcularRescisaoCLT(
  salarioBruto: number,
  mesesTrabalhados: number,
  avisoPreviolndenizado: boolean = false,
  feriasVencidas: number = 0,
  saldoSalarioDias: number = 0,
  tipoRescisao: 'pedido' | 'sem_justa_causa' | 'com_justa_causa' = 'sem_justa_causa'
): {
  saldoSalario: number;
  decimoTerceiro: number;
  feriasVencidas: number;
  feriasProporcionais: number;
  avisoPreviolndenizado: number;
  multaFGTS: number;
  total: number;
} {
  // Saldo de salário
  const saldoSalario = (salarioBruto / 30) * saldoSalarioDias;
  
  // Décimo terceiro proporcional
  const decimoTerceiro = calcularDecimoTerceiroProporcional(salarioBruto, mesesTrabalhados % 12);
  
  // Férias vencidas
  const valorFeriasVencidas = feriasVencidas * (salarioBruto + salarioBruto / 3);
  
  // Férias proporcionais
  const feriasPropMeses = mesesTrabalhados % 12;
  const feriasProporcionais = (salarioBruto * feriasPropMeses / 12) + (salarioBruto * feriasPropMeses / 12 / 3);
  
  // Aviso prévio indenizado
  const valorAvisoPreviolndenizado = avisoPreviolndenizado ? salarioBruto : 0;
  
  // Multa FGTS (40% do saldo)
  let multaFGTS = 0;
  if (tipoRescisao === 'sem_justa_causa') {
    const saldoFGTS = salarioBruto * 0.08 * mesesTrabalhados;
    multaFGTS = saldoFGTS * 0.4;
  }
  
  // Total
  const total = saldoSalario + decimoTerceiro + valorFeriasVencidas + feriasProporcionais + valorAvisoPreviolndenizado + multaFGTS;
  
  return {
    saldoSalario,
    decimoTerceiro,
    feriasVencidas: valorFeriasVencidas,
    feriasProporcionais,
    avisoPreviolndenizado: valorAvisoPreviolndenizado,
    multaFGTS,
    total,
  };
}

// Calculadora de salário empregado doméstico
export function calcularSalarioEmpregadoDomestico(
  salarioBruto: number,
  diasTrabalhados: number = 30,
  valorValeTransporte: number = 0,
  outrosDescontos: number = 0
): {
  salarioBruto: number;
  descontoINSS: number;
  descontoIRRF: number;
  descontoValeTransporte: number;
  outrosDescontos: number;
  salarioLiquido: number;
} {
  // INSS do empregado doméstico (mesma tabela)
  const descontoINSS = calcularINSS(salarioBruto);
  
  // IRRF
  const descontoIRRF = calcularIRRF(salarioBruto);
  
  // Vale transporte (limitado a 6% do salário)
  const limiteVT = salarioBruto * 0.06;
  const descontoValeTransporte = valorValeTransporte > 0 ? Math.min(valorValeTransporte, limiteVT) : 0;
  
  // Salário líquido
  const salarioLiquido = salarioBruto - descontoINSS - descontoIRRF - descontoValeTransporte - outrosDescontos;
  
  return {
    salarioBruto,
    descontoINSS,
    descontoIRRF,
    descontoValeTransporte,
    outrosDescontos,
    salarioLiquido,
  };
}

// Calculadora de seguro desemprego
export function calcularSeguroDesemprego(
  ultimosSalarios: number[],
  mesesTrabalhados: number
): {
  elegivel: boolean;
  valorParcela: number;
  numeroParcelas: number;
  motivoInelegibilidade?: string;
} {
  // Verificar elegibilidade
  if (mesesTrabalhados < 12) {
    return {
      elegivel: false,
      valorParcela: 0,
      numeroParcelas: 0,
      motivoInelegibilidade: "Tempo de trabalho inferior a 12 meses nos últimos 18 meses."
    };
  }
  
  // Calcular média salarial
  const mediaSalarial = ultimosSalarios.reduce((a, b) => a + b, 0) / ultimosSalarios.length;
  
  // Calcular valor da parcela
  let valorParcela = 0;
  
  if (mediaSalarial <= 1968.36) {
    valorParcela = mediaSalarial * 0.8;
  } else if (mediaSalarial <= 3280.93) {
    valorParcela = 1574.69 + (mediaSalarial - 1968.36) * 0.5;
  } else {
    valorParcela = 2230.97; // Valor máximo em 2023
  }
  
  // Determinar número de parcelas
  let numeroParcelas = 0;
  
  if (mesesTrabalhados >= 12 && mesesTrabalhados <= 23) {
    numeroParcelas = 4;
  } else if (mesesTrabalhados >= 24 && mesesTrabalhados <= 35) {
    numeroParcelas = 5;
  } else if (mesesTrabalhados >= 36) {
    numeroParcelas = 6;
  }
  
  return {
    elegivel: true,
    valorParcela,
    numeroParcelas,
  };
}

// Função para gerar escala de trabalho
export function gerarEscalaTrabalho(
  tipoEscala: '5x2' | '6x1' | '12x36' | '4x2',
  dataInicio: Date,
  diasTotais: number
): {
  data: Date;
  tipo: 'trabalho' | 'folga';
}[] {
  const escala: { data: Date; tipo: 'trabalho' | 'folga' }[] = [];
  const dataAtual = new Date(dataInicio);
  
  for (let i = 0; i < diasTotais; i++) {
    const diaAtual = new Date(dataAtual);
    
    let tipo: 'trabalho' | 'folga' = 'trabalho';
    
    if (tipoEscala === '5x2') {
      // Escala 5x2 (folga no fim de semana)
      const diaSemana = diaAtual.getDay();
      tipo = diaSemana === 0 || diaSemana === 6 ? 'folga' : 'trabalho';
    } else if (tipoEscala === '6x1') {
      // Escala 6x1 (folga no domingo)
      const diaSemana = diaAtual.getDay();
      tipo = diaSemana === 0 ? 'folga' : 'trabalho';
    } else if (tipoEscala === '12x36') {
      // Escala 12x36 (um dia trabalha, outro folga)
      tipo = i % 2 === 0 ? 'trabalho' : 'folga';
    } else if (tipoEscala === '4x2') {
      // Escala 4x2 (quatro dias trabalha, dois folga)
      const ciclo = i % 6;
      tipo = ciclo < 4 ? 'trabalho' : 'folga';
    }
    
    escala.push({
      data: diaAtual,
      tipo,
    });
    
    // Avançar para o próximo dia
    dataAtual.setDate(dataAtual.getDate() + 1);
  }
  
  return escala;
}

// Função para formatar valores monetários
export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// Função para formatar datas
export function formatarData(data: Date): string {
  return data.toLocaleDateString('pt-BR');
}
