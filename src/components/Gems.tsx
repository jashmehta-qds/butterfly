import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const Gems = () => {
  let params = useParams();
  //params.id returns id of the gem
  return (
    <Box sx={{ p: 4, background: "black", height: "100vh", color: "white" }}>
      <img
        style={{
          marginTop: ".75rem",
          height: 175,
          width: 175,
          marginLeft: "calc(50% - 62px)",
          position: "absolute",
        }}
        src={"/logo-latest.png"}
        alt={"1"}
        loading="lazy"
      />
    </Box>
  );
};

export default Gems;
