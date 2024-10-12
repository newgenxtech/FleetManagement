import '@/styles/WarehouseListPage.css';
import SearchComponent from "@/components/SearchComponent";
import TableComponent from "@/components/ui/TableComponents";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import sortIcon from "@/assets/icons8-sort-30.png";
import { resetFilter, UpdateFilteredData, updatePagination, updateSort } from '@/services/driver/driverSlice';
import FilterIcon from '@/assets/icons8-filter-96.png';
import { useCallback } from 'react';
import { trimAndConvertToNumber } from '@/utils/utils';
import { DriverMasterData } from './Driver/Driver.Interface';
import { StoreInterface } from '@/Interfaces/interface';


const Vehicle = () => {
    const StoreData = useSelector((state: { driver: StoreInterface<DriverMasterData> }) => state.driver);
    const dispatch = useDispatch();



    const handleSearch = useCallback((data: string) => {
        console.log(data);
        const searchTerm = data.toLowerCase();

        const filteredData = StoreData.data.filter((row: DriverMasterData) => {
            return Object.values(row).some((value) => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(searchTerm);
                } else if (typeof value === 'number') {
                    return value.toString().includes(searchTerm);
                }
                return false;
            });
        });

        console.log(filteredData);
        if (filteredData.length === 0) {
            // alert('No Data Found');
        } else {
            dispatch(UpdateFilteredData(filteredData));
        }
    }, [StoreData.data, dispatch]);
    return (
        <div className='warehouse'>
            <div className="container">
                <label className="label">Vehicle Master</label>
                <SearchComponent
                    className="search-component"
                    placeholder="Search Driver"
                    onHandleChange={handleSearch}
                    postfix={<i className="fa fa-search" />}
                />
            </div>
            <div>

                <div className="filter-section">
                    <div className="filter-header">
                        <div className='filter-icon-container'>
                            <img src={FilterIcon} alt="filter" className='filterIcon' />
                            <span className="filter-title">Filters</span>
                        </div>
                        {
                            StoreData.filterData.length > 0 && StoreData.sortColumn &&
                            (

                                <button
                                    onClick={() => {
                                        dispatch(UpdateFilteredData([]));
                                        dispatch(resetFilter());
                                    }}
                                    className="clear-filter-button"
                                >
                                    Clear Filter
                                </button>
                            )
                        }
                    </div>

                    {
                        StoreData.filterData.length > 0 && (

                            StoreData.sortColumn && (
                                <div className="sort-info">
                                    <span>Sort By: <strong>{StoreData.sortColumn}</strong></span>
                                    <span>Sort Direction: <strong>{StoreData.sortDirection}</strong></span>
                                </div>
                            )

                        )
                    }
                </div>

            </div>

            <TableComponent
                columns={[
                    {
                        // label: 'Name',
                        label: (
                            <div className="sortable-icon-container">
                                <span>Vehicle Name</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'name',
                        render: (data: Partial<DriverMasterData>) => (
                            <Link to={`/warehouse/${data.code}`} className="link" >
                                {data.name}
                            </Link>
                        ),
                        sortable: true,
                        onSort: (columnKey: string) => {
                            dispatch(updateSort({
                                sortColumn: columnKey,
                                sortDirection: StoreData.sortDirection === 'asc' ? 'desc' : 'asc'
                            }));
                            // Warehouse-2205

                            const sortedData = [...StoreData.data].sort((a, b) => {
                                const numA = trimAndConvertToNumber(a.name, 'Warehouse-', '');
                                const numB = trimAndConvertToNumber(b.name, 'Warehouse-', '');

                                if (StoreData.sortDirection === 'asc') {
                                    return numA - numB;
                                } else {
                                    return numB - numA;
                                }
                            });
                            dispatch(UpdateFilteredData(sortedData));
                        }
                    },
                    {
                        // label: 'Name',
                        label: (
                            <div className="sortable-icon-container">
                                <span>Vehicle Type</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'name',
                        render: (data: Partial<DriverMasterData>) => (
                            <Link to={`/warehouse/${data.code}`} className="link" >
                                {data.name}
                            </Link>
                        ),
                        sortable: true,
                        onSort: (columnKey: string) => {
                            dispatch(updateSort({
                                sortColumn: columnKey,
                                sortDirection: StoreData.sortDirection === 'asc' ? 'desc' : 'asc'
                            }));
                            // Warehouse-2205

                            const sortedData = [...StoreData.data].sort((a, b) => {
                                const numA = trimAndConvertToNumber(a.name, 'Warehouse-', '');
                                const numB = trimAndConvertToNumber(b.name, 'Warehouse-', '');

                                if (StoreData.sortDirection === 'asc') {
                                    return numA - numB;
                                } else {
                                    return numB - numA;
                                }
                            });
                            dispatch(UpdateFilteredData(sortedData));
                        }
                    },
                    {
                        // label: 'Name',
                        label: (
                            <div className="sortable-icon-container">
                                <span>Vehicle Number</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'name',
                        render: (data: Partial<DriverMasterData>) => (
                            <Link to={`/warehouse/${data.code}`} className="link" >
                                {data.name}
                            </Link>
                        ),
                        sortable: true,
                        onSort: (columnKey: string) => {
                            dispatch(updateSort({
                                sortColumn: columnKey,
                                sortDirection: StoreData.sortDirection === 'asc' ? 'desc' : 'asc'
                            }));
                            // Warehouse-2205

                            const sortedData = [...StoreData.data].sort((a, b) => {
                                const numA = trimAndConvertToNumber(a.name, 'Warehouse-', '');
                                const numB = trimAndConvertToNumber(b.name, 'Warehouse-', '');

                                if (StoreData.sortDirection === 'asc') {
                                    return numA - numB;
                                } else {
                                    return numB - numA;
                                }
                            });
                            dispatch(UpdateFilteredData(sortedData));
                        }
                    },
                    {
                        // label: 'Name',
                        label: (
                            <div className="sortable-icon-container">
                                <span>Chassis Number</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'name',
                        render: (data: Partial<DriverMasterData>) => (
                            <Link to={`/warehouse/${data.code}`} className="link" >
                                {data.name}
                            </Link>
                        ),
                        sortable: true,
                        onSort: (columnKey: string) => {
                            dispatch(updateSort({
                                sortColumn: columnKey,
                                sortDirection: StoreData.sortDirection === 'asc' ? 'desc' : 'asc'
                            }));
                            // Warehouse-2205

                            const sortedData = [...StoreData.data].sort((a, b) => {
                                const numA = trimAndConvertToNumber(a.name, 'Warehouse-', '');
                                const numB = trimAndConvertToNumber(b.name, 'Warehouse-', '');

                                if (StoreData.sortDirection === 'asc') {
                                    return numA - numB;
                                } else {
                                    return numB - numA;
                                }
                            });
                            dispatch(UpdateFilteredData(sortedData));
                        }
                    },
                    // {
                    //     label: '',
                    //     key: 'Vehicle Type',
                    //     render: (data: Partial<WareHouseData>) => {
                    //         return <span>{data.type}</span>;
                    //     }
                    // },
                    // {
                    //     label: 'Address',
                    //     key: 'Address',
                    //     render: (data: Partial<WareHouseData>) => {
                    //         return <span>{data.city}</span>;
                    //     }
                    // },
                ]}
                data={
                    StoreData.filterData.length > 0 ? StoreData.filterData : StoreData.data
                }
                pagination={
                    {
                        currentPage: StoreData.currentPage,
                        rowsPerPage: StoreData.rowsPerPage,
                    }
                }
                setPagination={
                    (data: { currentPage: number, rowsPerPage: number }) => {
                        dispatch(updatePagination(data));
                    }
                }
            />
        </div >
    );
};

export default Vehicle;