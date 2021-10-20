import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getSnippet } from "../api/snippets";

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
        } else {
          setSnippetData(snippet);
        }
      })();
    }
  }, [id]);

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
            <h3>{snippetData.title}</h3>
            <button>^</button>
          </div>
          <h4 className="snippet__card-description">
            {snippetData.description}
          </h4>
          <div className="snippet__card-about">
            <div className="snippet__card-about-col">
              <span>Language</span>
              <span>Created</span>
              <span>Last updated</span>
            </div>
            <div className="snippet__card-about-col snippet__card-about-col-right-side">
              <span>{snippetData.lang}</span>
              <span>{snippetData.createAt}</span>
              <span>{snippetData.updatedAt}</span>
            </div>
          </div>
          <hr />
          <span>{snippetData.tags}</span>
          <hr />
          <div className="snippet__card-btns">
            <button className="btn-standart">Edit</button>
            <button className="btn-delete">Delete</button>
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
