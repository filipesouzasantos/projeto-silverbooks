import React from 'react'
import './style.css'



function Pagination(props) {
    return (
        <>
            <div id="field-pagination">
                <nav>
                    <ul id="list-pagination">
                        <li id="list-pagination-top" onClick={() => { props.onChangePage(props.page - 1) }}  >
                            Anterior
                        </li>
                        <li id="list-pagination-mid">
                            <span>
                                {
                                props.page + 0//gambiarra
                                }
                            </span>
                        </li>
                        <li id="list-pagination-bot" onClick={() => { props.onChangePage(props.page + 1) }}>
                            Próxima
                        </li>
                    </ul>
                </nav>
            </div>
        </>

    )
}
export default Pagination;