import { Close } from "@mui/icons-material";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  ModalProps,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  QuestionObjectType,
  useGetQuestionsService,
} from "../api-services/questions-services";
import {
  useGetRatingsService,
  useRateUnivService,
} from "../api-services/ratings-services";
import { useGetUniversityService } from "../api-services/university-services";
import CustomRadio from "./custom-radio";
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
};
type ResponsesType = { [key: string]: number };

const RateNowModal = ({ onClose, universityId: univId, ...props }: Props) => {
  const { data: questionsList } = useGetQuestionsService();
  const [responses, setResponses] = useState<ResponsesType>({});
  const { mutate: rateUniv, isPending } = useRateUnivService();

  const { data: answerRespData } = useGetRatingsService(univId);

  const answerResps = answerRespData?.answers;

  const { data: universityDetails, isLoading } =
    useGetUniversityService(univId);

  useEffect(() => {
    setResponses((r) => ({ ...r, ...answerResps }));
  }, [answerResps, univId]);

  const handleSubmitRating = useCallback(
    (answers: ResponsesType) => {
      if (!univId) return;
      rateUniv(
        { answers, univId },
        {
          onSuccess: (res) => {
            toast.success(res);
            if (onClose) {
              onClose({}, "escapeKeyDown");
            }
          },
        }
      );
    },
    [onClose, rateUniv, univId]
  );

  return (
    <Modal {...props} onClose={onClose}>
      {/* Main content */}
      <Stack
        sx={styles}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitRating(responses);
        }}
      >
        {/* Loading screen */}
        <FullScreenLoader isLoading={isPending || isLoading} />

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
            {questionsList?.map((q) => (
              <Stack key={q.label}>
                <Typography variant="h5" fontWeight={500}>
                  {q.label}
                </Typography>
                <List>
                  {q.questions.map((qn, index) => (
                    <ListItem key={qn._id}>
                      <ListItemText
                        secondaryTypographyProps={{
                          component: "div",
                        }}
                        primary={
                          <Typography variant="h6">
                            {index + 1}. {qn.question}
                          </Typography>
                        }
                        secondary={
                          <CustomRating
                            onChange={(v) =>
                              setResponses((r) => ({ ...r, [qn._id]: v }))
                            }
                            question={qn}
                            value={responses[qn._id]}
                          />
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Button color="warning" variant="contained" type="submit">
          Rate Now
        </Button>
      </Stack>
    </Modal>
  );
};

export default RateNowModal;

/**
 * =========== CUSTOM RATING =========
 */
type CustomRatingProps = {
  question: QuestionObjectType;
  value: number;
  onChange: (newVal: number) => unknown;
};

const options = [
  {
    label: "Yes",
    value: 5,
  },
  {
    label: "No",
    value: 0,
  },
];

const CustomRating = ({ question, value, onChange }: CustomRatingProps) => {
  if (question.type === "rating") {
    return (
      <Rating value={value ?? null} onChange={(_, v) => onChange(v ?? 0)} />
    );
  }
  if (question.type === "boolean") {
    return (
      <CustomRadio
        options={options}
        value={value ?? null}
        onChange={(_, v) => onChange(Number(v))}
        label=""
      />
    );
  }
};
