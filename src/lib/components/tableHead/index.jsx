import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

const TableHead = ({config, toRender, currentPage, entriesToShow, entriesCount, handlePagination, setToRender}) => {

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


    // function to sort rows
    const sortTable = (ref, direction) => {
        let dataSorted
        if(config.pagination) {
            dataSorted = config.rows
        } else {
            dataSorted = toRender
        }
        dataSorted.sort((a, b) => {
            // format and sort date if the format is "xx/xx/xxxx"
            if(a[ref][2] === '/' && a[ref][5] === '/') {
                let date1 = new Date(a[ref])
                let date2 = new Date(b[ref])
                if(date1 < date2) {
                    if(direction ==='up') {
                        return -1
                    } else if(direction === 'down') {
                        return 1
                    }
                }
                if(date1 > date2) {
                    if(direction ==='up') {
                        return 1
                    } else if (direction === 'down') {
                        return -1
                    }
                }
                return 0
            } else {
                if(a[ref] < b[ref]) {
                    if(direction === 'up') {
                        return -1
                    } else if (direction === 'down'){
                        return 1
                    }
                }
                if(a[ref] > b[ref]) {
                    if(direction === 'up') {
                        return 1
                    } else if (direction === 'down') {
                        return -1
                    }
                }
                return 0
            }
        })

        if(config.pagination) {
            if(currentPage > 1) {
                dataSorted = dataSorted.slice(0, entriesToShow)
            } else {
                dataSorted = dataSorted.slice(entriesCount, entriesToShow)
            }
            handlePagination(1)
        } else {
            dataSorted = dataSorted.slice()
        }
        setToRender(dataSorted)
    }


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
                                    <th key={index} className="th"><span>{column.name.toUpperCase()}</span></th>
                                )
                            }
                        })}
                    </tr>
        </thead>
    )
}

export default TableHead