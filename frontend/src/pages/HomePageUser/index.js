import React, { useState, useEffect } from 'react'

import api from '../../services/api';
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Book from '../../components/Book';
import Filter from '../../components/Filter';
import SearchBar from '../../components/SearchBar';

//import NotFoundBook from '../../assets/images/notFoundBook.png';
import BtnDownload from '../../assets/images/icons/BtnDownload.png';

import './styles.css';
import Pagination from '../../components/Pagination';

function HomePageUser(props) {

    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState('');
    const [query, setQuery] = useState('');
    const [labelFilterBooks] = useState('TODOS OS LIVROS');
    const [page, setPage] = useState({});
    const [nextPage, setNextPage] = useState({});
    const [totalPages, setTotalPages] = useState({});




    useEffect(() => {
        const loadBooks = async () => {
            let url
            if (query) {
                url = `/results?search_query=${query}`
            } else {
                url = `/${filter}?page=${page}`
            }
            await api.get(url).then(response => {
                setBooks(response.data);
                console.log(response.data)
                setPage(response.data.page);

                setTotalPages(response.data.totalPages);

            })
        }
        loadBooks()
    }, [filter, query, page]);

    function initialSatus() {
        setFilter('')
        setQuery('')
    }

    const changePage = (index) => {
        if (index > totalPages) {
            setPage(index - 1);
        } else {
            setPage(index);
        }
    }

    return (
        <>
            <div id='home-page-user'>
                <Header link='/'>
                    <div id='field-find'>
                        <SearchBar clicke={e => setQuery(e.target.value)} />
                    </div>
                    <div id=''>
                        {!localStorage.getItem('app-token') ?
                            <Link to='/user/login'>Loguin</Link>
                            :
                            <Link to='/user/home'>Gerenciar</Link>
                        }
                    </div>

                </Header>

                <div id='filters'>
                    <button type='button' onClick={initialSatus}>
                        <Filter name='Todos' />
                    </button>
                    <button type='button' onClick={() => setFilter('ROMANCE')}>
                        <Filter name='Romance' />
                    </button>
                    <button type='button' onClick={() => setFilter('TERROR')}>
                        <Filter name='Terror' />
                    </button>
                    <button type='button' onClick={() => setFilter('AVENTURA')}>
                        <Filter name='Aventura' />
                    </button>
                    <button type='button' onClick={() => setFilter('DISTOPIA')}>
                        <Filter name='Distopia' />
                    </button>
                    <button type='button' onClick={() => setFilter('GAMES')}>
                        <Filter name='Games' />
                    </button>
                    <button type='button' onClick={() => setFilter('INFORMATICA')}>
                        <Filter name='Programação' />
                    </button>
                    <button type='button' onClick={() => setFilter('JOVEM ADULTO')}>
                        <Filter name='Jovem adulto' />
                    </button>
                    <button type='button' onClick={() => setFilter('CRONICAS')}>
                        <Filter name='Crônicas' />
                    </button>
                </div>

                <div id="home-page-content" >


                    <div id='main'>
                        <div id='home-page-label-books'>
                            {
                                !filter ? <h2 >{labelFilterBooks}</h2>
                                    :
                                    <h2 >{filter}</h2>
                            }

                        </div>
                        <Pagination page={page} onChangePage={changePage} />
                        <main>
                            <div id='content-main'>


                                {
                                    books.docs?.map(book => (
                                        <Book key={book._id} titleBook={book.title + " - " + book.author} linkImg={book.imgLink} subDescription={book.subDescription}>
                                            <Link to={`/download-page/${book._id}`}>
                                                <img src={BtnDownload} alt='button-download' />
                                            </Link>
                                        </Book>
                                    ))
                                }


                            </div>
                        </main>

                    </div>


                </div>
                <div id='footer-main-page'>
                    <Footer />
                </div>

            </div>
        </>
    );
}
export default HomePageUser;