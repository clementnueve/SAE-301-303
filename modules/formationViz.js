let echartsInstance;

// options de base pour le radar (sera mis à jour dynamiquement dans update)
let option = {
  title: {
    text: 'Graphique Radar des Formations'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center',
    data: ['Formations']
  },
  radar: {
    indicator: [
      { name: 'Licence Générale', max: 100 },
      { name: 'Licence Pro', max: 100 },
      { name: 'BUT', max: 100 },
      { name: 'Master', max: 100 },
      { name: 'Non inscrit', max: 100 }
    ]
  },
  series: [
    {
      name: 'Formations',
      type: 'radar',
      data: [
        {
          value: [0, 0, 0, 0, 0],
          name: 'Formations 2024'
        }
      ]
    }
  ]
};

export function create() {
  console.log('create FormationViz');

  // cherche un conteneur dédié, sinon fallback sur attemptsCamembert
  const candidates = ['attemptsFormation', 'attemptsCamembert'];
  let domViz = null;
  for (const id of candidates) {
    const el = document.getElementById(id);
    if (el) {
      domViz = el.querySelector('.viz');
      break;
    }
  }

  if (!domViz) {
    console.warn('FormationViz : aucun conteneur trouvé (attendu .viz dans #attemptsFormation ou #attemptsCamembert)');
    return;
  }

  echartsInstance = echarts.init(domViz);
  echartsInstance.setOption(option);
}

export function update(data) {
  if (!echartsInstance) return;

  // récupère les valeurs attendues (sécurité si champs manquants)
  const values = [
    Number(data.candidatLicenceGen?.['2024'] || 0),
    Number(data.candidatLicencePro?.['2024'] || 0),
    Number(data.candidatBUT?.['2024'] || 0),
    Number(data.candidatMaster?.['2024'] || 0),
    Number(data.candidatNonInscrit?.['2024'] || 0)
  ];

  // calcule un max pour les indicateurs (petit padding pour l'affichage)
  const maxVal = Math.max(...values, 1);
  const indicator = [
    { name: 'Licence Générale', max: Math.ceil(maxVal * 1.2) },
    { name: 'Licence Pro', max: Math.ceil(maxVal * 1.2) },
    { name: 'BUT', max: Math.ceil(maxVal * 1.2) },
    { name: 'Master', max: Math.ceil(maxVal * 1.2) },
    { name: 'Non inscrit', max: Math.ceil(maxVal * 1.2) }
  ];

  echartsInstance.setOption({
    radar: { indicator },
    series: [
      {
        data: [
          {
            value: values,
            name: 'Formations 2024'
          }
        ]
      }
    ]
  });
}