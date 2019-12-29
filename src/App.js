import React, { Component } from 'react';
import Buscador from './componenetes/Buscador';
import Resultado from './componenetes/Resultado';

class App extends Component {

  state = {
    termino  : '',
    pagina   : 1,
    imagenes : []
  };

  consultaApi = () => {
    const url = `https://pixabay.com/api/?key=14763259-e18920a8083d9c1a7578a160c&q=${ this.state.termino }&image_type=photo&pretty=true&page=${ this.state.pagina }`;
    fetch( url )
      .then( data => data.json() )
      .then( data => {
        console.log( data );
        this.setState({ imagenes : data.hits });
      });
  }

  datosBusqueda = (termino) => {
    this.setState({ termino : termino , pagina : 1 }, () => {
      this.consultaApi();
    });
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;
    if (pagina > 1) {
      pagina--;
      this.setState({pagina : pagina}, () => {
        this.consultaApi();
      });
    }
    console.log( pagina );
  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina;
    pagina++;
    this.setState({pagina : pagina}, () => {
      this.consultaApi();
    });
    console.log( pagina );
  }

  render () {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imágenes</p>
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>

        <Resultado
          imagenes={this.state.imagenes}
          paginaAnterior={this.paginaAnterior}
          paginaSiguiente={this.paginaSiguiente}
        />
      </div>
    );
  }

}

export default App;
