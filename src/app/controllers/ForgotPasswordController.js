import crypto from 'crypto';
import * as Yup from 'yup';
import moment from 'moment';
import User from '../models/User';
import Queue from '../../lib/Queue';
import ForgotPassword from '../jobs/ForgotPassword';

class ForgotPasswordController {
  async store(req, res) {
    const { email, redirect_url } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'algo nao deu certo, verifique o email e tente novamente',
        },
      });
    }
    const forgot_token = await crypto.randomBytes(10).toString('hex');
    user.forgot_token = forgot_token;
    user.token_created_at = new Date();
    await user.save();

    await Queue.add(ForgotPassword.key, {
      user,
      redirect_url,
      forgot_token,
    });

    return res.json('email de recuperação de senha enviado');
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      forgot_token: Yup.string(),
      password: Yup.string()
        .min(6)
        .when('oldpassword', (oldpassword, field) => {
          return oldpassword ? field.required() : field;
        }),
      confirmpassword: Yup.string().when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
    });
    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation fail' });
    }

    const { forgot_token, password } = req.body;

    const user = await User.findOne({ where: { forgot_token } });

    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Você não está autorizado',
        },
      });
    }
    const tokenExpired = moment()
      .subtract('2', 'days')
      .isAfter(user.token_created_at);

    if (tokenExpired) {
      return res.status(403).json({
        error: {
          message: 'data limite de recuperação excedida',
        },
      });
    }
    user.password = password;
    user.forgot_token = null;
    user.token_created_at = null;
    await user.save();

    return res.json('Sucesso! Retorne ao aplicativo para fazer o login');
  }
}

export default new ForgotPasswordController();
