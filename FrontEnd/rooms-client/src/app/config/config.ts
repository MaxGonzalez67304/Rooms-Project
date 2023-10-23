// Define the base URL for the backend services
export const _IP = "localhost"; // The IP address of the backend server
export const _URL_SERVICES_BE = 'http://' + _IP + ':8080/api/v1'; // The base URL for the backend services

// Define the specific API endpoints
export const _URL_GET_UNRESERVED = _URL_SERVICES_BE + '/room/findNonReserved'; // URL for retrieving unreserved rooms
export const _URL_GET_RESERVED = _URL_SERVICES_BE + '/room/findReserved'; // URL for retrieving reserved rooms
export const _URL_GET_BY_SIZE = _URL_SERVICES_BE + '/room/size'; // URL for retrieving rooms by size
export const _URL_PUT_RESERVATION = _URL_SERVICES_BE + '/room/setReservation'; // URL for updating room reservation status
export const _URL_POST_ROOM = _URL_SERVICES_BE + '/room/create'; // URL for creating a new room
export const _URL_DELETE_ROOM = _URL_SERVICES_BE + '/room/delete'; // URL for deleting a room
