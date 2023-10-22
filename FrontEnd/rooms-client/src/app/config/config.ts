export const _IP = "localhost";
export const _URL_SERVICES_BE = 'http://' + _IP + ':8080/api/v1';
export const _URL_GET_UNRESERVED = _URL_SERVICES_BE + '/room/findNonReserved';
export const _URL_GET_RESERVED = _URL_SERVICES_BE + '/room/findReserved';
export const _URL_GET_BY_SIZE = _URL_SERVICES_BE + '/room/size';
export const _URL_PUT_RESERVATION = _URL_SERVICES_BE + '/room/setReservation';
export const _URL_POST_ROOM = _URL_SERVICES_BE + '/room/create';
export const _URL_DELETE_ROOM = _URL_SERVICES_BE + '/room/delete';
