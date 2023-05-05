export async function signin (user) {
  try {
    const data = await fetch ("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    });
  
    if(!data.ok) {
      throw data;
    }

    const dataJSON = await data.json();

    return dataJSON;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function signup (user) {
  try {
    const data = await fetch ("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    });
  
    if(!data.ok) {
      throw data;
    }

    const dataJSON = await data.json();

    return dataJSON;
  } catch (error) {
    return Promise.reject(error);
  }
}