document.addEventListener('DOMContentLoaded', () => {
    let pagina = 1;
  
    document.addEventListener('click', ({target}) => {

        if(target.matches('#paganterior')){
            pagina = target.dataset.page;
            return location.href = `http://localhost:3000/?page=${pagina}`;
        };

        if(target.matches('#pagsiguiente')){
            pagina = target.dataset.page;
            return location.href = `http://localhost:3000/?page=${pagina}`;
        };

    }); //!EV-CLICK
  
  });
  


   

