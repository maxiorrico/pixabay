import React, { Component } from 'react';
import Buscador from './componenetes/Buscador';
import Resultado from './componenetes/Resultado';

class App extends Component {

  state = {
    termino : '',
    imagenes : []
  };

  consultaApi = () => {
    const url = `https://pixabay.com/api/?key=14763259-e18920a8083d9c1a7578a160c&q=${ this.state.termino }&image_type=photo&pretty=true`;
    fetch( url )
      .then( data => data.json() )
      .then( data => {
        console.log( data );
        this.setState({ imagenes : data.hits });
      });
  }

  datosBusqueda = (termino) => {
    console.log( termino );
    this.setState({ termino }, () => {
      this.consultaApi();
    });
  }

  render () {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imágenes</p>
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>

        <Resultado imagenes={this.state.imagenes} />
      </div>
    );
  }

}

export default App;
