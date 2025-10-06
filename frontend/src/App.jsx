import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './css/style.css';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]);

  return (
    <>
      {/* <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path='/travels' element={<TravelsPage/>}/>
        <Route path='/travels/:id' element={<TravelPage/>}/>
      </Routes> */}
    </>
  );
}

export default App;
