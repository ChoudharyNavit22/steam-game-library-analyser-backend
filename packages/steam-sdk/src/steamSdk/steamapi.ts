import axios from 'axios';
import promiseRetry from 'promise-retry';
import _ from 'lodash';
import {
    ISteamAccountInfo,
    ISteamUserGameCollection,
    ISteamUserGameAchievement
} from './interfaces';

function getSteamAPIHost() {
    return 'http://api.steampowered.com';
  }

  async function requestSteamAPIOnce(url: string) {
    const { data } = await axios.get(url).catch((error) => {
      throw new Error(JSON.stringify(error));
    });
  
    return data;
  }
  
  async function requestSteamAPI(url: string) {
    return await promiseRetry(
      (retry) => {
        return requestSteamAPIOnce(url).catch(retry);
      },
      { retries: 3 },
    );
  }

export async function getSteamUserAccount(steamKey: string, steamId: string): Promise<ISteamAccountInfo | undefined> {
    const steamHost = getSteamAPIHost();
    const url = `${steamHost}/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${steamId}`;
    const data = await requestSteamAPI(url);
    return data?.response.players.length > 0 ? data?.response.players[0] : undefined;
}

export async function getSteamUserOwnedGames(steamKey: string, steamId: string): Promise<ISteamUserGameCollection> {
    const steamHost = getSteamAPIHost();
    const url = `${steamHost}/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${steamId}&format=json`;

    try {
      const data = await requestSteamAPI(url);
      if(data?.response && data?.response?.game_count){
        return data?.response;
      }
      return {
        game_count: 0,
        games: []
      }
    } catch(err) {
      throw new Error(err.message);
    }
}

export async function getSteamUserGameAchievement(steamKey: string, steamId: string, appId: number): Promise<ISteamUserGameAchievement | undefined> {
    const steamHost = getSteamAPIHost();
    const url = `${steamHost}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${steamKey}&steamid=${steamId}`;

    try {
      const data = await requestSteamAPI(url);
      if(data?.playerstats?.achievements && data?.playerstats?.achievements.length > 0) {
          const unlockedAchievements: number = _.filter(data.playerstats.achievements,{"achieved": 1}).length;
          return {
              gameName: data?.playerstats?.gameName,
              totalAchievements: data?.playerstats?.achievements.length,
              unlockedAchievements: unlockedAchievements
          }
      }
      return {
          gameName: data?.playerstats?.gameName,
          totalAchievements: 0,
          unlockedAchievements: 0
      }
    } catch(err) {
      return undefined;
    }
}