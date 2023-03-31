import { useEffect, useState } from "react"

const TableBody = ({toRender, columns}) => {

    const [toVerify, setToVerify] = useState([])

    useEffect(() => {
        if(toVerify.length < 1) {
            let toVerifyCopy = []
            columns.map((e) => {
                toVerifyCopy.push(e.ref)
            })
            setToVerify(toVerifyCopy)
        }
    }, [])

    return (
        <tbody className="tbody">
            {toRender !== null && toRender.map((row, index) => {
                return (
                    <tr key={index}>
                        {toVerify.length > 0 && columns.map((col) => {
                            if(toVerify.includes(col.ref)) {
                                return (
                                    <td key={col.ref} className="td">{row[col.ref]}</td>
                                )
                            } else {
                                return (
                                    <td key={col.ref} className="td"></td>
                                )
                            }
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody