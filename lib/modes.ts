export type GameMode = {
  id: string;
  name: string;
  color: string;
  line: string;
  hint: string;
  body: string;
  how: string;
  win: string;
  portal: string;
  tile: string;
  finale?: boolean;
};

export const modes: GameMode[] = [
  {
    id: "be-unique",
    name: "Be Unique",
    color: "#A66BFF",
    line: "Say what nobody else says.",
    hint: "Type an answer nobody else picks. Match anyone and you're out.",
    body: "A prompt drops. Answer in chat. If anyone else says the same thing, you're out. Be braver. Be weirder. Be the only one.",
    how: "Type in chat",
    win: "Staying unique",
    portal: "Answer nobody else picks",
    tile: "/icons/modes/mode-be-unique-tile.svg",
  },
  {
    id: "odd-one-out",
    name: "Odd One Out",
    color: "#3D8BFF",
    line: "The smallest crowd survives.",
    hint: "Stand on the platform the fewest people choose.",
    body: "Platforms light up. Stand where the fewest people stand. The big crowds fall. The odd ones keep going.",
    how: "Move and stand",
    win: "Picking the minority",
    portal: "Stand where fewest stand",
    tile: "/icons/modes/mode-odd-one-out-tile.svg",
  },
  {
    id: "titans",
    name: "Titans",
    color: "#FF7A2F",
    line: "One giant. Forty pilots.",
    hint: "Steer a 60-block golem together with your team.",
    body: "Steer a 60-block golem with your whole team. Every player is a joint. Move together or fall apart.",
    how: "Team control",
    win: "Outlasting other Titans",
    portal: "Steer a giant golem",
    tile: "/icons/modes/mode-titans-tile.svg",
  },
  {
    id: "tipping-point",
    name: "Tipping Point",
    color: "#38D98A",
    line: "Balance is a team sport.",
    hint: "Keep a giant disc level while the whole lobby pushes it around.",
    body: "A giant disc. The whole lobby on it. Push, counter-push and keep it level. Tip over and you're done.",
    how: "Run and shift weight",
    win: "Staying on the disc",
    portal: "Keep the disc from tipping",
    tile: "/icons/modes/mode-tipping-point-tile.svg",
  },
  {
    id: "picture-day",
    name: "Picture Day",
    color: "#FF4D8D",
    line: "Be the picture.",
    hint: "Turn the whole lobby into an image in 60 seconds.",
    body: "Sixty seconds. The whole lobby becomes the image. Every square is a player. Together you form the picture.",
    how: "Position yourself",
    win: "Matching the image",
    portal: "Turn the lobby into an image",
    tile: "/icons/modes/mode-picture-day-tile.svg",
  },
  {
    id: "gauntlet",
    name: "The Gauntlet",
    color: "#FFC93C",
    line: "Everyone you beat is now a trap.",
    hint: "Survive the finale while every eliminated player runs the traps.",
    body: "The finale. Surviving players run the course. Every eliminated player controls a trap. The audience still plays.",
    how: "Survive the course",
    win: "Last one standing",
    portal: "Survive the finale",
    tile: "/icons/modes/mode-gauntlet-tile.svg",
    finale: true,
  },
];
