import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/NotFound.css'
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Helmet>
        <title>Technolaar - Pagina Niet Gevonden</title>
        <meta 
          name="description" 
          content="Oeps! De pagina die je zoekt, bestaat niet. Ga terug naar de homepagina of ontdek onze diensten." 
        />
      </Helmet>

      <div className='notFoundBannerContainer'>
        <div className="notFoundBannerText">
          <h1>404 - Pagina Niet Gevonden</h1>
          <p>Oeps! Het lijkt erop dat de pagina die je zoekt niet bestaat.</p>
          <Link to="/" className="notFoundButton">Terug naar Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;