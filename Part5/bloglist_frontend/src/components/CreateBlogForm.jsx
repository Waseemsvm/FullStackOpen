const CreateBlogForm = ({ onClickCreate, onChange }) => {
  return (
    <div>
      <div>
        title :{" "}
        <input
          name="blog_title"
          id="blog_title"
          onChange={(event) => onChange({ type: "title", event: event })}
        ></input>
      </div>
      <div>
        author :{" "}
        <input
          name="blog_author"
          id="blog_author"
          onChange={(event) => onChange({ type: "author", event: event })}
        ></input>
      </div>
      <div>
        url :{" "}
        <input
          name="blog_url"
          id="blog_url"
          onChange={(event) => onChange({ type: "url", event: event })}
        ></input>
      </div>
      <button type="button" onClick={onClickCreate}>
        Create Blog
      </button>
    </div>
  );
};

export default CreateBlogForm;
