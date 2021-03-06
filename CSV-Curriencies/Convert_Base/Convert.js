module.exports=(convert,axios,csvtojson)=>{
    convert.get('/data/:currency_base',(req,res)=>{
        var Base=req.params.currency_base;
        csvtojson().fromFile('./Csv_File/data.csv').then((data)=>{
            var Give_currency=data
            axios.get('https://api.exchangeratesapi.io/latest?base='+Base)
            .then((data)=>{
                var data_rates=data.data.rates
                for (var i of Give_currency){                    
                    var Donation_Currency=i.Donation_Currency                    
                    for (var [key,value] of Object.entries(data_rates)){                        
                        if (Donation_Currency==key){
                            i.Donation_Amount= i.Donation_Amount/value +" "+ Base
                        }
                    } 
                }
                res.send(Give_currency)
                // console.log("Donation_Amount convert into "+ Base +" sucessfully")
            }).catch((err)=>{
                res.send(err.message)
                console.log(err);
            })            
        })
    })
}
