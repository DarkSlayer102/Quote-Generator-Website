



function initializeQuoteApp(){
        const categoryInputs = document.querySelectorAll('input');



    const apiUrl = 'https://api.api-ninjas.com/v1/quotes?category='; 
    const apiKey = "YOUR API KEY";



    document.querySelector('.author').innerHTML = '';
    document.querySelector('.quote').innerHTML = '';

    async function fetchData(category){
        /**
        
        Feteching data such as author, quote from the api

        */
        try{
            const response = await fetch(apiUrl + category, {
            headers:{
            "X-Api-Key":apiKey
            }
        })

        
        

        const data = await response.json() //respones in json
        for (let i = 0; i < categoryInputs.length; i++) { 
            if (categoryInputs[i].value.toLowerCase() == data[0]["category"]){ //checking if the value equal to the catagory if it's then
                console.log(data)

                function convertingStaticValueToActualValue(){ //converting the static value to the dynamic value 
                    
                    document.querySelector('.author').innerHTML = "Author:" + data[0]['author']; //asssigning the values
                    document.querySelector('.quote').innerHTML = "<strong>Quote:</strong> " + data[0]['quote']; 
                }
                
                convertingStaticValueToActualValue(); 
            }
            
        }

        
        //This part for the error

        } catch (error){
            const errorElement = document.getElementById('error');
            errorElement.innerHTML = 'Apologies for the inconvenience caused. Please bear with us while we resolve the issue.';
            errorElement.style.fontFamily = 'Helvetica';
            errorElement.style.fontSize = '40px';
            errorElement.style.color = 'darkred';
            console.error('Error occurred: ' + errorElement.innerHTML);
        }
    

        


    }



    linkingCategory = ()=>{
        for (let i = 0; i < categoryInputs.length; i++) {
            categoryInputs[i].addEventListener('click',()=>{
                fetchData(categoryInputs[i].value.toLowerCase()); //fetching the category
            })
        }


    }

    linkingCategory();






}




initializeQuoteApp();
