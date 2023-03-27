const TableHead = ({config, sortTable }) => {
    return (
        <thead className="thead">
                    <tr>
                        {config.columns.map((column, index) => {
                            if(column.orderable) {
                                return ( 
                                    <th key={index}>{column.name} 
                                        <button onClick={() => sortTable(column.ref, 'up')}>Trier</button>
                                        <button onClick={() => sortTable(column.ref, 'down')}>Trier</button>
                                    </th>
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