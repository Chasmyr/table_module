import { useState } from 'react'
import TableBody from './components/tableBody'
import TableHead from './components/tableHead'
import './style.css'

const DisplayTable = ({config}) => {

    const [entries, setEntries] = useState(null)

    return (
        <div>
            <div className='table-title-container'>
                <h2 className='table-title'>{config.title}</h2>
            </div>
            {config.searchable || config.pagination ?
                    <div className='table-options'>
                        {config.searchable &&
                            <div className='searchBar'>
                                <p>rehcerche</p>
                            </div>
                        }
                        {
                            config.pagination && 
                            <div className='pagination'>
                                <p>pagination</p>
                            </div>
                        }
                    </div>
                : 
                    <></>
            }
            <div className='table-container'>
                <table className='table-bordered'>
                    <TableHead columns={config.columns} />
                    <TableBody rows={config.rows} />
                </table>
            </div>
        </div>
    )
}

export default DisplayTable