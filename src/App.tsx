import './styles/index.css';

import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { ModuleRegistry } from "ag-grid-community";

import Dashboard from './components/Dashboard';

ModuleRegistry.registerModules([AllEnterpriseModule]);

function App() {
  return (
      <Dashboard />
  );
}

export default App;
