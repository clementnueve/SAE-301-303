import { searchFormations } from './RESTmanagement.js';

const form = document.getElementById('form-recherche');
const input = document.getElementById('input-ifc');

if (form && input) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const term = input.value.trim();
    if (!term) return;

    // Si l'utilisateur a fourni un IFC probable (suite alphanumérique >=6), on redirige directement
    if (/^[A-Z0-9]{6,}$/i.test(term)) {
      const quoted = '"' + term.replace(/^['"]|['"]$/g, '') + '"';
      window.location.href = `master_clean.html?id=${encodeURIComponent(quoted)}`;
      return;
    }

    try {
      const res = await searchFormations(term);
      const results = res && (res.results || res) ? (res.results || res) : [];

      if (Array.isArray(results) && results.length > 0) {
        const item = results[0];
        // différents formats possibles selon l'API
        const fields = item.record && item.record.fields ? item.record.fields : (item.fields ? item.fields : item);
        const ifc = fields && (fields.ifc || fields.ifc_code || fields.ifc_id);
        if (ifc) {
          const quoted = '"' + String(ifc).replace(/^['"]|['"]$/g, '') + '"';
          window.location.href = `master_clean.html?id=${encodeURIComponent(quoted)}`;
          return;
        }
      }

      alert('Aucun master trouvé pour "' + term + '".');
    } catch (err) {
      console.error('Erreur lors de la recherche :', err);
      alert('Erreur lors de la recherche — voir console.');
    }
  });
} else {
  console.warn('Module search: éléments #form-recherche ou #input-ifc introuvables sur la page');
}