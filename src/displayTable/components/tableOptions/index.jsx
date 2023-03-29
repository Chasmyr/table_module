const TableOptions = ({config, searchInput, handlePagination, setEntriesToShow, isLoaded,
                          setSearchInput, toRender, currentPage, setToRender, entriesToShow, entriesCount}) => {

    // select the number of entries u want
    const changeEntriesToShow = (number) => {
        handlePagination(1)
        setEntriesToShow(number)
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

    if(config.searchable && config.pagination) {
        return (
            <div className='table-full-options'>
                <div className='searchBar'>
                    <input type="text" id='searchInput' onChange={searchAction} value={searchInput}></input>
                </div>
                <div className='pagination'>
                    <div className='custom-select'>
                        <select onChange={(e) => {changeEntriesToShow(e.target.value)}}>
                            {isLoaded && config.entriesOptions.map((e, index) => {
                                return (
                                    <option key={index} value={e}>{e}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>
        )
    } else if(config.searchable) {
        return (
            <div className='table-search-option'>
                <div className='searchBar'>
                    <input type="text" id='searchInput' onChange={searchAction} value={searchInput}></input>
                </div>
            </div>
        )
    } else if (config.pagination) {
        return (
            <div className='table-pagination-option'>
                <div className='pagination'>
                    <div className='custom-select'>
                        <select onChange={(e) => {changeEntriesToShow(e.target.value)}}>
                            {isLoaded && config.entriesOptions.map((e, index) => {
                                return (
                                    <option key={index} value={e}>{e}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default TableOptions