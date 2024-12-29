import { SmartToy } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Chatbot from "./components/chatbot/chatbot";
import Navbar from "./components/navbar";

const AppProvider = () => {
  const [isChatBotOpened, setIsChatBotOpened] = useState<boolean>(false);

  return (
    <Box>
      <Navbar />

      <Box component="main">
        <Outlet />
      </Box>

      {/* Chatbot */}
      <Box position="absolute" right={5} bottom="5.5rem">
        {isChatBotOpened && <Chatbot />}
      </Box>

      {/* Chatbot Button */}
      <IconButton
        sx={({ palette }) => ({
          position: "absolute",
          right: "1rem",
          bottom: "1rem",
          bgcolor: palette.warning.main,
          color: "white",
          ":hover": {
            bgcolor: palette.warning.light,
          },
        })}
        onClick={() => setIsChatBotOpened((prev) => !prev)}
        size="large"
      >
        <SmartToy fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default AppProvider;
