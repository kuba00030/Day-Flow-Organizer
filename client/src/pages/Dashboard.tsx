export default function Dashboard() {
  return (
    <div
      style={{
        backgroundColor: "red",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div>navi</div>
      <div style={{ background: "blue", flex: 1 }}>
        <div style={{ backgroundColor: "yellow", height: "100%" }}>window</div>
      </div>
    </div>
  );
}
