export default function Header() {
    return (
      <header style={headerStyle}>
        <h1 style={{ color: "white" }}>Julia Brouwer</h1>
        <nav>
          <ul style={navListStyle}>
            <li><a href="/" style={linkStyle}>Home</a></li>
            <li><a href="/about" style={linkStyle}>Over mij</a></li>
            <li><a href="/projects" style={linkStyle}>Eerdere projecten</a></li>
            <li><a href="/contact" style={linkStyle}>Contact</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  const headerStyle = {
    padding: "1rem",
    backgroundColor: "#2B2D42",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  
  const navListStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
  };
  
  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };
  