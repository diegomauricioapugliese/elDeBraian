console.log("SCRIPT");

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZ3d6aGJrYnBrY2pkYWh6YXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NzE4MzMsImV4cCI6MjA0NDI0NzgzM30.dm2tSAv0ghnoVhibOKx55V3E0oVlcB7T5b6IS9jMP3g";
const autorizacion = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZ3d6aGJrYnBrY2pkYWh6YXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NzE4MzMsImV4cCI6MjA0NDI0NzgzM30.dm2tSAv0ghnoVhibOKx55V3E0oVlcB7T5b6IS9jMP3g";

$(document).ready(function(){
    
    let facturas =  readFacturas();

    $.when(facturas).done(function(responseFacturas){

        let out = "";
   
        responseFacturas.forEach(fact => {

            out += `

                <div class="facturas">

                    <div>
                        <span> Fecha: ${fact.fecha} </span>
                    </div>

                    <div>
                        <span> Estado: ${fact.estado} </span>
                    </div>

                    <div>
                        <span> Saldo: $ ${fact.saldo} </span>
                    </div>

                </div>
            `;

        });

        $("#contenedorFacturas").html(out);
    });
    

});

async function readFacturas () {

   
    const myHeader = {
        "apiKey": apiKey,
        "Authorization": autorizacion
    };

    const config = {
        method : "GET",
        headers : myHeader
    }

    try {

        const response = await fetch ("https://gdgwzhbkbpkcjdahzazg.supabase.co/rest/v1/facturas?select=*", config);
        const result = await response.json();
        
        return result;

    } catch (error) {
        console.log(error);
    }
}