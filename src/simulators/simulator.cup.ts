import { chunk, flatten, last, random, shuffle } from 'lodash';
import {
  getLoser,
  getTotalGoals,
  getWinner,
} from 'shared/functions/match.functions';
import Cup from 'shared/interfaces/cup.interface';
import Match from 'shared/interfaces/match.interface';
import Ranking from 'shared/interfaces/ranking.interface';
import Round from 'shared/interfaces/round.interface';
import Standings from 'shared/interfaces/standings.interface';
import Team from 'shared/interfaces/team.interface';
import { sorts } from 'shared/misc/sorting';
import { WIN_POINTS } from 'src/utils/constants';
import MatchSimulator from './simulator.match';

export default class CupSimulator {
  private static seedTeams(cup: Cup) {
    // sort teams by strength and put them into pots
    const sortedTeams = [...cup.teams].sort(sorts.team.strength).reverse();
    let pots = chunk(
      [...sortedTeams],
      Math.max(sortedTeams.length / cup.seeds, 1),
    );

    // shuffle each pot
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

  // update standings table according to one match
  private static updateStatistics(
    standings: Standings,
    match: Required<Match>,
  ) {
    const homeTeam = standings.table.find(
      (r) => r.team.id === match.homeTeam.id,
    ) as Ranking;
    const awayTeam = standings.table.find(
      (r) => r.team.id === match.awayTeam.id,
    ) as Ranking;
    const winnerTeam = standings.table.find(
      (r) => r.team.id === (getWinner(match) as Team).id,
    ) as Ranking;
    const loserTeam = standings.table.find(
      (r) => r.team.id === (getLoser(match) as Team).id,
    ) as Ranking;
    const goals = getTotalGoals(match.result);

    ++homeTeam.matchesPlayed;
    ++awayTeam.matchesPlayed;

    homeTeam.goalsFor += goals.home;
    awayTeam.goalsFor += goals.away;
    homeTeam.goalsAgainst += goals.away;
    awayTeam.goalsAgainst += goals.home;

    ++winnerTeam.wins;
    winnerTeam.points += WIN_POINTS;
    ++loserTeam.losses;
  }

  // add new standings table according to results of a round matches
  private static computeStandings(standings: Standings, round: Round) {
    const newStandings = {
      // perform deep cloning
      table: standings.table.map((ranking) => ({ ...ranking })),
      roundId: round.id,
    };
    round.matches.forEach((match: Required<Match>) =>
      this.updateStatistics(newStandings, match),
    );

    // teams still in the tournament are given same posiiton
    const advancingTeams = round.matches.map(
      (match) => getWinner(match as Required<Match>) as Team,
    );
    newStandings.table
      .sort(sorts.ranking.standard)
      .forEach(
        (ranking, i) =>
          (ranking.position = advancingTeams.some(
            (t) => t.id === ranking.team.id,
          )
            ? advancingTeams.length
            : i + 1),
      );
    return newStandings;
  }

  private static createAllStandings(cup: Cup, rounds: Round[]) {
    // create initial standings
    let standings: Standings = {
      roundId: rounds[0].id - 1,
      table: cup.teams.map(
        (team) =>
          ({
            position: cup.teams.length,
            team,
            matchesPlayed: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0,
          } as Ranking),
      ),
    };

    const allStandings = [standings];
    rounds.forEach((round) => {
      standings = CupSimulator.computeStandings(
        last(allStandings) as Standings,
        round,
      );
      allStandings.push(standings);
    });

    return allStandings;
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
        const i = random();
        const match: Match = {
          id: ++matchId,
          homeTeam: pair[i],
          awayTeam: pair[1 - i],
          onNeutralGround: true,
          allowExtraTime: cup.allowExtraTime,
          isKnockout: true,
        };

        return { ...match, result: MatchSimulator.simulate(match) };
      });

      rounds.push({ id: ++roundId, matches });
      remainingTeams = matches.map(
        (m: Required<Match>) => getWinner(m) as Team,
      );
    }

    return rounds;
  }

  static simulate(cup: Cup) {
    const seededTeams = CupSimulator.seedTeams(cup);
    const rounds: Round[] = CupSimulator.simulateRounds(cup, seededTeams);
    const allStandings: Standings[] = CupSimulator.createAllStandings(
      cup,
      rounds,
    );
    return { rounds, allStandings };
  }
}
