import dotenv from 'dotenv';
import { steamSDK } from './steam';
dotenv.config();

describe('steamSDK', () => {
  const steamSdk = new steamSDK(process.env.STEAM_KEY);
  const steamId = '76561198158864845';

  jest.setTimeout(60000);

  it('steamSDK.getAccountInfo ok', async () => {
    const accountInfo = await steamSdk.getAccountInfo(steamId);
    expect(accountInfo?.steamid).toEqual(steamId);
    expect(accountInfo?.personaname).toEqual("SavyNavi");
  });

  it('steamSDK.getUserGamesInfo ok', async () => {
    const userGameInfo = await steamSdk.getUserGamesInfo(steamId);
    expect(userGameInfo?.game_count).toEqual(9);
  });
});
