const status = {};

/**
 * Whether the user is authenticated.
 * @param {Object} state - The redux state.
 * @returns {Boolean} The user authentication status.
 */
status.authenticated = state => state.status.authenticated;

/**
 * Whether the user is authenticating.
 * @param {Object} state - The redux state.
 * @returns {Boolean} The user authentication status.
 */
status.authenticating = state => state.status.authenticating;

/**
 * Whether the websocket is connected.
 * @param {Object} state - The redux state.
 * @returns {Boolean} The websocket connected status.
 */
status.connected = state => state.status.connected;

/**
 * Whether the websocket is connecting.
 * @param {Object} state - The redux state.
 * @returns {Boolean} The websocket connecting status.
 */
status.connecting = state => state.status.connecting;

/**
 * Whether there is a websocket error.
 * @param {Object} state - The redux state.
 * @returns {Boolean} The websocket error status.
 */
status.error = state => state.status.error;

export default status;
