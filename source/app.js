import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios'
import {getUrlforFilm, getPosterUrl} from './helper.js'

class Person extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            personInfo: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(personInfo){
        this.setState({personInfo})
        console.log(this.state.personInfo)
    }

    componentDidMount(){
        axios.get('https://swapi.co/api/people/2/')
            .then(response =>{
                let personInfo = response.data;
                console.log(personInfo, 'hiiliöjlkj')
                this.setState({personInfo})
            }
        )
        
    }

    render(){
        if(!this.state.personInfo){
            return <div></div>
        }
        console.log(this.state.personInfo)
        return(
            <div className="Person myComponent">
                <h3>{this.state.personInfo.name}</h3>
                <p>Birthday: {this.state.personInfo.birth_year}</p>
                <p>Gender: {this.state.personInfo.gender}</p>
                <p>Height: {this.state.personInfo.height}cm</p>
                <Species url={this.state.personInfo.species}/>
                <HomeWorld url={this.state.personInfo.homeworld}/>
                <FilmHolder films={this.state.personInfo.films} clickHandler = {this.handleClick} />
            </div>
            
        )
    }
}

class Species extends React.Component{
    constructor(){
        super();
        this.state = {
            speciesInformation:null
        }
    }

    componentDidMount(){
        let url = this.props.url
        axios.get(url).then(response=>{
            let speciesInformation = response.data
            this.setState({speciesInformation})

        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            let url = nextProps.url
        axios.get(url).then(response=>{
            let speciesInformation = response.data
            this.setState({speciesInformation})

        })
        }
    }

    render(){
        if(!this.state.speciesInformation){
            return <div></div>
        }
        return(
            <div className= "Species">
                <h5>Species</h5>
                <p>Name: {this.state.speciesInformation.name}</p>
                <p>Classification: {this.state.speciesInformation.classification}</p>
                <p>Designation: {this.state.speciesInformation.designation}</p>

            </div>
        )
    }
}

class HomeWorld extends React.Component{
    constructor(){
        super();
        this.state ={
            homeworld: null
        }
    }

    componentDidMount(){
        let url = this.props.url
        axios.get(url).then(response =>{
            let homeworld = response.data;
            this.setState({homeworld})

        })       

    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            let url = nextProps.url
        axios.get(url).then(response=>{
            let homeworld = response.data
            this.setState({homeworld})

        })
        }
    }

    render(){
        if(!this.state.homeworld){
            return <div></div>
        }
        return(
            <div className="HomeWorld">
                <h5>Homeworld</h5>
                <p>Name: {this.state.homeworld.name}</p>
                <p>Population: {this.state.homeworld.population}</p>
                <p>Terrain: {this.state.homeworld.terrain}</p>

            </div>
        )
    }
}

class Character extends React.Component{
    constructor(){
        super();
        this.state = {
            characterInfo:null
        }
        let _isMounted = false;
    }
    set isMounted(isMounted){
        this._isMounted = isMounted;
    };
    

    componentDidMount(){
        this._isMounted = true
        axios.get(this.props.url).then(response=>{
            let characterInfo = response.data
            if(this._isMounted)
            this.setState({characterInfo})
        })
        
        console.log('mounted')

    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            let url = nextProps.url
        axios.get(url).then(response=>{
            let characterInfo = response.data
            if(this.isMounted){
                this.setState({characterInfo})
            }
            else{}
            

        })
        console.log('will receive props')
        }
    }

    componentWillUnmount(){
        console.log('unmounting')
        this.isMounted = false;
    }

    render(){
        if(!this.state.characterInfo){
            return (<div></div>)
        }
        return(
            <div className="Character" onClick={ ()=>{
                this.props.clickHandler(this.state.characterInfo)}}>
                <button><p>{this.state.characterInfo.name}</p></button>
            </div>
        )
    }
}

class CharacterHolder extends React.Component{
    constructor(){
        super();
        this.state = {
            characters: null,
            visible: true
        }
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount(){
        let characters = this.props.characters
        this.setState({characters})
    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            let characters = this.props.characters
            this.setState({characters})
        }
    }

    onClick(){
        this.setState({visible: !this.state.visible})
        console.log('clicked')
    }

    render(){
        if(!this.state.characters){
            return (<div></div>)
        }
        let clickHandler = this.props.clickHandler
        let charactersArray = this.state.characters.map(function(url, i){
                return (<li><Character url={url} key={new Date()} clickHandler={clickHandler}></Character></li>);
        })        
        return(
            <div className="CharacterHolder" >
                <button onClick={this.onClick}>
                    <h4>Characters: </h4>
                </button>
                
                {(this.state.visible) ?
                    <ul className="CharacterList"  >
                    {charactersArray}
                </ul> : null
                }
               
            </div>
        )
    }
}




class Film extends React.Component{
    constructor(){
        super();
        this.state = {
            filmUrl: null,
            filmInfo: null,
            theMvDbInfo: null
        }
    }

    componentDidMount(){
        let filmUrl = this.props.url
        axios.get(filmUrl).then(response => {
            let filmInfo = response.data
            this.setState({filmInfo})
        })
        this.setState({filmUrl})
        let filmNumber = parseInt(filmUrl.match(/\d/)[0])
        let filmApiUrl =(getUrlforFilm(filmNumber))
        axios.get(filmApiUrl).then(response => {
            let theMvDbInfo = response.data
            this.setState({theMvDbInfo})
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            let filmUrl = nextProps.url
            axios.get(filmUrl).then(response => {
                let filmInfo = response.data
                this.setState({filmInfo})
            })
            this.setState({filmUrl})
            let filmNumber = parseInt(filmUrl.match(/\d/)[0])
            let filmApiUrl =(getUrlforFilm(filmNumber))
            axios.get(filmApiUrl).then(response => {
                let theMvDbInfo = response.data
                this.setState({theMvDbInfo})
            })
        }
    }
    

    render(){
        if(!this.state.filmUrl || !this.state.filmInfo || !this.state.theMvDbInfo){
            return (<div></div>)
        }
        return(
            <div className="FilmItem">
                <h3><p>{this.state.theMvDbInfo.title}</p></h3>
                <h4><p>{this.state.theMvDbInfo.tagline}</p></h4>
                <img src={getPosterUrl(this.state.theMvDbInfo.poster_path)} alt={this.state.theMvDbInfo.title}/>
                <CharacterHolder characters={this.state.filmInfo.characters} clickHandler={this.props.clickHandler}/>
            </div>
        )
    }
}

class FilmHolder extends React.Component{
    constructor(){
        super();
        this.state = {
            films: null
        }
    }

    componentDidMount(){
        let films = this.props.films.sort()
        this.setState({films})      
    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            let films = nextProps.films.sort()
            this.setState({films})  
        }
    }

    

    render(){
        if(!this.state.films){
            return (<div></div>)
        }
        let clickHandler = this.props.clickHandler;

        let filmsArray = this.state.films.map(function (film, i){
            return(<li><Film url={film} key={film} clickHandler={clickHandler}></Film></li>)

        })

        return(
            <div className="FilmHolder">
                <h3>Film appearences</h3>
                <ul>
                    {filmsArray}
                </ul>
            </div>
        )


    }
}



class App extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <Person/>
            </div>
        )
    }
}

$(function(){
    console.log('jquery')
    
})
console.log(getUrlforFilm)

ReactDom.render(<App/>, document.getElementById('app'))