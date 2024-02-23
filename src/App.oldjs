import './App.css';

function App() {
  const user = ['ㅎㅇ','456','789'];

  const title = ['original','reverse','push','sort','filter','a'];

  const users = [
    { name: 'esukmean', score: 100, flag:true },
    { name: 'esm', score: 90, flag:true },
    { name: 'Spark', score: 30, flag:false },
    { name: 'hyeJi', score: 80, flag:true },
    { name: 'Oppspark', score: 25 , flag:false },
    { name: 'asdf1234', score: 40 , flag:true},
    { name: 'Hello', score: 10, flag:false },
  ];

  return (
    <div>
      <OriginalList name={title[0]} arr={users}  />
      <Reverselist name={title[1]} arr={users}  />
      <Pushlist name={title[2]} arr={[...title]} />
      <Sortlist name={title[3]} arr={title} />
      <Filterlist name={title[4]} arr={users} />


      {users[1].score>50 ?
      <Filterlist name={title[4]} arr={users} /> :
      <Pushlist name={title[2]} arr={[...title]} />}

      {/* <User name={user[0]} />
      <User name={user[1]} />
      <User name={user[2]} /> */}
    </div>
  );
}

function OriginalList(args){
  return (
    <div>
      <h1>{args.name}</h1>
      {args.arr.map(v =>(
        <div>{v.name}</div>
      ))}
    </div>
  );
}

function Reverselist(args){
  return(
    <div>
      <h1>{args.name}</h1>
      {args.arr.toReversed().map(v =>(
        <div>{v.name}</div>
      ))}
    </div>
  );
}

function Pushlist(args){

  args.arr.push(22)

  return(
    <div>
      <h1>{args.name}</h1>
      {args.arr.map(v =>(
        <div>{v}</div>
      ))}
    </div>
  )
}

function Sortlist(args){
  const arr2 = []
  args.arr.map(v =>(
    arr2.push(v)
  ))

  return(
    <div>
      <h1>{args.name}</h1>
      {arr2.sort().map(v =>(
        <div>{v}</div>
      ))
      }
    </div>
  )
}

function Filterlist(args){

  return(
    <div>
      <h1>{args.name}</h1>
      {args.arr.filter(s => s.score > 50).map(v =>(

        <div>{v.score}</div>
      ))
      }
    </div>

  )
}


















function User(args){
    return(
    <div className="user" >
      <ul className="userinfo">
        <li><img src="../img/odung.png" /></li>
        <li>{args.name}</li>
      </ul>
    </div>
  );
}

export default App;
