let echartsInstance;

// --- définition des options et données de base de la visualisation --- //
let option = {
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
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
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
        { value: 735, name: 'Direct' }
      ]
    }
  ]
};

/*echartsInstance.setOption(option);
echartsInstance.on('legendselectchanged', (evt)=>{
        saveLineSettings(evt.selected);
    });*/

export function create() {
  console.log("create CamembertViz");
  // --- sélectionne l'élement qui accueillera la visualisation en camembert --- //
  const domViz = document.getElementById("attemptsCamembert").querySelector(".viz");
  // --- créé la visualisation dans l'élément --- //
  echartsInstance = echarts.init(domViz);
  echartsInstance.setOption(option);
}

export function update(data) {
  if (!echartsInstance) return;

  // const newData = [
  //   { value: data.candidatLicenceGen["2024"] || 0, name: 'Licence Générale' },
  //   { value: data.candidatLicencePro["2024"] || 0, name: 'Licence Pro' }
  // ];

  echartsInstance.setOption({
    series: [
      {
        data: newData
      }
    ]
  });
}