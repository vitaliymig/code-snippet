import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Snippet from "./pages/Snippet";
import Snippets from "./pages/Snippets";

function App() {
  return (
    <>
      <Header></Header>
      <Switch>
        <Route exact path={["/editor", "/editor/:id"]}>
          <Editor />
        </Route>
        <Route path="/snippets">
          <Snippets />
        </Route>
        <Route exact path="/snippet/:id">
          <Snippet />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
