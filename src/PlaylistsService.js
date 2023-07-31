const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId, userId) {
    const queryPlaylist = {
      text: `SELECT playlists.id, playlists.name
            FROM playlists
            LEFT JOIN users ON users.id = playlists.owner
            WHERE playlists.id = $1 AND users.id = $2`,
      values: [playlistId, userId],
    };

    const querySongs = {
      text: `SELECT songs.id, songs.title, songs.performer
            FROM songs
            LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id
            LEFT JOIN playlists ON playlists.owner = $2
            WHERE songs.id = playlist_songs.song_id AND playlist_songs.playlist_id = $1`,
      values: [playlistId, userId],
    };

    const playlistResult = await this._pool.query(queryPlaylist);
    const songResult = await this._pool.query(querySongs);

    const finalResult = { ...playlistResult.rows[0], songs: songResult.rows };

    // Tidak perlu mapping karena tidak ditampilkan pada Apps sehingga properti bukan hal penting.
    return finalResult;
  }
}

module.exports = PlaylistsService;
