import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Recommend = ({ setVista, response }) => {

    const [moviesData, setMoviesData] = useState({});
    const [seriesData, setSeriesData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [genres, setGenres] = useState([
    {
      "id": 28,
      "name": "Acción"
    },
    {
      "id": 12,
      "name": "Aventura"
    },
    {
      "id": 16,
      "name": "Animación"
    },
    {
      "id": 35,
      "name": "Comedia"
    },
    {
      "id": 80,
      "name": "Crimen"
    },
    {
      "id": 99,
      "name": "Documental"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Familia"
    },
    {
      "id": 14,
      "name": "Fantasía"
    },
    {
      "id": 36,
      "name": "Historia"
    },
    {
      "id": 27,
      "name": "Terror"
    },
    {
      "id": 10402,
      "name": "Música"
    },
    {
      "id": 9648,
      "name": "Misterio"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Ciencia ficción"
    },
    {
      "id": 10770,
      "name": "Película de TV"
    },
    {
      "id": 53,
      "name": "Suspense"
    },
    {
      "id": 10752,
      "name": "Bélica"
    },
    {
      "id": 37,
      "name": "Western"
    }
    ]);
    const [genresSeries, setGenresSeries] = useState([
        {
          "id": 10759,
          "name": "Action & Adventure"
        },
        {
          "id": 16,
          "name": "Animación"
        },
        {
          "id": 35,
          "name": "Comedia"
        },
        {
          "id": 80,
          "name": "Crimen"
        },
        {
          "id": 99,
          "name": "Documental"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Familia"
        },
        {
          "id": 10762,
          "name": "Kids"
        },
        {
          "id": 9648,
          "name": "Misterio"
        },
        {
          "id": 10763,
          "name": "News"
        },
        {
          "id": 10764,
          "name": "Reality"
        },
        {
          "id": 10765,
          "name": "Sci-Fi & Fantasy"
        },
        {
          "id": 10766,
          "name": "Soap"
        },
        {
          "id": 10767,
          "name": "Talk"
        },
        {
          "id": 10768,
          "name": "War & Politics"
        },
        {
          "id": 37,
          "name": "Western"
        }
    ]);
    const tmdbToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

    const getMovies = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: tmdbToken,
            }
        };

        const movieDetails = await Promise.all(
          response.recomendaciones.peliculas.map(async (movie) => {
              try {
                  const res = await fetch(
                      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=es-CL&page=1`,
                      options
                  );
                  const data = await res.json();
                  console.log(data);
                  return data.results[0]; 
              } catch (error) {
                  console.error(error);
                  return null;
              }
          })
      );
  
      setMoviesData(movieDetails);
    };

    const getSeries = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: tmdbToken,
            }
        };

        const serieDetails = await Promise.all(
          response.recomendaciones.series.map(async (serie) => {
              try {
                  const res = await fetch(
                      `https://api.themoviedb.org/3/search/tv?query=${serie}&include_adult=false&language=es-CL&page=1`,
                      options
                  );
                  const data = await res.json();
                  console.log(data);
                  return data.results[0]; 
              } catch (error) {
                  console.error(error);
                  return null; 
              }
          })
      );
  
      setSeriesData(serieDetails);
    };

    const fetchTrailer = async (movieId) => {
        setLoading(true);
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: tmdbToken,
          },
        };
      
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=es-CL`,
            options
          );
          const data = await response.json();
      
          const trailer = data.results.length > 0 ? data.results[0] : null;
      
          if (trailer) {
            const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
      
            window.open(youtubeUrl, "_blank");
          } else {
            alert("No se encontró un tráiler.");
          }
        } catch (error) {
          console.error("Error obteniendo el tráiler:", error);
        } finally {
          setLoading(false);
        }
    };
    
    const fetchTrailerSerie = async (serieId) => {
      setLoading(true);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: tmdbToken,
        },
      };
    
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${serieId}/videos?language=es-CL`,
          options
        );
        const data = await response.json();
    
        const trailer = data.results.length > 0 ? data.results[0] : null;
    
        if (trailer) {
          const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
    
          window.open(youtubeUrl, "_blank");
        } else {
          alert("No se encontró un tráiler.");
        }
      } catch (error) {
        console.error("Error obteniendo el tráiler:", error);
      } finally {
        setLoading(false);
      }
    };

    const getGenreName = (genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : "Desconocido";
    }

    const getGenreSerieName = (genreId) => {
        const genre = genresSeries.find((genre) => genre.id === genreId);
        return genre ? genre.name : "Desconocido";
    }

    useEffect(() => {
        getMovies();
        getSeries();
    }, [response]);
      
    return (
        <div className="max-w-7xl mx-auto px-4">
                    {response.recomendaciones ? (
                        <div className="mt-2">
                            {/* Películas */}
                            <h2 className="text-4xl text-white uppercase font-bold mb-2">Películas</h2>
                            <ul className="pl-6 flex-row md:flex flex-wrap gap-6 mt-2 justify-center">
                                {moviesData ? (
                                    moviesData.length > 0 ? (
                                        <div className="md:flex md:w-full w-[300px] min-h-[300px] md:min-h-[500px] flex justify-center items-center">
                                            <Swiper
                                                modules={[Navigation, EffectCoverflow]}
                                                slidesPerView={1}
                                                navigation
                                                grabCursor
                                                loop
                                                effect="coverflow"
                                                centeredSlides={true}
                                                onSlideChange={() => setIsOpen(false)}
                                                onSwiper={(swiper) => console.log(swiper)}
                                                style={{ width: "100%", height: "100%" }}
                                            >
                                                {moviesData.map((movie, index) => (
                                                <SwiperSlide key={index}>
                                                    <div 
                                                    className="w-full h-full bg-cover bg-center overflow-hidden rounded-[10px]" 
                                                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
                                                    >
                                                    {/* Contenedor principal */}
                                                    <div className="w-full min-h-full bg-black/60 bg-blend-multiply rounded-[10px] p-6">
                                                        {/* Header de la película */}
                                                        <div className="md:m-5 flex items-start">
                                                        <img
                                                            className="h-[160px] md:h-[400px] shadow-lg rounded-md"
                                                            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                                                            alt={movie.original_title}
                                                        />
                                                        <div className="w-full max-w-[135px] md:max-w-[1000px] ml-2 md:ml-10">
                                                            <div className='md:flex text-left gap-2'>
                                                            <h1 className="text-white text-xl md:text-4xl font-bold break-words whitespace-normal">{movie.original_title}</h1>
                                                            <h4 className="text-gray-400 text-xl md:text-4xl font-bold mb-2">({movie.release_date?.slice(0, 4)})</h4>
                                                            </div>
                                                            <div className='flex flex-wrap gap-2 max-w-[200px] md:max-w-[1000px]'>
                                                            {movie.genre_ids?.map((genre) => (
                                                                <span key={genre} className="text-white text-xs md:text-base p-1 rounded-md border border-white/20">
                                                                {getGenreName(genre)}
                                                                </span>
                                                            ))}
                                                            </div>
                                                        </div>
                                                        </div>
                                                        <div className="hidden md:block md:mt-[-310px] md:mb-30 md:ml-105 md:w-[550px] text-left break-words whitespace-pre-wrap">
                                                            <p className="text-gray-300 md:text-2xs">{movie.overview}</p>
                                                            <button onClick={() => fetchTrailer(movie.id)} className='mt-4 bg-red-500 text-white font-semibold px-4 py-2 rounded-3xl shadow-md transition-all duration-300 hover:bg-red-600'>
                                                              Ver trailer
                                                            </button>
                                                        </div>
                                                        {/* Descripción en mobile */}
                                                        <div className="md:hidden text-left mt-5">
                                                        <button onClick={() => fetchTrailer(movie.id)} className='mt-4 bg-red-500 text-white font-semibold px-4 py-2 rounded-3xl shadow-md transition-all duration-300 hover:bg-red-600'>
                                                            Ver trailer
                                                        </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </SwiperSlide>
                                                ))}
                                            </Swiper>
                                            </div>
                                    ) : (
                                        <p className="text-gray-400">Cargando películas...</p>
                                    )
                                ) : (
                                    <p className="text-gray-400">Cargando películas...</p>
                                )}
                            </ul>

                            <h3 className="mt-5 text-4xl text-white uppercase font-bold mb-2">Series</h3>
                            <ul className="pl-6 flex-row md:flex flex-wrap gap-6 mt-2 justify-center">
                            {seriesData ? (
                                    seriesData.length > 0 ? (
                                        <div className="md:flex md:w-full w-[300px] min-h-[300px] md:min-h-[500px] flex justify-center items-center">
                                            <Swiper
                                                modules={[Navigation, EffectCoverflow]}
                                                slidesPerView={1}
                                                navigation
                                                grabCursor
                                                loop
                                                effect="coverflow"
                                                centeredSlides={true}
                                                onSlideChange={() => setIsOpen(false)}
                                                onSwiper={(swiper) => console.log(swiper)}
                                                style={{ width: "100%", height: "100%" }}
                                            >
                                                {seriesData.map((serie, index) => (
                                                <SwiperSlide key={index}>
                                                    <div 
                                                    className="w-full h-full bg-cover bg-center overflow-hidden rounded-[10px]" 
                                                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${serie.backdrop_path})` }}
                                                    >
                                                    <div className="w-full min-h-full bg-black/60 bg-blend-multiply rounded-[10px] p-6">
                                                        <div className="md:m-5 flex items-start">
                                                        <img
                                                            className="h-[160px] md:h-[400px] shadow-lg rounded-md"
                                                            src={`https://image.tmdb.org/t/p/w780${serie.poster_path}`}
                                                            alt={serie.original_title}
                                                        />
                                                        <div className="w-full max-w-[135px] md:max-w-[1000px] ml-2 md:ml-10">
                                                            <div className='md:flex text-left gap-2'>
                                                            <h1 className="text-white text-xl md:text-4xl font-bold break-words whitespace-normal">{serie.original_name}</h1>
                                                            <h4 className="text-gray-400 text-xl md:text-4xl font-bold mb-2">({serie.first_air_date?.slice(0, 4)})</h4>
                                                            </div>
                                                            <div className='flex flex-wrap gap-2 max-w-[200px] md:max-w-[1000px]'>
                                                            {serie.genre_ids?.map((genre) => (
                                                                <span key={genre} className="text-white text-xs md:text-base p-1 rounded-md border border-white/20">
                                                                {getGenreSerieName(genre)}
                                                                </span>
                                                            ))}
                                                            </div>
                                                        </div>
                                                        </div>
                                                        <div className="hidden md:block md:mt-[-310px] md:mb-30 md:ml-105 md:w-[550px] text-left break-words whitespace-pre-wrap">
                                                            <p className="text-gray-300 md:text-2xs">{serie.overview}</p>
                                                            <button onClick={() => fetchTrailerSerie(serie.id)} className='mt-4 bg-red-500 text-white font-semibold px-4 py-2 rounded-3xl shadow-md transition-all duration-300 hover:bg-red-600'>
                                                                Ver trailer
                                                            </button>
                                                        </div>
                                                        <div className="md:hidden text-left mt-5">
                                                          <button onClick={() => fetchTrailer(movie.id)} className='mt-4 bg-red-500 text-white font-semibold px-4 py-2 rounded-3xl shadow-md transition-all duration-300 hover:bg-red-600'>
                                                              Ver trailer
                                                          </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </SwiperSlide>
                                                ))}
                                            </Swiper>
                                            </div>
                                    ) : (
                                        <p className="text-gray-400">Cargando películas...</p>
                                    )
                                ) : (
                                    <p className="text-gray-400">Cargando series...</p>
                                )}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-400">No hay recomendaciones para esta categoría.</p>
                    )}
            <button
                onClick={() => setVista('home')}
                className="mt-5 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-800"
            >
                Volver
            </button>
        </div>
    );
}

export default Recommend;