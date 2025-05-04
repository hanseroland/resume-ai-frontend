// DescriptionList.js
import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const DescriptionList = ({textes, onSelect }) => {
  return (
    <List>
    
        <ListItem  disablePadding>
          <ListItemButton onClick={() => onSelect(textes)}>
            <ListItemText primary={textes} />
          </ListItemButton>
        </ListItem>
     
    </List>
  );
};

export default DescriptionList;
