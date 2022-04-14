function photographerFactory(data) {
    const { name, portrait, id, city, tagline, price, country } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.innerHTML = 
         `
            <a href="${link}${id}"><img src="${picture}"></a>
            <h2>${name}</h2>
            <h3>${city},${country}</h3>
            <p>${tagline}</p>
            <h4>${price}€/jour</h4>
        
        `
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

