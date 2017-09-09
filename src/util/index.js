const ACTION_PREFIX = "@@composable-redux/";

/** Prefix an action type to avoid collisions */
export const actionType = str => ACTION_PREFIX + str;
