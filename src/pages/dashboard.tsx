import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", maxWidth: "960px", margin: "0 auto" }}>
      <h1>Produkty – výběr</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
        <div onClick={() => navigate("/vorbaurollladen")} style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "0.5rem", cursor: "pointer" }}>
          <h2>Vorbaurollladen</h2>
          <p>Venkovní montáž</p>
        </div>
        <div onClick={() => navigate("/unterputzrollladen")} style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "0.5rem", cursor: "pointer" }}>
          <h2>Unterputzrollladen</h2>
          <p>Skrytá montáž</p>
        </div>
        <div onClick={() => navigate("/isg")} style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "0.5rem", cursor: "pointer" }}>
          <h2>Insektenschutzgitter</h2>
          <p>Plissee, Rollbar, Dveře</p>
        </div>
      </div>
    </div>
  );
}
