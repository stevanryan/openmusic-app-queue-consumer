class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      // Mengambil playlistId, userId, dan targetEmail.
      // Dilakukan parse untuk mengubah string menjadi objek.
      const { playlistId, userId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = {
        playlist: await this._playlistsService.getPlaylists(playlistId, userId),
      };
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlists));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
