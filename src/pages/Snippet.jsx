import { useHistory, useParams } from "react-router";

export default function Snippet() {
  const history = useHistory();
  return (
    <div className="snippet__container">
      <button className="go-back-btn" onClick={() => history.goBack()}>
        Go back
      </button>
      <div>
        <pre>Pre code</pre>
        <div className="snippet__card">
          <h3>Card</h3>
          <h4>description</h4>
          <div className="snippet__card-info">
            <div>
              <span>Lang</span>
              <span>Cre</span>
              <span>Last upd</span>
            </div>
            <div>
              <span>asd</span>
              <span>asdasd</span>
              <span>asd</span>
            </div>
            <hr />
            <span>react</span>
            <hr />
            <div>
              <button>Edit</button>
              <button>Delete</button>
              <button>Copy code</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <pre>Pre footer</pre>
      </div>
      <div></div>
    </div>
  );
}
