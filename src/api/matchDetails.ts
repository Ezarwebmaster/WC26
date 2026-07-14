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
  }
};
