const api_key = '?api_key=cfe422613b250f702980a3bbf9e90716'

//let url = 'https://api.themoviedb.org/3/movie/76341?api_key={api_key}'

function getUrlforFilm(numberInReleaseOrder){
    let movieId;
    switch(numberInReleaseOrder){
        case 1:{
            movieId=11
            break
        }
        case 2:{
            movieId=1891
            break
        }
        case 3:{
            movieId=1892
            break
        }
        case 4:{
             movieId=1893
             break
        }
        case 5:{
            movieId=1894
            break
        }
        case 6:{
            movieId=1895
            break
        }
        case 7:{
            movieId=140607
            break
        }


    }

    return 'https://api.themoviedb.org/3/movie/'+movieId+api_key

}

const imageUrl = 'http://image.tmdb.org/t/p'
let posterSize = '/w342'

function getPosterUrl(posterPath){
    
    return imageUrl+posterSize+posterPath
}

export {getUrlforFilm, getPosterUrl}