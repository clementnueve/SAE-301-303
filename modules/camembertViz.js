let echartsInstance;

// --- définition des options et données de base de la visualisation --- //
let option = {
  color: ['#FF6100', '#223059'],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
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
        { value: 0, name: 'Hommes' },
        { value: 0, name: 'Femmes' }
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
  const domViz = document.getElementById("attemptsCamembert").querySelector(".viz");
  echartsInstance = echarts.init(domViz);
  echartsInstance.setOption(option);
}

export function update(data) {
  if (!echartsInstance || !data.results || !data.results[0]) return;

  const admisFemmes = data.results[0]["n_accept_femme_pp"] + data.results[0]["n_accept_femme_pc"];
  const admisHommes = data.results[0]["n_accept_total"] - (data.results[0]["n_accept_femme_pp"] + data.results[0]["n_accept_femme_pc"]);

  const newData = [
    { value: admisFemmes, name: 'Femmes' },
    { value: admisHommes, name: 'Hommes' }
    
    
  ];

  echartsInstance.setOption({
    series: [
      {
        data: newData
      }
    ]
  });
}