import { useState, useEffect } from 'react'
import TableBody from './components/tableBody'
import TableHead from './components/tableHead'
import './style.css'

const DisplayTable = ({config}) => {

    const [entriesToShow, setEntriesToShow] = useState(config.defaultNumberOfEntries)
    const [entiresCount, setEntriesCount] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [toRender, setToRender] = useState(config.rows)
    const [numberOfPage, setNumberOfPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        // handle pagination
        if(config.pagination) {
            let dataPaginated = toRender
            dataPaginated = dataPaginated.slice(entiresCount, entriesToShow)
            setToRender(dataPaginated)

            // set the number of page
            if(config.rows.length%entriesToShow === 0) {
                setNumberOfPage(config.rows.length/entriesToShow)
            } else if (config.rows.length < entriesToShow) {
                setNumberOfPage(1)
            } else {
                setNumberOfPage(Math.ceil(config.rows.length/entriesToShow))
            }
        }
    }, [entriesToShow])

    // handle navigation between pages
    const handlePagination = (direction) => {
        if(direction === 'next') {
            if(currentPage === numberOfPage) {
                let newSliceValue = 0
                let newEntriesValue = entriesToShow
                let newPageNumber = 1

                let dataPaginated = config.rows
                dataPaginated = dataPaginated.slice(newSliceValue, newEntriesValue)

                
                setEntriesCount(newSliceValue)
                setToRender(dataPaginated)
                setCurrentPage(newPageNumber)

            } else {
                let newSliceValue = entiresCount + entriesToShow
                let newEntriesValue = entriesToShow + newSliceValue
                let newPageNumber = currentPage + 1
                
                let dataPaginated = config.rows
                dataPaginated = dataPaginated.slice(newSliceValue, newEntriesValue)
    
                setEntriesCount(newSliceValue)
                setToRender(dataPaginated)
                setCurrentPage(newPageNumber)
            }
        } else if (direction === 'prev') {
            if(currentPage > 1) {
                let newSliceValue = entiresCount - entriesToShow
                let newEntriesValue = entriesToShow + newSliceValue
                let newPageNumber = currentPage - 1
                    
                let dataPaginated = config.rows
                dataPaginated = dataPaginated.slice(newSliceValue, newEntriesValue)
        
                setEntriesCount(newSliceValue)
                setToRender(dataPaginated)
                setCurrentPage(newPageNumber)
            } else {
                let newSliceValue = config.rows.length - (config.rows.length - (entriesToShow*(numberOfPage-1)))
                let newEntriesValue = config.rows.length 
                let newPageNumber = numberOfPage

                let dataPaginated = config.rows
                dataPaginated = dataPaginated.slice(newSliceValue, newEntriesValue)
        
                setEntriesCount(newSliceValue)
                setToRender(dataPaginated)
                setCurrentPage(newPageNumber)
            }
        } else {
            // ajouter du code ici pour gérer les btns de page
            let newPageNumber = direction
            let defaultSliceValue = 0
            let defaultEntriesValue = entriesToShow

            let dataPaginated = config.rows
            dataPaginated = dataPaginated.slice(defaultSliceValue, defaultEntriesValue)

            setEntriesCount(defaultSliceValue)
            setToRender(dataPaginated)
            setCurrentPage(newPageNumber)
        }
    }

    // function to handle search action
    const searchAction = (e) => {
        setSearchInput(e.target.value)
        let dataSearched = []
        let dataToReturn

        if(config.pagination) {
            dataToReturn = config.rows
            config.rows.map((item) => {
                Object.keys(item).map((key) => {
                    if(item[key].toString().toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) {
                        if(!dataSearched.includes(item)) {
                            dataSearched.push(item)
                        }
                    } 
                })
            })
        } else {
            dataToReturn = toRender
            console.log(dataToReturn)
            toRender.map((item) => {
                Object.keys(item).map((key) => {
                    if(item[key].toString().toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) {
                        if(!dataSearched.includes(item)) {
                            dataSearched.push(item)
                        }
                    } 
                })
            })
        }

        if(dataSearched.length > 0) {
            dataSearched.map((item) => {
                if(dataToReturn.includes(item)) {
                    dataToReturn.splice(dataToReturn.indexOf(item), 1)
                    dataToReturn.unshift(item)
                }
            })
        }

        if(config.pagination) {
            if(currentPage > 1) {
                setToRender(dataToReturn.slice(0, entriesToShow))
            } else {
                setToRender(dataToReturn.slice(entiresCount, entriesToShow))
            }
            handlePagination(1)
        } else {
            console.log(dataSearched)
            setToRender(dataToReturn)
        }
    }
    
    // function to sort rows
    const sortTable = (ref, direction) => {
        let dataSorted
        if(config.pagination) {
            dataSorted = config.rows
        } else {
            dataSorted = toRender
            console.log(dataSorted)
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
                dataSorted = dataSorted.slice(entiresCount, entriesToShow)
            }
            handlePagination(1)
        } else {
            dataSorted = dataSorted.slice()
        }
        setToRender(dataSorted) 
    }

    // select the number of entries u want
    const changeEntriesToShow = (number) => {
        setEntriesToShow(number)
    }

    return (
        <div>
            <div className='table-title-container'>
                <h2 className='table-title'>{config.title}</h2>
            </div>
            {config.searchable && config.pagination ?
                    <div className='table-full-options'>
                        <div className='searchBar'>
                            <input type="text" id='searchInput' onChange={searchAction} value={searchInput}></input>
                        </div>
                        <div className='pagination'>
                            <div className='custom-select'>
                                <select onChange={(e) => {changeEntriesToShow(e.target.value)}}>
                                    <option value={2}>2</option>
                                    <option value={4}>4</option>
                                    <option value={6}>6</option>
                                    <option value={8}>8</option>
                                    <option value={10}>10</option>
                                </select>
                            </div>
                        </div>
                    </div>
                : 
                <>
                    {config.searchable &&
                        <div className='table-search-option'>
                            <div className='searchBar'>
                                <input type="text" id='searchInput' onChange={searchAction} value={searchInput}></input>
                            </div>
                        </div>
                    }
                    {
                        config.pagination && 
                        <div className='table-pagination-option'>
                            <div className='pagination'>
                                <button onClick={() => {changeEntriesToShow(5)}}>pagination</button>
                            </div>
                        </div>
                    }
                </>}
            <div className='table-container'>
                <table className='table-bordered'>
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
                </table>
                {config.pagination && 
                    <div className='pagination-info'>
                        <div className='pagination-desc'>
                            <p>Show {config.rows.length < entriesToShow ? config.rows.length : toRender.length} entries of {config.rows.length}</p>
                        </div>
                        <div className='pagination-options'>
                            <p>Page {currentPage} of {numberOfPage}</p>
                            {numberOfPage > 1 &&
                                <>  
                                    <button onClick={() => {handlePagination('prev')}} >Prev page</button>
                                    <button onClick={() => {handlePagination('next')}} >Next page</button>
                                </>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayTable