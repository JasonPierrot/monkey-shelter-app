import React from "react";
import { Box, List } from "@material-ui/core";
import Moment from "moment";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
  return Moment(date).format("DD/MM/YYYY");
}

const MonkeyItem = ({ monkey }) => {
  return (
    <Box className={"boxContainer"}>
      <Box>
        <label>
          <b>{capitalizeFirstLetter(monkey.name)}</b>
        </label>
      </Box>
      <label>Age: {monkey.age} years old</label><br/>
      <label>Weight: {monkey.weight} kg</label><br/>
      <label>Eye Color: {capitalizeFirstLetter(monkey.eyeColor)}</label><br/>
      <label>Registered: {formatDate(monkey.registered)}</label><br/>
      <label>
        Favorite Fruit: {capitalizeFirstLetter(monkey.favoriteFruit)}
      </label>
    </Box>
  );
};

export default function MonkeyBlock({ monkeys, species }) {
  return (
    <Box className={"monkeyContainer"}>
      <h2>{species.toUpperCase()} - {monkeys.length} monkeys</h2>
      {species ? (
        <List disablePadding>
          {monkeys.map((monkey, index) => {
              return (
                <Box key={index}>
                  {index === 1 ? 
                    <MonkeyItem monkey={monkey} classVal={"firstBoxContainer"} />
                    :
                    <MonkeyItem monkey={monkey} classVal={"boxContainer"} />
                  }
                </Box>
              );
            })}
        </List>
      ) : (
        <p>No monkey data available...</p>
      )}
    </Box>
  );
}
