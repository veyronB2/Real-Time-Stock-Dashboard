import './styles/index.css';

import { columnDefs, gridOptions } from './utils/agGrid/config';
import { useEffect, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import Header from './components/Header';
import { ModuleRegistry } from "ag-grid-community";
import { RootState } from './store/store';
import Table from './components/Table';
import { fetchStock } from './redux/reducers/stockReducer';
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
      <div className='main-wrapper'>
        <Header/>
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
  );
}

export default App;
