import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";

export type OptionType<S = string, T = string | number> = {
  label: S;
  value: T;
};

type Props = RadioGroupProps & {
  options: OptionType[];
  label: string;
};

const CustomRadio = (props: Props) => {
  return (
    <FormControl>
      <FormLabel id={props.id} sx={{ color: "black !important" }}>
        {props.label}
      </FormLabel>
      <RadioGroup
        aria-labelledby={props.id}
        name={props.name || props.id}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio color="warning" />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadio;
