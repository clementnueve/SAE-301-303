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
        fontSize: 20
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
        fontSize: 80,
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
  if (!echartsInstance) return;

  let newValue = data.results[0]["pct_accept_master"];
  newValue *= 100;

  console.log(newValue);
  
  

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