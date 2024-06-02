import "./App.css";
import axios from "axios";
import React, { useEffect, useState ,useMemo} from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AllRepos from "./components/allRepos";
function App() {
  const [username, setUsername] = useState("RNessrine");
  const [repos, setRepos] = useState([]);
 
  const fetchRepos = async () => {
    try {
      const data = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
     // console.log(data.data[0]);
      if(data.data.length>0){
        setRepos(data.data);
        
      }
      
    } catch (error) {
      alert(error.message)
    }
  };
  const changeText = () => {};

  useEffect(() => {
    fetchRepos();
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "URL",
        accessor: "url"
      },
    ],
    []
  );
  return (<div className="App">
      <>
        <Form.Label htmlFor="inputPassword5">Search</Form.Label>
        <Form.Control
          type="text"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => setUsername(e.target.value)}
        />
      </>
      <Button
        variant="primary"
        onClick={() => {
          fetchRepos();
        }}
      >
        Search
      </Button>
      <AllRepos data={repos} culms={columns}  />
      
    </div>
    );
  
}

export default App;
