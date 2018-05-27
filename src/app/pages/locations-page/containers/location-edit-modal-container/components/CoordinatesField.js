import React from 'react';

const CoordinatesField = ({ latValue, lngValue, onChange}) => (
  <div>
    <div className="fieldLabel"><span>-  Coordinates  -</span></div>
    <div className="fieldCoordinates">
    <span>Lat</span>
    <input
      type="number"
      placeholder="lat"
      value={latValue}
      onChange={evt => onChange(evt.target.value, undefined)}
    />
    <span>Lng</span>
    <input
      type="number"
      placeholder="lng"
      value={lngValue}
      onChange={evt => onChange(undefined, evt.target.value)}
    />
    </div>
  </div>
)

export default CoordinatesField;
