import random from 'random/dist/cjs/random';
import { isDraw } from 'shared/functions/match.functions';
import Match, { MatchResult } from 'shared/interfaces/match.interface';
import Result from 'shared/interfaces/result.interface';
import Team from 'shared/interfaces/team.interface';
import {
  AVERAGE_MATCH_GOALS,
  AVERAGE_PENALTY_SHOOTOUT_GOALS,
  EXTRA_TIME_MINUTES,
  PENALTY_SHOOTOUT_SET_SIZE,
  STANDARD_TIME_MINUTES,
} from 'src/utils/constants';

export default class MatchSimulator {
  // algorithm to generate goals from xg
  private static simulateGoals(xg: number) {
    const poisson = random.poisson(xg);
    return poisson();
  }

  private static getXG(
    attacker: Team,
    defender: Team,
    advantage: number,
    matchMinutes = STANDARD_TIME_MINUTES,
  ) {
    return (
      (attacker.attack / defender.defense) *
      (AVERAGE_MATCH_GOALS / 2) *
      (matchMinutes / STANDARD_TIME_MINUTES) *
      advantage
    );
  }

  private static getPenaltyShootoutXG(
    attacker: Team,
    defender: Team,
    advantage: number,
  ) {
    return (
      Math.cbrt(MatchSimulator.getXG(attacker, defender, advantage)) *
      (AVERAGE_PENALTY_SHOOTOUT_GOALS / 2)
    );
  }

  private static correctPenaltyShootoutResult(penaltyShootout: Result) {
    let home = penaltyShootout.home;
    let away = penaltyShootout.away;
    const min = Math.min(home, away);

    if (min > PENALTY_SHOOTOUT_SET_SIZE) {
      if (home > away) {
        home = away + 1;
      } else {
        away = home + 1;
      }
    } else {
      const winLimit = 1 + Math.floor((min + PENALTY_SHOOTOUT_SET_SIZE) / 2);
      if (home > away) {
        home = Math.min(home, winLimit);
      } else {
        away = Math.min(away, winLimit);
      }
    }

    return { home, away };
  }

  private static simulateStandardTime(match: Match) {
    const advantage = match.onNeutralGround ? 1 : match.homeTeam.homeAdvantage;
    const homeTeamXg = MatchSimulator.getXG(
      match.homeTeam,
      match.awayTeam,
      advantage,
    );
    const awayTeamXg = MatchSimulator.getXG(
      match.awayTeam,
      match.homeTeam,
      1 / advantage,
    );

    const standardTime: Result = {
      home: MatchSimulator.simulateGoals(homeTeamXg),
      away: MatchSimulator.simulateGoals(awayTeamXg),
    };

    return standardTime;
  }

  private static simulateExtraTime(match: Match) {
    const advantage = match.onNeutralGround ? 1 : match.homeTeam.homeAdvantage;
    const homeTeamXg = MatchSimulator.getXG(
      match.homeTeam,
      match.awayTeam,
      advantage,
      EXTRA_TIME_MINUTES,
    );
    const awayTeamXg = MatchSimulator.getXG(
      match.awayTeam,
      match.homeTeam,
      1 / advantage,
      EXTRA_TIME_MINUTES,
    );

    const extraTime: Result = {
      home: MatchSimulator.simulateGoals(homeTeamXg),
      away: MatchSimulator.simulateGoals(awayTeamXg),
    };

    return extraTime;
  }

  private static simulatePenaltyShootout(match: Match) {
    const advantage = match.onNeutralGround ? 1 : match.homeTeam.homeAdvantage;
    const homeTeamXg = MatchSimulator.getPenaltyShootoutXG(
      match.homeTeam,
      match.awayTeam,
      advantage,
    );
    const awayTeamXg = MatchSimulator.getPenaltyShootoutXG(
      match.awayTeam,
      match.homeTeam,
      1 / advantage,
    );

    let penaltyShootout = { home: 0, away: 0 };

    while (penaltyShootout.home === penaltyShootout.away) {
      penaltyShootout = {
        home: MatchSimulator.simulateGoals(homeTeamXg),
        away: MatchSimulator.simulateGoals(awayTeamXg),
      };
    }

    return MatchSimulator.correctPenaltyShootoutResult(penaltyShootout);
  }

  // simulate standard match
  static simulate(match: Match) {
    let result: MatchResult = {
      standardTime: MatchSimulator.simulateStandardTime(match),
    };

    if (match.isKnockout && isDraw(result)) {
      if (match.allowExtraTime) {
        result = {
          ...result,
          extraTime: MatchSimulator.simulateExtraTime(match),
        };
      }
      if (isDraw(result)) {
        result = {
          ...result,
          penaltyShootout: MatchSimulator.simulatePenaltyShootout(match),
        };
      }
    }

    return result;
  }
}
