const db = require("../config/db_config");
const bcrypt = require("bcryptjs");
const User = db.users;

exports.createUser = async (data) => {
  try {
    const password = bcrypt.hashSync(data.password, 8);
    const email = data.email.toLowerCase();
    const name = data.name;
    return await User.create({ name, password, email });
  } catch (e) {
    return e;
  }
};

exports.signInAdminPanel = async (data) => {
  try {
    const email = data.email.toLowerCase();
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const passwordIsValid = bcrypt.compareSync(data.password, user.password);
    if (!passwordIsValid) {
      return {err: true, text: "Неверный пароль!", type: "Password" } ;
    }

    return {err: false, text:"Авторизаця прошла успешно", user:  {name: user.name, id: user.id}};
  } catch (e) {
    return {err: true, text: "Пользователь не найден", type: "Email" };
  }
};
