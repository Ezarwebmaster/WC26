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
  "2499618": {
    stadium: "SoFi Stadium",
    city: "Inglewood",
    dateEvent: "2026-06-28",
    strTime: "19:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Stephen Eustáquio", minute: "90+2" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2499835": {
    stadium: "NRG Stadium",
    city: "Houston",
    dateEvent: "2026-06-29",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Casemiro", minute: "56" },
      { player: "Gabriel Martinelli", minute: "90+5" }
    ],
    awayGoals: [
      { player: "Kaishū Sano", minute: "29" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2502846": {
    stadium: "Gillette Stadium",
    city: "Foxborough",
    dateEvent: "2026-06-29",
    strTime: "20:30:00",
    homeGoals: [
      { player: "Kai Havertz", minute: "54" }
    ],
    awayGoals: [
      { player: "Julio Enciso", minute: "42" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2499836": {
    stadium: "Estadio BBVA",
    city: "Guadalupe",
    dateEvent: "2026-06-30",
    strTime: "01:00:00",
    homeGoals: [
      { player: "Cody Gakpo", minute: "72" }
    ],
    awayGoals: [
      { player: "Issa Diop", minute: "90+1" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2502605": {
    stadium: "AT&T Stadium",
    city: "Arlington",
    dateEvent: "2026-06-30",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Amad Diallo", minute: "74" }
    ],
    awayGoals: [
      { player: "Antonio Nusa", minute: "39" },
      { player: "Erling Haaland", minute: "86" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2502847": {
    stadium: "MetLife Stadium",
    city: "East Rutherford",
    dateEvent: "2026-06-30",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Kylian Mbappé", minute: "45" },
      { player: "Bradley Barcola", minute: "53" },
      { player: "Kylian Mbappé", minute: "74" }
    ],
    awayGoals: [],
    homeCards: [],
    awayCards: []
  },
  "2503390": {
    stadium: "Estadio Azteca",
    city: "Mexico City",
    dateEvent: "2026-07-01",
    strTime: "01:00:00",
    homeGoals: [
      { player: "Julián Quiñones", minute: "22" },
      { player: "Raúl Jiménez", minute: "31" }
    ],
    awayGoals: [],
    homeCards: [],
    awayCards: []
  },
  "2503391": {
    stadium: "Mercedes-Benz Stadium",
    city: "Atlanta",
    dateEvent: "2026-07-01",
    strTime: "16:00:00",
    homeGoals: [
      { player: "Harry Kane", minute: "75" },
      { player: "Harry Kane", minute: "86" }
    ],
    awayGoals: [
      { player: "Brian Cipenga", minute: "7" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2503392": {
    stadium: "Lumen Field",
    city: "Seattle",
    dateEvent: "2026-07-01",
    strTime: "20:00:00",
    homeGoals: [
      { player: "Romelu Lukaku", minute: "86" },
      { player: "Youri Tielemans", minute: "89" },
      { player: "Youri Tielemans", minute: "120+5", type: "penalty" }
    ],
    awayGoals: [
      { player: "Habib Diarra", minute: "25" },
      { player: "Ismaïla Sarr", minute: "51" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2499837": {
    stadium: "Levi's Stadium",
    city: "Santa Clara",
    dateEvent: "2026-07-02",
    strTime: "00:00:00",
    homeGoals: [
      { player: "Folarin Balogun", minute: "45" },
      { player: "Malik Tillman", minute: "82" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Folarin Balogun", minute: "64", type: "red" }
    ],
    awayCards: []
  },
  "2503636": {
    stadium: "SoFi Stadium",
    city: "Inglewood",
    dateEvent: "2026-07-02",
    strTime: "19:00:00",
    homeGoals: [
      { player: "Mikel Oyarzabal", minute: "36" },
      { player: "Pedro Porro", minute: "66" },
      { player: "Mikel Oyarzabal", minute: "89" }
    ],
    awayGoals: [],
    homeCards: [],
    awayCards: []
  },
  "2503393": {
    stadium: "BMO Field",
    city: "Toronto",
    dateEvent: "2026-07-02",
    strTime: "23:00:00",
    homeGoals: [
      { player: "Cristiano Ronaldo", minute: "68", type: "penalty" },
      { player: "Gonçalo Ramos", minute: "90+4" }
    ],
    awayGoals: [
      { player: "Ivan Perišić", minute: "53" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2503635": {
    stadium: "BC Place",
    city: "Vancouver",
    dateEvent: "2026-07-03",
    strTime: "03:00:00",
    homeGoals: [
      { player: "Breel Embolo", minute: "10" },
      { player: "Dan Ndoye", minute: "46" }
    ],
    awayGoals: [],
    homeCards: [],
    awayCards: []
  },
  "2502848": {
    stadium: "AT&T Stadium",
    city: "Arlington",
    dateEvent: "2026-07-03",
    strTime: "18:00:00",
    homeGoals: [
      { player: "Mohamed Hany", minute: "55", type: "own" }
    ],
    awayGoals: [
      { player: "Emam Ashour", minute: "13" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2502849": {
    stadium: "Hard Rock Stadium",
    city: "Miami Gardens",
    dateEvent: "2026-07-03",
    strTime: "22:00:00",
    homeGoals: [
      { player: "Lionel Messi", minute: "29" },
      { player: "Lisandro Martínez", minute: "92" },
      { player: "Diney", minute: "111", type: "own" }
    ],
    awayGoals: [
      { player: "Deroy Duarte", minute: "59" },
      { player: "Sidny Lopes Cabral", minute: "103" }
    ],
    homeCards: [],
    awayCards: []
  },
  "2503394": {
    stadium: "Arrowhead Stadium",
    city: "Kansas City",
    dateEvent: "2026-07-04",
    strTime: "01:30:00",
    homeGoals: [
      { player: "Jhon Arias", minute: "14" }
    ],
    awayGoals: [],
    homeCards: [],
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
  },
  "576424": {
    stadium: "Fisht Olympic Stadium",
    city: "Sochi",
    dateEvent: "2018-06-30",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Edinson Cavani", minute: "7" },
      { player: "Edinson Cavani", minute: "62" }
    ],
    awayGoals: [
      { player: "Pepe", minute: "55" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Cristiano Ronaldo", minute: "90+3", type: "yellow" }
    ]
  },
  "576426": {
    stadium: "Kazan Arena",
    city: "Kazan",
    dateEvent: "2018-06-30",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Antoine Griezmann", minute: "13", type: "penalty" },
      { player: "Benjamin Pavard", minute: "57" },
      { player: "Kylian Mbappé", minute: "64" },
      { player: "Kylian Mbappé", minute: "68" }
    ],
    awayGoals: [
      { player: "Ángel Di María", minute: "41" },
      { player: "Gabriel Mercado", minute: "48" },
      { player: "Sergio Agüero", minute: "90+3" }
    ],
    homeCards: [
      { player: "Blaise Matuidi", minute: "72", type: "yellow" },
      { player: "Benjamin Pavard", minute: "73", type: "yellow" },
      { player: "Olivier Giroud", minute: "90+3", type: "yellow" }
    ],
    awayCards: [
      { player: "Marcos Rojo", minute: "11", type: "yellow" },
      { player: "Nicolás Tagliafico", minute: "19", type: "yellow" },
      { player: "Javier Mascherano", minute: "43", type: "yellow" },
      { player: "Éver Banega", minute: "50", type: "yellow" },
      { player: "Nicolás Otamendi", minute: "90+3", type: "yellow" }
    ]
  },
  "576425": {
    stadium: "Luzhniki Stadium",
    city: "Moscow",
    dateEvent: "2018-07-01",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Sergei Ignashevich", minute: "12", type: "own" }
    ],
    awayGoals: [
      { player: "Artem Dzyuba", minute: "41", type: "penalty" }
    ],
    homeCards: [
      { player: "Gerard Piqué", minute: "40", type: "yellow" }
    ],
    awayCards: [
      { player: "Ilya Kutepov", minute: "54", type: "yellow" },
      { player: "Roman Zobnin", minute: "71", type: "yellow" }
    ]
  },
  "576464": {
    stadium: "Nizhny Novgorod Stadium",
    city: "Nizhny Novgorod",
    dateEvent: "2018-07-01",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Mario Mandžukić", minute: "4" }
    ],
    awayGoals: [
      { player: "Mathias Jørgensen", minute: "1" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Mathias Jørgensen", minute: "115", type: "yellow" }
    ]
  },
  "576465": {
    stadium: "Samara Arena",
    city: "Samara",
    dateEvent: "2018-07-02",
    strTime: "18:00:00",
    homeGoals: [
      { player: "Neymar", minute: "51" },
      { player: "Roberto Firmino", minute: "88" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Filipe Luís", minute: "43", type: "yellow" },
      { player: "Casemiro", minute: "59", type: "yellow" }
    ],
    awayCards: [
      { player: "Edson Álvarez", minute: "38", type: "yellow" },
      { player: "Héctor Herrera", minute: "55", type: "yellow" },
      { player: "Carlos Salcedo", minute: "77", type: "yellow" },
      { player: "Andrés Guardado", minute: "90+2", type: "yellow" }
    ]
  },
  "576468": {
    stadium: "Rostov Arena",
    city: "Rostov-on-Don",
    dateEvent: "2018-07-02",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Jan Vertonghen", minute: "69" },
      { player: "Marouane Fellaini", minute: "74" },
      { player: "Nacer Chadli", minute: "90+4" }
    ],
    awayGoals: [
      { player: "Genki Haraguchi", minute: "48" },
      { player: "Takashi Inui", minute: "52" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Gaku Shibasaki", minute: "40", type: "yellow" }
    ]
  },
  "576466": {
    stadium: "Saint Petersburg Stadium",
    city: "Saint Petersburg",
    dateEvent: "2018-07-03",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Emil Forsberg", minute: "66" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Mikael Lustig", minute: "31", type: "yellow" }
    ],
    awayCards: [
      { player: "Valon Behrami", minute: "61", type: "yellow" },
      { player: "Granit Xhaka", minute: "68", type: "yellow" },
      { player: "Michael Lang", minute: "90+4", type: "red" }
    ]
  },
  "576467": {
    stadium: "Spartak Stadium",
    city: "Moscow",
    dateEvent: "2018-07-03",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Yerry Mina", minute: "90+3" }
    ],
    awayGoals: [
      { player: "Harry Kane", minute: "57", type: "penalty" }
    ],
    homeCards: [
      { player: "Wilmar Barrios", minute: "41", type: "yellow" },
      { player: "Santiago Arias", minute: "52", type: "yellow" },
      { player: "Carlos Sánchez", minute: "54", type: "yellow" },
      { player: "Radamel Falcao", minute: "63", type: "yellow" },
      { player: "Carlos Bacca", minute: "64", type: "yellow" },
      { player: "Juan Cuadrado", minute: "118", type: "yellow" }
    ],
    awayCards: [
      { player: "Jordan Henderson", minute: "56", type: "yellow" },
      { player: "Jesse Lingard", minute: "69", type: "yellow" }
    ]
  },
  "576469": {
    stadium: "Nizhny Novgorod Stadium",
    city: "Nizhny Novgorod",
    dateEvent: "2018-07-06",
    strTime: "17:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Raphaël Varane", minute: "40" },
      { player: "Antoine Griezmann", minute: "61" }
    ],
    homeCards: [
      { player: "Rodrigo Bentancur", minute: "38", type: "yellow" },
      { player: "Cristian Rodríguez", minute: "69", type: "yellow" }
    ],
    awayCards: [
      { player: "Lucas Hernandez", minute: "33", type: "yellow" },
      { player: "Kylian Mbappé", minute: "69", type: "yellow" }
    ]
  },
  "576854": {
    stadium: "Kazan Arena",
    city: "Kazan",
    dateEvent: "2018-07-06",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Renato Augusto", minute: "76" }
    ],
    awayGoals: [
      { player: "Fernandinho", minute: "13", type: "own" },
      { player: "Kevin De Bruyne", minute: "31" }
    ],
    homeCards: [
      { player: "Fernandinho", minute: "85", type: "yellow" },
      { player: "Fagner", minute: "90", type: "yellow" }
    ],
    awayCards: [
      { player: "Toby Alderweireld", minute: "47", type: "yellow" },
      { player: "Thomas Meunier", minute: "71", type: "yellow" }
    ]
  },
  "576850": {
    stadium: "Fisht Olympic Stadium",
    city: "Sochi",
    dateEvent: "2018-07-07",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Denis Cheryshev", minute: "31" },
      { player: "Mário Fernandes", minute: "115" }
    ],
    awayGoals: [
      { player: "Andrej Kramarić", minute: "39" },
      { player: "Domagoj Vida", minute: "101" }
    ],
    homeCards: [
      { player: "Yury Gazinsky", minute: "109", type: "yellow" }
    ],
    awayCards: [
      { player: "Dejan Lovren", minute: "35", type: "yellow" },
      { player: "Ivan Strinić", minute: "38", type: "yellow" },
      { player: "Domagoj Vida", minute: "101", type: "yellow" },
      { player: "Josip Pivarić", minute: "114", type: "yellow" }
    ]
  },
  "576856": {
    stadium: "Samara Arena",
    city: "Samara",
    dateEvent: "2018-07-07",
    strTime: "18:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Harry Maguire", minute: "30" },
      { player: "Dele Alli", minute: "59" }
    ],
    homeCards: [
      { player: "John Guidetti", minute: "87", type: "yellow" },
      { player: "Sebastian Larsson", minute: "90+4", type: "yellow" }
    ],
    awayCards: [
      { player: "Harry Maguire", minute: "87", type: "yellow" }
    ]
  },
  "576962": {
    stadium: "Saint Petersburg Stadium",
    city: "Saint Petersburg",
    dateEvent: "2018-07-10",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Samuel Umtiti", minute: "51" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Kylian Mbappé", minute: "88", type: "yellow" },
      { player: "N'Golo Kanté", minute: "90+3", type: "yellow" }
    ],
    awayCards: [
      { player: "Jan Vertonghen", minute: "52", type: "yellow" },
      { player: "Toby Alderweireld", minute: "64", type: "yellow" },
      { player: "Eden Hazard", minute: "90+4", type: "yellow" }
    ]
  },
  "576963": {
    stadium: "Luzhniki Stadium",
    city: "Moscow",
    dateEvent: "2018-07-11",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Ivan Perišić", minute: "68" },
      { player: "Mario Mandžukić", minute: "109" }
    ],
    awayGoals: [
      { player: "Kieran Trippier", minute: "5" }
    ],
    homeCards: [
      { player: "Mario Mandžukić", minute: "48", type: "yellow" },
      { player: "Ante Rebić", minute: "96", type: "yellow" }
    ],
    awayCards: [
      { player: "Kyle Walker", minute: "54", type: "yellow" }
    ]
  },
  "577207": {
    stadium: "Luzhniki Stadium",
    city: "Moscow",
    dateEvent: "2018-07-15",
    strTime: "18:00:00",
    homeGoals: [
      { player: "Mario Mandžukić", minute: "18", type: "own" },
      { player: "Antoine Griezmann", minute: "38", type: "penalty" },
      { player: "Paul Pogba", minute: "59" },
      { player: "Kylian Mbappé", minute: "65" }
    ],
    awayGoals: [
      { player: "Ivan Perišić", minute: "28" },
      { player: "Mario Mandžukić", minute: "69" }
    ],
    homeCards: [
      { player: "N'Golo Kanté", minute: "27", type: "yellow" },
      { player: "Lucas Hernandez", minute: "41", type: "yellow" }
    ],
    awayCards: [
      { player: "Šime Vrsaljko", minute: "90+2", type: "yellow" }
    ]
  },
  "505634": {
    stadium: "Estádio Mineirão",
    city: "Belo Horizonte",
    dateEvent: "2014-06-28",
    strTime: "13:00:00",
    homeGoals: [
      { player: "David Luiz", minute: "18" }
    ],
    awayGoals: [
      { player: "Alexis Sánchez", minute: "32" }
    ],
    homeCards: [
      { player: "Hulk", minute: "55", type: "yellow" },
      { player: "Luiz Gustavo", minute: "60", type: "yellow" },
      { player: "Jô", minute: "93", type: "yellow" },
      { player: "Dani Alves", minute: "105+1", type: "yellow" }
    ],
    awayCards: [
      { player: "Eugenio Mena", minute: "17", type: "yellow" },
      { player: "Francisco Silva", minute: "40", type: "yellow" },
      { player: "Mauricio Pinilla", minute: "102", type: "yellow" }
    ]
  },
  "505635": {
    stadium: "Estádio do Maracanã",
    city: "Rio de Janeiro",
    dateEvent: "2014-06-28",
    strTime: "17:00:00",
    homeGoals: [
      { player: "James Rodríguez", minute: "28" },
      { player: "James Rodríguez", minute: "50" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Pablo Armero", minute: "78", type: "yellow" }
    ],
    awayCards: [
      { player: "José María Giménez", minute: "55", type: "yellow" },
      { player: "Diego Lugano", minute: "77", type: "yellow" }
    ]
  },
  "505636": {
    stadium: "Estádio Castelão",
    city: "Fortaleza",
    dateEvent: "2014-06-29",
    strTime: "13:00:00",
    homeGoals: [
      { player: "Wesley Sneijder", minute: "88" },
      { player: "Klaas-Jan Huntelaar", minute: "90+4", type: "penalty" }
    ],
    awayGoals: [
      { player: "Giovani dos Santos", minute: "48" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Paul Aguilar", minute: "69", type: "yellow" },
      { player: "Rafael Márquez", minute: "90+2", type: "yellow" },
      { player: "Andrés Guardado", minute: "90+3", type: "yellow" }
    ]
  },
  "505637": {
    stadium: "Itaipava Arena Pernambuco",
    city: "Recife",
    dateEvent: "2014-06-29",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Bryan Ruiz", minute: "52" }
    ],
    awayGoals: [
      { player: "Sokratis Papastathopoulos", minute: "90+1" }
    ],
    homeCards: [
      { player: "Óscar Duarte", minute: "42", type: "yellow" },
      { player: "Yeltsin Tejeda", minute: "48", type: "yellow" },
      { player: "Óscar Granados", minute: "57", type: "yellow" },
      { player: "Óscar Duarte", minute: "66", type: "yellow-red" },
      { player: "Bryan Ruiz", minute: "70", type: "yellow" },
      { player: "Keylor Navas", minute: "90", type: "yellow" }
    ],
    awayCards: [
      { player: "Andreas Samaris", minute: "36", type: "yellow" },
      { player: "Konstantinos Manolas", minute: "72", type: "yellow" }
    ]
  },
  "505638": {
    stadium: "Estádio Nacional Mané Garrincha",
    city: "Brasília",
    dateEvent: "2014-06-30",
    strTime: "13:00:00",
    homeGoals: [
      { player: "Paul Pogba", minute: "79" },
      { player: "Joseph Yobo", minute: "90+2", type: "own" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Blaise Matuidi", minute: "54", type: "yellow" }
    ],
    awayCards: []
  },
  "505639": {
    stadium: "Estádio Beira-Rio",
    city: "Porto Alegre",
    dateEvent: "2014-06-30",
    strTime: "17:00:00",
    homeGoals: [
      { player: "André Schürrle", minute: "92" },
      { player: "Mesut Özil", minute: "120" }
    ],
    awayGoals: [
      { player: "Abdelmoumene Djabou", minute: "120+1" }
    ],
    homeCards: [
      { player: "Philipp Lahm", minute: "107", type: "yellow" }
    ],
    awayCards: [
      { player: "Rafik Halliche", minute: "42", type: "yellow" }
    ]
  },
  "505640": {
    stadium: "Arena Corinthians",
    city: "São Paulo",
    dateEvent: "2014-07-01",
    strTime: "13:00:00",
    homeGoals: [
      { player: "Ángel Di María", minute: "118" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Marcos Rojo", minute: "90", type: "yellow" },
      { player: "Ángel Di María", minute: "120", type: "yellow" },
      { player: "Ezequiel Garay", minute: "120+4", type: "yellow" }
    ],
    awayCards: [
      { player: "Granit Xhaka", minute: "36", type: "yellow" },
      { player: "Gelson Fernandes", minute: "73", type: "yellow" }
    ]
  },
  "505641": {
    stadium: "Itaipava Arena Fonte Nova",
    city: "Salvador",
    dateEvent: "2014-07-01",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Kevin De Bruyne", minute: "93" },
      { player: "Romelu Lukaku", minute: "105" }
    ],
    awayGoals: [
      { player: "Julian Green", minute: "107" }
    ],
    homeCards: [
      { player: "Vincent Kompany", minute: "42", type: "yellow" }
    ],
    awayCards: [
      { player: "Geoff Cameron", minute: "18", type: "yellow" }
    ]
  },
  "505642": {
    stadium: "Estádio do Maracanã",
    city: "Rio de Janeiro",
    dateEvent: "2014-07-04",
    strTime: "13:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Mats Hummels", minute: "13" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Sami Khedira", minute: "54", type: "yellow" },
      { player: "Bastian Schweinsteiger", minute: "80", type: "yellow" }
    ]
  },
  "505643": {
    stadium: "Estádio Castelão",
    city: "Fortaleza",
    dateEvent: "2014-07-04",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Thiago Silva", minute: "7" },
      { player: "David Luiz", minute: "69" }
    ],
    awayGoals: [
      { player: "James Rodríguez", minute: "80", type: "penalty" }
    ],
    homeCards: [
      { player: "Thiago Silva", minute: "64", type: "yellow" },
      { player: "Júlio César", minute: "78", type: "yellow" }
    ],
    awayCards: [
      { player: "James Rodríguez", minute: "67", type: "yellow" },
      { player: "Mario Yepes", minute: "69", type: "yellow" }
    ]
  },
  "505644": {
    stadium: "Estádio Nacional Mané Garrincha",
    city: "Brasília",
    dateEvent: "2014-07-05",
    strTime: "13:00:00",
    homeGoals: [
      { player: "Gonzalo Higuaín", minute: "8" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Lucas Biglia", minute: "75", type: "yellow" }
    ],
    awayCards: [
      { player: "Eden Hazard", minute: "53", type: "yellow" },
      { player: "Toby Alderweireld", minute: "68", type: "yellow" }
    ]
  },
  "505645": {
    stadium: "Itaipava Arena Fonte Nova",
    city: "Salvador",
    dateEvent: "2014-07-05",
    strTime: "17:00:00",
    homeGoals: [],
    awayGoals: [],
    homeCards: [
      { player: "Bruno Martins Indi", minute: "64", type: "yellow" },
      { player: "Klaas-Jan Huntelaar", minute: "111", type: "yellow" }
    ],
    awayCards: [
      { player: "Júnior Díaz", minute: "37", type: "yellow" },
      { player: "Michael Umaña", minute: "52", type: "yellow" },
      { player: "Giancarlo González", minute: "81", type: "yellow" },
      { player: "Johnny Acosta", minute: "107", type: "yellow" }
    ]
  },
  "505646": {
    stadium: "Estádio Mineirão",
    city: "Belo Horizonte",
    dateEvent: "2014-07-08",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Oscar", minute: "90" }
    ],
    awayGoals: [
      { player: "Thomas Müller", minute: "11" },
      { player: "Miroslav Klose", minute: "23" },
      { player: "Toni Kroos", minute: "24" },
      { player: "Toni Kroos", minute: "26" },
      { player: "Sami Khedira", minute: "29" },
      { player: "André Schürrle", minute: "69" },
      { player: "André Schürrle", minute: "79" }
    ],
    homeCards: [
      { player: "Dante", minute: "68", type: "yellow" }
    ],
    awayCards: []
  },
  "505647": {
    stadium: "Arena Corinthians",
    city: "São Paulo",
    dateEvent: "2014-07-09",
    strTime: "17:00:00",
    homeGoals: [],
    awayGoals: [],
    homeCards: [
      { player: "Bruno Martins Indi", minute: "45", type: "yellow" },
      { player: "Klaas-Jan Huntelaar", minute: "105", type: "yellow" }
    ],
    awayCards: [
      { player: "Martín Demichelis", minute: "49", type: "yellow" }
    ]
  },
  "505649": {
    stadium: "Estádio do Maracanã",
    city: "Rio de Janeiro",
    dateEvent: "2014-07-13",
    strTime: "16:00:00",
    homeGoals: [
      { player: "Mario Götze", minute: "113" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Bastian Schweinsteiger", minute: "29", type: "yellow" },
      { player: "Benedikt Höwedes", minute: "34", type: "yellow" }
    ],
    awayCards: [
      { player: "Javier Mascherano", minute: "64", type: "yellow" },
      { player: "Sergio Agüero", minute: "65", type: "yellow" }
    ]
  },
  "538305": {
    stadium: "Nelson Mandela Bay Stadium",
    city: "Port Elizabeth",
    dateEvent: "2010-06-26",
    strTime: "16:00:00",
    homeGoals: [
      { player: "Luis Suárez", minute: "8" },
      { player: "Luis Suárez", minute: "80" }
    ],
    awayGoals: [
      { player: "Lee Chung-yong", minute: "68" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Kim Jung-woo", minute: "38", type: "yellow" },
      { player: "Cha Du-ri", minute: "69", type: "yellow" },
      { player: "Cho Yong-hyung", minute: "83", type: "yellow" }
    ]
  },
  "538319": {
    stadium: "Royal Bafokeng Stadium",
    city: "Rustenburg",
    dateEvent: "2010-06-26",
    strTime: "20:30:00",
    homeGoals: [
      { player: "Landon Donovan", minute: "62", type: "penalty" }
    ],
    awayGoals: [
      { player: "Kevin-Prince Boateng", minute: "5" },
      { player: "Asamoah Gyan", minute: "93" }
    ],
    homeCards: [
      { player: "Ricardo Clark", minute: "7", type: "yellow" },
      { player: "Steve Cherundolo", minute: "18", type: "yellow" },
      { player: "Carlos Bocanegra", minute: "68", type: "yellow" }
    ],
    awayCards: [
      { player: "Jonathan Mensah", minute: "61", type: "yellow" },
      { player: "André Ayew", minute: "92", type: "yellow" }
    ]
  },
  "538325": {
    stadium: "Moses Mabhida Stadium",
    city: "Durban",
    dateEvent: "2010-06-28",
    strTime: "16:00:00",
    homeGoals: [
      { player: "Arjen Robben", minute: "18" },
      { player: "Wesley Sneijder", minute: "84" }
    ],
    awayGoals: [
      { player: "Róbert Vittek", minute: "90+4", type: "penalty" }
    ],
    homeCards: [
      { player: "Arjen Robben", minute: "31", type: "yellow" },
      { player: "Maarten Stekelenburg", minute: "90+3", type: "yellow" }
    ],
    awayCards: [
      { player: "Juraj Kucka", minute: "40", type: "yellow" },
      { player: "Kamil Kopúnek", minute: "72", type: "yellow" },
      { player: "Martin Škrtel", minute: "84", type: "yellow" }
    ]
  },
  "538329": {
    stadium: "Ellis Park Stadium",
    city: "Johannesburg",
    dateEvent: "2010-06-28",
    strTime: "20:30:00",
    homeGoals: [
      { player: "Juan", minute: "35" },
      { player: "Luís Fabiano", minute: "38" },
      { player: "Robinho", minute: "59" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Kaká", minute: "30", type: "yellow" },
      { player: "Ramires", minute: "72", type: "yellow" }
    ],
    awayCards: [
      { player: "Arturo Vidal", minute: "47", type: "yellow" },
      { player: "Ismael Fuentes", minute: "68", type: "yellow" },
      { player: "Rodrigo Millar", minute: "80", type: "yellow" }
    ]
  },
  "538307": {
    stadium: "Soccer City",
    city: "Johannesburg",
    dateEvent: "2010-06-27",
    strTime: "20:30:00",
    homeGoals: [
      { player: "Carlos Tevez", minute: "26" },
      { player: "Gonzalo Higuaín", minute: "33" },
      { player: "Carlos Tevez", minute: "52" }
    ],
    awayGoals: [
      { player: "Javier Hernández", minute: "71" }
    ],
    homeCards: [],
    awayCards: [
      { player: "Rafael Márquez", minute: "28", type: "yellow" }
    ]
  },
  "538306": {
    stadium: "Free State Stadium",
    city: "Bloemfontein",
    dateEvent: "2010-06-27",
    strTime: "16:00:00",
    homeGoals: [
      { player: "Miroslav Klose", minute: "20" },
      { player: "Lukas Podolski", minute: "32" },
      { player: "Thomas Müller", minute: "67" },
      { player: "Thomas Müller", minute: "70" }
    ],
    awayGoals: [
      { player: "Matthew Upson", minute: "37" }
    ],
    homeCards: [
      { player: "Arne Friedrich", minute: "47", type: "yellow" }
    ],
    awayCards: [
      { player: "Glen Johnson", minute: "81", type: "yellow" }
    ]
  },
  "1033973": {
    stadium: "Loftus Versfeld Stadium",
    city: "Pretoria",
    dateEvent: "2010-06-29",
    strTime: "14:00:00",
    homeGoals: [],
    awayGoals: [],
    homeCards: [
      { player: "Cristian Riveros", minute: "118", type: "yellow" }
    ],
    awayCards: [
      { player: "Daisuke Matsui", minute: "58", type: "yellow" },
      { player: "Yuto Nagatomo", minute: "72", type: "yellow" },
      { player: "Keisuke Honda", minute: "90+3", type: "yellow" },
      { player: "Yasuhito Endō", minute: "113", type: "yellow" }
    ]
  },
  "538308": {
    stadium: "Cape Town Stadium",
    city: "Cape Town",
    dateEvent: "2010-06-29",
    strTime: "20:30:00",
    homeGoals: [
      { player: "David Villa", minute: "63" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Xabi Alonso", minute: "74", type: "yellow" }
    ],
    awayCards: [
      { player: "Tiago", minute: "80", type: "yellow" },
      { player: "Ricardo Costa", minute: "89", type: "red" }
    ]
  },
  "538320": {
    stadium: "Soccer City",
    city: "Johannesburg",
    dateEvent: "2010-07-02",
    strTime: "20:30:00",
    homeGoals: [
      { player: "Diego Forlán", minute: "55" }
    ],
    awayGoals: [
      { player: "Sulley Muntari", minute: "45+2" }
    ],
    homeCards: [
      { player: "Jorge Fucile", minute: "20", type: "yellow" },
      { player: "Egidio Arévalo Ríos", minute: "48", type: "yellow" },
      { player: "Diego Pérez", minute: "59", type: "yellow" },
      { player: "Luis Suárez", minute: "120+1", type: "red" }
    ],
    awayCards: [
      { player: "John Paintsil", minute: "54", type: "yellow" },
      { player: "Hans Sarpei", minute: "77", type: "yellow" },
      { player: "John Mensah", minute: "93", type: "yellow" }
    ]
  },
  "538309": {
    stadium: "Nelson Mandela Bay Stadium",
    city: "Port Elizabeth",
    dateEvent: "2010-07-02",
    strTime: "16:00:00",
    homeGoals: [
      { player: "Wesley Sneijder", minute: "53" },
      { player: "Wesley Sneijder", minute: "68" }
    ],
    awayGoals: [
      { player: "Robinho", minute: "10" }
    ],
    homeCards: [
      { player: "John Heitinga", minute: "14", type: "yellow" },
      { player: "Gregory van der Wiel", minute: "47", type: "yellow" },
      { player: "Nigel de Jong", minute: "64", type: "yellow" },
      { player: "André Ooijer", minute: "76", type: "yellow" }
    ],
    awayCards: [
      { player: "Michel Bastos", minute: "37", type: "yellow" },
      { player: "Felipe Melo", minute: "73", type: "red" }
    ]
  },
  "538310": {
    stadium: "Cape Town Stadium",
    city: "Cape Town",
    dateEvent: "2010-07-03",
    strTime: "16:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Thomas Müller", minute: "3" },
      { player: "Miroslav Klose", minute: "68" },
      { player: "Arne Friedrich", minute: "74" },
      { player: "Miroslav Klose", minute: "89" }
    ],
    homeCards: [
      { player: "Nicolás Otamendi", minute: "11", type: "yellow" },
      { player: "Javier Mascherano", minute: "80", type: "yellow" }
    ],
    awayCards: [
      { player: "Thomas Müller", minute: "35", type: "yellow" }
    ]
  },
  "1033974": {
    stadium: "Ellis Park Stadium",
    city: "Johannesburg",
    dateEvent: "2010-07-03",
    strTime: "18:30:00",
    homeGoals: [],
    awayGoals: [
      { player: "David Villa", minute: "83" }
    ],
    homeCards: [
      { player: "Víctor Cáceres", minute: "59", type: "yellow" },
      { player: "Antolín Alcaraz", minute: "59", type: "yellow" },
      { player: "Claudio Morel", minute: "71", type: "yellow" },
      { player: "Jonathan Santana", minute: "88", type: "yellow" }
    ],
    awayCards: [
      { player: "Gerard Piqué", minute: "57", type: "yellow" },
      { player: "Sergio Busquets", minute: "63", type: "yellow" }
    ]
  },
  "538311": {
    stadium: "Cape Town Stadium",
    city: "Cape Town",
    dateEvent: "2010-07-06",
    strTime: "20:30:00",
    homeGoals: [
      { player: "Diego Forlán", minute: "41" },
      { player: "Maxi Pereira", minute: "90+2" }
    ],
    awayGoals: [
      { player: "Giovanni van Bronckhorst", minute: "18" },
      { player: "Wesley Sneijder", minute: "70" },
      { player: "Arjen Robben", minute: "73" }
    ],
    homeCards: [
      { player: "Maxi Pereira", minute: "21", type: "yellow" },
      { player: "Martín Cáceres", minute: "29", type: "yellow" }
    ],
    awayCards: [
      { player: "Wesley Sneijder", minute: "29", type: "yellow" },
      { player: "Khalid Boulahrouz", minute: "78", type: "yellow" },
      { player: "Mark van Bommel", minute: "90+5", type: "yellow" }
    ]
  },
  "538312": {
    stadium: "Moses Mabhida Stadium",
    city: "Durban",
    dateEvent: "2010-07-07",
    strTime: "20:30:00",
    homeGoals: [],
    awayGoals: [
      { player: "Carles Puyol", minute: "73" }
    ],
    homeCards: [],
    awayCards: []
  },
  "538314": {
    stadium: "Soccer City",
    city: "Johannesburg",
    dateEvent: "2010-07-11",
    strTime: "20:30:00",
    homeGoals: [],
    awayGoals: [
      { player: "Andrés Iniesta", minute: "116" }
    ],
    homeCards: [
      { player: "Robin van Persie", minute: "15", type: "yellow" },
      { player: "Mark van Bommel", minute: "22", type: "yellow" },
      { player: "Nigel de Jong", minute: "28", type: "yellow" },
      { player: "Giovanni van Bronckhorst", minute: "54", type: "yellow" },
      { player: "John Heitinga", minute: "57", type: "yellow" },
      { player: "Arjen Robben", minute: "84", type: "yellow" },
      { player: "John Heitinga", minute: "109", type: "yellow-red" },
      { player: "Gregory van der Wiel", minute: "111", type: "yellow" },
      { player: "Joris Mathijsen", minute: "117", type: "yellow" }
    ],
    awayCards: [
      { player: "Carles Puyol", minute: "16", type: "yellow" },
      { player: "Sergio Ramos", minute: "23", type: "yellow" },
      { player: "Joan Capdevila", minute: "67", type: "yellow" },
      { player: "Andrés Iniesta", minute: "118", type: "yellow" },
      { player: "Xavi", minute: "121", type: "yellow" }
    ]
  },
  "1034683": {
    stadium: "Allianz Arena",
    city: "Munich",
    dateEvent: "2006-06-24",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Lukas Podolski", minute: "4" },
      { player: "Lukas Podolski", minute: "12" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Torsten Frings", minute: "27", type: "yellow" }
    ],
    awayCards: [
      { player: "Teddy Lučić", minute: "28", type: "yellow" },
      { player: "Teddy Lučić", minute: "35", type: "yellow-red" },
      { player: "Mattias Jonson", minute: "48", type: "yellow" },
      { player: "Marcus Allbäck", minute: "78", type: "yellow" }
    ]
  },
  "1034684": {
    stadium: "Zentralstadion",
    city: "Leipzig",
    dateEvent: "2006-06-24",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Hernán Crespo", minute: "10" },
      { player: "Maxi Rodríguez", minute: "98" }
    ],
    awayGoals: [
      { player: "Rafael Márquez", minute: "6" }
    ],
    homeCards: [
      { player: "Gabriel Heinze", minute: "45+1", type: "yellow" },
      { player: "Juan Pablo Sorín", minute: "112", type: "yellow" }
    ],
    awayCards: [
      { player: "Rafael Márquez", minute: "70", type: "yellow" },
      { player: "José Antonio Castro", minute: "82", type: "yellow" },
      { player: "Gerardo Torrado", minute: "118", type: "yellow" },
      { player: "Francisco Fonseca", minute: "119", type: "yellow" }
    ]
  },
  "1034685": {
    stadium: "Gottlieb-Daimler-Stadion",
    city: "Stuttgart",
    dateEvent: "2006-06-25",
    strTime: "17:00:00",
    homeGoals: [
      { player: "David Beckham", minute: "60" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "John Terry", minute: "18", type: "yellow" },
      { player: "Paul Robinson", minute: "78", type: "yellow" },
      { player: "Jamie Carragher", minute: "82", type: "yellow" }
    ],
    awayCards: [
      { player: "Antonio Valencia", minute: "24", type: "yellow" },
      { player: "Carlos Tenorio", minute: "37", type: "yellow" },
      { player: "Ulises de la Cruz", minute: "67", type: "yellow" }
    ]
  },
  "1034686": {
    stadium: "Frankenstadion",
    city: "Nuremberg",
    dateEvent: "2006-06-25",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Maniche", minute: "23" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Maniche", minute: "20", type: "yellow" },
      { player: "Costinha", minute: "31", type: "yellow" },
      { player: "Costinha", minute: "45+1", type: "yellow-red" },
      { player: "Petit", minute: "50", type: "yellow" },
      { player: "Luís Figo", minute: "60", type: "yellow" },
      { player: "Deco", minute: "73", type: "yellow" },
      { player: "Ricardo", minute: "76", type: "yellow" },
      { player: "Nuno Valente", minute: "76", type: "yellow" },
      { player: "Deco", minute: "78", type: "yellow-red" }
    ],
    awayCards: [
      { player: "Mark van Bommel", minute: "2", type: "yellow" },
      { player: "Khalid Boulahrouz", minute: "7", type: "yellow" },
      { player: "Giovanni van Bronckhorst", minute: "59", type: "yellow" },
      { player: "Khalid Boulahrouz", minute: "63", type: "yellow-red" },
      { player: "Wesley Sneijder", minute: "73", type: "yellow" },
      { player: "Rafael van der Vaart", minute: "74", type: "yellow" },
      { player: "Giovanni van Bronckhorst", minute: "90+5", type: "yellow-red" }
    ]
  },
  "1034687": {
    stadium: "Fritz-Walter-Stadion",
    city: "Kaiserslautern",
    dateEvent: "2006-06-26",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Francesco Totti", minute: "90+5", type: "penalty" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Fabio Grosso", minute: "29", type: "yellow" },
      { player: "Marco Materazzi", minute: "50", type: "red" },
      { player: "Gennaro Gattuso", minute: "89", type: "yellow" },
      { player: "Gianluca Zambrotta", minute: "90+1", type: "yellow" }
    ],
    awayCards: [
      { player: "Vince Grella", minute: "23", type: "yellow" },
      { player: "Tim Cahill", minute: "49", type: "yellow" },
      { player: "Luke Wilkshire", minute: "61", type: "yellow" }
    ]
  },
  "1034688": {
    stadium: "RheinEnergieStadion",
    city: "Cologne",
    dateEvent: "2006-06-26",
    strTime: "21:00:00",
    homeGoals: [],
    awayGoals: [],
    homeCards: [
      { player: "Tranquillo Barnetta", minute: "59", type: "yellow" }
    ],
    awayCards: []
  },
  "1034689": {
    stadium: "Westfalenstadion",
    city: "Dortmund",
    dateEvent: "2006-06-27",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Ronaldo", minute: "5" },
      { player: "Adriano", minute: "45+1" },
      { player: "Zé Roberto", minute: "84" }
    ],
    awayGoals: [],
    homeCards: [
      { player: "Adriano", minute: "13", type: "yellow" },
      { player: "Juan", minute: "44", type: "yellow" }
    ],
    awayCards: [
      { player: "Stephen Appiah", minute: "7", type: "yellow" },
      { player: "Sulley Muntari", minute: "11", type: "yellow" },
      { player: "John Paintsil", minute: "29", type: "yellow" },
      { player: "Eric Addo", minute: "38", type: "yellow" },
      { player: "Asamoah Gyan", minute: "48", type: "yellow" },
      { player: "Asamoah Gyan", minute: "81", type: "yellow-red" }
    ]
  },
  "1034690": {
    stadium: "Niedersachsenstadion",
    city: "Hanover",
    dateEvent: "2006-06-27",
    strTime: "21:00:00",
    homeGoals: [
      { player: "David Villa", minute: "28", type: "penalty" }
    ],
    awayGoals: [
      { player: "Franck Ribéry", minute: "41" },
      { player: "Patrick Vieira", minute: "83" },
      { player: "Zinedine Zidane", minute: "90+2" }
    ],
    homeCards: [
      { player: "Carles Puyol", minute: "82", type: "yellow" }
    ],
    awayCards: [
      { player: "Patrick Vieira", minute: "68", type: "yellow" },
      { player: "Franck Ribéry", minute: "87", type: "yellow" },
      { player: "Zinedine Zidane", minute: "90+1", type: "yellow" }
    ]
  },
  "1034691": {
    stadium: "Olympiastadion",
    city: "Berlin",
    dateEvent: "2006-06-30",
    strTime: "17:00:00",
    homeGoals: [
      { player: "Miroslav Klose", minute: "80" }
    ],
    awayGoals: [
      { player: "Roberto Ayala", minute: "49" }
    ],
    homeCards: [
      { player: "Lukas Podolski", minute: "3", type: "yellow" },
      { player: "David Odonkor", minute: "94", type: "yellow" },
      { player: "Arne Friedrich", minute: "114", type: "yellow" }
    ],
    awayCards: [
      { player: "Juan Pablo Sorín", minute: "46", type: "yellow" },
      { player: "Javier Mascherano", minute: "60", type: "yellow" },
      { player: "Maxi Rodríguez", minute: "88", type: "yellow" },
      { player: "Julio Cruz", minute: "95", type: "yellow" },
      { player: "Leandro Cufré", minute: "120", type: "red" }
    ]
  },
  "1034692": {
    stadium: "Volksparkstadion",
    city: "Hamburg",
    dateEvent: "2006-06-30",
    strTime: "21:00:00",
    homeGoals: [
      { player: "Gianluca Zambrotta", minute: "6" },
      { player: "Luca Toni", minute: "59" },
      { player: "Luca Toni", minute: "69" }
    ],
    awayGoals: [],
    homeCards: [],
    awayCards: [
      { player: "Vyacheslav Sviderskyi", minute: "16", type: "yellow" },
      { player: "Maksym Kalynychenko", minute: "21", type: "yellow" },
      { player: "Artem Milevskyi", minute: "67", type: "yellow" }
    ]
  },
  "1034693": {
    stadium: "Arena AufSchalke",
    city: "Gelsenkirchen",
    dateEvent: "2006-07-01",
    strTime: "17:00:00",
    homeGoals: [],
    awayGoals: [],
    homeCards: [
      { player: "John Terry", minute: "30", type: "yellow" },
      { player: "Wayne Rooney", minute: "62", type: "red" },
      { player: "Owen Hargreaves", minute: "107", type: "yellow" }
    ],
    awayCards: [
      { player: "Petit", minute: "44", type: "yellow" },
      { player: "Ricardo Carvalho", minute: "111", type: "yellow" }
    ]
  },
  "1034694": {
    stadium: "Waldstadion",
    city: "Frankfurt",
    dateEvent: "2006-07-01",
    strTime: "21:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Thierry Henry", minute: "57" }
    ],
    homeCards: [
      { player: "Cafu", minute: "25", type: "yellow" },
      { player: "Juan", minute: "45", type: "yellow" },
      { player: "Ronaldo", minute: "45+2", type: "yellow" },
      { player: "Lúcio", minute: "75", type: "yellow" }
    ],
    awayCards: [
      { player: "Willy Sagnol", minute: "74", type: "yellow" },
      { player: "Louis Saha", minute: "87", type: "yellow" },
      { player: "Lilian Thuram", minute: "88", type: "yellow" }
    ]
  },
  "1034695": {
    stadium: "Westfalenstadion",
    city: "Dortmund",
    dateEvent: "2006-07-04",
    strTime: "21:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Fabio Grosso", minute: "119" },
      { player: "Alessandro Del Piero", minute: "120+1" }
    ],
    homeCards: [
      { player: "Tim Borowski", minute: "40", type: "yellow" },
      { player: "Christoph Metzelder", minute: "56", type: "yellow" }
    ],
    awayCards: [
      { player: "Mauro Camoranesi", minute: "90", type: "yellow" }
    ]
  },
  "1034696": {
    stadium: "Allianz Arena",
    city: "Munich",
    dateEvent: "2006-07-05",
    strTime: "21:00:00",
    homeGoals: [],
    awayGoals: [
      { player: "Zinedine Zidane", minute: "33", type: "penalty" }
    ],
    homeCards: [
      { player: "Ricardo Carvalho", minute: "83", type: "yellow" }
    ],
    awayCards: [
      { player: "Louis Saha", minute: "87", type: "yellow" }
    ]
  },
  "1034698": {
    stadium: "Olympiastadion",
    city: "Berlin",
    dateEvent: "2006-07-09",
    strTime: "20:00:00",
    homeGoals: [
      { player: "Marco Materazzi", minute: "19" }
    ],
    awayGoals: [
      { player: "Zinedine Zidane", minute: "7", type: "penalty" }
    ],
    homeCards: [
      { player: "Gianluca Zambrotta", minute: "5", type: "yellow" }
    ],
    awayCards: [
      { player: "Willy Sagnol", minute: "12", type: "yellow" },
      { player: "Claude Makélélé", minute: "76", type: "yellow" },
      { player: "Zinedine Zidane", minute: "110", type: "red" },
      { player: "Florent Malouda", minute: "111", type: "yellow" }
    ]
  }
};
