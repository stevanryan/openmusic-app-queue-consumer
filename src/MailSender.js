const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    // Parameter targetEmail adalah email tujuan.
    // Parameter content adalah data lagu (hanya menerima string).

    // Message configuration.
    const message = {
      from: 'OpenMusic Apps',
      to: targetEmail,
      subject: 'Export Playlist',
      text: 'Terlampir hasil dari export playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    // Mengirim email menggunakan transporter.
    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
