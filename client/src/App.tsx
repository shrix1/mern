import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

type List = {
  name: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<List[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/createInfo", {
      name,
      completed: false,
    }).then((res) => {
      setList([...list, { name, completed: false }]);
      setName("");
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/getInfo")
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleComplete = (index: number) => {
    const newArr = [...list];
    newArr[index] = { ...newArr[index], completed: !newArr[index].completed };
    setList(newArr);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button>submit</button>
      </form>

      <div>
        {list.map((v, idx) => {
          return (
            <div key={idx}>
              <h1 style={{ color: `${v.completed ? "green" : "red"}` }}>
                {v.name} {idx}
              </h1>
              <button onClick={() => handleComplete(idx)}>
                {v.completed ? "completed" : "click to complete"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
