function Header({ name, themeColor }) {
  return (
    <header
      style={{
        backgroundColor: themeColor,
        color: "white",
        padding: "25px",
        textAlign: "center"
      }}
    >
      <h1>{name}'s Portfolio</h1>
    
    </header>
  );
}

export default Header;
