import Role from "./models/Role.js";

async function initialValue () {
  const roles = await Role.find();

  if(roles.length < 2) {
    await Role.deleteMany({});
    await Role.create([
      {
        role: "User"
      },
      {
        role: "Admin"
      }
    ]);

    console.log("Roles created");
  }
}

initialValue();