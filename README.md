# ADEODIST Task

# Get Started

- [Installation](#markdown-header-Installation)
- [Body Validation](#markdown-header-body-whitelist)
- [Api Doc](#markdown-header-api-doc)
- [Why toJSON() on methods model](#markdown-header-why-tojson-on-methods-model-)
- [For validation on request](#markdown-header-for-validation-on-request)
- [For Pagination on response](#markdown-header-for-Pagination-on-response)
- [Authentication For Protectted Routes](#markdown-header-for-Authentication-For-Protected-routes)

## Installation

1. Clone the project `git clone https://github.com/vivekreck/ADE_task.git`.
2. Install dependencies `yarn install` or `npm i`
3. Create a `.env` file in the root file.

## Body Validation

For security have add a Validation method for your `req.body` coming from the front end. You can take a look of it in the `form-validator.service.js` file.

```js
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
    }
    etc.
```

---

## Api Doc

Api doc link. [Link](https://api.postman.com/collections/17373278-6038680a-2e54-4940-be77-412a6dae9e7e?access_key=PMAT-01HBG2JXT58KZFGRG0DGJC5JT1).

---

## Scripts

### DEV

```
yarn dev
```

or

```
npm run dev
```


### DEV-DEBUG

```
yarn dev:debug
```

or

```
npm run dev:debug
```

---


## For Validation on response

I'm using winston in this Code, that make the loggin really easy.

```js
const logger = winston.createLogger({
    format: customFormat,
    transports: [
        new winston.transports.DailyRotateFile({
            dirname: path.join(__dirname, '..', 'logs'),
            filename: 'application=%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH-mm', // Rotate logs every minute
            zippedArchive: true,
            maxSize: '50m',
            maxFiles: '10',
        }),
    ],
});
```


## Authentication MiddleWare for Protected Routes
I have creating middleware for Every request that requires a authentication then we can use this middleware to authenticate
```js
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.send(401, {
      msg: 'Your authorization failed! You have to need to login again!'
    })
  }
  try {
    const token = authHeader.split(' ')[1];

    const decodedToken = await jwt.verify(token, CONFIG.jwt.jwt_secret);

    if (!decodedToken) {
      return res.send(401, {
        msg: 'Your authorization failed! You have to need to login again!',
        data: {}
      })
    }

    // Get required user details
    res.locals.email = decodedToken.email;

    next();
  } catch (error) {
    console.log(error)
    return res
      .send(401, { msg: 'Your authorization failed! You have to need to login again!', data: {} });
  }
```


## Contributors


<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| <img src="https://avatars.githubusercontent.com/u/77279250?s=96&v=4" width="100px;"/><br /><a href="https://github.com/vivekreck"><sub>Vivek Kumar Singh</sub></a>
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

