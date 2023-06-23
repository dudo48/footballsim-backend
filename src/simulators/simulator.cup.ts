import { chunk, flatten, shuffle } from 'lodash';
import { getWinner } from 'shared/functions/match.functions';
import Cup from 'shared/interfaces/cup.interface';
import Match from 'shared/interfaces/match.interface';
import Round from 'shared/interfaces/round.interface';
import Team from 'shared/interfaces/team.interface';
import { teamSorts } from 'shared/misc/sorting';
import MatchSimulator from './simulator.match';

export default class CupSimulator {
  private static seedTeams(cup: Cup) {
    // sort teams by strength and put them into pots
    const sortedTeams = [...cup.teams].sort(teamSorts.strength).reverse();
    let pots = chunk(
      [...sortedTeams],
      Math.max(sortedTeams.length / cup.seeds, 1),
    );

    // shuffle each pot then zip them together
    pots = pots.map((p) => shuffle(p));
    const seededTeams = flatten(pots);

    return seededTeams as Team[];
  }

  // tournament bracket placement algorithm
  private static createPlacementIndices(size: number) {
    let result = [0, 1];
    while (result.length < size) {
      const m = result.length * 2 - 1;
      result = flatten(result.map((n) => [n, m - n]));
    }
    return result;
  }

  private static simulateRounds(cup: Cup, seededTeams: Team[]) {
    const rounds: Round[] = [];

    // create tournament structure from seeds
    const placementIndices = CupSimulator.createPlacementIndices(
      cup.teams.length,
    );

    let remainingTeams = placementIndices.map((i) => seededTeams[i]);
    let matchId = 0;
    let roundId = 0;
    while (remainingTeams.length > 1) {
      const matches: Match[] = chunk(remainingTeams, 2).map((pair) => {
        const match: Match = {
          id: ++matchId,
          homeTeam: pair[0],
          awayTeam: pair[1],
          onNeutralGround: true,
          allowExtraTime: cup.allowExtraTime,
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
    const seededTeams = CupSimulator.seedTeams(cup);
    const rounds: Round[] = CupSimulator.simulateRounds(cup, seededTeams);
    return rounds;
  }
}
