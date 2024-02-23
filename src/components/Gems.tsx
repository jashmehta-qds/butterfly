import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const Gems = () => {
  let params = useParams();
  //params.id returns id of the gem
  return (
      <Box sx={{display:"flex", maxWidth: "100%", maxHeight: "100%" , overflow: "hidden", }}>
      <img
      style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' , background:"black"}}
        src={`/haiku/${params.id}.png`}  
        alt={params.id}
        loading="lazy"
      />
      </Box>
  );
};

export default Gems;
