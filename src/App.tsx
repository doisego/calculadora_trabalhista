import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CalculadoraFGTS } from './components/calculadoras/CalculadoraFGTS';
import { CalculadoraDecimoTerceiroProporcional } from './components/calculadoras/CalculadoraDecimoTerceiroProporcional';
import { CalculadoraDecimoTerceiroSalario } from './components/calculadoras/CalculadoraDecimoTerceiroSalario';
import { CalculadoraFerias } from './components/calculadoras/CalculadoraFerias';
import { CalculadoraHorasExtras } from './components/calculadoras/CalculadoraHorasExtras';
import { CalculadoraINSS } from './components/calculadoras/CalculadoraINSS';
import { CalculadoraIRRF } from './components/calculadoras/CalculadoraIRRF';
import { CalculadoraRescisaoCLT } from './components/calculadoras/CalculadoraRescisaoCLT';
import { CalculadoraSalarioEmpregadoDomestico } from './components/calculadoras/CalculadoraSalarioEmpregadoDomestico';
import { CalculadoraSalarioLiquido } from './components/calculadoras/CalculadoraSalarioLiquido';
import { CalculadoraSeguroDesemprego } from './components/calculadoras/CalculadoraSeguroDesemprego';
import { SimuladorEscalaTrabalho } from './components/calculadoras/SimuladorEscalaTrabalho';
import { SobrePage } from './pages/SobrePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/fgts" element={<CalculadoraFGTS />} />
          <Route path="/decimo-terceiro-proporcional" element={<CalculadoraDecimoTerceiroProporcional />} />
          <Route path="/decimo-terceiro" element={<CalculadoraDecimoTerceiroSalario />} />
          <Route path="/ferias" element={<CalculadoraFerias />} />
          <Route path="/horas-extras" element={<CalculadoraHorasExtras />} />
          <Route path="/inss" element={<CalculadoraINSS />} />
          <Route path="/irrf" element={<CalculadoraIRRF />} />
          <Route path="/rescisao" element={<CalculadoraRescisaoCLT />} />
          <Route path="/domestico" element={<CalculadoraSalarioEmpregadoDomestico />} />
          <Route path="/salario-liquido" element={<CalculadoraSalarioLiquido />} />
          <Route path="/seguro-desemprego" element={<CalculadoraSeguroDesemprego />} />
          <Route path="/escala-trabalho" element={<SimuladorEscalaTrabalho />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
