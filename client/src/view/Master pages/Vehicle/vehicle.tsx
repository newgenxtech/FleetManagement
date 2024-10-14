import '@/styles/WarehouseListPage.css';
import SearchComponent from "@/components/SearchComponent";
import TableComponent from "@/components/ui/TableComponents";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import sortIcon from "@/assets/icons8-sort-30.png";
import { resetFilter, UpdateFilteredData, updatePagination, updateSort } from '@/services/Vehicle/vehicleSlice';
import FilterIcon from '@/assets/icons8-filter-96.png';
import { useCallback } from 'react';
import { trimAndConvertToNumber } from '@/utils/utils';
import { VehicleMasterData } from '@/view/Master pages/Vehicle/Vehicle.Interface';
import { StoreInterface } from '@/Interfaces/interface';
import { getDDMMYYYY } from '@/lib/utils';


const Vehicle = () => {
    const StoreData = useSelector((state: { vehicle: StoreInterface<VehicleMasterData> }) => state.vehicle);
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    // const [rowSelected, setRowSelected] = useState<number[]>([]);

    const handleSearch = useCallback((data: string) => {
        console.log(data);
        const searchTerm = data.toLowerCase();

        const filteredData = StoreData.data.filter((row: VehicleMasterData) => {
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
                                        setSearchParams(
                                            (prev) => {
                                                searchParams.delete('search');
                                                return {
                                                    ...prev
                                                }
                                            }
                                        )

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
                                <span>Vehicle Number</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'vehicle_number',
                        render: (data: Partial<VehicleMasterData>) => (
                            <Link to={`${data.id}`} className="link" >
                                {data.vehicle_number}
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
                                const numA = trimAndConvertToNumber(a.vehicle_number, 'Warehouse-', '');
                                const numB = trimAndConvertToNumber(b.vehicle_number, 'Warehouse-', '');

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
                        label: (
                            <div className="sortable-icon-container">
                                <span>Vehicle Type</span>
                            </div>
                        ),
                        key: 'vehicle_type',
                        render: (data: Partial<VehicleMasterData>) => (
                            <span>{data.vehicle_type}</span>
                        ),
                    },
                    {

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
                        key: 'vehicle_number',
                        render: (data: Partial<VehicleMasterData>) => (
                            <span>{data.vehicle_number}</span>
                        )
                    },
                    {
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
                        key: 'chassis_number',
                        render: (data: Partial<VehicleMasterData>) => (
                            <span>{data.chassis_number}</span>
                        )
                    },
                    {
                        label: (
                            <div className="sortable-icon-container">
                                <span>Chassis</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'chassis',
                        render: (data: Partial<VehicleMasterData>) => (
                            <span>{data.chassis}</span>
                        )
                    },
                    {
                        label: (
                            <div className="sortable-icon-container">
                                <span>No of Tyres</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'no_of_tyres',
                        render: (data: Partial<VehicleMasterData>) => (
                            <span>{data.no_of_tyres}</span>
                        )
                    },
                    {
                        label: (
                            <div className="sortable-icon-container">
                                <span>Fast Tag Id</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'fast_tag_id',
                        render: (data: Partial<VehicleMasterData>) => (
                            <span>{data.fast_tag_id}</span>
                        )
                    },
                    {
                        label: (
                            <div className="sortable-icon-container">
                                <span>Insurance Number</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'insurance_number',
                        render: (data: Partial<VehicleMasterData>) => (
                            <span>{data.insurance_number}</span>
                        )
                    },
                    {
                        label: (
                            <div className="sortable-icon-container">
                                <span>Insurance Exp Date</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'insurance_exp_date',
                        render: (data: Partial<VehicleMasterData>) => (
                            <span>{getDDMMYYYY(data.insurance_exp_date as Date)}</span>
                        )
                    },
                    {
                        label: (
                            <div className="sortable-icon-container">
                                <span>Road Tax Exp Date</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'roadta_exp_date',
                        render: (data: Partial<VehicleMasterData>) => (
                            <span>{getDDMMYYYY(data.roadta_exp_date as Date)}</span>
                        )
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
                        setSearchParams(
                            (prev) => {
                                const params = new URLSearchParams(prev);
                                params.set('page', data.currentPage.toString());
                                params.set('limit', data.rowsPerPage.toString());
                                return params;
                            }
                        );
                        dispatch(updatePagination(data));
                    }
                }
            />
        </div >
    );
};

export default Vehicle;