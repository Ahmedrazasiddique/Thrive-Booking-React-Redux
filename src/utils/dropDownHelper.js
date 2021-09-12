/**
 * Get Drop down value object
 * @param object options
 * @param String value value to search for
 * @param String valueParam value Param
 * @returns object
 */
export const getDropdownValue = (options, value, valueParam = "value") => {
  return options.find((option) => {
    return option[valueParam] == value;
  });
};

export const getDropdownIndex = (options, value, valueParam = "value") => {
  
 return options.findIndex(x => x.value ===parseInt(value));
};
