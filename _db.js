let games = [
    { id: 1, title: "The Legend of Zelda: Breath of the Wild", platform: ["PlayStation 4", "Windows"] },
    { id: 2, title: "God of War", platform: ["PlayStation 4"] },
    { id: 3, title: "Halo Infinite", platform: ["Xbox Series X"] },
];

let authors = [
    { id: 1, name: "John Doe", verified: true },
    { id: 2, name: "Jane Smith", verified: false },
    { id: 3, name: "Alice Johnson", verified: true },
];

let reviews = [
    { id: 1, rating: 5, content: "Amazing game!", author_id: 1, game_id: 1 },
    { id: 2, rating: 4, content: "Great story and gameplay.", author_id: 2, game_id: 2 },
    { id: 3, rating: 3, content: "Good, but could be better.", author_id: 3, game_id: 3 },
];

export default { games, authors, reviews };