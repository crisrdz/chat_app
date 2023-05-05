export async function getChats(token) {
  try {
    const data = await fetch ("/api/chat/", {
      method: "GET",
      headers: {
        "X-Access-Token": token
      },
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

export async function getChat(token, chatId) {
  try {
    const data = await fetch (`/api/chat/${chatId}`, {
      method: "GET",
      headers: {
        "X-Access-Token": token
      },
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

export async function createChat(token, friendId) {
  try {
    const data = await fetch ("/api/chat/", {
      method: "POST",
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({friendId})
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

export async function deleteChat(token, chatId) {
  try {
    const data = await fetch (`/api/chat/${chatId}`, {
      method: "DELETE",
      headers: {
        "X-Access-Token": token,
      },
    });

    if(!data.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}