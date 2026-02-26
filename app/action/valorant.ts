"use server";

import HenrikValorantAPI from "unofficial-valorant-api";
import { GoogleGenAI } from "@google/genai";

// Initialize the API with your key
// Note: If you don't have a specific Henrik API key, 
// some features work without one, but it's better to provide it if you have one.
// @ts-expect-error The unofficial-valorant-api types omit the constructor argument but the JS implementation accepts it
const vapi = new HenrikValorantAPI(process.env.HENRIK_API_KEY);

export async function getDetailedStats(gameName: string, tagLine: string) {
  try {
    // 1. Get Account Info (Necessary for PUUID and Region)
    const account = await vapi.getAccount({ name: gameName, tag: tagLine });
    if (account.status !== 200) throw new Error("Account not found");

    const { puuid, region } = account.data as any;

    // 2. Get Match History (The list you'll show in the UI)
    const matchHistory = await vapi.getMatches({ 
      region: region as any, 
      name: gameName, 
      tag: tagLine,
      size: 5 // Start with last 5 matches for AI analysis
    });

    // 3. Get MMR (Rank) Data - Essential for AI to know the player's skill level
    const mmrData = await vapi.getMMRByPUUID({
      version: "v2",
      region: region as any,
      puuid: puuid
    });

    return {
      account: account.data,
      matches: matchHistory.data,
      rank: mmrData.data
    };
  } catch (error: any) {
    console.error("Fetch Error:", error);
    throw new Error(error.message);
  }
}


export async function getMatchAnalysisData(matchId: string, playerName: string, playerPuuid: string) {
  const matchDetails = await vapi.getMatch({ match_id: matchId });
  
  if (!matchDetails.data) {
    throw new Error("Match not found");
  }

  // To prevent the payload from being too massive for the prompt, we strip out a lot of the deeply nested 
  // coordinate location data and keep only the stats, kills, economy, and round win conditions.
  const matchData: any = matchDetails.data;
  const reducedMatchData = {
    metadata: matchData.metadata,
    myPlayer: matchData.players.all_players.find((p: any) => p.puuid === playerPuuid),
    teams: matchData.teams,
    rounds: matchData.rounds.map((r: any) => ({
      winning_team: r.winning_team,
      end_type: r.end_type,
      bomb_planted: r.bomb_planted,
      bomb_defused: r.bomb_defused,
      player_stats: r.player_stats.find((ps: any) => ps.player_puuid === playerPuuid) // only care about my rounds stats
    }))
  };

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an expert, tactical elite Valorant Coach. Analyze this match data for the player "${playerName}".

Focus intensely on the round-by-round timeline. Look for patterns:
- Are they losing rounds because they aren't getting kills when their economy is bad? 
- Are they getting high kills but still losing rounds (meaning they might be baiting or getting low-impact kills)?
- Are they consistently dying early in the round?
- Are they planting/defusing the spike often?

Don't just regurgitate their K/D/A. Give them 2-3 specific, actionable paragraphs of advice based ONLY on the story the timeline data tells. Be direct, coaching them to improve. Use Markdown formatting.

Match Data:
${JSON.stringify(reducedMatchData, null, 2)}
    `
  });

  return response.text;
}