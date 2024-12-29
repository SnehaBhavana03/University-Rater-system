import { Close } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  ModalProps,
  Stack,
  Typography,
} from "@mui/material";
import { AnswerObjectType } from "../api-services/ratings-services";
import { useGetUniversityService } from "../api-services/university-services";
import FullScreenLoader from "./full-screen-loader";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.default",
  border: "1px solid lightgray",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflow: "auto",
  width: { xs: "80vw", md: "60vw" },
};

type Props = Omit<ModalProps, "children"> & {
  universityId: string;
  answers?: AnswerObjectType[];
};

const ViewRatingsModal = ({
  onClose,
  universityId: univId,
  answers,
  ...props
}: Props) => {
  const { data: universityDetails, isLoading } =
    useGetUniversityService(univId);

  if (!answers) return null;

  return (
    <Modal {...props} onClose={onClose}>
      {/* Main content */}
      <Stack sx={styles}>
        {/* Loading screen */}
        <FullScreenLoader isLoading={isLoading} />

        {/* Content */}
        <Stack overflow="auto" gap="3rem">
          <Stack
            justifyContent="space-between"
            direction="row"
            flexWrap="nowrap"
            alignItems="center"
          >
            {/* Label */}
            <Typography variant="h4" fontWeight="bold">
              {universityDetails?.name}
            </Typography>

            {/* Close */}
            <IconButton onClick={() => onClose?.({}, "backdropClick")}>
              <Close />
            </IconButton>
          </Stack>

          {/* Questions */}
          <Stack overflow="auto" gap="2rem">
            <List>
              {answers?.map((qn, index) => (
                <ListItem key={qn.questionId._id}>
                  <ListItemText
                    secondaryTypographyProps={{
                      component: "div",
                    }}
                    primary={
                      <Typography variant="h6">
                        {index + 1}. {qn.questionId.question}
                      </Typography>
                    }
                    secondary={
                      <Typography>Rating Provided: {qn.answer}</Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ViewRatingsModal;
