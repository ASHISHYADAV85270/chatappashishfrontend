export const avatarNames = [
  "Abby",
  "Milo",
  "Dusty",
  "Coco",
  "Chloe",
  "Maggie",
  "Cleo",
  "Scooter",
  "Luna",
  "Casper",
  "Molly",
  "Zoey",
  "Boots",
  "Cookie",
  "Cuddles",
  "George",
  "Sasha",
];

export const baseAvatarUrl = (name) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}&flip=true&backgroundColor=65c9ff,d1d4f9,ffd5dc`;

export function getRandomAvatars(count = 5) {
  const shuffledNames = avatarNames.sort(() => 0.5 - Math.random());
  const selectedNames = shuffledNames.slice(0, count);
  const avatarUrls = selectedNames.map((name) => baseAvatarUrl(name));
  return avatarUrls;
}

export const randomAvatars = getRandomAvatars();
