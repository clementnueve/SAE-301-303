import { getDicoDisciplines, getStatsInsertionForEtabAndDisc } from "./RESTmanagement.js";

let echartsInstance;

// helper pour convertir diverses formes en nombre (% / chaîne avec virgule)
function parsePercent(val) {
  if (val === undefined || val === null) return 0;
  if (typeof val === 'string') {
    let s = val.replace('%', '').trim().replace(',', '.');
    const n = parseFloat(s);
    return isNaN(n) ? 0 : Math.round(n * 10) / 10; // 1 décimale
  }
  if (typeof val === 'number') return Math.round(val * 10) / 10;
  return 0;
}

// Options de base pour le graphique barre (deux barres)
let option = {
  title: { text: "Taux d'insertion & de réponse" },
  xAxis: { type: 'category', data: ["Taux d'Insertion", "Taux de Réponse"] },
  yAxis: { type: 'value' },
  series: [
    {
      type: 'bar',
      data: [0, 0],
      itemStyle: { color: '#FF6100' },
      label: { show: true, position: 'top', formatter: '{c}%'}
    }
  ],
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { show: true }
};

export function create() {
  console.log("create BarreViz");
  const domVizWrap = document.getElementById("attemptsBarre");
  if (!domVizWrap) { console.warn('Conteneur #attemptsBarre introuvable'); return; }
  const domViz = domVizWrap.querySelector('.viz');
  if (!domViz) { console.warn('.viz introuvable dans #attemptsBarre'); return; }
  // Assure une hauteur minimale pour que l'instance ECharts soit visible
  if (!domViz.style.height || domViz.style.height === 'auto') {
    domViz.style.minHeight = '260px';
  }
  const rect = domViz.getBoundingClientRect();
  console.log('BarreViz container size:', rect.width, 'x', rect.height);
  echartsInstance = echarts.init(domViz);
  echartsInstance.setOption(option);
}

export async function update(data) {
  console.log('BarreViz.update called', { hasEcharts: typeof echarts !== 'undefined', echartsInstance: !!echartsInstance, dataPresent: !!data });
  if (typeof echarts === 'undefined') { console.error('ECharts library introuvable (echarts is undefined)'); return; }
  if (!echartsInstance) { console.warn("ECharts non initialisé pour le graphique barre."); return; }

  let statsArray = null;
  let r = null;
  if (Array.isArray(data)) {
    statsArray = data;
  } else if (data && Array.isArray(data.results)) {
    statsArray = data.results;
    r = data.results[0];
  } else if (data && data.results && data.results[0]) {
    r = data.results[0];
  }

  if (statsArray && statsArray.length > 0) {
    const normalized = statsArray.map((s) => {
      let date = null;
      if (s.date) {
        const d = new Date(s.date);
        if (!isNaN(d)) date = d;
      }
      if (!date) {
        const y = s.annee ?? s.annee_ref ?? s.year ?? s.annee_m ?? s.annee;
        const m = s.mois ?? s.month ?? s.mois_num ?? s.month_num ?? s.mois_ref;
        if (y && m) {
          const yy = Number(y);
          const mm = Number(m);
          if (!isNaN(yy) && !isNaN(mm)) date = new Date(yy, mm - 1);
        }
      }
      if (!date) {
        const am = s.annee_mois ?? s.annee_mois_code ?? s.annee_mois_date ?? s.periode;
        if (am && typeof am === 'string') {
          const m = am.match(/(20\d{2})[-_]?0?([1-9]|1[012])/);
          if (m) date = new Date(Number(m[1]), Number(m[2]) - 1);
        }
      }
      const insertion = parsePercent(s.taux_insertion ?? s.taux_dinsertion ?? s.taux_d_insertion ?? s.taux_d_insertion_global ?? s.tauxInsertion ?? 0);
      const reponse = parsePercent(s.taux_de_reponse ?? s.taux_reponse ?? s.tauxDeReponse ?? 0);
      return { date, insertion, reponse };
    }).filter((x) => x.date instanceof Date && !isNaN(x.date));

    if (normalized.length > 0) {
      const maxRec = normalized.reduce((a, b) => a.date > b.date ? a : b);
      const maxDate = new Date(maxRec.date.getFullYear(), maxRec.date.getMonth());
      const months = [];
      for (let i = 17; i >= 0; i--) months.push(new Date(maxDate.getFullYear(), maxDate.getMonth() - i, 1));
      const labels = months.map((d) => d.toLocaleString('fr-FR', { month: 'short', year: 'numeric' }));
      const insertionSeries = months.map((m) => {
        const rec = normalized.find((x) => x.date.getFullYear() === m.getFullYear() && x.date.getMonth() === m.getMonth());
        return rec ? rec.insertion : 0;
      });
      const reponseSeries = months.map((m) => {
        const rec = normalized.find((x) => x.date.getFullYear() === m.getFullYear() && x.date.getMonth() === m.getMonth());
        return rec ? rec.reponse : 0;
      });
    }

    const first = statsArray[0];
    const tauxInsertionFromStats = parsePercent(first.taux_insertion ?? first.taux_dinsertion ?? first.taux_d_insertion ?? 0);
    const tauxReponseFromStats = parsePercent(first.taux_de_reponse ?? first.taux_reponse ?? 0);
    if (tauxInsertionFromStats || tauxReponseFromStats) {
      echartsInstance.setOption({
        title: { text: `Taux (insertion: ${tauxInsertionFromStats}%, réponse: ${tauxReponseFromStats}%)` },
        xAxis: { data: ["Taux d'Insertion", "Taux de Réponse"] },
        series: [{ data: [tauxInsertionFromStats, tauxReponseFromStats], type: 'bar', itemStyle: { color: (params) => params.dataIndex === 0 ? '#FF6100' : '#223059' }, label: { show: true, position: 'top', formatter: '{c}%'} }]
      });
      return;
    }
  }

}