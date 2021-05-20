const checkURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const movieSchemaImageMessage = 'Неверный формат ссылки на картику, попробуйте еще разок.';
const movieSchemaTrailerMessage = 'Неверный формат ссылки на трейлер, попробуйте еще разок.';
const movieSchemaThumbnailMessage = 'Неверный формат ссылки на миниатюру, попробуйте еще разок.';
const userSchemaEmailMessage = 'Еmail должен быть валидным, попробуйте еще разок.';
const userSchemaEmailDefaultName = 'Александр или Мария, например';
const userSchemaLoginMessage = 'Вы введил неправильную почту или пароль. Попробуйте еще разок.';
const authMessage = 'Необходима авторизация.';
const serverError = 'На сервере произошла ошибка.';
const createUserBadRequest = 'Переданы некорректные данные.';
const createUserConflict = 'Пользовотель с таким емейлом уже зарегистрирован. Идите логиньтесь.';
const loginUnauthorised = 'У вас не вышло войти. Возможно, вы не зарегистированы?';
const getUserNotFoundId = 'Пользователь по заданному id отсутствует в базе.';
const getUserNotFound = 'Пользователей нету, сорян(';
const updateUserNotFound = 'Такого кользователя не сущесвует, попробуйте другой айди.';
const updateUserBadRequest = 'Переданы некорректные данные. Возможно, вы заполнили не все поля в теле запроса.';
const updateUserConflict = 'Такой емейл уже зарегистрирован в базе. Попробуйте использоват другой или залогиньтесь по указанным вами емейлом.';
const createMovieBadRequest = 'Переданы некорректные данные.';
const createMovieConflict = 'Фильм с таким атрибутом уже сохранен.';
const getMovieNotFound = 'В базе нет ни одного фильма.';
const deleteMovieNotFound = 'Нет такого фильма, попробуйте другой айди.';
const deleteMovieForbidden = 'Чужие фильмы удалять нельзя.';
const deleteMovieBadRequest = 'Такого фильма нет, проверьте айди.';
const UndefinedAddress = 'Нет такого ресурса, сори...';

module.exports = {
  checkURL,
  movieSchemaImageMessage,
  movieSchemaTrailerMessage,
  movieSchemaThumbnailMessage,
  userSchemaEmailMessage,
  userSchemaEmailDefaultName,
  userSchemaLoginMessage,
  authMessage,
  serverError,
  createUserBadRequest,
  createUserConflict,
  loginUnauthorised,
  getUserNotFoundId,
  getUserNotFound,
  updateUserNotFound,
  updateUserBadRequest,
  updateUserConflict,
  createMovieBadRequest,
  createMovieConflict,
  getMovieNotFound,
  deleteMovieNotFound,
  deleteMovieForbidden,
  deleteMovieBadRequest,
  UndefinedAddress,
};
