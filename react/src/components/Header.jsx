function Header({ name, themeColor }) {
  return (
    <header
      style={{
        backgroundColor: themeColor,
        color: "white",
        padding: "10px",
        textAlign: "center"
      }}
    >
      <h1 style={{ margin: "10px 0" }}>{name}'s Portfolio</h1>
    
    </header>
  );
}

export default Header;
