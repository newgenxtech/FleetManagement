import '@/styles/WarehouseListPage.css';
import SearchComponent from "@/components/SearchComponent";
import TableComponent from "@/components/ui/TableComponents";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "@/Interfaces/interface";
import { Link } from "react-router-dom";
import sortIcon from "@/assets/icons8-sort-30.png";
import { resetFilter, UpdateFilteredData, updatePagination, updateSort } from '@/services/warehouse/warehouseSlice';
import FilterIcon from '@/assets/icons8-filter-96.png';
import { useCallback } from 'react';
import { trimAndConvertToNumber } from '@/utils/utils';
import { DriverMasterData } from './Driver.Interface';


const Driver = () => {
    const StoreData = useSelector((state: { warehouse: StoreInterface<DriverMasterData> }) => state.warehouse);
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
                <label className="label">Driver Master</label>
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
                                <span>Name</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'name',
                        render: (data: Partial<DriverMasterData>) => (
                            <Link to={`/driver/${data.name}`} className="link" >
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
                                const numA = trimAndConvertToNumber(a.name, '', '');
                                const numB = trimAndConvertToNumber(b.name, '', '');

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
                        label: 'Contact',
                        key: 'Contact',
                        render: (data: Partial<DriverMasterData>) => {
                            return <span>{data.contact}</span>;
                        }
                    },
                    {
                        label: 'Address',
                        key: 'Address',
                        render: (data: Partial<DriverMasterData>) => {
                            return <span>{data.address}</span>;
                        }
                    },
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

export default Driver;