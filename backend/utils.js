export const sendErrorResp = (res, error) => {
  console.log(error);
  return res.status(500).send("Unknown error occured.");
};
