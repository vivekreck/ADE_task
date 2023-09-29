"use strict";

exports.DataValidator = ({ CreateError }) => {
  return Object.freeze({
    name(x) {
      x = String(x);
      if (/^[\d\D]{3,20}$/.test(x)) {
        return { msg: "Valid", data: { value: x } };
      } else {
        throw new CreateError("Invalid name", 422);
      }
    },
    email(x) {
      x = String(x).toLowerCase().trim();
      if (/^([+.-\w]+)([@])([\w+.-]+\w)([.])(\w+)$/.test(x)) {
        return { msg: "Valid", data: { value: x } };
      } else {
        throw new CreateError("Invalid email", 422);
      }
    },
    password(x) {
      x = String(x).trim();
      if (
        x.match(/[a-z]/g) &&
        x.match(/[A-Z]/g) &&
        x.match(/[0-9]/g) &&
        x.match(/[^a-zA-Z\d]/g) &&
        x.length >= 8 &&
        x.length <= 30
      ) {
        return { msg: "Valid", data: { value: x } };
      } else {
        throw new CreateError(
          "Invalid password",
          422
        );
      }
    },
    url(x) {
      if (/^(https:\/\/)[\w\W]*$/.test(x)) {
        return { msg: 'Valid', data: { value: x } }
      }
      throw new CreateError("Invalid url", 422);
    },
    desciption(x) {
      x = String(x);
      if (/^[\d\D]{1,1000}$/.test(x)) {
        return { msg: 'Valid', data: { value: x } }
      } else {
        throw new CreateError("Invalid desciption", 422);
      }
    },
  });
};
