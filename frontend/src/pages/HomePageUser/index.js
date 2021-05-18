import React, { useState, useEffect } from 'react'

import api from '../../services/api';
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Book from '../../components/Book';
import Filter from '../../components/Filter';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import NotFoundBook from '../../assets/images/notFoundBook.png';
import BtnDownload from '../../assets/images/icons/BtnDownload.png';

import './styles.css';


function HomePageUser(props) {

    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState('');
    const [query, setQuery] = useState('');
    const [labelFilterBooks] = useState('TODOS OS LIVROS');
    const [page, setPage] = useState({});
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
                    <button type='button' onClick={() => {setFilter('ROMANCE'); setPage(1)}}>
                        <Filter name='Romance' />
                    </button>
                    <button type='button' onClick={() => {setFilter('TERROR'); setPage(1)}}>
                        <Filter name='Terror' />
                    </button>
                    <button type='button' onClick={() => {setFilter('AVENTURA'); setPage(1)}}>
                        <Filter name='Aventura' />
                    </button>
                    <button type='button' onClick={() => {setFilter('DISTOPIA'); setPage(1)}}>
                        <Filter name='Distopia' />
                    </button>
                    <button type='button' onClick={() => {setFilter('GAMES'); setPage(1)}}>
                        <Filter name='Games' />
                    </button>
                    <button type='button' onClick={() => {setFilter('INFORMATICA'); setPage(1)}}>
                        <Filter name='Programação' />
                    </button>
                    <button type='button' onClick={() => {setFilter('JOVEM ADULTO'); setPage(1)}}>
                        <Filter name='Jovem adulto' />
                    </button>
                    <button type='button' onClick={() => {setFilter('LIGHT NOVEL'); setPage(1)}}>
                        <Filter name='LIGHT NOVEL' />
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

                        <main>
                            <div id='content-main'>
                                {
                                    books.docs? books.docs.map(book => (
                                        <Book key={book._id} titleBook={book.title + " - " + book.author} linkImg={book.imgLink} subDescription={book.subDescription}>
                                            <Link to={`/download-page/${book._id}`}>
                                                <img src={BtnDownload} alt='button-download' />
                                            </Link>
                                        </Book>
                                    ))
                                    :
                                      <img src={NotFoundBook} alt="not found book"></img>
                                }
                            </div>
                        </main>

                    </div>
                </div>

                <Pagination page={page} onChangePage={changePage} />

                <div id='footer-main-page'>
                    <Footer />
                </div>
            </div>
        </>
    );
}
export default HomePageUser;