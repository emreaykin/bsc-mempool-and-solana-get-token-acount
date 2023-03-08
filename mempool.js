const { ethers } = require("ethers");

const provider = new ethers.WebSocketProvider('wss://ws-nd-984-530-583.p2pify.com/f7306bb6930c7e12a6098a37cbb01123', 56);
async function mempool(){
    provider.on("pending", async(tx)=>{
        const txInfo = await provider.getTransaction(tx);
        try{
          if(txInfo.to=="0x10ED43C718714eb63d5aA57B78B54704E256024E") {
            console.log(txInfo)
          }
            
        }
        catch{
            console.log("no data to show")
        }
        
    })
}

mempool()