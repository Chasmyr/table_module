import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

const TableHead = ({config, sortTable }) => {

    const [sortOrder, setSortOrder] = useState([])

    useEffect(() => {
        if(sortOrder.length < 1) {
            let sortOrderCopy = sortOrder
            config.columns.map((e) => {
                sortOrderCopy[e.ref] = 'down'
            })
            setSortOrder(sortOrderCopy)
        }
    }, [])

    const handleChevron = (ref, direction) => {
        sortTable(ref, direction)
        let sortOrderCopy = sortOrder
        Object.keys(sortOrderCopy).map((e) => {
            if(e === ref) {
                if(direction === 'up') {
                    sortOrderCopy[ref] = 'down'
                } else {
                    sortOrderCopy[ref] = 'up'
                }
            } else {
                sortOrderCopy[e] = 'down'
            }
        })
        setSortOrder(sortOrderCopy)
    }

    return (
        <thead className="thead">
                    <tr>
                        {config.columns.map((column, index) => {
                            if(column.orderable) {
                                return ( 
                                    <th key={index} className="th">
                                        <span>{column.name.toUpperCase()}</span>
                                        {sortOrder[column.ref] === 'up' ? 
                                            <FontAwesomeIcon icon={faChevronUp} onClick={() => handleChevron(column.ref, 'up')} className="th-action" />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} onClick={() => handleChevron(column.ref, 'down')} className="th-action" />
                                        }
                                    </th>
                                )
                            } else {
                                return (
                                    <th key={index} className="th">{column.name.toUpperCase()}</th>
                                )
                            }
                        })}
                    </tr>
        </thead>
    )
}

export default TableHead