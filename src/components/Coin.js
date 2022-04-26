import React from 'react';
import './coin.css';

const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  return (

    <div className='coin-container'>
      <img src={image} />
     <div className="a"><h2>{name}</h2></div>
     <div className="a"><h2>{symbol.toUpperCase()}</h2></div> 
     <div className="a"><p>€{price}</p></div> 
     {priceChange < 0 ? (
     <div style={{color: 'red'}} className="a"><p>{priceChange}%</p></div> 
     ) : (
      <div style={{color: 'green'}} className="a"><p>{priceChange}%</p></div> 
     )}
    <div className="a"><p>€{marketcap.toLocaleString()}</p></div> 
    </div> 


  );
};

export default Coin;