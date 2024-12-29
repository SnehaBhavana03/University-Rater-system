import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  Rating,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  UniversityRecordType,
  useGetUniversitiesListService,
} from "../api-services/university-services";
import FullScreenLoader from "../components/full-screen-loader";
import { STORAGE_KEY } from "../lib/utils";

const Compare = () => {
  const { data: universitiesList = [], isLoading } =
    useGetUniversitiesListService();

  const [selectedUnivs, setSelectedUnivs] = useState<UniversityRecordType[]>(
    []
  );

  useEffect(() => {
    const univs = sessionStorage.getItem(STORAGE_KEY);
    if (!univs) return;
    setSelectedUnivs(() => JSON.parse(univs));
  }, []);

  return (
    <Stack>
      <Toolbar />

      {/* Main Container */}
      <Stack
        alignItems="center"
        justifyContent="center"
        gap="1.5rem"
        px={{ xs: "5rem", md: "10rem", lg: "20rem" }}
        py="1.5rem"
      >
        {/* Loading Screen */}
        <FullScreenLoader isLoading={isLoading} />
        {/* Compare Title */}
        <Typography variant="h2" align="center">
          Compare
        </Typography>

        {/* Search bar */}
        <Autocomplete
          disablePortal
          options={universitiesList ?? []}
          sx={{ minWidth: "100%", bgcolor: "whitesmoke" }}
          getOptionKey={(option) => option._id}
          getOptionLabel={(option) => option.name}
          multiple
          disableCloseOnSelect
          filterSelectedOptions
          value={selectedUnivs}
          onChange={(_, v) => {
            if (v.length > 3) {
              return;
            }
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(v));
            setSelectedUnivs(() => v);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search to compare universities"
              helperText="At max only 3 universities can be selected"
            />
          )}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <Box component="li" key={key} {...optionProps}>
                <Checkbox
                  icon={<CheckBoxOutlineBlank fontSize="small" />}
                  checkedIcon={<CheckBox fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </Box>
            );
          }}
          // onChange={(_, option) => {
          //   navigate(`/insights/${option?._id}`);
          // }}
        />

        {/* Comparision List */}
        <Stack direction="row" gap="2rem" mt="3rem">
          {selectedUnivs?.map((univ, index) => (
            <Stack key={univ._id} direction="row" gap="2rem">
              <UniversityDetailsDisplay univDetails={univ} />
              {index < selectedUnivs.length - 1 && (
                <Divider orientation="vertical" />
              )}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Compare;

/**
 * University Details Display
 */
type UniversityDetailsDisplayProps = {
  univDetails: UniversityRecordType;
};
const UniversityDetailsDisplay = ({
  univDetails,
}: UniversityDetailsDisplayProps) => {
  if (!univDetails) {
    return null;
  }

  return (
    <Stack gap="1rem" alignItems="center">
      {/* Image */}
      <Box
        title={univDetails.name}
        component="img"
        src={univDetails.image}
        sx={{ width: "13.5rem", height: "13.5rem" }}
        borderRadius="2rem"
        border="1px solid gray"
        p="0.2rem"
      />

      {/* Name */}
      <Typography variant="h6" align="center" maxWidth="13.5rem">
        {univDetails.name}
      </Typography>

      {/* Rating */}
      <Typography align="center">
        {univDetails.noOfRatings
          ? `Based on ratings given by ${univDetails.noOfRatings} people.`
          : "No ratings available"}
      </Typography>
      <Rating readOnly value={univDetails.overallRating} precision={0.1} />

      {/* View more button */}
      <Button
        component={Link}
        to={`/insights/${univDetails._id}`}
        variant="outlined"
        color="warning"
        sx={{ mt: "auto" }}
      >
        View More
      </Button>
    </Stack>
  );
};
