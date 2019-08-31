import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { SEED_TYPES } from "../constants";
import { TRACK_ATTRIBUTES } from "../constants";
import { selectRecommendationSeed } from "../redux/actions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const SliderField = props => {
  const {
    attribute,
    attribute: { name, range }
  } = props;
  const { min, max, scale } = range;
  let scaledMin = min * scale;
  let scaledMax = max * scale;

  const dispatch = useDispatch();
  const [value, setValue] = useState(scaledMax / 2);
  const [isSelected, setSelected] = useState(false);

  const toggleAttribute = () => {
    // add to redux
    const selectedAttribute = {
      ...attribute,
      value
    };
    dispatch(selectRecommendationSeed(selectedAttribute));
    setSelected(!isSelected);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={isSelected}
            onChange={toggleAttribute}
            // value="checkedB"
            color="primary"
          />
        }
        label={<Typography variant="caption">{name}</Typography>}
      />

      <Slider
        disabled={!isSelected}
        min={scaledMin}
        max={scaledMax}
        value={value}
        aria-labelledby="label"
        onChange={(_event, value) => setValue(value)}
      />
    </div>
  );
};

export const Attributes = props => {
  const attributes = TRACK_ATTRIBUTES;
  console.log("attributes:", attributes);

  return (
    <div>
      <h3>Select Attributes</h3>

      {attributes.map(attribute => {
        return <SliderField key={attribute.name} attribute={attribute} />;
      })}
    </div>
  );
};
