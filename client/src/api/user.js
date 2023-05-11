export async function getUsers(token, page) {
  try {
    const data = await fetch(`/api/user/all?page=${page}`, {
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

export async function getUser(token) {
  try {
    const data = await fetch("/api/user", {
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

export async function updateUser(token, user) {
  try {
    const data = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
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

export async function changeVisibility(token) {
  try {
    const data = await fetch("/api/user/visibility", {
      method: "PUT",
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

export async function getUserByUsername(token, username) {
  try {
    const data = await fetch(`/api/user/${username}`, {
      method: "GET",
      headers: {
        "X-Access-Token": token,
      },
    });

    if (!data.ok) {
      throw data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}