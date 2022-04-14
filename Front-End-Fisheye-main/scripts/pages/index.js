    
    //CRÉATION DE TABLEAUX
      
        //Tableau vide pour les datas
        let dataPhotographers = [];

        //Html photographers section
        let SectionPhotographers = document.querySelector (".photographers_section");

        //Portrait des Photographes
        let PhotographersPortrait = "assets/images/Sample_Photos/Photographers_ID_Photos"

        //Lien vers les profils des photographes
        let link = `photographer.html?id=`;
    
    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        
       
      


        
        
    






        //Fetch

        



        fetch('data/photographers.json')
            .then (res => {
                return (res.json())
            }) 
            

            .then (data => {
              
               displayData(data.photographers);
            
                

            })


          
        // et bien retourner le tableau photographers seulement une fois
       
        
    }



    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };


    async function init() {
        // Récupère les datas des photographes
        await getPhotographers();
        
        
    };

    init();
    
    