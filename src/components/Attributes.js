import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecommendationSeed,
  toggleAttribute as bam,
  // deselectAttribute,
  setAttributeValue
} from "../redux/actions";

import { attributesSelector } from "selectors";
import { SEED_TYPES } from "../constants";

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
  const dispatch = useDispatch();
  const [value, setValue] = useState(attribute.value);

  const addAttribute = () => {
    dispatch(setAttributeValue({ attribute, newValue: value }));
    dispatch(bam(attribute));
  };

  const updateValue = value => {
    // update the value locally, as it changes
    setValue(value);
  };

  const updateValueCommitted = value => {
    // save updated value in redux, when change is finished
    dispatch(setAttributeValue({ attribute, newValue: value }));
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={attribute.isSelected}
            onChange={addAttribute}
            color="primary"
          />
        }
        label={<Typography variant="caption">{name}</Typography>}
      />

      <Slider
        disabled={!attribute.isSelected}
        min={min * scale}
        max={max * scale}
        value={value * scale}
        aria-labelledby="label"
        onChange={(_event, value) => updateValue(value / scale)}
        onChangeCommitted={(_event, value) =>
          updateValueCommitted(value / scale)
        }
      />
    </div>
  );
};

export const Attributes = props => {
  const attributes = useSelector(attributesSelector);

  return (
    <div>
      <h3>Select Attributes</h3>

      {Object.values(attributes).map(attribute => {
        return <SliderField key={attribute.name} attribute={attribute} />;
      })}
    </div>
  );
};
