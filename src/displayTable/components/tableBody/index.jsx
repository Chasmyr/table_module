const TableBody = ({toRender}) => {

    return (
        <tbody className="tbody">
            {toRender !== null && toRender.map((row, index) => {
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