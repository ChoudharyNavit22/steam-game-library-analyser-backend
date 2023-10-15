import {
    getSteamUserAccount,
    getSteamUserOwnedGames,
    getSteamUserGameAchievement
} from './steamapi';

import type {
    ISteamAccountInfo,
    ISteamUserGamesInfo,
    ISteamUserGame
} from './interfaces';

export class steamSDK {
    steamKey: string;
    
    constructor(steamKey: string){
        this.steamKey = steamKey || "";
    }

    async getAccountInfo(
        steamId: string
      ): Promise<ISteamAccountInfo | undefined> {
        return getSteamUserAccount(this.steamKey, steamId);
      }

    async getUserGamesInfo(
        steamId: string
    ): Promise<ISteamUserGamesInfo>{
        const userGames = await getSteamUserOwnedGames(this.steamKey, steamId);
        if(userGames.game_count != 0){
            let games = [];
            await Promise.all(userGames.games.map(async (game) => {
                const gameInfo = await getSteamUserGameAchievement(this.steamKey,steamId,game.appid);
                if(gameInfo){
                    const temp: ISteamUserGame = {
                        gameName: gameInfo.gameName,
                        totalAchievements: gameInfo.totalAchievements,
                        unlockedAchievements: gameInfo.unlockedAchievements,
                        appid: game.appid,
                        playtime_forever: Math.round((game.playtime_forever/60)*100)/100
                    }
                    games.push(temp)
                }
              }));
            return {
                game_count: games.length,
                games
            }
        }
        return {
            game_count: userGames.game_count,
            games: []
        }
    }
}