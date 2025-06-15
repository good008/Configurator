import { useEffect, useState } from "react";

interface Position {
  breite: string;
  hoehe: string;
  stk: string;
  steuerung: string;
  farbe: string;
  seite: string;
}

export default function Vorbaurollladen() {
  const [auftrag, setAuftrag] = useState("");
  const [positionen, setPositionen] = useState<Position[]>([]);
  const [kunde, setKunde] = useState("");

  useEffect(() => {
    const k = localStorage.getItem("currentCustomer");
    if (k) setKunde(k);
  }, []);

  const neuePosition = () => {
    setPositionen([
      ...positionen,
      { breite: "", hoehe: "", stk: "1", steuerung: "", farbe: "", seite: "L" },
    ]);
  };

  const updatePosition = (index: number, field: keyof Position, value: string) => {
    const updated = [...positionen];
    updated[index][field] = value;
    setPositionen(updated);
  };

  const duplizieren = (index: number) => {
    setPositionen([...positionen, { ...positionen[index] }]);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
      <h1>Vorbaurollladen CLASSIC SK</h1>
      <p><strong>Zákazník:</strong> {kunde}</p>

      <div style={{ margin: '1rem 0' }}>
        <label>Auftragsname:</label><br />
        <input value={auftrag} onChange={(e) => setAuftrag(e.target.value)} style={{ padding: '0.5rem', width: '100%' }} />
      </div>

      <button onClick={neuePosition} style={{ background: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem' }}>
        + Neue Position
      </button>

      <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
        {positionen.map((pos, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '0.5rem', padding: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
              <input value={pos.breite} onChange={e => updatePosition(index, 'breite', e.target.value)} placeholder="Breite (mm)" />
              <input value={pos.hoehe} onChange={e => updatePosition(index, 'hoehe', e.target.value)} placeholder="Höhe (mm)" />
              <input value={pos.stk} onChange={e => updatePosition(index, 'stk', e.target.value)} placeholder="Stück" />
              <input value={pos.steuerung} onChange={e => updatePosition(index, 'steuerung', e.target.value)} placeholder="Steuerung" />
              <input value={pos.farbe} onChange={e => updatePosition(index, 'farbe', e.target.value)} placeholder="Farbe" />
              <input value={pos.seite} onChange={e => updatePosition(index, 'seite', e.target.value)} placeholder="Seite (L/R)" />
            </div>
            <button onClick={() => duplizieren(index)} style={{ marginTop: '0.5rem', padding: '0.25rem 0.75rem', background: '#eee' }}>
              Duplizieren
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
