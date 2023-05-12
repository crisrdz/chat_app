export async function getFriends(token) {
  try {
    const data = await fetch("/api/friend", {
      method: "GET",
      headers: {
        "X-Access-Token": token,
      },
    });

    if (!data.ok) {
      throw data;
    }

    const dataJSON = await data.json();

    return dataJSON;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function addFriend(token, username) {
  try {
    const data = await fetch("/api/friend/add", {
      method: "PUT",
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username}),
    });

    if (!data.ok) {
      throw data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function declineFriend(token, username) {
  try {
    const data = await fetch("/api/friend/decline", {
      method: "PUT",
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username}),
    });

    if (!data.ok) {
      throw data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteFriend(token, username) {
  try {
    const data = await fetch("/api/friend/delete", {
      method: "PUT",
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username}),
    });

    if (!data.ok) {
      throw data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}