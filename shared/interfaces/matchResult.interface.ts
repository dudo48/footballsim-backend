import Result from './result.interface';

export default interface MatchResult {
  standardTime: Result;
  extraTime?: Result;
  penaltyShootout?: Result;
}
