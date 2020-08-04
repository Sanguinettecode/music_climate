export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe Music Climate <noreply@musicclimate.com>',
  },
};

/**
 * Serviços de email para se utilizar em produção
 * Amazon SES,
 * Mailgun,
 * Sparkpost,
 * Mandril(mailchimp),
 *
 * Serviço de email para desenvolvimento  (ambiente DEV)
 * Mailtrap
 */
