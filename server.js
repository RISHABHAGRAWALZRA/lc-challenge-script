require('dotenv').config()

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const { Client, auth } = require('twitter-api-sdk');
const { TwitterApi } = require('twitter-api-v2');

const sqlite3 = require('sqlite3').verbose();

const axios = require('axios')

const initializeAndConnect = (path) => {
    var serviceAccount = require(path);

    initializeApp({
        credential: cert(serviceAccount)
    });

    const db = getFirestore();
    return db
}



const main = async () => {
    // db = initializeAndConnect("/Users/rishabhagrawal/Data/Workspace/Avail/Firestore/blobscriptions-firebase-adminsdk-701wh-21f8ee1cbf.json")

    // const collectionRef = db.collection('avail-users');
    // const snapshot = await collectionRef.count().get();
    // console.log("Count of Documents in BlobScription's firestore:", snapshot.data().count);


    // Instantiate with desired auth type (here's Bearer v2 auth)
    // const twitterClient = new TwitterApi(process.env.BEARER_TOKEN);
    // // Tell typescript it's a readonly app
    // const readOnlyClient = twitterClient.readOnly;

    // const followersOfJack = await readOnlyClient.v2.followers(process.env.TWITTER_USER_ID);

    // console.log(followersOfJack)

    //const followersOfJackAsPaginator = await client.v2.followers('12', { asPaginator: true });

    const client = new Client(process.env.BEARER_TOKEN);

    const followers = await client.users.usersIdFollowers(process.env.TWITTER_USER_ID);
    console.log(followers.data);


    // const authClient = new auth.OAuth2User({
    //     client_id: process.env.CLIENT_ID,
    //     callback: "http://127.0.0.1:3000/callback",
    //     scopes: ["tweet.read", "users.read", "follows.read"],
    // });

    // const client = new Client(authClient);
    // const followers = await client.users.usersIdFollowers(process.env.TWITTER_USER_ID);
    // console.log(followers.data);


    // const db = new sqlite3.Database('/Users/rishabhagrawal/Data/Workspace/Avail/Firestore/lc_database.db', (err) => {
    //     if (err) return console.error(err.message)
    // });

    // db.serialize(() => {
    //     db.each("SELECT * FROM lcs", (err, row) => {
    //         console.log(row.Address + ": " + row.up_count);
    //     });
    // });


    // db.close();

}







main()

