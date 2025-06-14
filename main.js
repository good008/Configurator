// Jazykové mutace a workflow pro víceblokový konfigurátor
const STRINGS = {
  cz: {
    block1_title: "Základní údaje",
    zakazka: "Název zakázky",
    pocet: "Počet kusů",
    sirka: "Šířka (mm)",
    vyska: "Výška (mm)",
    next: "Pokračovat",
    required: "Povinné pole",
    block2_title: "Technické parametry",
    typ_produktu: "Typ produktu",
    vedeni: "Typ vedení",
    lamela: "Typ lamely",
    prev: "Zpět",
    block3_title: "Barvy",
    barva_kastlu: "Barva kastlu a lišty",
    barva_lamel: "Barva lamel",
    block4_title: "Ovládání",
    ovladani: "Typ ovládání",
    motor: "Typ motoru",
    block5_title: "Příslušenství",
    prislusenstvi: "Příslušenství",
    sit_integrovana: "Integrovaná síť proti hmyzu",
    block6_title: "Poznámka",
    poznamka: "Poznámka k objednávce (nepovinné)",
    block7_title: "Kontaktní údaje",
    firma: "Firma",
    adresa: "Adresa",
    telefon: "Telefon",
    submit: "Odeslat objednávku"
  },
  de: {
    block1_title: "Grunddaten",
    zakazka: "Auftrag",
    pocet: "Stückzahl",
    sirka: "Breite (mm)",
    vyska: "Höhe (mm)",
    next: "Weiter",
    required: "Pflichtfeld",
    block2_title: "Technische Parameter",
    typ_produktu: "Produkttyp",
    vedeni: "Führungstyp",
    lamela: "Lamellentyp",
    prev: "Zurück",
    block3_title: "Farben",
    barva_kastlu: "Kasten- und Schienenfarbe",
    barva_lamel: "Lamellenfarbe",
    block4_title: "Bedienung",
    ovladani: "Bedienungstyp",
    motor: "Motortyp",
    block5_title: "Zubehör",
    prislusenstvi: "Zubehör",
    sit_integrovana: "Integriertes Insektenschutz",
    block6_title: "Bemerkung",
    poznamka: "Bemerkung zur Bestellung (optional)",
    block7_title: "Kontaktdaten",
    firma: "Firma",
    adresa: "Adresse",
    telefon: "Telefon",
    submit: "Bestellung absenden"
  }
};

let lang = "cz";
let orderData = {}; // rozpracovaná objednávka
const USER = { username: "sunset", password: "radim" };
let orders = [];

// --- BLOK 1: Základní údaje ---
function renderBlock1() {
  const t = STRINGS[lang];
  document.getElementById("order-detail").innerHTML = `
    <form id="block1-form" autocomplete="off">
      <h2>${t.block1_title}</h2>
      <label>${t.zakazka}:<br>
        <input type="text" name="zakazka" maxlength="50">
      </label><br>
      <label>${t.pocet}:<br>
        <input type="number" name="pocet" min="1" max="99" required>
      </label><br>
      <label>${t.sirka}:<br>
        <input type="number" name="sirka" min="300" max="6000" required>
      </label><br>
      <label>${t.vyska}:<br>
        <input type="number" name="vyska" min="400" max="4000" required>
      </label><br><br>
      <button type="submit">${t.next}</button>
    </form>
    <div class="lang-switch">
      <button onclick="setLang('cz')" ${lang === 'cz' ? 'disabled' : ''}>CZ</button>
      <button onclick="setLang('de')" ${lang === 'de' ? 'disabled' : ''}>DE</button>
    </div>
  `;
  document.getElementById("block1-form").onsubmit = function(e) {
    e.preventDefault();
    const f = e.target;
    orderData.zakazka = f.zakazka.value;
    orderData.pocet = f.pocet.value;
    orderData.sirka = f.sirka.value;
    orderData.vyska = f.vyska.value;
    renderBlock2();
  };
}
function setLang(l) {
  lang = l;
  renderBlock1();
}

// --- BLOK 2: Technické parametry ---
function renderBlock2() {
  const t = STRINGS[lang];
  document.getElementById("order-detail").innerHTML = `
    <form id="block2-form" autocomplete="off">
      <h2>${t.block2_title}</h2>
      <label>${t.typ_produktu}:<br>
        <select name="typ_produktu" required>
          <option value="">--</option>
          <option value="predokenni">${lang === "cz" ? "Předokenní roleta" : "Vorbaurollladen"}</option>
          <option value="nadokenni">${lang === "cz" ? "Nadokenní roleta" : "Aufsatzrollladen"}</option>
          <option value="do_osteni">${lang === "cz" ? "Do ostění" : "Leibungsrollladen"}</option>
        </select>
      </label><br>
      <label>${t.vedeni}:<br>
        <select name="vedeni" required>
          <option value="">--</option>
          <option value="standard">${lang === "cz" ? "Standardní" : "Standard"}</option>
          <option value="bezpecnostni">${lang === "cz" ? "Bezpečnostní" : "Sicherheitsführung"}</option>
          <option value="zaomitaci">${lang === "cz" ? "Zaomítací" : "Putzträgerführung"}</option>
        </select>
      </label><br>
      <label>${t.lamela}:<br>
        <select name="lamela" required>
          <option value="">--</option>
          <option value="alu">${lang === "cz" ? "ALU plněná PUR pěnou" : "ALU ausgeschäumt"}</option>
          <option value="plast">${lang === "cz" ? "Plastová" : "Kunststoff"}</option>
          <option value="extra">${lang === "cz" ? "Extra odolná" : "Extra stabil"}</option>
        </select>
      </label><br><br>
      <button type="button" onclick="renderBlock1()">${t.prev}</button>
      <button type="submit">${t.next}</button>
    </form>
  `;
  document.getElementById("block2-form").onsubmit = function(e) {
    e.preventDefault();
    const f = e.target;
    orderData.typ_produktu = f.typ_produktu.value;
    orderData.vedeni = f.vedeni.value;
    orderData.lamela = f.lamela.value;
    renderBlock3();
  };
}

// --- BLOK 3: Barvy ---
function renderBlock3() {
  const t = STRINGS[lang];
  document.getElementById("order-detail").innerHTML = `
    <form id="block3-form" autocomplete="off">
      <h2>${t.block3_title}</h2>
      <label>${t.barva_kastlu}:<br>
        <select name="barva_kastlu" required>
          <option value="">--</option>
          <option value="bila">${lang === "cz" ? "Bílá" : "Weiß"}</option>
          <option value="hneda">${lang === "cz" ? "Hnědá" : "Braun"}</option>
          <option value="stribrna">${lang === "cz" ? "Stříbrná" : "Silber"}</option>
          <option value="antracit">${lang === "cz" ? "Antracit" : "Anthrazit"}</option>
          <option value="drevo">${lang === "cz" ? "Dřevodekor" : "Holzdekor"}</option>
        </select>
      </label><br>
      <label>${t.barva_lamel}:<br>
        <select name="barva_lamel" required>
          <option value="">--</option>
          <option value="bila">${lang === "cz" ? "Bílá" : "Weiß"}</option>
          <option value="hneda">${lang === "cz" ? "Hnědá" : "Braun"}</option>
          <option value="stribrna">${lang === "cz" ? "Stříbrná" : "Silber"}</option>
          <option value="antracit">${lang === "cz" ? "Antracit" : "Anthrazit"}</option>
          <option value="drevo">${lang === "cz" ? "Dřevodekor" : "Holzdekor"}</option>
        </select>
      </label><br><br>
      <button type="button" onclick="renderBlock2()">${t.prev}</button>
      <button type="submit">${t.next}</button>
    </form>
  `;
  document.getElementById("block3-form").onsubmit = function(e) {
    e.preventDefault();
    const f = e.target;
    orderData.barva_kastlu = f.barva_kastlu.value;
    orderData.barva_lamel = f.barva_lamel.value;
    renderBlock4();
  };
}

// --- BLOK 4: Ovládání ---
function renderBlock4() {
  const t = STRINGS[lang];
  document.getElementById("order-detail").innerHTML = `
    <form id="block4-form" autocomplete="off">
      <h2>${t.block4_title}</h2>
      <label>${t.ovladani}:<br>
        <select name="ovladani" id="ovladani-select" required onchange="toggleMotorField()">
          <option value="">--</option>
          <option value="schnur">${lang === "cz" ? "Šňůra" : "Schnur"}</option>
          <option value="gurt">${lang === "cz" ? "Pásek" : "Gurt"}</option>
          <option value="motor">${lang === "cz" ? "Motor" : "Motor"}</option>
          <option value="kurbel">${lang === "cz" ? "Klika" : "Kurbel"}</option>
        </select>
      </label><br>
      <div id="motor-type-block" style="display:none;">
        <label>${t.motor}:<br>
          <select name="typ_motoru" id="motor-type-select">
            <option value="">--</option>
            <option value="somfy">${lang === "cz" ? "Somfy" : "Somfy"}</option>
            <option value="elero">${lang === "cz" ? "Elero" : "Elero"}</option>
            <option value="nice">${lang === "cz" ? "Nice" : "Nice"}</option>
          </select>
        </label><br>
      </div>
      <br>
      <button type="button" onclick="renderBlock3()">${t.prev}</button>
      <button type="submit">${t.next}</button>
    </form>
    <script>
      function toggleMotorField() {
        var sel = document.getElementById('ovladani-select');
        var block = document.getElementById('motor-type-block');
        if(sel && block) block.style.display = sel.value === 'motor' ? 'block' : 'none';
      }
      setTimeout(toggleMotorField, 30);
    </script>
  `;
  document.getElementById("block4-form").onsubmit = function(e) {
    e.preventDefault();
    const f = e.target;
    orderData.ovladani = f.ovladani.value;
    orderData.typ_motoru = (f.ovladani.value === "motor") ? f.typ_motoru.value : "";
    renderBlock5();
  };
}

// --- BLOK 5: Příslušenství ---
function renderBlock5() {
  const t = STRINGS[lang];
  document.getElementById("order-detail").innerHTML = `
    <form id="block5-form" autocomplete="off">
      <h2>${t.block5_title}</h2>
      <label>${t.prislusenstvi}:<br>
        <select name="prislusenstvi" id="prislusenstvi" multiple size="2">
          <option value="sit">${lang === "cz" ? "Sítě proti hmyzu" : "Insektenschutzgitter"}</option>
          <option value="pojistka">${lang === "cz" ? "Pojistka proti zvednutí" : "Aufhebelsicherung"}</option>
        </select>
        <br><small>${lang === "cz" ? "Držte Ctrl (nebo Cmd) pro výběr více možností." : "Halten Sie Ctrl (oder Cmd) zum Mehrfachauswahl."}</small>
      </label><br>
      <label>
        <input type="checkbox" name="sit_integrovana" value="1">
        ${t.sit_integrovana}
      </label><br><br>
      <button type="button" onclick="renderBlock4()">${t.prev}</button>
      <button type="submit">${t.next}</button>
    </form>
  `;
  document.getElementById("block5-form").onsubmit = function(e) {
    e.preventDefault();
    const f = e.target;
    const selected = Array.from(f.prislusenstvi.selectedOptions).map(opt => opt.value);
    orderData.prislusenstvi = selected;
    orderData.sit_integrovana = f.sit_integrovana.checked;
    renderBlock6();
  };
}

// --- BLOK 6: Poznámka ---
function renderBlock6() {
  const t = STRINGS[lang];
  document.getElementById("order-detail").innerHTML = `
    <form id="block6-form" autocomplete="off">
      <h2>${t.block6_title}</h2>
      <label>${t.poznamka}:<br>
        <textarea name="poznamka" rows="3" style="width:96%;"></textarea>
      </label><br><br>
      <button type="button" onclick="renderBlock5()">${t.prev}</button>
      <button type="submit">${t.next}</button>
    </form>
  `;
  document.getElementById("block6-form").onsubmit = function(e) {
    e.preventDefault();
    const f = e.target;
    orderData.poznamka = f.poznamka.value;
    renderBlock7();
  };
}

// --- BLOK 7: Kontaktní údaje ---
function renderBlock7() {
  const t = STRINGS[lang];
  document.getElementById("order-detail").innerHTML = `
    <form id="block7-form" autocomplete="off">
      <h2>${t.block7_title}</h2>
      <label>${t.firma}:<br>
        <input type="text" name="firma" maxlength="100" required>
      </label><br>
      <label>${t.adresa}:<br>
        <input type="text" name="adresa" maxlength="200" required>
      </label><br>
      <label>${t.telefon}:<br>
        <input type="text" name="telefon" maxlength="40" required>
      </label><br><br>
      <button type="button" onclick="renderBlock6()">${t.prev}</button>
      <button type="submit">${t.submit}</button>
    </form>
  `;
  document.getElementById("block7-form").onsubmit = function(e) {
    e.preventDefault();
    const f = e.target;
    orderData.firma = f.firma.value;
    orderData.adresa = f.adresa.value;
    orderData.telefon = f.telefon.value;
    renderSummary();
  };
}

// --- Rekapitulace a dokončení ---
function renderSummary() {
  const t = STRINGS[lang];
  const o = orderData;
  document.getElementById("order-detail").innerHTML = `
    <h2>${lang === 'cz' ? 'Rekapitulace objednávky' : 'Bestellübersicht'}</h2>
    <ul>
      <li><b>${STRINGS[lang].zakazka}:</b> ${o.zakazka || "-"}</li>
      <li><b>${STRINGS[lang].pocet}:</b> ${o.pocet}</li>
      <li><b>${STRINGS[lang].sirka}:</b> ${o.sirka}</li>
      <li><b>${STRINGS[lang].vyska}:</b> ${o.vyska}</li>
      <li><b>${STRINGS[lang].typ_produktu}:</b> ${getLabel('typ_produktu', o.typ_produktu)}</li>
      <li><b>${STRINGS[lang].vedeni}:</b> ${getLabel('vedeni', o.vedeni)}</li>
      <li><b>${STRINGS[lang].lamela}:</b> ${getLabel('lamela', o.lamela)}</li>
      <li><b>${STRINGS[lang].barva_kastlu}:</b> ${getLabel('barva_kastlu', o.barva_kastlu)}</li>
      <li><b>${STRINGS[lang].barva_lamel}:</b> ${getLabel('barva_lamel', o.barva_lamel)}</li>
      <li><b>${STRINGS[lang].ovladani}:</b> ${getLabel('ovladani', o.ovladani)}</li>
      ${o.ovladani === 'motor' ? `<li><b>${STRINGS[lang].motor}:</b> ${getLabel('typ_motoru', o.typ_motoru)}</li>` : ""}
      <li><b>${STRINGS[lang].prislusenstvi}:</b> ${(o.prislusenstvi && o.prislusenstvi.length > 0) ? o.prislusenstvi.map(v=>getLabel('prislusenstvi', v)).join(", ") : "-"}</li>
      <li><b>${STRINGS[lang].sit_integrovana}:</b> ${o.sit_integrovana ? "✔" : "—"}</li>
      <li><b>${STRINGS[lang].poznamka}:</b> ${o.poznamka ? o.poznamka : "-"}</li>
      <li><b>${STRINGS[lang].firma}:</b> ${o.firma}</li>
      <li><b>${STRINGS[lang].adresa}:</b> ${o.adresa}</li>
      <li><b>${STRINGS[lang].telefon}:</b> ${o.telefon}</li>
    </ul>
    <button onclick="finishOrder()">${lang === "cz" ? "Dokončit a uložit" : "Abschließen & speichern"}</button>
    <button onclick="renderBlock7()">${STRINGS[lang].prev}</button>
  `;
}

// Získání popisků podle hodnoty (pro rekapitulaci)
function getLabel(type, val) {
  if(!val) return "-";
  const t = STRINGS[lang];
  switch(type) {
    case "typ_produktu":
      return {
        predokenni: lang === "cz" ? "Předokenní roleta" : "Vorbaurollladen",
        nadokenni: lang === "cz" ? "Nadokenní roleta" : "Aufsatzrollladen",
        do_osteni: lang === "cz" ? "Do ostění" : "Leibungsrollladen"
      }[val] || val;
    case "vedeni":
      return {
        standard: lang === "cz" ? "Standardní" : "Standard",
        bezpecnostni: lang === "cz" ? "Bezpečnostní" : "Sicherheitsführung",
        zaomitaci: lang === "cz" ? "Zaomítací" : "Putzträgerführung"
      }[val] || val;
    case "lamela":
      return {
        alu: lang === "cz" ? "ALU plněná PUR pěnou" : "ALU ausgeschäumt",
        plast: lang === "cz" ? "Plastová" : "Kunststoff",
        extra: lang === "cz" ? "Extra odolná" : "Extra stabil"
      }[val] || val;
    case "barva_kastlu":
    case "barva_lamel":
      return {
        bila: lang === "cz" ? "Bílá" : "Weiß",
        hneda: lang === "cz" ? "Hnědá" : "Braun",
        stribrna: lang === "cz" ? "Stříbrná" : "Silber",
        antracit: lang === "cz" ? "Antracit" : "Anthrazit",
        drevo: lang === "cz" ? "Dřevodekor" : "Holzdekor"
      }[val] || val;
    case "ovladani":
      return {
        schnur: lang === "cz" ? "Šňůra" : "Schnur",
        gurt: lang === "cz" ? "Pásek" : "Gurt",
        motor: lang === "cz" ? "Motor" : "Motor",
        kurbel: lang === "cz" ? "Klika" : "Kurbel"
      }[val] || val;
    case "typ_motoru":
      return {
        somfy: "Somfy",
        elero: "Elero",
        nice: "Nice"
      }[val] || val;
    case "prislusenstvi":
      return {
        sit: lang === "cz" ? "Sítě proti hmyzu" : "Insektenschutzgitter",
        pojistka: lang === "cz" ? "Pojistka proti zvednutí" : "Aufhebelsicherung"
      }[val] || val;
    default:
      return val;
  }
}

// Uložení objednávky a návrat do seznamu
function finishOrder() {
  orders.push({ ...orderData });
  orderData = {};
  renderOrderList();
  document.getElementById("order-detail").innerHTML = "";
}

// --- Login, dashboard, přehled objednávek ---
function showDashboard() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  renderOrderList();
}
function logout() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("login-container").style.display = "flex";
  document.getElementById("login-form").reset();
  document.getElementById("login-error").style.display = "none";
}
document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (username === USER.username && password === USER.password) {
    showDashboard();
  } else {
    document.getElementById("login-error").style.display = "block";
    document.getElementById("password").value = "";
    document.getElementById("password").focus();
  }
});
document.getElementById("logout-btn").onclick = logout;

function renderOrderList() {
  const ul = document.getElementById("order-list");
  ul.innerHTML = "";
  if (orders.length === 0) {
    ul.innerHTML = "<li><em>Žádné objednávky</em></li>";
  } else {
    orders.forEach((o, idx) => {
      ul.innerHTML += `<li>
        #${idx + 1}: ${o.sirka}×${o.vyska} ${getLabel('barva_kastlu', o.barva_kastlu) || ''} / ${getLabel('barva_lamel', o.barva_lamel) || ''} (${o.firma || ''})
        <button onclick="showOrderDetail(${idx})">Detail</button>
        <button onclick="deleteOrder(${idx})">Smazat</button>
        <button onclick="copyOrder(${idx})">Duplikovat</button>
      </li>`;
    });
  }
}

document.getElementById("new-order-btn").onclick = function() {
  renderBlock1();
};

window.showOrderDetail = function(orderIdx) {
  const o = orders[orderIdx];
  document.getElementById("order-detail").innerHTML = `
    <h2>Objednávka #${orderIdx + 1}</h2>
    <ul>
      <li><b>${STRINGS[lang].zakazka}:</b> ${o.zakazka || "-"}</li>
      <li><b>${STRINGS[lang].pocet}:</b> ${o.pocet}</li>
      <li><b>${STRINGS[lang].sirka}:</b> ${o.sirka}</li>
      <li><b>${STRINGS[lang].vyska}:</b> ${o.vyska}</li>
      <li><b>${STRINGS[lang].typ_produktu}:</b> ${getLabel('typ_produktu', o.typ_produktu)}</li>
      <li><b>${STRINGS[lang].vedeni}:</b> ${getLabel('vedeni', o.vedeni)}</li>
      <li><b>${STRINGS[lang].lamela}:</b> ${getLabel('lamela', o.lamela)}</li>
      <li><b>${STRINGS[lang].barva_kastlu}:</b> ${getLabel('barva_kastlu', o.barva_kastlu)}</li>
      <li><b>${STRINGS[lang].barva_lamel}:</b> ${getLabel('barva_lamel', o.barva_lamel)}</li>
      <li><b>${STRINGS[lang].ovladani}:</b> ${getLabel('ovladani', o.ovladani)}</li>
      ${o.ovladani === 'motor' ? `<li><b>${STRINGS[lang].motor}:</b> ${getLabel('typ_motoru', o.typ_motoru)}</li>` : ""}
      <li><b>${STRINGS[lang].prislusenstvi}:</b> ${(o.prislusenstvi && o.prislusenstvi.length > 0) ? o.prislusenstvi.map(v=>getLabel('prislusenstvi', v)).join(", ") : "-"}</li>
      <li><b>${STRINGS[lang].sit_integrovana}:</b> ${o.sit_integrovana ? "✔" : "—"}</li>
      <li><b>${STRINGS[lang].poznamka}:</b> ${o.poznamka ? o.poznamka : "-"}</li>
      <li><b>${STRINGS[lang].firma}:</b> ${o.firma}</li>
      <li><b>${STRINGS[lang].adresa}:</b> ${o.adresa}</li>
      <li><b>${STRINGS[lang].telefon}:</b> ${o.telefon}</li>
    </ul>
    <button onclick="closeOrderDetail()">Zpět</button>
  `;
};
window.closeOrderDetail = function() {
  document.getElementById("order-detail").innerHTML = "";
};
window.deleteOrder = function(orderIdx) {
  if (confirm("Smazat tuto objednávku?")) {
    orders.splice(orderIdx, 1);
    renderOrderList();
    document.getElementById("order-detail").innerHTML = "";
  }
};
window.copyOrder = function(orderIdx) {
  const orig = orders[orderIdx];
  orders.push({ ...orig });
  renderOrderList();
};
