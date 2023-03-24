const TableHead = ({columns, setToRender, toRender}) => {

    const sortTable = (ref) => {
        let dataToSort = toRender
        dataToSort.sort((a, b) => {
            if(a[ref] < b[ref]) {
                return -1
            }
            if(a[ref] > b[ref]) {
                return 1
            }

            return 0
        })

        console.log(dataToSort)
        setToRender(dataToSort)
    }

    return (
        <thead className="thead">
            <tr>
                {columns.map((column, index) => {
                    if(column.orderable) {
                        return ( 
                            <th key={index}>{column.name} <button onClick={() => {sortTable(column.ref)}}>Trier</button></th>
                        )
                    } else {
                        return (
                            <th key={index}>{column.name}</th>
                        )
                    }
                })}
            </tr>
        </thead>
    )
}

export default TableHead