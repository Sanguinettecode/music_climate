import Mail from '../../lib/Mail';

class ForgotPassword {
  get key() {
    return 'Forgotpassword';
  }

  async handle({ data }) {
    const { user, redirect_url, forgot_token } = data;
    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Recuperação de senha',
      html: `<p>Acesse o link para recuperar sua senha </p>
      <p>para recuperar sua senha, utilize este código de segurança (${forgot_token})
      ou click no link abaixo</p>
      <a href="${redirect_url}?token=${user.forgot_token}" target="blank">recuperação de senha</a>
      `,
    });
  }
}

export default new ForgotPassword();
