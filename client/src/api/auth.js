export async function signin (user) {
  try {
    const data = await fetch ("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    });
  
    const dataJson = await data.json();
  
    if(!data.ok) {
      throw dataJson;
    }

    return dataJson;
  } catch (error) {
    console.error(new Error(error.message));
    return error;
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
  
    const dataJson = await data.json();
  
    if(!data.ok) {
      throw dataJson;
    }

    return dataJson;
  } catch (error) {
    return error;
  }
}