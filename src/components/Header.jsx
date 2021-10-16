import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="">
      <nav className="">
        <ul className="">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/editor">Editor</Link>
          </li>
          <li>
            <Link to="/snippets">Snippets</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
