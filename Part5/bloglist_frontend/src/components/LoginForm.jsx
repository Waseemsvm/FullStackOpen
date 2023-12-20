const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          Username:
          <input
            type="text"
            name="username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="true"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      ;
    </div>
  );
};

export default LoginForm;
