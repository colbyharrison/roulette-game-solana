const web3 = require("@solana/web3.js");

const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
//For checking whether the connection is successfully made

const userWallet = web3.Keypair.generate();
const publicKey = new PublicKey(userWallet._keypair.publicKey).toString();

const secretKey = userWallet._keypair.secretKey;

console.log(userWallet);

const transferSOL = async (from, to, transferAmt) => {
    try {
        const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: new web3.PublicKey(from.publicKey.toString()),
                toPubkey: new web3.PublicKey(to.publicKey.toString()),
                lamports: transferAmt * web3.LAMPORTS_PER_SOL
            })
        );

        const signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        console.log('Signature is ', signature);

    } catch (error) {
        console.log(error);
    }
}

const getWalletBalance = async (pubk) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(new PublicKey(pubk));
        return walletBalance / web3.LAMPORTS_PER_SOL;
    } catch (error) {
        console.log(error);
    }
}

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);

        console.log(`-- Airdropping 2 SOL --`)

        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );

        await connection.confirmTransaction(fromAirDropSignature);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getWalletBalance,
    transferSOL,
    airDropSol
}