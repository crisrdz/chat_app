export async function getChats(token) {
  try {
    const data = await fetch ("/api/chat/", {
      method: "GET",
      headers: {
        "X-Access-Token": token
      },
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

export async function getChat(token, chatId) {
  try {
    const data = await fetch (`/api/chat/${chatId}`, {
      method: "GET",
      headers: {
        "X-Access-Token": token
      },
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