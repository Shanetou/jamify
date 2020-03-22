import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attributesSelector } from "selectors";
import {
  deselectAttribute,
  selectAttribute,
  setAttributeValue
} from "../redux/actions";

const useStyles = makeStyles(theme => ({
  titleContainer: props => ({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: props.open ? theme.spacing(2) : "0"
  })
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

  const handleSliderChange = scaledVal => {
    // update the value locally, as it changes
    setValue(scaledVal);
  };

  const handleSliderChangeCommitted = scaledVal => {
    // save updated value in redux, when change is finished
    dispatch(setAttributeValue({ attribute, scaledVal }));
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
        onChange={(_event, newVal) => handleSliderChange(newVal / scale)}
        onChangeCommitted={(_event, newVal) =>
          handleSliderChangeCommitted(newVal / scale)
        }
      />
    </div>
  );
};

const SliderFields = props => {
  const { attributes } = props;
  return (
    <>
      {Object.values(attributes).map(attribute => (
        <SliderField key={attribute.name} attribute={attribute} />
      ))}
    </>
  );
};

const AttributesSmallViewport = props => {
  const { attributes } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open });

  return (
    <>
      <div onClick={() => setOpen(!open)} className={classes.titleContainer}>
        <Typography variant="h6">Attributes</Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </div>
      <Collapse in={open} timeout="auto">
        <SliderFields attributes={attributes} />
      </Collapse>
    </>
  );
};

const AttributesNotSmallViewport = props => {
  const classes = useStyles({ open: true });
  const { attributes } = props;

  return (
    <>
      <Typography variant="h6" className={`${classes.titleContainer}`}>
        Attributes
      </Typography>
      <SliderFields attributes={attributes} />
    </>
  );
};

export const Attributes = _props => {
  const attributes = useSelector(attributesSelector);
  const isSmallViewport = useMediaQuery(theme => theme.breakpoints.down("sm"));

  return isSmallViewport ? (
    <AttributesSmallViewport attributes={attributes} />
  ) : (
    <AttributesNotSmallViewport attributes={attributes} />
  );
};
