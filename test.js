const needle = require('needle');

// this is the ID for @TwitterDev
const userId = process.env.TWITTER_USER_ID;
const url = `https://api.twitter.com/2/users/${userId}/following`;
const bearerToken = process.env.BEARER_TOKEN;

const getFollowing = async () => {
    let users = [];
    let params = {
        "max_results": 1000,
        "user.fields": "created_at"
    }

    const options = {
        headers: {
            "User-Agent": "v2FollowingJS",
            "Authorization": `Bearer ${bearerToken}`
        }
    }

    console.log(userId, bearerToken)

    let hasNextPage = true;
    let nextToken = null;
    console.log("Retrieving users this user is following...");
    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            if (resp.data) {
                users.push.apply(users, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }

    console.log(users);
    console.log(`Got ${users.length} users.`);

}

const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}

getFollowing();



const getAccessToken = async () => {
    try {
        const resp = await axios.post(
            'https://api.twitter.com/oauth2/token',
            '',
            {
                params: {
                    'grant_type': 'client_credentials'
                },
                auth: {
                    username: process.env.API_KEY,
                    password: process.env.API_KEY_SECRET
                }
            }
        );
        return Promise.resolve(resp.data.access_token);
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
};

const getFollowers = async (token, user_id, max_number) => {
    try {
        const resp = await axios.get(
            `https://api.twitter.com/2/users/${user_id}/followers`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                params: {
                    'user.fields': 'name,username',
                    'max_results': max_number
                }
            }
        );
        return Promise.resolve(resp.data);
    } catch (err) {
        return Promise.reject(err);
    }
};


getAccessToken()
    .then((token) => {
        getFollowers(token, process.env.TWITTER_USER_ID, 1000)
            .then((result) => {
                console.log(JSON.stringify(result, null, 4));
            })
            .catch(error => console.log(JSON.stringify(error)));
