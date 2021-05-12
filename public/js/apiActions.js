async function followSomeone(userId, followId) {
    let data = {
        id: userId,
        followId: followId
    }
    let url = '/users/follow'
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    response.json(); // parses JSON response into native JavaScript objects
    location.reload();

}

async function unfollowSomeone(userId, followId) {
    let data = {
        id: userId,
        followId: followId
    }
    let url = '/users/unfollow'
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    response.json(); // parses JSON response into native JavaScript objects
    location.reload();

}