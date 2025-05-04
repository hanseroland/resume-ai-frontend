// SummariesList.js
import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const ResumeList = ({ textes, onSelect }) => {
  return (
    <List>
      {textes.map((text, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => onSelect(text)}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ResumeList;
