import React, { useState } from 'react';
import '../styles/Header.css';
import Logo from './images/tv.png';
import Menu from './images/Menu.png';
import Rating from './images/Rating.png';
import Play from './images/Play.png';
import Right from './images/Chevron right.png';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from './useFetch';

// const key = ;

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  console.log(search);

  const { movie, loading, error } = useFetch();
  if (loading) return <h1>loading</h1>;
  if (error) throw error;
  return (
    <>
      <div className='hero'>
        <nav className='navbar navbar-expand-lg'>
          <div className='container'>
            <Link href='' className='sticker'>
              <img src={Logo} alt='Logo' />
              MovieBox
            </Link>
            <form className='search'>
              <input
                type='text'
                placeholder='What do you want to search?'
                className='search-input'
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
                <i className='fa fa-search'></i>
              </button>
            </form>
            <div className='navbar-header'>
              <button className='signin'>Sign in</button>
              <img src={Menu} alt='Menu' />
            </div>
          </div>
        </nav>
        <section className='container'>
          <div className='description-box'>
            <h1>John Wick 3 : Parabellum</h1>
            <img src={Rating} alt='Rating' />
            <p>
              John Wick is on the run after killing a member of the
              international assassins' guild, and with a $14 million price tag
              on his head, he is the target of hit men and women everywhere
            </p>
            <button className='trailer'>
              <img src={Play} alt='play' /> Watch Trailer
            </button>
          </div>
        </section>
      </div>
      <main className='container mt-5'>
        <div className='featured'>
          <h1>Featured Movie</h1>
          <Link href='' className='see-more'>
            See more <img src={Right} alt=' right' />
          </Link>
        </div>
        <div className='row'>
          {movie
            .filter((m) => {
              return search.toLowerCase() === ''
                ? m
                : m.title.toLowerCase().includes(search);
            })
            .map((m) => (
              <div className='col' key={m.id}>
                <Link to={`/movie/${m.id}`}>
                  <div
                    data-testid='movie-card'
                    className='card  mt-5'
                    style={{ width: '250px', border: 'none' }}
                    key={m.id}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                      data-testid='movie-poster'
                      className=''
                      alt='card'
                    />
                    <div className='card-body'>
                      <h5 className='card-title' data-testid='movie-title'>
                        {m.title}
                      </h5>
                      <p className='' data-testid='movie-release-date'>
                        {' '}
                        {m.release_date}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Header;
