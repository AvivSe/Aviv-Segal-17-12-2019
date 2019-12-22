export const getSnackbar = ({ui: {snackbar }}) => snackbar;
export const getCurrentPath = ({ui: { path}}) => path;
export const getIsDarkMode = ({ui: { isDarkMode }}) => isDarkMode;
export const getDialog = ({ui: { dialog }}) => dialog;
export const getIsSomeOnePending = ({ weather: { onPending } }) => onPending['home'] || onPending['fiveDaysOfDailyForecasts'] || onPending['favorites'];
