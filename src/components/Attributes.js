import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectAttribute,
  selectAttribute,
  setAttributeValue
} from "../redux/actions";

import { attributesSelector } from "selectors";

import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  titleContainer: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

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

const SliderFields = props => {
  const { attributes } = props;
  return (
    <>
      {Object.values(attributes).map(attribute => {
        return <SliderField key={attribute.name} attribute={attribute} />;
      })}
    </>
  );
};

const AttributesSmallViewport = props => {
  const { attributes } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(!open)} className={classes.titleContainer}>
        <Typography variant="h6" gutterBottom>
          Attributes
        </Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </div>
      <Collapse in={open} timeout="auto">
        <SliderFields attributes={attributes} />
      </Collapse>
    </>
  );
};

const AttributesNotSmallViewport = props => {
  const { attributes } = props;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Attributes
      </Typography>
      <SliderFields attributes={attributes} />
    </>
  );
};
export const Attributes = props => {
  const attributes = useSelector(attributesSelector);
  const isSmallViewport = useMediaQuery(theme => theme.breakpoints.down("sm"));

  return isSmallViewport ? (
    <AttributesSmallViewport attributes={attributes} />
  ) : (
    <AttributesNotSmallViewport attributes={attributes} />
  );
};
