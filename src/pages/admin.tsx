import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Kunde {
  name: string;
  rabatt: number;
  aktiv: boolean;
}

export default function Admin() {
  const [kunden, setKunden] = useState<Kunde[]>([]);
  const [neuerKunde, setNeuerKunde] = useState<Kunde>({ name: "", rabatt: 0, aktiv: true });
  const navigate = useNavigate();

  useEffect(() => {
    const gespeicherte = localStorage.getItem("kunden");
    if (gespeicherte) setKunden(JSON.parse(gespeicherte));
  }, []);

  useEffect(() => {
    localStorage.setItem("kunden", JSON.stringify(kunden));
  }, [kunden]);

  const kundeSpeichern = () => {
    if (!neuerKunde.name.trim()) return;
    setKunden([...kunden, neuerKunde]);
    setNeuerKunde({ name: "", rabatt: 0, aktiv: true });
  };

  const kundeAktualisieren = (index: number, field: keyof Kunde, value: string | boolean) => {
    const aktualisiert = [...kunden];
    aktualisiert[index][field] = value;
    setKunden(aktualisiert);
  };

  const kundeLöschen = (index: number) => {
    const aktualisiert = [...kunden];
    aktualisiert.splice(index, 1);
    setKunden(aktualisiert);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "960px", margin: "0 auto" }}>
      <h2>Administrace zákazníků</h2>

      <div style={{ margin: "1rem 0" }}>
        <input
          placeholder="Název firmy"
          value={neuerKunde.name}
          onChange={(e) => setNeuerKunde({ ...neuerKunde, name: e.target.value })}
          style={{ padding: "0.5rem", width: "40%" }}
        />
        <input
          type="number"
          placeholder="Sleva (%)"
          value={neuerKunde.rabatt}
          onChange={(e) => setNeuerKunde({ ...neuerKunde, rabatt: parseInt(e.target.value) })}
          style={{ padding: "0.5rem", width: "20%", marginLeft: "1rem" }}
        />
        <button onClick={kundeSpeichern} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
          Přidat zákazníka
        </button>
        <button onClick={() => navigate("/")} style={{ marginLeft: "1rem" }}>Zpět na login</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Firma</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Sleva (%)</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Aktivní</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Akce</th>
          </tr>
        </thead>
        <tbody>
          {kunden.map((k, i) => (
            <tr key={i}>
              <td>
                <input value={k.name} onChange={(e) => kundeAktualisieren(i, "name", e.target.value)} />
              </td>
              <td>
                <input
                  type="number"
                  value={k.rabatt}
                  onChange={(e) => kundeAktualisieren(i, "rabatt", parseInt(e.target.value))}
                  style={{ width: "60px" }}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={k.aktiv}
                  onChange={(e) => kundeAktualisieren(i, "aktiv", e.target.checked)}
                />
              </td>
              <td>
                <button onClick={() => kundeLöschen(i)} style={{ color: "red" }}>Smazat</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
