let echartsInstance;

// --- définition des options et données de base de la visualisation --- //
let option = {
  title: {
    text: 'Comparaison par Type d\'Emploi'
  },
  xAxis: {
    type: 'category',
    data: ['CDI', 'Temps Plein', 'Emploi Cadre', 'CDD', 'Temps Partiel']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Pourcentage',
      type: 'bar',
      data: [75, 65, 28, 10, 5],
      itemStyle: {
        color: '#FF6100'
      }
    }
  ]
};

export function create() {
  console.log("create BarreViz");
  // --- sélectionne l'élément qui accueillera la visualisation barre --- //
  const domViz = document.getElementById("attemptsBarre").querySelector(".viz");
  if (!domViz) {
    console.warn('Élément pour barre non trouvé');
    return;
  }
  // --- crée la visualisation dans l'élément --- //
  echartsInstance = echarts.init(domViz);
  echartsInstance.setOption(option);
}

export function update(data) {
  if (!echartsInstance || !data.results || !data.results[0]) return;

  const r = data.results[0];
  
  // Données fictives pour l'exemple (à adapter selon tes données réelles)
  const cdiPercentage = 75;
  const tempsPleinPercentage = 65;
  const emploiCadrePercentage = 28;
  const cddPercentage = 10;
  const tempsPartielPercentage = 5;

  const barreData = [
    cdiPercentage,
    tempsPleinPercentage,
    emploiCadrePercentage,
    cddPercentage,
    tempsPartielPercentage
  ];

  echartsInstance.setOption({
    series: [
      {
        data: barreData
      }
    ]
  });
}