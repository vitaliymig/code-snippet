import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { deleteSnippet, getSnippet } from "../api/snippets";

export default function Snippet() {
  const history = useHistory();
  const { id } = useParams();

  const [snippetData, setSnippetData] = useState(null);

  useEffect(() => {
    console.log(id);
    if (id) {
      (async function () {
        const [snippetError, snippet] = await getSnippet(id);
        if (snippetError) {
          alert(`Error get snippet`);
          history.replace(`/`);
        } else {
          setSnippetData(snippet);
        }
      })();
    }
  }, [id]);

  function editSnippet() {
    history.push(`/editor/${id}`);
  }

  async function removeSnippet() {
    const answer = window.confirm(`Are you sure?`);
    if (answer) {
      const [snippetError] = await deleteSnippet(id);
      if (snippetError) {
        alert(`Error deleting snippet`);
      } else {
        history.push(`/`);
      }
    }
  }

  if (!snippetData) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="snippet__container">
      <button className="go-back-btn" onClick={() => history.goBack()}>
        Go back
      </button>
      <div className="snippet__main-info">
        <pre className="snippet__code">{snippetData.code}</pre>
        <div className="snippet__card">
          <div className="snippet__card-header">
            <h1 className="snippet__card-title">{snippetData.title}</h1>
            <button>^</button>
          </div>
          {snippetData.description && (
            <h2 className="snippet__card-description">
              {snippetData.description}
            </h2>
          )}
          <dl className="snippet__card-about">
            <div>
              <dt>Language</dt>
              <dd>{snippetData.lang}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{new Date(snippetData.createdAt).toLocaleString()}</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>
                {snippetData.updatedAt
                  ? new Date(snippetData.updatedAt).toLocaleString()
                  : "-"}
              </dd>
            </div>
          </dl>
          <hr />
          <div className="snippet__tags">
            {snippetData.tags.map((tag) => (
              <span key={tag} className="snippet__tag">
                {tag}
              </span>
            ))}
          </div>
          <hr />
          <div className="snippet__card-btns">
            <button onClick={editSnippet} className="btn-standart">
              Edit
            </button>
            <button onClick={removeSnippet} className="btn-delete">
              Delete
            </button>
            <button className="btn-copy-code">Copy code</button>
          </div>
        </div>
      </div>
      <div className="snippet__footer">
        <pre>{snippetData.documentation}</pre>
      </div>
      <div></div>
    </div>
  );
}
