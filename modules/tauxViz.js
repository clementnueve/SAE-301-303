let echartsInstance;

// --- définition des options et données de base de la visualisation --- //
let option = {
  series: [
    {
      type: 'gauge',
      progress: {
        show: true,
        width: 18
      },
      axisLine: {
        lineStyle: {
          width: 18
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        length: 15,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      axisLabel: {
        distance: 25,
        color: '#999',
        fontSize: 10
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 25,
        itemStyle: {
          borderWidth: 10
        }
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        fontSize: 50,
        offsetCenter: [0, '70%']
      },
      data: [
        {
          value: 70
        }
      ]
    }
  ]
};


export function create() {
  console.log("create TauxViz");
  // --- sélectionne l'élement qui accueillera la visualisation en jauge --- //
  
  const domViz = document.getElementById("attemptsGauge").querySelector(".viz");
  // --- créé la visualisation dans l'élément --- //
  echartsInstance = echarts.init(domViz);
  
  echartsInstance.setOption(option);
}

export function update(data) {
  if (!echartsInstance || !data.results || !data.results[0]) return;

  let newValue2 = data.results[0]["n_can_pc"] + data.results[0]["n_can_pp"];

  if (newValue2 === 0) {
    console.warn('Pas de candidatures (newValue2 = 0)');
    return;
  }

  let newValue = data.results[0]["n_accept_total"];
  newValue = (newValue / newValue2) * 100;
  
  newValue = Math.round(newValue * 10) / 10;
  
  echartsInstance.setOption({
    series: [
      {
        data: [
          {
            value: newValue
          }
        ]
      }
    ]
  });
}