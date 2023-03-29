import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

const TableFooter = ({config, entriesToShow, toRender, numberOfPage, currentPage, handlePagination, pageList, isLoaded}) => {

    const [newPageList, setNewPageList] = useState([])

    useEffect(() => {
        if(pageList !== null && pageList.length >= 5) {
            // écrire ici la logique des pages en plus
            let newCounter = []
            if(currentPage >= 3 && currentPage < pageList.length) {
                for(let i = currentPage -1; i <= currentPage +1; i++) {
                    newCounter.push(i)
                }
            }else if(currentPage === pageList.length) {
                newCounter = [pageList.length - 2, pageList.length -1, pageList.length]
            }else {
                for(let i = 1; i < 4; i++) {
                    newCounter.push(i)
                }
            }
            setNewPageList(newCounter)
        }
    }, [pageList, currentPage])

    console.log(newPageList)

    if(isLoaded && config.pagination) {
        return (
            <div className='pagination-info'>
                <div className='pagination-desc'>
                    <p>Show {config.rows.length < entriesToShow ? config.rows.length : toRender.length} entries of {config.rows.length}</p>
                    {numberOfPage > 1 &&
                        <p>Page {currentPage} of {numberOfPage}</p>
                    }
                </div>
                {numberOfPage > 1 &&
                    <div className='pagination-options'>
                        {pageList !== null && pageList.length > 4 ?
                            <button onClick={() => {handlePagination(1)}} className="pagination-btn pagination-prev pagination-btn-long"><FontAwesomeIcon icon={faArrowLeft} /></button>
                            :
                            <>
                            </>
                        }
                        <button onClick={() => {handlePagination('prev')}} className="pagination-btn pagination-prev"><FontAwesomeIcon icon={faChevronLeft} /></button>
                        <div className='page-btn'>
                            {pageList !== null ?
                                pageList.length < 5 ?
                                    pageList.map((e, index) => {
                                        if(e === currentPage) {
                                            return (
                                                <button onClick={() => {handlePagination(e)}} key={index} className="pagination-page-btn page-btn-active" >{e}</button>
                                            )
                                        } else {
                                            return (
                                                <button onClick={() => {handlePagination(e)}} key={index} className="pagination-page-btn" >{e}</button>
                                            )
                                        }
                                    })
                                    :
                                    newPageList.length > 0 && newPageList.map((e, index) => {
                                        if(e === currentPage) {
                                            return (
                                                <button onClick={() => {handlePagination(e)}} key={index} className="pagination-page-btn page-btn-active" >{e}</button>
                                            )
                                        } else {
                                            return (
                                                <button onClick={() => {handlePagination(e)}} key={index} className="pagination-page-btn" >{e}</button>
                                            )
                                        }
                                    })
                                :
                                <>
                                </>
                            }
                        </div>
                        <button onClick={() => {handlePagination('next')}} className="pagination-btn pagination-next" ><FontAwesomeIcon icon={faChevronRight} /></button>
                        {pageList !== null && pageList.length > 4 ?
                                <button onClick={() => {handlePagination(pageList.length)}} className="pagination-btn pagination-next pagination-btn-long"><FontAwesomeIcon icon={faArrowRight} /></button>
                            :
                                <>
                                </>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default TableFooter