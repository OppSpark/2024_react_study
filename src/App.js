import './App.css';

function App() {
  const user = ['ㅎㅇ','456','789']

  return (
    <div cla>
      <User name={user[0]} />
      <User name={user[1]} />
      <User name={user[2]} />
    </div>
  );
}

function User(agrs){
    return(
    <div className="user" >
      <ul className="userinfo">
        <li><img src="../img/odung.png" /></li>
        <li>{agrs.name}</li>
      </ul>
    </div>
  );
}
export default App;
