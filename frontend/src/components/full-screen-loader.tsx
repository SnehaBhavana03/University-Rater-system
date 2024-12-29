import { Backdrop, CircularProgress } from "@mui/material";

type Props = {
  isLoading: boolean;
};

const FullScreenLoader = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default FullScreenLoader;
