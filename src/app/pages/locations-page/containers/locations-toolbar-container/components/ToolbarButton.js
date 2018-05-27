import React from 'react';
import { IoAndroidAdd, IoAndroidDone, IoAndroidRemoveCircle, IoAndroidOpen, IoEdit } from 'react-icons/lib/io';

const btnIcons = {
  'Add': <IoAndroidAdd />,
  'Submit': <IoAndroidDone />,
  'View': <IoAndroidOpen />,
  'Edit': <IoEdit />,
  'Remove': <IoAndroidRemoveCircle />
}

const ToolbarButton = ({ btnName, disabled = false, specialClassName = "", dataTooltip, onClick}) => (
  <button
    className={`${!disabled ? "pseudo " + specialClassName : ''}`}
    data-tooltip={dataTooltip}
    disabled={disabled}
    onClick={() => onClick()}
  >
  {
    btnIcons[btnName]
  }
  {btnName}
  </button>
)

export default ToolbarButton;
