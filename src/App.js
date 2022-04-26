import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './components/Coin';
import Header from './components/Header';





function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(30)




  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${perpage}&page=${page}&sparkline=false`
      )
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error));

    }, [page, perpage]);


    const handleChange = e => {
      setSearch(e.target.value);
      if (e.target.value === ''){
     setPage(1)
     setPerpage(30)
    }
      else{
        setPerpage(99999999)
      }
  }
    
    
  

  let pg = document.querySelectorAll('.page')

  function ChangePage(pg){
    console.log(pg.target.id)
    setPage(pg.target.id)
  }



  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );




return(

  <div>
    <Header />
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Kriptovaliutų paieška</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Įveskite pavadinimą'
          />
        </form>
       </div>

     <p style={{fontWeight: 'bolder'}}>Kriptovaliutos rodomos pagal rinkos dydį</p>

      <div className='coin-container-title'>
      <div className="a"><h2>Pavadinimas</h2></div>
     <div className="a"><h2>Valiuta</h2></div> 
     <div className="a"><h2>Kaina</h2></div> 
     <div className="a"><h2>Kainos kaita (24h)</h2></div> 
     <div className="a"><h2>Rinkos dydis</h2></div> 
     </div>

  {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            volume={coin.total_volume}
            marketcap={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}

      <div className="pages">
       <button onClick={ChangePage} className="page" id='1'>1</button>
       <button onClick={ChangePage} className="page" id='2'>2</button>
       <button onClick={ChangePage} className="page" id='3'>3</button>
       <button onClick={ChangePage} className="page" id='4'>4</button>
       <button onClick={ChangePage} className="page" id='5'>5</button>
      </div>


    </div>
    </div>
  );
}

export default App;