export interface ISteamAccountInfo {
    steamid: string;
    communityvisibilitystate: number;
    profilestate: number;
    personaname: string;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    avatarhash: string;
    realname: string;
    primaryclanid: string;
    loccountrycode: string;
    locstatecode: string;
    lastlogoff: number;
    personastate: number;
    timecreated: number;
    personastateflags: number;
    loccityid: number;
  }

export interface ISteamGameInfo {
    appid: number;
    playtime_forever: number;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    rtime_last_played: number;
    playtime_disconnected: number;
}

interface ISteamUserGamesCount {
    game_count: number;
}

export interface ISteamUserGameCollection extends ISteamUserGamesCount {
    games?: ISteamGameInfo[];
}

export interface ISteamUserGameAchievement {
    gameName: string;
    totalAchievements: number;
    unlockedAchievements: number;
}

export interface ISteamUserGamesInfo extends ISteamUserGamesCount {
    games: {
        gameName: string;
        totalAchievements: number;
        unlockedAchievements: number;
        appid: number;
        playtime_forever: number;
    }[];
}