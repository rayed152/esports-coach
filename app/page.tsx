"use client";
import { useState } from "react";
// 1. Updated import to match your new server action name
import { getDetailedStats, getMatchAnalysisData } from "./action/valorant";

export default function Home() {
  const [riotId, setRiotId] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const [aiAdvice, setAiAdvice] = useState<Record<string, string>>({});

  const handleSearch = async () => {
    setLoading(true);
    try {
      const [name, tag] = riotId.split("#");
      if (!name || !tag) throw new Error("Format must be Name#Tag");

      // 2. Call the new detailed function
      const result = await getDetailedStats(name.trim(), tag.trim());
      setData(result);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeMatch = async (matchId: string) => {
    if (aiAdvice[matchId]) return; // already analyzed
    setAnalyzing(matchId);
    try {
      const analysis = await getMatchAnalysisData(matchId, data.account.name, data.account.puuid);
      setAiAdvice(prev => ({ ...prev, [matchId]: analysis || "No advice returned." }));
    } catch (err) {
      alert("Failed to get AI coaching advice.");
    } finally {
      setAnalyzing(null);
    }
  };

  return (
    <main className="p-10 max-w-3xl mx-auto bg-slate-50 min-h-screen text-slate-900">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-red-600 italic">
        VALORANT <span className="text-slate-800">AI AGENT</span>
      </h1>
      
      <div className="flex gap-2 mb-10 shadow-md p-2 bg-white rounded-lg">
        <input 
          className="p-3 flex-1 rounded text-black outline-none bg-transparent"
          placeholder="immature#meme" 
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)} 
        />
        <button 
          className="bg-red-600 px-6 py-2 rounded text-white font-bold hover:bg-red-700 transition-colors disabled:bg-slate-400"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "FETCHING..." : "ANALYZE ACCOUNT"}
        </button>
      </div>

      {data && (
        <div className="space-y-6">
          {/* 3. Account & Rank Header */}
          <div className="bg-slate-800 p-6 rounded-xl text-white shadow-lg flex justify-between items-center border-b-4 border-red-500">
            <div>
              <h2 className="text-2xl font-black">{data.account.name}#{data.account.tag}</h2>
              <p className="text-slate-400 font-medium">Level {data.account.account_level} • {data.account.region.toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase text-slate-400 font-bold">Rank</p>
              <p className="text-xl font-bold text-blue-400">
                {data.rank?.current_data?.currenttierpatched || "Unranked"} {data.rank?.current_data?.ranking_in_tier != null ? `(${data.rank?.current_data?.ranking_in_tier} RR)` : ""}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-8 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
            Last 5 Matches
          </h3>

          <div className="grid gap-4">
            {data.matches.map((match: any) => {
              // Helper to find the searched player in this specific match
              const player = match.players.all_players.find(
                (p: any) => p.puuid === data.account.puuid
              );

              const isExpanded = expandedMatchId === match.metadata.matchid;
              const redTeam = match.players.all_players.filter((p: any) => p.team === "Red").sort((a: any, b: any) => b.stats.score - a.stats.score);
              const blueTeam = match.players.all_players.filter((p: any) => p.team === "Blue").sort((a: any, b: any) => b.stats.score - a.stats.score);
              const hasTeams = redTeam.length > 0 || blueTeam.length > 0;
              
              const renderPlayerRow = (p: any, i: number, bgColorClass: string) => {
                // Calculate First Bloods
                const firstBloods = match.kills?.filter(
                  (k: any) => k.killer_puuid === p.puuid && k.kill_time_in_round < 15000 // roughly the first engagement of round 
                ).length || 0; // The actual first blood API field is missing from this route, so we approximate or could just count if they were the literal first kill of the round.
                
                // Actual First Blood (First kill of any round)
                let actualFirstBloods = 0;
                match.rounds?.forEach((r: any) => {
                  if (r.player_stats?.length > 0) {
                     // Check if this player got the very first kill in the kill_events of this round
                     const allKillsInRound = r.player_stats.flatMap((ps: any) => ps.kill_events).sort((a:any, b:any) => a.kill_time_in_round - b.kill_time_in_round);
                     if (allKillsInRound.length > 0 && allKillsInRound[0].killer_puuid === p.puuid) {
                        actualFirstBloods++;
                     }
                  }
                });

                // Calculate Plants & Defuses
                let plants = 0;
                let defuses = 0;
                match.rounds?.forEach((r: any) => {
                  if (r.bomb_planted && r.plant_events?.planted_by?.puuid === p.puuid) plants++;
                  if (r.bomb_defused && r.defuse_events?.defused_by?.puuid === p.puuid) defuses++;
                });

                // Calculate HS / BS / LS %
                const totalShots = p.stats.headshots + p.stats.bodyshots + p.stats.legshots;
                const hsPercent = totalShots > 0 ? Math.round((p.stats.headshots / totalShots) * 100) : 0;
                const bsPercent = totalShots > 0 ? Math.round((p.stats.bodyshots / totalShots) * 100) : 0;
                const lsPercent = totalShots > 0 ? Math.round((p.stats.legshots / totalShots) * 100) : 0;

                // Econ rating (Score per 1000 credits spent)
                // Avoid division by zero
                const econRating = p.economy?.spent?.overall > 0 
                  ? Math.round(p.stats.score / (p.economy.spent.overall / 1000)) 
                  : 0;

                return (
                  <div key={i} className={`flex justify-between items-center p-2 rounded ${p.puuid === data.account.puuid ? bgColorClass : 'bg-white'} text-xs border-b border-slate-100/50 last:border-0`}>
                    <div className="flex items-center gap-2 w-1/4">
                      <span className="text-slate-500 w-12 truncate font-medium">{p.character}</span>
                      <span className="truncate flex-1 font-bold tooltip" title={p.name}>{p.name}</span>
                    </div>
                    
                    <div className="flex w-3/4 justify-between items-center font-mono text-slate-700">
                      <div className="w-20 text-center font-bold tracking-tight bg-slate-100 rounded px-1">
                        {p.stats.kills}/{p.stats.deaths}/{p.stats.assists}
                      </div>
                      
                      <div className="w-16 text-center text-[10px] text-slate-500 flex flex-col items-center justify-center">
                        <span className="font-bold text-slate-700">{hsPercent}%</span>
                        <div className="flex gap-1 text-[8px] opacity-70">
                          <span>B:{bsPercent}</span>
                          <span>L:{lsPercent}</span>
                        </div>
                      </div>

                      <div className="w-12 text-center text-[11px] font-bold text-orange-600" title="Econ Rating">
                        {econRating}
                      </div>

                      <div className="w-8 text-center text-[11px] font-bold text-red-500" title="First Bloods">
                        {actualFirstBloods}
                      </div>
                      
                      <div className="w-12 text-center flex justify-center gap-1 opacity-80" title="Plants / Defuses">
                        <span className="text-emerald-600 bg-emerald-50 px-1 rounded">{plants}</span>
                        <span className="text-blue-600 bg-blue-50 px-1 rounded">{defuses}</span>
                      </div>
                    </div>
                  </div>
                );
              };

              return (
                <div 
                  key={match.metadata.matchid} 
                  className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedMatchId(isExpanded ? null : match.metadata.matchid)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                          <span className="text-xs font-bold text-slate-400 uppercase">Agent</span>
                          <p className="font-bold text-red-600">{player?.character || "N/A"}</p>
                      </div>
                      <div className="w-px h-10 bg-slate-200"></div>
                      <div>
                        <p className="font-black italic uppercase text-slate-800">{match.metadata.map}</p>
                        <p className="text-xs text-slate-500">{match.metadata.mode}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase">K/D/A</p>
                        <p className="font-mono font-bold">
                          {player?.stats.kills}/{player?.stats.deaths}/{player?.stats.assists}
                        </p>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAnalyzeMatch(match.metadata.matchid);
                        }}
                        disabled={analyzing === match.metadata.matchid}
                        className="bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded font-bold hover:bg-violet-600 transition-colors uppercase tracking-widest disabled:opacity-50 flex items-center gap-1"
                      >
                        {analyzing === match.metadata.matchid ? "Analyzing..." : "✨ AI Coach"}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50 p-4 overflow-x-auto">
                      <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-slate-500 text-center">Scoreboard</h4>
                      
                      {/* Column Headers */}
                      <div className="flex justify-between items-end text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
                        <div className="w-1/4">Player</div>
                        <div className="flex w-3/4 justify-between items-end">
                          <div className="w-20 text-center">K/D/A</div>
                          <div className="w-16 text-center" title="Headshot %">HS %</div>
                          <div className="w-12 text-center" title="Econ Rating">Econ</div>
                          <div className="w-8 text-center" title="First Bloods">FB</div>
                          <div className="w-12 text-center" title="Plants / Defuses">P / D</div>
                        </div>
                      </div>

                      {hasTeams ? (
                        <div className="space-y-4">
                          <div className="bg-blue-50/50 p-2 rounded border border-blue-100">
                            <h5 className="font-bold text-blue-600 mb-2 uppercase text-[10px] tracking-wider flex items-center gap-2">
                              {match.teams.blue.has_won ? "🏆 " : ""}Blue Team 
                              <span className="bg-blue-200 text-blue-800 px-2 rounded-full">{match.teams.blue.rounds_won}</span>
                            </h5>
                            <div className="space-y-0.5">
                              {blueTeam.map((p: any, i: number) => renderPlayerRow(p, i, 'bg-blue-100 font-bold'))}
                            </div>
                          </div>
                          
                          <div className="bg-red-50/50 p-2 rounded border border-red-100">
                            <h5 className="font-bold text-red-600 mb-2 uppercase text-[10px] tracking-wider flex items-center gap-2">
                              {match.teams.red.has_won ? "🏆 " : ""}Red Team
                              <span className="bg-red-200 text-red-800 px-2 rounded-full">{match.teams.red.rounds_won}</span>
                            </h5>
                            <div className="space-y-0.5">
                              {redTeam.map((p: any, i: number) => renderPlayerRow(p, i, 'bg-red-100 font-bold'))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-3xl mx-auto space-y-0.5 bg-slate-100/50 p-2 rounded border border-slate-200">
                          {[...match.players.all_players].sort((a: any, b: any) => b.stats.score - a.stats.score).map((p: any, i: number) => 
                            renderPlayerRow(p, i, 'bg-emerald-100 font-bold')
                          )}
                        </div>
                      )}

                      {/* ROUND TIMELINE */}
                      {match.rounds && match.rounds.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-slate-200">
                          <h4 className="text-xs font-bold mb-3 uppercase tracking-wider text-slate-500">Match Timeline</h4>
                          <div className="flex gap-1 overflow-x-auto overflow-y-visible pb-2 pt-14 px-1 -mt-10 custom-scrollbar">
                            {match.rounds.map((round: any, idx: number) => {
                              // Find the searched player's stats for this round
                              const playerRoundData = round.player_stats?.find((ps: any) => ps.player_puuid === data.account.puuid);
                              const myKills = playerRoundData?.kills || 0;
                              
                              // Determine win color
                              const myTeam = Object.values<any>(match.players.all_players).find((p: any) => p.puuid === data.account.puuid)?.team;
                              const isWin = round.winning_team === myTeam || round.winning_team === myTeam + " Team"; 
                              // Some modes don't have teams, handle FFA
                              const isFFA = !hasTeams;
                              const isFFAWin = isFFA && myKills > 0;
                              
                              // Win styling
                              let roundColorClass = "bg-slate-200 border-slate-300";
                              if (!isFFA) {
                                roundColorClass = isWin ? "bg-emerald-100 border-emerald-300 shadow-emerald-200/50" : "bg-red-100 border-red-200 shadow-red-200/50";
                              } else if (isFFAWin) {
                                roundColorClass = "bg-emerald-100 border-emerald-300";
                              }

                              return (
                                <div 
                                  key={idx} 
                                  className={`flex-shrink-0 w-10 md:w-12 h-14 md:h-16 border rounded flex flex-col items-center justify-between p-1 shadow-sm relative tooltip group ${roundColorClass}`}
                                >
                                  {/* Tooltip info */}
                                  <div className="absolute opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] p-2 rounded -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-10 pointer-events-none transition-opacity shadow-lg">
                                    <p className="font-bold">Round {idx + 1}</p>
                                    <p>{round.winning_team} Won via {round.end_type}</p>
                                    <p>Your Kills: {myKills}</p>
                                  </div>
                                  
                                  <span className="text-[9px] font-bold text-slate-500">{idx + 1}</span>
                                  
                                  <div className="flex gap-0.5">
                                    {/* Kills Indicator */}
                                    {myKills > 0 ? (
                                      Array.from({ length: Math.min(myKills, 3) }).map((_, i) => (
                                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                      ))
                                    ) : (
                                      <span className="w-2 h-0.5 bg-slate-300 rounded"></span>
                                    )}
                                    {myKills > 3 && <span className="text-[8px] font-bold leading-none">+</span>}
                                  </div>

                                  {/* Bomb event icon */}
                                  <div className="h-3 w-full flex justify-center items-center">
                                    {round.bomb_defused && <span className="text-[10px]" title="Defused">🛡️</span>}
                                    {round.bomb_planted && !round.bomb_defused && <span className="text-[10px]" title="Planted">💣</span>}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* AI ADVICE DISPLAY */}
                      {aiAdvice[match.metadata.matchid] && (
                        <div className="mt-6 pt-4 border-t border-slate-200">
                          <h4 className="text-xs font-bold mb-3 uppercase tracking-wider text-violet-600 flex items-center gap-2">
                            <span>✨</span> Coach Analysis
                          </h4>
                          <div className="bg-violet-50 border border-violet-100 p-4 rounded-lg text-sm text-slate-800 space-y-3 prose prose-slate prose-sm max-w-none">
                            {aiAdvice[match.metadata.matchid].split('\n').map((line, i) => (
                              <p key={i} className={line.startsWith('-') ? 'ml-4' : ''}>
                                {/* Basic markdown bolding parsing */}
                                {line.split('**').map((part, j) => j % 2 === 1 ? <strong key={j} className="text-violet-900">{part}</strong> : part)}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}