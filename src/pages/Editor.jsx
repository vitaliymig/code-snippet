import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { getSnippet, saveSnippet, updateSnippet } from "../api/snippets";

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
    if (id) {
      (async function () {
        const [snippetError, snippet] = await getSnippet(id);
        if (snippetError) {
          alert(`Error get snippet`);
        } else {
          setTitle(snippet.title);
          setDescription(snippet.description);
          setLanguage(snippet.lang);
          setTags(snippet.tags);
          setCode(snippet.code);
          setDocumentation(snippet.documentation);
        }
      })();
    }
    console.log(id);
  }, [id]);

  function clearEditorForm() {
    setTitle("");
    setDescription("");
    setLanguage("");
    setTags("");
    setCode("");
    setDocumentation("");
  }

  async function editorSubmit(e) {
    e.preventDefault();
    if (!id) {
      const newSnippet = {
        createdAt: Date.now(),
        updatedAt: null,
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

      const [savedSnippetError, savedSnippet] = await saveSnippet(newSnippet);
      if (savedSnippetError) {
        alert(`saved-Snippet-Error`);
      } else {
        alert(`success-saved-snippet`);
      }
    } else {
      const updatedSnippetData = {
        updatedAt: Date.now(),
        title,
        description,
        code,
        documentation,
        lang,
        tags,
      };

      const [updatedSnippetError, updatedSnippet] = await updateSnippet(
        id,
        updatedSnippetData
      );
      if (updatedSnippetError) {
        alert(`updated-Snippet-Error`);
      } else {
        alert(`success-updated-snippet`);
      }
    }

    clearEditorForm();
  }

  return (
    <div className="editor__container">
      <h1 className="editor__heading">Edit snippet</h1>
      <button className="editor__btn" onClick={() => history.goBack()}>
        Go back
      </button>
      <form className="editor__form" onSubmit={editorSubmit}>
        <h2 className="editor__form-heading">Snippet details</h2>
        <label for="editorInputTitle">Title</label>
        <input
          id="editorInputTitle"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
        />
        <label for="editorInputDescription">Short discription</label>
        <input
          id="editorInputDescription"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
        />
        <label for="editorInputLang">Language</label>
        <datalist id="langs">
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JS">JS</option>
        </datalist>
        <input
          id="editorInputLang"
          required
          onChange={(e) => setLanguage(e.target.value)}
          value={lang}
          list="langs"
          type="text"
        />
        <label for="editorInputTags">Tags</label>
        <input
          id="editorInputTags"
          required
          onChange={(e) => setTags(e.target.value)}
          value={tags}
          type="text"
        />
        <hr className="editor__hr" />
        <h2>Snippet code</h2>
        <textarea
          required
          onChange={(e) => setCode(e.target.value)}
          value={code}
        ></textarea>
        <hr className="editor__hr" />
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
