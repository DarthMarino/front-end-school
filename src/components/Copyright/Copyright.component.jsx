import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const Copyright = () => (
  <Box mt={8} className="text-white">
    <Typography variant="body2" align="center">
      {"Derechos de autor © "}
      <Link
        to="/"
        color="inherit"
        href="https://media2.giphy.com/media/9MIIjUe8fNZfVRQfNP/giphy.gif"
      >
        School2Cool
      </Link>
      {new Date().getFullYear()}
    </Typography>
  </Box>
);

export default Copyright;
