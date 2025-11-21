option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
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

  let newValue = data.taux[2023];
  newValue *= 100;
  

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