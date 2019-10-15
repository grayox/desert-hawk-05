import React from 'react';

// ★★★★★☆☆☆☆☆
// https://shields.io
// https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>.svg
// <img alt='label-message' src="https://img.shields.io/badge/sort-starred-informational.svg" />

const SheildsIo = ({ label, message, color, }) => {
  const alt = `${label}-${message}-${color}`;
  const src = `https://img.shields.io/badge/${alt}.svg`;
  return (
    <img alt={alt} src={src} />
  );
}

export default SheildsIo;