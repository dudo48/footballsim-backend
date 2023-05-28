import Match from 'interfaces/match.interface';
import MatchResult from 'interfaces/matchResult.interface';
import Result from 'interfaces/result.interface';
import Team from 'interfaces/team.interface';
import random from 'random/dist/cjs/random';

export default class MatchSimulator {
  // algorithm to generate goals from xg
  private static simulateGoals(xg: number) {
    const poisson = random.poisson(xg);
    return poisson();
  }

  private static getXG(attacker: Team, defender: Team, advantage: number) {
    return (attacker.attack / defender.defense) * advantage;
  }

  // simulate full match
  static simulate(match: Match) {
    const advantage = match.onNeutralGround ? 1 : match.homeTeam.homeAdvantage;
    const homeTeamXg = this.getXG(match.homeTeam, match.awayTeam, advantage);
    const awayTeamXg = this.getXG(
      match.awayTeam,
      match.homeTeam,
      1 / advantage,
    );

    const fullTime: Result = {
      home: this.simulateGoals(homeTeamXg),
      away: this.simulateGoals(awayTeamXg),
    };

    const result: MatchResult = { fullTime };
    return result;
  }
}
