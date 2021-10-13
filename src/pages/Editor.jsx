import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
export default function Editor() {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lang, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [code, setCode] = useState("");
  const [documentation, setDocumentation] = useState("");

  useEffect(() => {
    console.log(id);
  }, [id]);

  function editorSubmit(e) {
    e.preventDefault();
    if (!id) {
      const newSnippet = {
        createAt: Date.now(),
        updateAt: null,
        pinned: false,
        copied: 0,
        views: 0,
        title,
        description,
        code,
        documentation,
        lang,
        tags,
      };

      console.log(newSnippet);
      setTitle("");
      setDescription("");
      setLanguage("");
      setTags("");
      setCode("");
      setDocumentation("");
    }
  }

  return (
    <div>
      <h1>Edit snippet</h1>
      <button onClick={() => history.goBack()}>Go back</button>
      <form onSubmit={editorSubmit}>
        <h2>Snippet details</h2>
        <label>
          Title
          <input
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
          />
        </label>
        <label>
          Short discription
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
          />
        </label>
        <label>
          Language
          <input
            required
            onChange={(e) => setLanguage(e.target.value)}
            value={lang}
            list="langs"
            type="text"
          />
          <datalist id="langs">
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JS">JS</option>
          </datalist>
        </label>
        <label>
          Tags
          <input
            required
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            type="text"
          />
        </label>
        <hr />
        <h2>Snippet code</h2>
        <textarea
          required
          onChange={(e) => setCode(e.target.value)}
          value={code}
        ></textarea>
        <hr />
        <h2>Snippet documentation</h2>
        <textarea
          onChange={(e) => setDocumentation(e.target.value)}
          value={documentation}
        ></textarea>
        <button type="submit">
          {!id && "Create"}
          {id && "Edit"}
        </button>
        <button type="button" onClick={() => history.replace("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
