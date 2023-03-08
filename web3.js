/*const web3 = require("@solana/web3.js");
(async () => {
  const publicKey = new web3.PublicKey(
    "Wallet Adress"
  );
  const solana = new web3.Connection("https://cosmopolitan-compatible-haze.solana-mainnet.discover.quiknode.pro/2f74a9184ee0a2fb3971558a3646b4de8fcea69d/");
  console.log(await solana.getAccountInfo(publicKey));
})();
*/


const { Connection, GetProgramAccountsFilter } = require("@solana/web3.js");
const { TOKEN_PROGRAM_ID }  = require("@solana/spl-token");

const rpcEndpoint = 'https://cosmopolitan-compatible-haze.solana-mainnet.discover.quiknode.pro/2f74a9184ee0a2fb3971558a3646b4de8fcea69d/';
const solanaConnection = new Connection(rpcEndpoint);

const walletToQuery = 'Wallet Adress'; //example: vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg

async function getTokenAccounts(wallet, solanaConnection) {
    const filters = [
        {
          dataSize: 165,    //size of account (bytes)
        },
        {
          memcmp: {
            offset: 32,     //location of our query in the account (bytes)
            bytes: wallet,  //our search criteria, a base58 encoded string
          },            
        }];
    const accounts = await solanaConnection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        {filters: filters}
    );
    console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
    accounts.forEach((account, i) => {
        //Parse the account data
        const parsedAccountInfo = account.account.data;
        const mintAddress = parsedAccountInfo["parsed"]["info"]["mint"];
        const tokenBalance = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
        //Log results
        console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
        console.log(`--Token Mint: ${mintAddress}`);
        console.log(`--Token Balance: ${tokenBalance}`);
    });
}
getTokenAccounts(walletToQuery,solanaConnection);