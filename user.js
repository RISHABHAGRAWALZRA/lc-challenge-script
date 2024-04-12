const { Client } = require('twitter-api-sdk');
require('dotenv').config()
const { TwitterApi } = require('twitter-api-v2');
// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const main = async () => {
    // const client = new Client(process.env.BEARER_TOKEN);
    // const { data } = await client.users.findUserByUsername("7rishabhagrawal");
    // if (!data) console.log("Couldn't find user");
    // console.log(data)

    // Instantiate with desired auth type (here's Bearer v2 auth)
    const twitterClient = new TwitterApi(token);

    // Tell typescript it's a readonly app
    const readOnlyClient = twitterClient.readOnly;

    // Play with the built in methods
    const user = await readOnlyClient.v2.userByUsername('7rishabhagrawal');

}

main()



