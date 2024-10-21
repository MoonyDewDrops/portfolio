import Link from 'next/link';

export default function Header() {
    return (
      <header style={headerStyle}>
        <h1 style={{ color: "white" }}>
          <span style={squareSpanStyle}>
            Julia Brouwer
          </span>
        </h1>
        <nav>
          <ul style={navListStyle}>
            <li><Link href="/" style={linkStyle}><span style={squareSpanStyle}>Home</span></Link></li>
            <li><Link href="/about" style={linkStyle}><span style={squareSpanStyle}>Over mij</span></Link></li>
            <li><Link href="/projects" style={linkStyle}><span style={squareSpanStyle}>Mijn werk</span></Link></li>
            <li><Link href="/contact" style={linkStyle}><span style={squareSpanStyle}>Contact</span></Link></li>
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

const squareSpanStyle = {
  backgroundColor: "#8D99AE", // The color for the square
  padding: "0.7rem", // Padding to simulate the size of the square
  borderRadius: "5px", // Optional: Add rounded corners to the square
};