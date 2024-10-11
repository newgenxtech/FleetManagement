import SearchComponent from "@/components/SearchComponent";
import TableComponent from "@/components/ui/TableComponents";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "@/Interfaces/interface";
import { Link, useSearchParams } from "react-router-dom";
import sortIcon from "@/assets/icons8-sort-30.png";
import { resetFilter, UpdateFilteredData, updatePagination, updateSort } from '@/services/driver/driverSlice';
import FilterIcon from '@/assets/icons8-filter-96.png';
import { useCallback, useState } from 'react';
import { trimAndConvertToNumber } from '@/utils/utils';
import { DriverMasterData } from './Driver.Interface';


const Driver = () => {
    const StoreData = useSelector((state: { driver: StoreInterface<DriverMasterData> }) => state.driver);
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const [rowSelected, setRowSelected] = useState<number[]>([]);
    console.log('rowSelected', rowSelected);


    const handleSearch = useCallback((data: string) => {
        console.log(data);

        console.log(data);
        const searchTerm = data.toLowerCase();
        if (searchTerm === '') {
            setSearchParams(
                (prev) => {
                    const params = new URLSearchParams(prev);
                    params.delete('search');
                    return params;
                }
            );
            dispatch(UpdateFilteredData([]));
            return;
        }
        setSearchParams(
            (prev) => {
                const params = new URLSearchParams(prev);
                params.set('search', searchTerm);
                return params;
            }
        );
        //! This is Client side Search Remove while integrating with API
        dispatch(UpdateFilteredData(
            StoreData.data.filter((row: DriverMasterData) => {
                return Object.values(row).some((value) => {
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(searchTerm);
                    } else if (typeof value === 'number') {
                        return value.toString().includes(searchTerm);
                    }
                    return false;
                });
            })
        ));

    }, [StoreData.data, dispatch, setSearchParams]);

    const handleSingleCheckox = useCallback((e: React.MouseEvent<HTMLInputElement, MouseEvent>, data: Partial<DriverMasterData>) => {
        setRowSelected(
            (prev) => {
                if ((e.target as HTMLInputElement).checked) {
                    return [...prev, data.id!];
                } else {
                    return prev.filter((id) => id !== data.id);
                }
            })
    }, [])

    const handleAllCheckbox = useCallback((e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        console.log((e.target as HTMLInputElement).checked);
        setRowSelected(
            () => {
                if ((e.target as HTMLInputElement).checked) {
                    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                        (checkbox as HTMLInputElement).checked = true;

                    });
                    return StoreData.data.map((row) => row.id!);
                } else {
                    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                        (checkbox as HTMLInputElement).checked = false;
                    });
                    return [];
                }
            })
    }, [StoreData.data])

    return (
        <div className='
        
        '>
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
                        label: (
                            <input type="checkbox" onClick={handleAllCheckbox}
                                className="border border-gray-900 rounded-md size-4"
                            />
                        ),
                        key: 'checkbox',
                        render: (data: Partial<DriverMasterData>) => {
                            return <input
                                type="checkbox"
                                defaultChecked={rowSelected.includes(data.id!)}
                                onClick={
                                    (e) => {
                                        handleSingleCheckox(e, data)
                                    }
                                }
                                className="border border-gray-300 rounded-md size-4"
                            />;
                        },
                        width: '5%'
                    },
                    {
                        // label: 'Name',
                        label: (
                            <div className="flex gap-4 justify-start items-center">
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
                            <Link to={`${data.id}`} className="link" >
                                {data.name}
                            </Link>
                        ),
                        sortable: true,
                        onSort: (columnKey: string) => {
                            console.log('columnKey', columnKey);


                            dispatch(updateSort({
                                sortColumn: columnKey,
                                sortDirection: StoreData.sortDirection === 'asc' ? 'desc' : 'asc'
                            }));
                            // Warehouse-2205

                            //! This is Client side sort Remove while integrating with API
                            const sortedData = [...StoreData.data].sort((a, b) => {
                                const numA = trimAndConvertToNumber(a.name, 'D-', '');
                                const numB = trimAndConvertToNumber(b.name, 'D-', '');

                                if (StoreData.sortDirection === 'asc') {
                                    return numA - numB;
                                } else {
                                    return numB - numA;
                                }
                            });
                            dispatch(UpdateFilteredData(sortedData));
                            setSearchParams(
                                (prev) => {
                                    const params = new URLSearchParams(prev);
                                    params.set('sort', columnKey);
                                    params.set('order', StoreData.sortDirection === 'asc' ? 'desc' : 'asc');
                                    return params;
                                }
                            );
                        }
                    },
                    {
                        label: 'Address',
                        key: 'Address',
                        render: (data: Partial<DriverMasterData>) => {
                            return <span>{data.address}</span>;
                        }
                    },
                    {
                        label: 'Contact',
                        key: 'Contact',
                        render: (data: Partial<DriverMasterData>) => {
                            return <span>{data.contact}</span>;
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

export default Driver;