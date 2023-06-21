import { chunk, shuffle } from 'lodash';
import { getWinner } from 'shared/functions/match.functions';
import Cup from 'shared/interfaces/cup.interface';
import Match from 'shared/interfaces/match.interface';
import Round from 'shared/interfaces/round.interface';
import Team from 'shared/interfaces/team.interface';
import MatchSimulator from './simulator.match';

export default class CupSimulator {
  private static seedTeams(teams: Team[]) {
    return shuffle(teams);
  }

  private static simulateRounds(teams: Team[]) {
    const rounds: Round[] = [];
    let remainingTeams = [...teams];
    let matchId = 0;
    let roundId = 0;

    while (remainingTeams.length > 1) {
      const matches: Match[] = chunk(remainingTeams, 2).map((pair) => {
        const match: Match = {
          id: ++matchId,
          homeTeam: pair[0],
          awayTeam: pair[1],
          onNeutralGround: true,
          allowExtraTime: true,
          isKnockout: true,
        };

        return { ...match, result: MatchSimulator.simulate(match) };
      });

      rounds.push({ id: ++roundId, matches });
      remainingTeams = matches.map((m) => getWinner(m) as Team);
    }

    return rounds;
  }

  static simulate(cup: Cup) {
    const seededTeams = CupSimulator.seedTeams(cup.teams);
    const rounds: Round[] = CupSimulator.simulateRounds(seededTeams);
    return rounds;
  }
}
