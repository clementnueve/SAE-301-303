let echartsInstance;

// --- définition des options et données de base de la visualisation --- //
let option = {
  title: {
    text: 'Formation Overview'
  },
  legend: {
    data: ['Candidatures', 'Admis']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Phase Principale', max: 5000 },
      { name: 'Phase Complémentaire', max: 5000 },
      { name: 'Total Candidatures', max: 10000 },
      { name: 'Total Admis', max: 500 },
      { name: 'Femmes Admises', max: 300 },
      { name: 'Taux d\'admission %', max: 100 }
    ]
  },
  series: [
    {
      name: 'Statistiques',
      type: 'radar',
      data: [
        {
          value: [0, 0, 0, 0, 0, 0],
          name: 'Données'
        }
      ]
    }
  ]
};

export function create() {
  console.log("create RadarViz");
  // --- sélectionne l'élément qui accueillera la visualisation radar --- //
  const domViz = document.getElementById("attemptsRadar").querySelector(".viz");
  if (!domViz) {
    console.warn('Élément pour radar non trouvé');
    return;
  }
  // --- crée la visualisation dans l'élément --- //
  echartsInstance = echarts.init(domViz);
  echartsInstance.setOption(option);
}

export function update(data) {
  if (!echartsInstance || !data.results || !data.results[0]) return;

  const r = data.results[0];
  const nCanPp = r["n_can_pp"] || 0;
  const nCanPc = r["n_can_pc"] || 0;
  const nAcceptTotal = r["n_accept_total"] || 0;
  const nAcceptFemme = (r["n_accept_femme_pp"] || 0) + (r["n_accept_femme_pc"] || 0);
  const totalCandidatures = nCanPp + nCanPc;
  const tauxAdmission = totalCandidatures > 0 ? (nAcceptTotal / totalCandidatures) * 100 : 0;

  const radarData = [
    nCanPp,
    nCanPc,
    totalCandidatures,
    nAcceptTotal,
    nAcceptFemme,
    Math.round(tauxAdmission * 10) / 10
  ];

  echartsInstance.setOption({
    series: [
      {
        data: [
          {
            value: radarData,
            name: 'Données'
          }
        ]
      }
    ]
  });
}