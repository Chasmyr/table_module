const TableHead = ({columns}) => {

    return (
        <thead className="thead">
            <tr>
                {columns.map((column, index) => {
                    if(column.orderable) {
                        return (
                            <th key={index}>{column.name} triable</th>
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