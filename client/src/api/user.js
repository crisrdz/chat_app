export async function getUsers(token, page) {
  try {
    const data = await fetch (`/api/user?page=${page}`, {
      method: "GET",
      headers: {
        "X-Access-Token": token
      }
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