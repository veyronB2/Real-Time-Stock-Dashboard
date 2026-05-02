import './styles/index.css';

import { AllEnterpriseModule } from 'ag-grid-enterprise';
import Dashboard from './components/Dashboard';
import { ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllEnterpriseModule]);

function App() {
  return (
      <Dashboard />
  );
}

export default App;
