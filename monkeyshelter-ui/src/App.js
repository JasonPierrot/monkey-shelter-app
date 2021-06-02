import "./App.css";
import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import Header from "./components/header";
import MonkeyBlock from "./components/monkeyBlock";
import axios from "axios";

function App() {
  const [monkeys, setMonkeys] = useState([]);
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/monkeyAPI");
      const data = result.data;
      data
        .sort((a, b) => {
          return (
            new Date(a.registered).getTime() - new Date(b.registered).getTime()
          );
        })
        .reverse();
      var tempArray = [];
      data.forEach((item) => {
        tempArray.push(item.species);
      });
      let uniqueArray = [...new Set(tempArray)].sort((a, b) => a.localeCompare(b));
      
      setMonkeys(result?.data ?? []);
      setSpecies(uniqueArray ?? []);
    };
    fetchData();
  }, []);

  function handleChange(newValue) {
    setCurrentSpecies(newValue);
  }

  return (
    <Box>
      <Header/>
      <Box className="bodyContainer">
        <Box>
          <p>
            This application gives a report about the different Monkeys
            currently in the shelter, who total at {monkeys.length} in
            population with {species.length} different species. Below are the Monkeys separated by species:
          </p>
        </Box>
        {species &&
          species.map((specie, idx) => {
            return (
              <MonkeyBlock
                key={idx}
                monkeys={monkeys.filter((x) => x.species === specie)}
                species={specie}
              />
            );
          })}
      </Box>
    </Box>
  );
}

export default App;
