import Team from 'shared/interfaces/team.interface';

export function getAttackToDefenseRatio(team: Team) {
  return +(team.attack / team.defense).toFixed(2);
}

export function getStrength(team: Team) {
  return (team.attack + team.defense) / 2;
}
