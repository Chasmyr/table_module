import { useState, useEffect } from 'react'
import TableBody from './components/tableBody'
import TableHead from './components/tableHead'
import './style.css'

const DisplayTable = ({config}) => {

    const [entriesToShow, setEntriesToShow] = useState(config.defaultNumberOfEntries)
    const [entiresCount, setEntriesCount] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [toRender, setToRender] = useState(config.rows)

    useEffect(() => {
        // handle pagination
        if(config.pagination) {
            let dataPaginated = toRender
            dataPaginated = dataPaginated.slice(entiresCount, entriesToShow)
            setToRender(dataPaginated)
        }
    }, [])

    // function to handle search action
    const searchAction = (e) => {
        setSearchInput(e.target.value)
        let dataSearched = []
        let dataToReturn = toRender

        toRender.map((item) => {
            Object.keys(item).map((key) => {
                if(item[key].toString().toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) {
                    if(!dataSearched.includes(item)) {
                        dataSearched.push(item)
                    }
                } 
            })
        })

        if(dataSearched.length > 0) {
            dataSearched.map((item) => {
                if(dataToReturn.includes(item)) {
                    dataToReturn.splice(dataToReturn.indexOf(item), 1)
                    dataToReturn.unshift(item)
                }
            })
        }
        setToRender(dataToReturn)
    }

    // function to sort rows
    const sortTable = (ref) => {
        let dataSorted = toRender
        // ajouter un tri si date avec conf date format, verifier la longueur de la string ainsi que la présence de '/' puis comaprer les dates
        dataSorted.sort((a, b) => {
            if(a[ref] < b[ref]) {
                return -1
            }
            if(a[ref] > b[ref]) {
                return 1
            }

            return 0
        })
        console.log(dataSorted)
        
        setToRender(dataSorted) 
    }

    console.log('rendered')

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
                            <p>pagination</p>
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
                                <p>pagination</p>
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
                                    <th key={index}>{column.name} <button onClick={() => sortTable(column.ref)}>Trier</button></th>
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
                    {toRender.map((row, index) => {
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
                            <p>Show {entriesToShow} entries of {config.rows.length}</p>
                        </div>
                        <div className='pagination-options'>
                            <p>Page 1 of {config.rows.length/entriesToShow}</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayTable