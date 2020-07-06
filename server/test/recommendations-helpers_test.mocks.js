const mocks = {
  ratingType: 'similarity',
  tags: {
    'Cross-Platform Multiplayer': 22,
    'In-App Purchases': 22,
    'Includes level editor': 22,
    'Steam Achievements': 22,
    Blood: 22,
    'Co-op': 22,
    Difficult: 46,
    'Free to Play': 22,
    Funny: 22,
    Gore: 22,
    'Martial Arts': 22,
    Moddable: 22,
    Multiplayer: 22,
    Parkour: 22,
    Physics: 22,
    Sandbox: 22,
    Singleplayer: 75,
    'Turn-Based': 22,
    'Turn-Based Strategy': 22,
    'steam-trading-cards': 22,
    Atmospheric: 24,
    Building: 24,
    'Choices Matter': 24,
    'City Builder': 24,
    Dark: 24,
    Economy: 24,
    Management: 24,
    'Post-apocalyptic': 24,
    'Real-Time with Pause': 24,
    'Resource Management': 24,
    Survival: 24,
    '2D': 29,
    'Dungeon Crawler': 29,
    'Early Access': 29
  },
  genres: { Action: 22, Strategy: 46, Indie: 51, Simulation: 24 },
  friends: ["76561197964987941", "76561197994520777", "76561197999638725", "76561198027969395", "76561198031033794", "76561198043514900", "76561198044556765", "76561198044715204", "76561198049035004", "76561198056384406", "76561198056611273", "76561198058944740", "76561198065152706", "76561198068345216", "76561198071179655", "76561198109176021", "76561198136446324", "76561198166372366", "76561198448293619"],
  friendsLibrary: [
    [],
    [
      3830, 4000, 2600, 220, 320, 340, 380, 8000,
      400, 420, 12500, 12900, 7670, 409710, 20900, 500,
      3560, 8140, 24420, 17460, 9480, 17410, 23310, 1250,
      35420, 3590, 22320, 23120, 21660, 34900, 38400, 38410,
      38420, 6020, 40400, 40420, 550, 40700, 8980, 729040,
      41500, 18100, 18110, 17450, 11450, 12710, 12810, 3170,
      22370, 18820, 24980, 8850, 409720, 45400, 8190, 3900,
      3990, 8800, 16810, 34440, 34450, 34460, 22380, 42650,
      4500, 4520, 4530, 4540, 4550, 4560, 4570, 4580,
      9310, 9340, 9400, 9450, 9460, 15620, 20500, 20530,
      20540, 20550, 20570, 43100, 43110, 228200, 475150, 667720,
      39680, 22600, 47540, 29680, 34270, 70400, 31280, 57300,
      9940, 50620, 462780, 46450
    ],
    [
      7670, 409710, 220, 320, 340, 360, 380,
      400, 420, 20900, 17390, 550, 57300, 47810,
      620, 12900, 105600, 19680, 107100, 113200, 72850,
      205790, 207610, 207350, 205100, 200170, 221810, 11610,
      99900, 109600, 200210, 212070, 212160, 230410, 238960,
      263500, 237310, 202090, 219740, 322330, 35700, 35720,
      91310, 216250, 251570, 251990, 49520, 238430, 261030,
      261570, 262060, 262790, 213670, 282900, 283640, 222900,
      300040, 292120, 304270, 304930, 247080, 323370, 335300,
      319630, 365720, 367520, 372000, 292030, 374320, 381210,
      388410, 239140, 377160, 359550, 623990, 442080, 489830,
      356190, 597220, 678960, 554620, 488790, 582160, 582010,
      555440, 203160
    ],
    [],
    [],
    [],
    [
      4000, 400, 7940, 13230, 13200, 13210, 13240, 13250,
      15120, 500, 10090, 9480, 17410, 24740, 1250, 35420,
      6060, 550, 22370, 4850, 57300, 8980, 729040, 42700,
      42710, 47780, 47890, 620, 105600, 19680, 72850, 105450,
      22380, 212680, 108800, 49520, 204360, 205790, 55230, 202970,
      202990, 212910, 227300, 230410, 8930, 221380, 210770, 222480,
      206420, 242920, 207140, 368730, 218620, 251570, 252490, 700580,
      252950, 208610, 245170, 233130, 255520, 238430, 211820, 367540,
      270150, 289130, 301640, 280740, 313740, 296470, 7000, 8000,
      8140, 35130, 203160, 224960, 224980, 225000, 225020, 225300,
      225320, 261640, 730, 333600, 339800, 342380, 299360, 232090,
      232150, 363970, 322330, 375200, 377680, 381210, 383080, 385800,
      386940, 397540, 402180, 235540
    ],
    [],
    [],
    [
      550, 70400, 8930, 4540, 475150, 42910, 105600,
      17470, 47780, 205790, 55230, 204880, 200710, 104900,
      113200, 31800, 31810, 31820, 31830, 31840, 31850,
      31860, 31870, 31880, 31890, 31900, 31910, 31920,
      31930, 31980, 42200, 42210, 42230, 43600, 200080,
      209080, 212680, 49520, 4560, 9340, 20540, 43110,
      50620, 55110, 228200, 462780, 212160, 218230, 1083500,
      230410, 238960, 113020, 236090, 206190, 242760, 239030,
      239070, 218620, 250760, 251570, 252490, 700580, 252950,
      22120, 22140, 22180, 219990, 261570, 262060, 108600,
      211820, 367540, 268910, 269770, 222880, 274520, 200510,
      291550, 294100, 256290, 238460, 247080, 315460, 319510,
      320040, 323190, 323370, 238320, 261640, 268050, 730,
      346110, 407530, 291650, 7670, 8850, 8870, 409710,
      409720, 356670
    ],
    [],
    [
      4000, 10090, 34900, 10180, 10190, 550, 33900,
      33930, 219540, 620, 105600, 17470, 47780, 71340,
      50300, 211420, 10, 80, 100, 240, 730,
      202170, 49520, 220860, 205790, 1900, 220240, 220440,
      227300, 211500, 218230, 1083500, 230410, 236390, 238960,
      216150, 224580, 8930, 224220, 220160, 72850, 224760,
      237110, 218620, 250320, 208610, 245170, 253900, 253920,
      253960, 242050, 233130, 255520, 238010, 259320, 263280,
      367690, 221100, 235460, 247730, 203160, 222880, 251570,
      284160, 203140, 205930, 301520, 312530, 221380, 307690,
      241930, 219740, 322330, 380600, 386360, 858460, 261570,
      387290, 391540, 397100, 413150, 438100, 374320, 444640,
      379720, 505750, 489830, 555160, 611670, 632360, 674940,
      700330, 435150, 427460, 504370, 801630, 851850, 960090,
      226840, 442070
    ],
    [],
    [],
    [
      4000, 10090, 17390, 10180, 10190,
      33900, 33930, 219540, 8930, 105600,
      205790, 730, 49520, 200210, 218230,
      1083500, 230410, 236390, 238960, 242720,
      216150, 223750, 218620, 550, 251570,
      312530, 227940, 221380, 323190, 357500,
      366040, 322330, 413150, 427520, 429790,
      438100, 444640, 517710, 550650, 560380,
      589870, 572520, 632360, 674940, 435150,
      594570, 859680, 960090, 226840, 1085660,
      231430, 442070, 203160
    ],
    [],
    [],
    [
      4000, 620, 105600, 213650,
      238960, 243870, 251570, 293780,
      237930, 301520, 95400, 307130,
      227940, 323370, 730, 219740,
      322330, 383980, 291550, 391540,
      444640, 460950, 560380, 582500,
      590380, 736260, 1016920
    ],
    [
      49520, 238960, 15620,
      20570, 56400, 251570,
      261550, 281990, 291410,
      261640, 322330, 65980,
      394510, 413150, 364360,
      289070, 632360, 435150,
      594570, 779340, 939520,
      226840, 1132210
    ]
  ],
  oldGenres: {
    Action: 22,
    Strategy: 46,
    Indie: 22,
    Simulation: 24
  },
  oldTags: {
    'Cross-Platform Multiplayer': 22,
    'In-App Purchases': 22,
    'Includes level editor': 22,
    'Steam Achievements': 22,
    Blood: 22,
    'Co-op': 22,
    Difficult: 46,
    'Free to Play': 22,
    Funny: 22,
    Gore: 22,
    'Martial Arts': 22,
    Moddable: 22,
    Multiplayer: 22,
    Parkour: 22,
    Physics: 22,
    Sandbox: 22,
    Singleplayer: 46,
    'Turn-Based': 22,
    'Turn-Based Strategy': 22,
    'steam-trading-cards': 22,
    Atmospheric: 24,
    Building: 24,
    'Choices Matter': 24,
    'City Builder': 24,
    Dark: 24,
    Economy: 24,
    Management: 24,
    'Post-apocalyptic': 24,
    'Real-Time with Pause': 24,
    'Resource Management': 24,
    Survival: 24
  },
  dbGame: {
    genres: ['Indie'],
    tags: ['2D', 'Dungeon Crawler', 'Early Access', 'Singleplayer'],
    _id: '5f0065e1b5a4909e54eea3b5',
    appid: 956450,
    rawg: true,
    steam: true,
    name: 'Rogue Fable III',
    background_image: 'https://media.rawg.io/media/screenshots/5fe/5fe80598b5a6c3776d8092e6d6c740d0.jpg',
    description: 'The legendary Goblet of Yendor, some say it grants immortality, but others say its infinite power will drive you to madness. Rumored to be made of solid gold, inlaid with gems of incredible beauty and size, it will surely fetch a fortune on the black market.Many a rogue and scoundrel, lured by dreams of endless riches, have set out to steal the illusive artifact from the depths of the Dungeon of Dread.None have survived, will you be the first to succeed?<br/>\n' +
      '<br/>\r\n' +
      'Rogue Fable III combines the challenge, tactics and strategy of classic roguelikes with a modern interface and graphics. Designed from the ground up to be playable in a single hour, but with a huge variety between runs. Rogue Fable II includes:<br/>\n' +
      '<br/>\r\n' +
      '- 9 base character classes and 6 races with the ability to multi-class over the course of a run.<br/>\r\n' +
      '- Over 60 unique talents and abilities<br/>\r\n' +
      '- 13 dungeon branches, randomly chosen each game so that every run feels unique.<br/>\r\n' +
      '- 100+ monster types each with their own abilities, behaviors, strengths and weaknesses.<br/>\r\n' +
      '- 150+ unique items to discover.',
    description_steam: 'The legendary Goblet of Yendor, some say it grants immortality, but others say its infinite power will drive you to madness. Rumored to be made of solid gold, inlaid with gems of incredible beauty and size, it will surely fetch a fortune on the black market.Many a rogue and scoundrel, lured by dreams of endless riches, have set out to steal the illusive artifact from the depths of the Dungeon of Dread.None have survived, will you be the first to succeed?<br>< br > Rogue Fable III combines the challenge, tactics and strategy of classic roguelikes with a modern interface and graphics.Designed from the ground up to be playable in a single hour, but with a huge variety between runs.< h2 class="bb_tag" > Key Features:</h2 > <ul class="bb_ul"><li> Build your character from 10 base classes and 7 races.<br></li><li> Adapt your build in response to the challenges and treasures of the dungeon. Every class can learn to use every talent, ability or item if it is found.<br></li><li> Over 60 unique talents and abilities. Raise the dead, blast enemies into pits, electrocute a pool of water, surround yourself in a shield of fire and much much more!<br></li><li> 13 dungeon branches. From haunted crypts, to putrid swamps and into the very heart of a volcano, Rogue Fable III offers a massive variety of distinct environments.<br></li><li> 120+ monster types each with their own abilities, behaviors, strengths and weaknesses.<br></li><li> 150+ unique items to discover plus randomly generated artifacts with special properties.</li></ul><h2 class="bb_tag">Game Demo:</h2>To try the game out right now check out the free web demo on Kongregate, NewGrounds or Itch.io. The web version is now many updates behind but is completely playable from start to finish and does a good job of showing off the core mechanics of the game.',
    description_short: 'Rogue Fable III is a traditional rogue-like game which combines the depth, complexity, and challenge of the genre classics with a shorter, more tightly focused game length.',
    description_about: 'The legendary Goblet of Yendor, some say it grants immortality, but others say its infinite power will drive you to madness. Rumored to be made of solid gold, inlaid with gems of incredible beauty and size, it will surely fetch a fortune on the black market. Many a rogue and scoundrel, lured by dreams of endless riches, have set out to steal the illusive artifact from the depths of the Dungeon of Dread. None have survived, will you be the first to succeed?<br><br>Rogue Fable III combines the challenge, tactics and strategy of classic roguelikes with a modern interface and graphics. Designed from the ground up to be playable in a single hour, but with a huge variety between runs.<h2 class="bb_tag">Key Features:</h2><ul class="bb_ul"><li> Build your character from 10 base classes and 7 races.<br></li><li> Adapt your build in response to the challenges and treasures of the dungeon. Every class can learn to use every talent, ability or item if it is found.<br></li><li> Over 60 unique talents and abilities. Raise the dead, blast enemies into pits, electrocute a pool of water, surround yourself in a shield of fire and much much more!<br></li><li> 13 dungeon branches. From haunted crypts, to putrid swamps and into the very heart of a volcano, Rogue Fable III offers a massive variety of distinct environments.<br></li><li> 120+ monster types each with their own abilities, behaviors, strengths and weaknesses.<br></li><li> 150+ unique items to discover plus randomly generated artifacts with special properties.</li></ul><h2 class="bb_tag">Game Demo:</h2>To try the game out right now check out the free web demo on Kongregate, NewGrounds or Itch.io. The web version is now many updates behind but is completely playable from start to finish and does a good job of showing off the core mechanics of the game.',
    screenshots: [
      {
        _id: '5f0065e3a43fea59a8bd7919',
        id: 0,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_039f3cb9a2a6288b81394b72fd851511d96440cc.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_039f3cb9a2a6288b81394b72fd851511d96440cc.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd791a',
        id: 1,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_8e267d5b528ca399b7699cf6c6c57b4bb64a5f32.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_8e267d5b528ca399b7699cf6c6c57b4bb64a5f32.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd791b',
        id: 2,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_4e4a4a3d7990094ef9c8801a91dfecf205b7e38a.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_4e4a4a3d7990094ef9c8801a91dfecf205b7e38a.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd791c',
        id: 3,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_6b08d3d84bfe2290c057785b8eccf4c1b1288d8b.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_6b08d3d84bfe2290c057785b8eccf4c1b1288d8b.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd791d',
        id: 4,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_22ec7605f152ccc1ba8777237dc7aa8e209c322b.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_22ec7605f152ccc1ba8777237dc7aa8e209c322b.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd791e',
        id: 5,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_2d6661aad85d4dae7a8b2cc7ff5396ac4b6c0d96.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_2d6661aad85d4dae7a8b2cc7ff5396ac4b6c0d96.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd791f',
        id: 6,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_692e722ffe01c5e0ae195a06ce91373126726fe8.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_692e722ffe01c5e0ae195a06ce91373126726fe8.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd7920',
        id: 7,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_1310cfa2ead78c69f80967ac4575fd7336200317.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_1310cfa2ead78c69f80967ac4575fd7336200317.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd7921',
        id: 8,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_4eb1ac2eea7de62d43644debb0c127cf884a163c.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_4eb1ac2eea7de62d43644debb0c127cf884a163c.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd7922',
        id: 9,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_44346c24038f0030d962bade14873a17f3a4c0da.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_44346c24038f0030d962bade14873a17f3a4c0da.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd7923',
        id: 10,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_be417796c00604f69e859a86b2cf8d1290e64838.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_be417796c00604f69e859a86b2cf8d1290e64838.1920x1080.jpg?t=1577557867'
      },
      {
        _id: '5f0065e3a43fea59a8bd7924',
        id: 11,
        path_thumbnail: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_659b556825554dde7d0f6e2d030f3a0df8913465.600x338.jpg?t=1577557867',
        path_full: 'https://steamcdn-a.akamaihd.net/steam/apps/956450/ss_659b556825554dde7d0f6e2d030f3a0df8913465.1920x1080.jpg?t=1577557867'
      }
    ],
    ratings: { metacritic: null },
    __v: 0
  },
  userGame: { appid: 956450, name: 'Rogue Fable III', playtime_forever: 29 },
  type: 'worst',
};

module.exports = mocks;