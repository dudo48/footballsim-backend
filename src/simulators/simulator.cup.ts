import { chunk, differenceBy, flatten, last, random, shuffle } from 'lodash';
import {
  getLoser,
  getTotalGoals,
  getWinner,
} from 'shared/functions/match.functions';
import Cup, { CupResult } from 'shared/interfaces/cup.interface';
import Match from 'shared/interfaces/match.interface';
import Ranking from 'shared/interfaces/ranking.interface';
import Round from 'shared/interfaces/round.interface';
import Team from 'shared/interfaces/team.interface';
import { sorts } from 'shared/misc/sorting';
import { WIN_POINTS } from 'src/utils/constants';
import MatchSimulator from './simulator.match';

export default class CupSimulator {
  private static seedTeams(cup: Cup) {
    // sort teams by strength and put them into pots
    const nonHosts = differenceBy(cup.teams, cup.hosts, (t) => t.id);
    const sortedNonHosts = nonHosts.sort(sorts.team.strength).reverse();
    const sortedHosts = [...cup.hosts].sort(sorts.team.strength).reverse();

    // add hosts in the beginning(higher seeding rank)
    const sortedTeams = [...sortedHosts, ...sortedNonHosts];

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
    standings: Ranking[],
    match: Required<Match>,
  ) {
    const homeTeam = standings.find(
      (r) => r.team.id === match.homeTeam.id,
    ) as Ranking;
    const awayTeam = standings.find(
      (r) => r.team.id === match.awayTeam.id,
    ) as Ranking;
    const winnerTeam = standings.find(
      (r) => r.team.id === (getWinner(match) as Team).id,
    ) as Ranking;
    const loserTeam = standings.find(
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

  // add new standings table according to results of a round's matches
  private static computeStandings(matches: Match[], lastRound: Round) {
    // cloning
    const newStandings = lastRound.standings.map((ranking) => ({ ...ranking }));

    matches.forEach((match: Required<Match>) =>
      CupSimulator.updateStatistics(newStandings, match),
    );

    // teams still in the tournament are given same posiiton
    const advancingTeams = matches.map(
      (match) => getWinner(match as Required<Match>) as Team,
    );
    newStandings
      .sort(sorts.ranking.standard)
      .forEach(
        (ranking, i) =>
          (ranking.position = advancingTeams.some(
            (t) => t.id === ranking.team.id,
          )
            ? 1
            : i + 1),
      );
    return newStandings;
  }

  private static simulateRounds(cup: Cup, seededTeams: Team[]) {
    // initialize first round
    const rounds: Round[] = [
      {
        id: 0,
        matches: [],
        standings: cup.teams.map((team) => ({
          position: cup.teams.length,
          team,
          matchesPlayed: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        })),
      },
    ];

    // create tournament structure from seeds
    const placementIndices = CupSimulator.createPlacementIndices(
      cup.teams.length,
    );

    let remainingTeams = placementIndices.map((i) => seededTeams[i]);
    let matchId = 0;
    let roundId = 0;
    while (remainingTeams.length > 1) {
      const matches: Match[] = chunk(remainingTeams, 2).map((pair) => {
        const homeTeamIsHost = cup.hosts.some((t) => t.id === pair[0].id);
        const awayTeamIsHost = cup.hosts.some((t) => t.id === pair[1].id);

        const i =
          homeTeamIsHost === awayTeamIsHost ? random() : homeTeamIsHost ? 0 : 1;

        const match: Match = {
          id: ++matchId,
          homeTeam: pair[i],
          awayTeam: pair[1 - i],
          onNeutralGround: !homeTeamIsHost && !awayTeamIsHost,
          allowExtraTime: cup.allowExtraTime,
          isKnockout: true,
        };

        return { ...match, result: MatchSimulator.simulate(match) };
      });

      rounds.push({
        id: ++roundId,
        matches,
        standings: CupSimulator.computeStandings(
          matches,
          last(rounds) as Round,
        ),
      });
      remainingTeams = matches.map(
        (m: Required<Match>) => getWinner(m) as Team,
      );
    }

    return rounds;
  }

  static simulate(cup: Cup): CupResult {
    const seededTeams = CupSimulator.seedTeams(cup);
    const rounds: Round[] = CupSimulator.simulateRounds(cup, seededTeams);
    return { rounds };
  }
}
