import { last } from 'lodash';
import Cup from 'shared/interfaces/cup.interface';
import Match from 'shared/interfaces/match.interface';
import Round from 'shared/interfaces/round.interface';
import Team from 'shared/interfaces/team.interface';
import { getLoser } from './match.functions';

export function getWinner(cup: Required<Cup>) {
  // return position 1 team in the last standings table
  const lastStandings = (last(cup.result.rounds) as Round).standings;
  return lastStandings.find((ranking) => ranking.position === 1);
}

export function getRunnerUp(cup: Required<Cup>) {
  const lastStandings = (last(cup.result.rounds) as Round).standings;
  return lastStandings.find((ranking) => ranking.position === 2);
}

// returns the round at which a team was eliminated
export function getRoundEliminatedAt(team: Team, rounds: Round[]) {
  // assert that the team is in the cup first
  return rounds.find((round) =>
    round.matches
      .map((match: Required<Match>) => getLoser(match))
      .some((t) => t?.id === team.id),
  );
}
