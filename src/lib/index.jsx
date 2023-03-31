import { useState, useEffect } from 'react'
import TableBody from './components/tableBody'
import TableHead from './components/tableHead'
import './style.css'
import TableOptions from "./components/tableOptions/index.jsx";
import TableFooter from "./components/tableFooter/index.jsx";

const DisplayTable = ({config}) => {

    const [entriesToShow, setEntriesToShow] = useState(null)
    const [entriesCount, setEntriesCount] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [toRender, setToRender] = useState(null)
    const [numberOfPage, setNumberOfPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageList, setPageList] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // handle default conf
        if(config.title === undefined) {
            config.title = 'Default Table Title'
        }
        if(config.searchable === undefined) {
            config.searchable = false
        }
        if(config.pagination === undefined) {
            config.pagination = false
        }
        if(config.columns === undefined) {
            config.columns = [
                {
                    name: 'Name',
                    orderable: false,
                    ref: 'name'
                },
                {
                    name: 'Test',
                    orderable: false,
                    ref: 'test'
                }
            ]
        }
        if(config.rows === undefined) {
            config.rows = [
                {
                    name: 'Default',
                    test: 'test'
                },
                {
                    name: 'Table',
                    test: 'test'
                }
            ]
        }
        if(config.defaultNumberOfEntries === undefined) {
            config.defaultNumberOfEntries = 10
        } else if(entriesToShow === null) {
            setEntriesToShow(config.defaultNumberOfEntries)
        }
        if(config.entriesOptions === undefined) {
            if(config.defaultNumberOfEntries !== undefined) {
                config.entriesOptions = [config.defaultNumberOfEntries,20,50]
            }
        }


        // handle pagination
        if(config.pagination && entriesToShow !== null) {
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
        } else {
            setToRender(config.rows)
        }

        if(config.title !== undefined && config.searchable !== undefined && config.pagination !== undefined && config.defaultNumberOfEntries !== undefined && config.entriesOptions !== undefined && config.columns !== undefined && config.rows !== undefined && entriesToShow !== null) {
            setIsLoaded(true)
        }

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

    return (
        <div className='table-module'>
            <div className='table-title-container'>
                <h2 className='table-title'>{config.title}</h2>
            </div>
            <TableOptions config={config} searchInput={searchInput} handlePagination={handlePagination}
                          setEntriesToShow={setEntriesToShow} isLoaded={isLoaded} setSearchInput={setSearchInput}
                          toRender={toRender} currentPage={currentPage} setToRender={setToRender}
                          entriesToShow={entriesToShow} entriesCount={entriesCount}
            />
            <div className='table-container'>
                <table className='table-bordered'>
                    {isLoaded &&
                        <>
                            <TableHead config={config} toRender={toRender} currentPage={currentPage} entriesToShow={entriesToShow}
                                       entriesCount={entriesCount} handlePagination={handlePagination} setToRender={setToRender}
                            />
                            <TableBody toRender={toRender} columns={config.columns} />
                        </>
                    }
                </table>
                <TableFooter config={config} entriesToShow={entriesToShow} toRender={toRender} numberOfPage={numberOfPage} currentPage={currentPage} handlePagination={handlePagination} pageList={pageList} isLoaded={isLoaded} />
            </div>
        </div>
    )
}

export default DisplayTable