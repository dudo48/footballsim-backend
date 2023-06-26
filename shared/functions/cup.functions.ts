import assert from 'assert';
import { last } from 'lodash';
import Cup from 'shared/interfaces/cup.interface';
import Match from 'shared/interfaces/match.interface';
import Standings from 'shared/interfaces/standings.interface';
import Team from 'shared/interfaces/team.interface';
import { getLoser } from './match.functions';

export function getWinner(cup: Required<Cup>) {
  // return position 1 team in the last standings table
  const lastTable = (last(cup.result.allStandings) as Standings).table;
  return lastTable.find((ranking) => ranking.position === 1);
}

export function getRunnerUp(cup: Required<Cup>) {
  const lastTable = (last(cup.result.allStandings) as Standings).table;
  return lastTable.find((ranking) => ranking.position === 2);
}

// returns the round at which a team was eliminated
export function getRoundEliminatedAt(cup: Required<Cup>, team: Team) {
  // assert that the team is in the cup first
  assert(cup.teams.some((t) => t.id === team.id));
  return cup.result.rounds.find((round) =>
    round.matches
      .map((match: Required<Match>) => getLoser(match))
      .some((t) => t?.id === team.id),
  );
}

// returns the round at which a team was eliminated for each team in the cup
export function getEachTeamEliminatedRound(cup: Required<Cup>) {
  return cup.teams.map((team) => ({
    team,
    round: getRoundEliminatedAt(cup, team),
  }));
}
