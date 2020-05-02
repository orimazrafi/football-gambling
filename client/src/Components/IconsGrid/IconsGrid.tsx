import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
interface Props {
  image: string;
  name: string;
  teamName: string;
  value: any;
  onChange: any;
}
export const IconsGrid = (props: Props) => {
  const { image, name, value, onChange, teamName } = props;
  return (
    <FormControl component="fieldset">
      <FormLabel>
        <RadioGroup
          aria-label="scorer"
          name={name}
          value={value}
          onChange={onChange}
        >
          <FormControlLabel
            value={name}
            control={<Radio color="primary" />}
            label={""}
            labelPlacement="bottom"
          />
          <div>
            <img src={image} alt={name} height="100" width="100" />
            <p>{name}</p>
            {teamName && <p>{teamName}</p>}
          </div>
        </RadioGroup>
      </FormLabel>
    </FormControl>
  );
};
