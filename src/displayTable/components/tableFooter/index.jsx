import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const TableFooter = ({config, entriesToShow, toRender, numberOfPage, currentPage, handlePagination, pageList, isLoaded}) => {

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
        )
    }
}

export default TableFooter