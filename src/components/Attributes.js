import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectAttribute,
  selectAttribute,
  setAttributeValue
} from "../redux/actions";

import { attributesSelector } from "selectors";

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

  const handleCheckboxClick = () => {
    if (attribute.isSelected) {
      dispatch(deselectAttribute({ attribute }));
    } else {
      dispatch(selectAttribute({ attribute, value }));
    }
  };

  const handleSliderChange = value => {
    // update the value locally, as it changes
    setValue(value);
  };

  const handleSliderChangeCommitted = value => {
    // save updated value in redux, when change is finished
    dispatch(setAttributeValue({ attribute, value }));
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={attribute.isSelected}
            onChange={handleCheckboxClick}
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
        onChange={(_event, value) => handleSliderChange(value / scale)}
        onChangeCommitted={(_event, value) =>
          handleSliderChangeCommitted(value / scale)
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
