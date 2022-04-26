import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import './header.css'



function Header(){

    const settings = {
        dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      speed: 4000,
      autoplaySpeed: 1500,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
      
      };

        const [coins, setCoins] = useState([]);
      
        
        useEffect(() => {
          axios
            .get(
              'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=gecko_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h'
            )
            .then(res => {
              setCoins(res.data);
            })
            .catch(error => console.log(error));
      
          }, []);

         const item = coins.map(coin => {
             return(
              <div className="carousel">
             <h2>{coin.name.toUpperCase()}</h2>
             <img src={coin.image}></img>
             {coin.price_change_percentage_24h < 0 ? (
     <div style={{color: 'red'}}><p>{coin.price_change_percentage_24h}%</p></div> 
     ) : (
      <div style={{color: 'green'}}><p>{coin.price_change_percentage_24h}%</p></div> 
     )}
           </div>
            
             )
         })

         return(
           <div className="main">
             <div className="header">
               <div className="aprasymas"><p>Kriptovaliutomis laikomi skaitmeniniai ir tik virtualioje erdvėje egzistuojantys valiutos tipai, paremti blokų grandinės (angl. blockchain) technologija ir leidžiantys anonimiškai atlikti įvairius internetinius mokėjimus be trečiųjų šalių tarpininkavimo. </p></div>
           <Slider {...settings}>
             {item}
            </Slider>   
             </div>
             </div>
         )
      

}
    

  export default Header;