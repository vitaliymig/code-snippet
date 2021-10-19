import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/editor">Editor</Link>
          </li>
          <li>
            <Link to="/snippets">Snippets</Link>
          </li>
          <li>
            <Link to="/snippet">Snippet</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
