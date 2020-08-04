import Sequelize, { Model } from 'sequelize';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        hometown: Sequelize.STRING,
        notes: Sequelize.VIRTUAL,
        notes_hash: Sequelize.STRING,
        forgot_token: Sequelize.STRING,
        token_created_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    this.addHook('beforeSave', async user => {
      if (user.notes) {
        user.notes_hash = JWT.sign(
          { notes: user.notes },
          process.env.NOTE_SECRET
        );
      }
    });
    return this;
  }

  checkPass(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
