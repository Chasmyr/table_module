const TableBody = ({rows}) => {

    return (
        <tbody className="tbody">
            {rows.map((row, index) => {
                return (
                    <tr key={index}>
                        {Object.keys(row).map((key) => {
                            return (
                                <td key={key}>{row[key]}</td>
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody