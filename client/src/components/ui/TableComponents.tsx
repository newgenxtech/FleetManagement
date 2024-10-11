import "@/styles/TableComponent.css"

interface DataCol<T> {
  label: string | React.ReactNode;
  key: string
  render: (data: T) => React.ReactNode;
  sortable?: boolean;
  onSort?: (accessor: string) => void

}

interface TableComponentProps<T> {
  columns: DataCol<T>[] | undefined;
  data: T[],
  pagination: {
    currentPage: number,
    rowsPerPage: number
  },
  setPagination: (pagination: { currentPage: number, rowsPerPage: number }) => void
}

const TableComponent = <T,>(props: TableComponentProps<T>) => {



  console.log('props', props);

  // Calculate the data to be displayed on the current page
  const indexOfLastRow = props.pagination.currentPage * props.pagination.rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - props.pagination.rowsPerPage;
  const currentData = props.data.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate the total number of pages
  const totalPages = Math.ceil(props.data.length / props.pagination.rowsPerPage);
  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    // setCurrentPage(pageNumber);
    props.setPagination({ currentPage: pageNumber, rowsPerPage: props.pagination.rowsPerPage })
  };


  return (
    <>
      <div className="table-container">
        <table className="modern-table">
          {props.columns && (
            <thead>
              <tr>
                {props.columns.map((header, index) => (
                  <th
                    key={index}
                    onClick={() =>
                      header.sortable && header.onSort
                        ? header.onSort(header.key)
                        : undefined
                    }
                    style={{ cursor: header.sortable ? "pointer" : "default" }}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {props.data &&
              currentData.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  {props.columns &&
                    props.columns.map((col, colIndex) => (
                      <td key={colIndex}>{col.render(rowData)}</td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
        {/* implement pagination */}
      </div>
      <div
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <div className="flex gap-1">
          <span>{props.pagination.currentPage}</span>-<span>{totalPages}</span>
          <span>of</span>
          <span>{props.data.length}</span>
          <span>items</span>
        </div>
        {/* 
          // Page size dropdown 
        */}

        {/* show the first 2 and last 2 in middle 3 dot's */}
        <div className="flex gap-4">
          <button
            onClick={() => handlePageChange(1)}
            disabled={props.pagination.currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(props.pagination.currentPage - 1)}
            disabled={props.pagination.currentPage === 1}
          >
            {"<"}
          </button>
          <button
            onClick={() => handlePageChange(props.pagination.currentPage + 1)}
            disabled={props.pagination.currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={props.pagination.currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
        <select
          value={props.pagination.rowsPerPage}
          onChange={(e) =>
            props.setPagination({
              currentPage: 1,
              rowsPerPage: parseInt(e.target.value),
            })
          }
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((item, index) => (
            <option key={index} value={item * 10}>
              {item * 10} / page
            </option>
          ))}
        </select>
        <div
          className="flex gap-2 justify-center items-center"
        >
          <span>Go to</span>
          <input
            type="number"
            defaultValue={props.pagination.currentPage}
            onChange={(e) => {
              const pageNumber = parseInt(e.target.value);
              if (pageNumber > 0 && pageNumber <= totalPages) {
                handlePageChange(pageNumber);
              }
            }}
            className="px-2 py-1 border border-gray-300 rounded-md w-16"
          />
          <span>Page</span>
        </div>

      </div>
    </>
  );
}

export default TableComponent