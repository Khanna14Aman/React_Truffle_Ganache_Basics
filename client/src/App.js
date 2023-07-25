import { useState, useEffect } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import { Web3 } from "web3";

function App() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [data, setData] = useState(0);
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    console.log(provider);

    async function template() {
      const web3 = new Web3(provider);
      console.log(web3);

      const networkId = await web3.eth.net.getId();
      console.log(networkId);

      const deployedNetwork = SimpleStorage.networks[networkId];
      console.log(deployedNetwork.address);

      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork.address
      );
      console.log(contract);

      setState({ web3: web3, contract: contract });
    }
    provider && template();
  }, []);

  useEffect(() => {
    const { contract } = state;
    async function readData() {
      const data = await contract.methods.getter().call();
      console.log(data);
      console.log(typeof data);
      setData(data.toString());
    }
    contract && readData();
  }, [state]);

  const writeData = async () => {
    const { contract } = state;
    const data = document.querySelector("#value").value;
    const Data = parseInt(data);
    await contract.methods
      .setter(Data)
      .send({ from: "0x1499A9f08Fe0E746737B4457f4B341666793987D" });
    console.log("done");
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>Welcome to Dapp</h1>
      <div className="App">
        <p className="text">Contract Data : {data}</p>
        <div>
          <input type="text" id="value" required="required"></input>
        </div>
        <button onClick={writeData} className="button button2">
          Change Data
        </button>
      </div>
    </div>
  );
}

export default App;
