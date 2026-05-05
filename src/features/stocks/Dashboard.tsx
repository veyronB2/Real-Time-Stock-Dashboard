import { columnDefs, gridOptions } from './dashboard.config';
import { useEffect, useRef, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { RootState } from '../../store/store';
import Table from '../../shared/ui/Table';
import { fetchStocks } from './slices/stocks.slice';
import { motion } from 'motion/react';
import { subscribeToStockUpdates } from './services/mockStockService';
import { useAppDispatch } from '../../store/hooks';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { stocks, isLoading } = useSelector((state: RootState) => state.app.stocks);
    const dispatch = useAppDispatch();
    const gridRef = useRef<AgGridReact>(null);
    const [isGridReady, setIsGridReady] = useState(false);

    useEffect(() => {
        dispatch(fetchStocks());
    }, [dispatch]);

    useEffect(() => {
        if (!isGridReady || stocks.length === 0) {
            return;
        }

        const unsubscribe = subscribeToStockUpdates((updatedStock) => {
            gridRef.current?.api.applyTransactionAsync({
                update: [updatedStock],
            });
        });

        return unsubscribe;
    }, [isGridReady, stocks]);

    const onGridReady = () => {
        setIsGridReady(true);
    };

    return (
        <motion.div
            className="main-wrapper"
            initial={{ opacity: 0, scale: 0.82, filter: 'blur(18px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
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
                    onGridReady={onGridReady}
                    pagination={true}
                />
            </div>
        </motion.div>
    );
};

export default Dashboard;