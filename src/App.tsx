import './styles/index.css';

import { columnDefs, gridOptions } from './utils/agGrid/config';
import { useEffect, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { ModuleRegistry } from "ag-grid-community";
import { RootState } from './store/store';
import Table from './components/Table';
import { fetchStock } from './redux/reducers/stockReducer';
import { motion } from 'motion/react';
import { useAppDispatch } from './redux/hooks';
import { useSelector } from 'react-redux';

ModuleRegistry.registerModules([AllEnterpriseModule]);

function App() {
  const { stocks, isLoading } = useSelector((state: RootState) => state.app.stockManagement)
  const dispatch = useAppDispatch();
  const gridRef = useRef<AgGridReact>(null);

  useEffect(() => {
    dispatch(fetchStock()) 
  }, [dispatch]);

  return (
      <motion.div 
        className='main-wrapper' 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeIn' }}
      >
        <div className="dashboard-container">
          <div className="dashboard-header-eyebrow">Market Overview</div>
          <h1>Stock Dashboard</h1>
          <Table
            testId="tasks-table"
            gridRef={gridRef}
            rowData={stocks ?? []}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            loading={isLoading}
            pagination={true}
        />
        </div>
      </motion.div>
  );
}

export default App;
