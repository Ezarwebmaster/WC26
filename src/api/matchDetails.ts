export interface MatchEvent {
  player: string;
  minute: string;
  type?: string; // "penalty" | "own" | "yellow" | "red" | "yellow-red"
}

export interface RichMatchDetails {
  stadium: string;
  city: string;
  dateEvent: string;
  strTime: string;
  homeGoals: MatchEvent[];
  awayGoals: MatchEvent[];
  homeCards: MatchEvent[];
  awayCards: MatchEvent[];
}

export const MATCH_DETAILS: Record<string, RichMatchDetails> = {
  "1665048": {
    stadium: "Khalifa International Stadium",
    city: "Al Rayyan",
    dateEvent: "2022-12-03",
    strTime: "18:00:00",
    homeGoals: [
      { player: "Memphis Depay", minute: "10" },
      { player: "Daley Blind", minute: "45+1" },
      { player: "Denzel Dumfries", minute: "81" }
    ],
    awayGoals: [
      { player: "Haji Wright", minute: "76" }
    ],
    homeCards: [
      { player: "Teun Koopmeiners", minute: "60", type: "yellow" },
      { player: "Frenkie de Jong", minute: "87", type: "yellow" }
    ],
    awayCards: []
  },
  "1665112": {
    stadium: "Ahmad bin Ali Stadium",
    city: "Al Rayyan",
    dateEvent: "2022-12-03",
    strTime: "22:00:00",
    homeGoals: [
      { player: "Lionel Messi", minute: "35" },
      { player: "Julián Alvarez", minute: "57" }
    ],
    awayGoals: [
      { player: "Enzo Fernández", minute: "77", type: "own" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Jackson Irvine", minute: "15", type: "yellow" },
      { player: "Miloš Degenek", minute: "38", type: "yellow" }
    ]
  },
  "1665049": {
    stadium: "Al Bayt Stadium",
    city: "Al Khor",
    dateEvent: "2022-12-04",
    strTime: "22:00:00",
    homeGoals: [
      { player: "Jordan Henderson", minute: "38" },
      { player: "Harry Kane", minute: "45+3" },
      { player: "Bukayo Saka", minute: "57" }
    ],
    awayGoals: [],
    homeCards: [],
    awayCards: [
      { player: "Kalidou Koulibaly", minute: "76", type: "yellow" }
    ]
  },
  "1665113": {
    stadium: "Al Thumama Stadium",
    city: "Doha",
    dateEvent: "2022-12-04",
    strTime: "18:00:00",
    homeGoals: [
      { player: "Olivier Giroud", minute: "44" },
      { player: "Kylian Mbappé", minute: "74" },
      { player: "Kylian Mbappé", minute: "90+1" }
    ],
    awayGoals: [
      { player: "Robert Lewandowski", minute: "90+9", type: "penalty" }
    ],
    homeCards: [
      { player: "Aurélien Tchouaméni", minute: "32", type: "yellow" }
    ],
    awayCards: []
  },
  "1665565": {
    stadium: "Al Janoub Stadium",
    city: "Al Wakrah",
    dateEvent: "2022-12-05",
    strTime: "18:00:00",
    homeGoals: [
      { player: "Daizen Maeda", minute: "43" }
    ],
    awayGoals: [
      { player: "Ivan Perišić", minute: "55" }
    ],
    homeCards: [],
    awayCards: []
  },
  "1665657": {
    stadium: "Stadium 974",
    city: "Doha",
    dateEvent: "2022-12-05",
    strTime: "22:00:00",
    homeGoals: [
      { player: "Vinícius Júnior", minute: "7" },
      { player: "Neymar", minute: "13", type: "penalty" },
      { player: "Richarlison", minute: "29" },
      { player: "Lucas Paquetá", minute: "36" }
    ],
    awayGoals: [
      { player: "Paik Seung-ho", minute: "76" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Jung Woo-young", minute: "44", type: "yellow" }
    ]
  },
  "1665566": {
    stadium: "Education City Stadium",
    city: "Al Rayyan",
    dateEvent: "2022-12-06",
    strTime: "18:00:00",
    homeGoals: [],
    awayGoals: [],
    homeCards: [
      { player: "Romain Saïss", minute: "90", type: "yellow" }
    ],
    awayCards: [
      { player: "Aymeric Laporte", minute: "77", type: "yellow" }
    ]
  },
  "1665658": {
    stadium: "Lusail Stadium",
    city: "Lusail",
    dateEvent: "2022-12-06",
    strTime: "22:00:00",
    homeGoals: [
      { player: "Gonçalo Ramos", minute: "17" },
      { player: "Pepe", minute: "33" },
      { player: "Gonçalo Ramos", minute: "51" },
      { player: "Raphaël Guerreiro", minute: "55" },
      { player: "Gonçalo Ramos", minute: "67" },
      { player: "Rafael Leão", minute: "90+2" }
    ],
    awayGoals: [
      { player: "Manuel Akanji", minute: "58" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Fabian Schär", minute: "43", type: "yellow" },
      { player: "Eray Cömert", minute: "59", type: "yellow" }
    ]
  },
  "1665716": {
    stadium: "Lusail Stadium",
    city: "Lusail",
    dateEvent: "2022-12-09",
    strTime: "22:00:00",
    homeGoals: [
      { player: "Wout Weghorst", minute: "83" },
      { player: "Wout Weghorst", minute: "90+11" }
    ],
    awayGoals: [
      { player: "Nahuel Molina", minute: "35" },
      { player: "Lionel Messi", minute: "73", type: "penalty" }
    ],
    homeCards: [
      { player: "Jurriën Timber", minute: "43", type: "yellow" },
      { player: "Wout Weghorst", minute: "45+2", type: "yellow" },
      { player: "Memphis Depay", minute: "76", type: "yellow" },
      { player: "Steven Berghuis", minute: "88", type: "yellow" },
      { player: "Steven Bergwijn", minute: "91", type: "yellow" },
      { player: "Denzel Dumfries", minute: "128", type: "yellow" },
      { player: "Denzel Dumfries", minute: "129", type: "yellow-red" },
      { player: "Noa Lang", minute: "129", type: "yellow" }
    ],
    awayCards: [
      { player: "Marcos Acuña", minute: "43", type: "yellow" },
      { player: "Cristian Romero", minute: "45", type: "yellow" },
      { player: "Lisandro Martínez", minute: "76", type: "yellow" },
      { player: "Leandro Paredes", minute: "89", type: "yellow" },
      { player: "Lionel Messi", minute: "90+10", type: "yellow" },
      { player: "Nicolás Otamendi", minute: "90+12", type: "yellow" },
      { player: "Gonzalo Montiel", minute: "109", type: "yellow" },
      { player: "Germán Pezzella", minute: "112", type: "yellow" }
    ]
  },
  "1665817": {
    stadium: "Education City Stadium",
    city: "Al Rayyan",
    dateEvent: "2022-12-09",
    strTime: "18:00:00",
    homeGoals: [
      { player: "Bruno Petković", minute: "117" }
    ],
    awayGoals: [
      { player: "Neymar", minute: "105+1" }
    ],
    homeCards: [
      { player: "Marcelo Brozović", minute: "31", type: "yellow" },
      { player: "Bruno Petković", minute: "116", type: "yellow" }
    ],
    awayCards: [
      { player: "Danilo", minute: "25", type: "yellow" },
      { player: "Casemiro", minute: "68", type: "yellow" },
      { player: "Marquinhos", minute: "77", type: "yellow" }
    ]
  },
  "1665794": {
    stadium: "Al Bayt Stadium",
    city: "Al Khor",
    dateEvent: "2022-12-10",
    strTime: "22:00:00",
    homeGoals: [
      { player: "Harry Kane", minute: "54", type: "penalty" }
    ],
    awayGoals: [
      { player: "Aurélien Tchouaméni", minute: "17" },
      { player: "Olivier Giroud", minute: "78" }
    ],
    homeCards: [
      { player: "Harry Maguire", minute: "89", type: "yellow" }
    ],
    awayCards: [
      { player: "Antoine Griezmann", minute: "43", type: "yellow" },
      { player: "Ousmane Dembélé", minute: "45", type: "yellow" },
      { player: "Theo Hernández", minute: "83", type: "yellow" }
    ]
  },
  "1665834": {
    stadium: "Al Thumama Stadium",
    city: "Doha",
    dateEvent: "2022-12-10",
    strTime: "18:00:00",
    homeGoals: [
      { player: "Youssef En-Nesyri", minute: "42" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Achraf Dari", minute: "70", type: "yellow" },
      { player: "Walid Cheddira", minute: "90+1", type: "yellow" },
      { player: "Walid Cheddira", minute: "90+3", type: "yellow-red" }
    ],
    awayCards: [
      { player: "Vitinha", minute: "87", type: "yellow" }
    ]
  },
  "1666028": {
    stadium: "Lusail Stadium",
    city: "Lusail",
    dateEvent: "2022-12-13",
    strTime: "22:00:00",
    homeGoals: [
      { player: "Lionel Messi", minute: "34", type: "penalty" },
      { player: "Julián Alvarez", minute: "39" },
      { player: "Julián Alvarez", minute: "69" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Cristian Romero", minute: "68", type: "yellow" },
      { player: "Nicolás Otamendi", minute: "71", type: "yellow" }
    ],
    awayCards: []
  },
  "1666049": {
    stadium: "Al Bayt Stadium",
    city: "Al Khor",
    dateEvent: "2022-12-14",
    strTime: "22:00:00",
    homeGoals: [
      { player: "Théo Hernandez", minute: "5" },
      { player: "Randal Kolo Muani", minute: "79" }
    ],
    awayGoals: [],
    homeCards: [],
    awayCards: [
      { player: "Sofiane Boufal", minute: "27", type: "yellow" }
    ]
  },
  "1666948": {
    stadium: "Lusail Stadium",
    city: "Lusail",
    dateEvent: "2022-12-18",
    strTime: "18:00:00",
    homeGoals: [
      { player: "Lionel Messi", minute: "23", type: "penalty" },
      { player: "Ángel Di María", minute: "36" },
      { player: "Lionel Messi", minute: "108" }
    ],
    awayGoals: [
      { player: "Kylian Mbappé", minute: "80", type: "penalty" },
      { player: "Kylian Mbappé", minute: "81" },
      { player: "Kylian Mbappé", minute: "118", type: "penalty" }
    ],
    homeCards: [
      { player: "Enzo Fernández", minute: "45+7", type: "yellow" },
      { player: "Marcos Acuña", minute: "90+8", type: "yellow" },
      { player: "Leandro Paredes", minute: "114", type: "yellow" },
      { player: "Gonzalo Montiel", minute: "116", type: "yellow" }
    ],
    awayCards: []
  },
  "2505183": {
    stadium: "NRG Stadium",
    city: "Houston",
    dateEvent: "2026-07-04",
    strTime: "17:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Azzedine Ounahi", minute: "50" },
      { player: "Azzedine Ounahi", minute: "82" },
      { player: "Soufiane Rahimi", minute: "90+8" }
    ],
    homeCards: [
      { player: "Richie Laryea", minute: "40", type: "yellow" },
      { player: "Jonathan David", minute: "43", type: "yellow" },
      { player: "Luc de Fougerolles", minute: "49", type: "yellow" },
      { player: "Cyle Larin", minute: "67", type: "yellow" }
    ],
    awayCards: [
      { player: "Redouane Halhal", minute: "20", type: "yellow" },
      { player: "Achraf Hakimi", minute: "40", type: "yellow" },
      { player: "Azzedine Ounahi", minute: "45", type: "yellow" },
      { player: "Bilal El Khannouss", minute: "45+6", type: "yellow" }
    ]
  },
  "2505624": {
    stadium: "Lincoln Financial Field",
    city: "Philadelphie",
    dateEvent: "2026-07-04",
    strTime: "21:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Kylian Mbappé", minute: "70", type: "penalty" }
    ],
    homeCards: [
      { player: "Carlos González", minute: "90", type: "yellow" }
    ],
    awayCards: [
      { player: "Bradley Barcola", minute: "19", type: "yellow" },
      { player: "Manu Koné", minute: "81", type: "yellow" },
      { player: "Michael Olise", minute: "90+7", type: "yellow" }
    ]
  },
  "2505462": {
    stadium: "MetLife Stadium",
    city: "East Rutherford",
    dateEvent: "2026-07-05",
    strTime: "20:00:00",
    homeGoals: [
      { player: "Neymar", minute: "90+10", type: "penalty" }
    ],
    awayGoals: [
      { player: "Erling Haaland", minute: "79" },
      { player: "Erling Haaland", minute: "90" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2507706": {
    stadium: "Estadio Azteca",
    city: "Mexico",
    dateEvent: "2026-07-06",
    strTime: "02:00:00",
    homeGoals: [
      { player: "Julián Quiñones", minute: "42" },
      { player: "Raúl Jiménez", minute: "69", type: "penalty" }
    ],
    awayGoals: [
      { player: "Jude Bellingham", minute: "36" },
      { player: "Jude Bellingham", minute: "38" },
      { player: "Harry Kane", minute: "60", type: "penalty" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Jarell Quansah", minute: "70", type: "red" },
      { player: "Declan Rice", minute: "45", type: "yellow" }
    ]
  },
  "2511721": {
    stadium: "AT&T Stadium",
    city: "Arlington",
    dateEvent: "2026-07-06",
    strTime: "19:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Mikel Merino", minute: "90+1" }
    ],
    homeCards: [
      { player: "Bernardo Silva", minute: "89", type: "yellow" },
      { player: "Renato Veiga", minute: "90+3", type: "yellow" }
    ],
    awayCards: []
  },
  "2507707": {
    stadium: "Lumen Field",
    city: "Seattle",
    dateEvent: "2026-07-07",
    strTime: "00:00:00",
    homeGoals: [
      { player: "Malik Tillman", minute: "31" }
    ],
    awayGoals: [
      { player: "Charles De Ketelaere", minute: "9" },
      { player: "Charles De Ketelaere", minute: "33" },
      { player: "Hans Vanaken", minute: "57" },
      { player: "Romelu Lukaku", minute: "90+3" }
    ],
    homeCards: [
      { player: "Weston McKennie", minute: "35", type: "yellow" },
      { player: "Malik Tillman", minute: "69", type: "yellow" }
    ],
    awayCards: []
  },
  "2513670": {
    stadium: "Mercedes-Benz Stadium",
    city: "Atlanta",
    dateEvent: "2026-07-07",
    strTime: "16:00:00",
    homeGoals: [
      { player: "Cristian Romero", minute: "79" },
      { player: "Lionel Messi", minute: "83" },
      { player: "Enzo Fernández", minute: "90+2" }
    ],
    awayGoals: [
      { player: "Yasser Ibrahim", minute: "15" },
      { player: "Mostafa Ziko", minute: "67" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Yasser Ibrahim", minute: "15", type: "yellow" },
      { player: "Mostafa Ziko", minute: "67", type: "yellow" },
      { player: "Mostafa Shoubir", minute: "90+3", type: "yellow" },
      { player: "Hamdy Fathy", minute: "90+4", type: "yellow" },
      { player: "Marawan Attia", minute: "90+8", type: "yellow" }
    ]
  },
  "2513671": {
    stadium: "BC Place",
    city: "Vancouver",
    dateEvent: "2026-07-07",
    strTime: "20:00:00",
    homeGoals: [],
    awayGoals: [],
    homeCards: [
      { player: "Granit Xhaka", minute: "51", type: "yellow" },
      { player: "Denis Zakaria", minute: "59", type: "yellow" }
    ],
    awayCards: []
  },
  "2515305": {
    stadium: "Gillette Stadium",
    city: "Foxborough",
    dateEvent: "2026-07-09",
    strTime: "20:00:00",
    homeGoals: [
      { player: "Kylian Mbappé", minute: "60" },
      { player: "Ousmane Dembélé", minute: "66" }
    ],
    awayGoals: [],
    homeCards: [],
    awayCards: []
  },
  "2519345": {
    stadium: "SoFi Stadium",
    city: "Inglewood",
    dateEvent: "2026-07-10",
    strTime: "19:00:00",
    homeGoals: [
      { player: "Fabián Ruiz", minute: "30" },
      { player: "Mikel Merino", minute: "88" }
    ],
    awayGoals: [
      { player: "Charles De Ketelaere", minute: "41" }
    ],
    homeCards: [
      { player: "Pau Cubarsí", minute: "43", type: "yellow" },
      { player: "Aymeric Laporte", minute: "90+3", type: "yellow" }
    ],
    awayCards: []
  },
  "2517651": {
    stadium: "Hard Rock Stadium",
    city: "Miami Gardens",
    dateEvent: "2026-07-11",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Andreas Schjelderup", minute: "36" }
    ],
    awayGoals: [
      { player: "Jude Bellingham", minute: "45+2" },
      { player: "Jude Bellingham", minute: "93" }
    ],
    homeCards: [
      { player: "Kristoffer Ajer", minute: "117", type: "yellow" }
    ],
    awayCards: []
  },
  "2520608": {
    stadium: "Arrowhead Stadium",
    city: "Kansas City",
    dateEvent: "2026-07-12",
    strTime: "01:00:00",
    homeGoals: [
      { player: "Alexis Mac Allister", minute: "10" },
      { player: "Julián Alvarez", minute: "112" },
      { player: "Lautaro Martínez", minute: "120+1" }
    ],
    awayGoals: [
      { player: "Dan Ndoye", minute: "67" }
    ],
    homeCards: [
      { player: "Thiago Almada", minute: "97", type: "yellow" },
      { player: "Lautaro Martínez", minute: "98", type: "yellow" },
      { player: "José Manuel López", minute: "114", type: "yellow" }
    ],
    awayCards: []
  }
};
