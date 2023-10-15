interface ISteamUserGamesCount {
  game_count: number;
}

export interface ISteamUserGame {
  gameName: string;
  totalAchievements: number;
  unlockedAchievements: number;
  appid: number;
  playtime_forever: number;
}

export interface ISteamUserGamesInfo extends ISteamUserGamesCount {
  games: ISteamUserGame[];
}
export interface IUserGames {
    id?: number;
    steamId: string;
    games: ISteamUserGamesInfo;
  }

export interface IUserGamesStats extends ISteamUserGamesInfo {
  mostPlayedGame: {
      gameName: string;
      totalAchievements: number;
      unlockedAchievements: number;
      appid: number;
      playtime_forever: number;
  }
  totalPlaytime: number;
}