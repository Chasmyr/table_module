import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import TableBody from './components/tableBody'
import TableHead from './components/tableHead'
import './style.css'

const DisplayTable = ({config}) => {

    const [entriesToShow, setEntriesToShow] = useState(config.defaultNumberOfEntries)
    const [entriesCount, setEntriesCount] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [toRender, setToRender] = useState(config.rows)
    const [numberOfPage, setNumberOfPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageList, setPageList] = useState(null)


    useEffect(() => {
        // handle pagination
        if(config.pagination) {
            let dataPaginated = config.rows
            dataPaginated = dataPaginated.slice(entriesCount, entriesToShow)
            setToRender(dataPaginated)

            // set the number of page
            if(config.rows.length%entriesToShow === 0) {
                setNumberOfPage(config.rows.length/entriesToShow)
                let toReturn = []
                for(let i = 0; i < config.rows.length/entriesToShow; i++) {
                    toReturn.push(i + 1)
                    setPageList(toReturn)
                }
            } else if (config.rows.length < entriesToShow) {
                let toReturn = []
                toReturn.push(1)
                setPageList(toReturn)
                setNumberOfPage(1)
            } else {
                setNumberOfPage(Math.ceil(config.rows.length/entriesToShow))
                let toReturn = []
                for(let i = 0; i < Math.ceil(config.rows.length/entriesToShow); i++) {
                    toReturn.push(i + 1)
                    setPageList(toReturn)
                }
            }
        }

        // set pageList
        
    }, [entriesToShow])

    // handle navigation between pages
    const handlePagination = (direction) => {
        if(direction === 'next') {
            if(currentPage === numberOfPage) {
                let newSliceValue = 0
                let newEntriesValue = Number(entriesToShow)
                let newPageNumber = 1

                let dataPaginated = config.rows
                dataPaginated = dataPaginated.slice(newSliceValue, newEntriesValue)

                
                setEntriesCount(newSliceValue)
                setToRender(dataPaginated)
                setCurrentPage(newPageNumber)

            } else {
                let newSliceValue = entriesCount + Number(entriesToShow)
                let newEntriesValue = Number(entriesToShow) + newSliceValue
                let newPageNumber = currentPage + 1
                
                let dataPaginated = config.rows
                dataPaginated = dataPaginated.slice(newSliceValue, newEntriesValue)
    
                setEntriesCount(newSliceValue)
                setToRender(dataPaginated)
                setCurrentPage(newPageNumber)
            }
        } else if (direction === 'prev') {
            if(currentPage > 1) {
                let newSliceValue = entriesCount - Number(entriesToShow)
                let newEntriesValue = Number(entriesToShow) + newSliceValue
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
            // faut re render
            let newPageNumber = direction
            let defaultSliceValue = entriesToShow*(direction - 1)
            let defaultEntriesValue = entriesToShow*direction

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
                setToRender(dataToReturn.slice(entriesCount, entriesToShow))
            }
            handlePagination(1)
        } else {
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

    // select the number of entries u want
    const changeEntriesToShow = (number) => {
        handlePagination(1)
        setEntriesToShow(number)
    }

    return (
        <div className='table-module'>
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
                                    {config.entriesOptions.map((e, index) => {
                                        return (
                                            <option key={index} value={e}>{e}</option>
                                        )
                                    })}
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
                                <div className='custom-select'>
                                    <select onChange={(e) => {changeEntriesToShow(e.target.value)}}>
                                        {config.entriesOptions.map((e, index) => {
                                            return (
                                                <option key={index} value={e}>{e}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    }
                </>}
            <div className='table-container'>
                <table className='table-bordered'>
                    <TableHead config={config} sortTable={sortTable} />
                    <TableBody toRender={toRender} />
                </table>
                {config.pagination && 
                    <div className='pagination-info'>
                        <div className='pagination-desc'>
                            <p>Show {config.rows.length < entriesToShow ? config.rows.length : toRender.length} entries of {config.rows.length}</p>
                            {numberOfPage > 1 &&
                                <p>Page {currentPage} of {numberOfPage}</p>
                            }
                        </div>
                        {numberOfPage > 1 &&
                            <div className='pagination-options'>  
                                <button onClick={() => {handlePagination('prev')}} className="pagination-btn pagination-prev"><FontAwesomeIcon icon={faChevronLeft} /></button>
                                <div className='page-btn'>
                                    {pageList !== null && pageList.map((e, index) => {
                                        if(e === currentPage) {
                                            return (
                                                <button onClick={() => {handlePagination(e)}} key={index} className="pagination-page-btn page-btn-active" >{e}</button>
                                            )
                                        } else {
                                            return (
                                                <button onClick={() => {handlePagination(e)}} key={index} className="pagination-page-btn" >{e}</button>
                                            )
                                        }
                                    })}
                                </div>
                                <button onClick={() => {handlePagination('next')}} className="pagination-btn pagination-next" ><FontAwesomeIcon icon={faChevronRight} /></button>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayTable