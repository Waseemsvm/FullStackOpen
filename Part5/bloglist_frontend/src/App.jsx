import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import CreateBlogForm from "./components/CreateBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    type: "error",
  });
  const [newBlog, setNewBlog] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs)); //fetch all the blogs
  }, []);
  useEffect(() => {
    const user = window.localStorage.getItem("loggedBlogAppUser"); //if user already in localStorage, then set it to the state
    if (user) {
      console.log("effect", user);
      setUser(JSON.parse(user));
      blogService.setToken(JSON.parse(user).token);
    }
  }, []);

  const handleLogout = (event) => {
    //remove the user from localStorage
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
    setErrorMessage({ message: "Logout successfull!", type: "success" });
    setTimeout(() => {
      setErrorMessage({ message: null });
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault(); //prevent from page refresh
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setErrorMessage({ message: "Login successfull!", type: "success" });
      setTimeout(() => {
        setErrorMessage({ message: null });
      }, 5000);
    } catch (ex) {
      console.error(ex);
      setErrorMessage({
        ...errorMessage,
        message: "Wrong username or password",
      });
      setTimeout(() => {
        setErrorMessage({ message: null });
      }, 5000);
    }
  };

  const handleBlogDataChange = (oData) => {
    switch (oData.type) {
      case "title":
        setNewBlog({ ...newBlog, title: oData.event.target.value });
        break;
      case "author":
        setNewBlog({ ...newBlog, author: oData.event.target.value });
        break;
      case "url":
        setNewBlog({ ...newBlog, url: oData.event.target.value });
        break;
    }
    console.log(newBlog);
  };

  const onClickCreate = async (event) => {
    console.log("clicked create blog");
    try {
      const blog = await blogService.createBlog(newBlog);
      setBlogs([...blogs, blog]);
      console.log("created blog", blog);
      setErrorMessage({
        message: "A new blog " + blog.title + " by " + blog.author,
        type: "success",
      });
      setTimeout((e) => {
        setErrorMessage({ message: null });
      }, 5000);
    } catch (ex) {
      setErrorMessage({ message: "Error while create a blog" });
      setTimeout((e) => {
        setErrorMessage({ message: null });
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </div>
    );
  };

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <CreateBlogForm
          onClickCreate={onClickCreate}
          onChange={handleBlogDataChange}
        />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notification oData={errorMessage} />
      <div>{user ? blogForm() : loginForm()}</div>
    </div>
  );
};

export default App;
