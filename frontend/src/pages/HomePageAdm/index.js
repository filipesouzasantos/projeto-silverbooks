import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Book from '../../components/Book';
import Filter from '../../components/Filter';


import api from '../../services/api'
import './styles.css'

import BtnEdit from '../../assets/images/icons/BtnEdit.png'
import ButtonLogout from '../../components/ButtonLogout';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';



function HomePageAdm() {

    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState('');
    const [query, setQuery] = useState('');
    const [labelFilterBooks] = useState('Todos os Livros');
    const [page, setPage] = useState({});
    const [totalPages, setTotalPages] = useState({});


    useEffect(() => {
        const Books = async () => {
            let url
            if (query) {
                url = `/admin/results?search_query=${query}`
            } else {
                url = `/admin/listall/${filter}?page=${page}`
            }
            await api.get(url).then(response => {
                setBooks(response.data);
                setPage(response.data.page);
                setTotalPages(response.data.totalPages);

            })
        }
        Books();
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
        <div id="home-page-admin" className='contanner'>
            <Header link='/user/home'>

                <div id='header-buttons-rotes'>
                    <Link to='/'>Home Page</Link>
                    <Link to='/user/registerbook'>Novo Livro</Link>
                    <Link to='/register/user/auth'>Novo Usuario</Link>
                </div>
                <div id='header-find'>
                    <SearchBar clicke={e => setQuery(e.target.value)} />
                </div>
                <div id='header-button-logout'>
                    <ButtonLogout />
                </div>
            </Header>



            <div id='filters-admin'>
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

            <div id="home-page-content-admin" >
                {
                    !filter ? <h2 >{labelFilterBooks}</h2>
                        :
                        <h2 >{filter}</h2>
                }
                <Pagination page={page} onChangePage={changePage} />

                <main>
                    {
                        books.docs?.map(book => (
                            <Book key={book._id} titleBook={book.title + " - " + book.author} linkImg={book.imgLink} subDescription={book.subDescription}>
                                <Link to={`/user/edit/${book._id}`}>
                                    <img src={BtnEdit} alt='button edit' />
                                </Link>
                            </Book>
                        ))
                    }
                </main>
            </div>
            <div id='back-page-admin'>
                <Footer />
            </div>

        </div>
    );
}

export default HomePageAdm;