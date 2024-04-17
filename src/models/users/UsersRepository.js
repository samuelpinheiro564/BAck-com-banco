import pg from "../../database/index.js"

export default class UsersRepository {
  constructor() {
this.pg=pg;
  }

  async getUsers() {
    try{
      const allUsers =await this.pg.manyOrNone("SELECT * FROM users");
      console.log(allUsers);
      return allUsers;
    }
    catch(error){
      console.log("Falhou ao buscar todos os usuários");
      throw error;
    }
   
  };

  async  getUserById(id) {
    try{
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE id = $1", id);
      return user;
    }
    catch(error){
      console.log("Falhou ao buscar o usuário pelo id");
      throw error;
    }
   
  };

  async getUserByEmail(email) {
    try{
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE email = $1", email);
      return user;
    }
    catch(error){
      console.log("Falhou ao buscar o usuário pelo email");
      throw error;
    }
  };

  async createUser(user) {
    try{
      await this.pg.none("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [   user.name,user.email, user.password ])
      return user;
    }
    catch(error){
      console.log("Falhou ao criar o usuário");
      throw error;
    }

  }

  async  updateUser(id, name, email, password) {
    const user = await this.getUserById(id);

    try{
      if (!user) {
        return null;
      }
      const userUpdate = await this.pg.oneOrNone("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]);
      return userUpdate;
    }
    catch(error){
      console.log("Falhou ao atualizar o usuário");
      throw error;
    }}

  async deleteUser(id) {
    try{
      await this.pg.none("DELETE FROM users WHERE id = $1", id);
    }
    catch{
      console.log("Falhou ao deletar o usuário");
      throw error;
    }
  }
}
