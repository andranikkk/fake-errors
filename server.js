const express = require("express");
const { faker, allFakers } = require("@faker-js/faker");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 5000;

app.get("/api/users", (req, res) => {
  const region = req.query.region;
  const errors = req.query.errors;
  const pages = req.query.page;
  let loopCount = 20 + (pages - 1) * 10;

  const users = [];
  for (let i = 1; i <= loopCount; i++) {
    switch (region) {
      case "georgia":
        index = i;
        identifier = faker.string.uuid();
        name = allFakers["ka_GE"].person.fullName();
        address =
          allFakers.ka_GE.location.city() +
          ", " +
          allFakers.ka_GE.location.street();
        phone = allFakers["ka_GE"].phone.number();
        break;
      case "russia":
        index = i;
        identifier = faker.string.uuid();
        name = allFakers["ru"].person.fullName();
        address =
          allFakers.ru.location.city() + ", " + allFakers.ru.location.street();
        phone = allFakers["ru"].phone.number();
        break;
      case "arabic":
        index = i;
        identifier = faker.string.uuid();
        name = allFakers["ar"].person.fullName();
        address =
          allFakers.ar.location.city() + ", " + allFakers.ar.location.street();
        phone = allFakers["ar"].phone.number();
        break;
    }

    let counter = 0;
    while (counter < +errors) {
      for (let j = 0; j <= +errors; j++) {
        const errorType = Math.floor(Math.random() * 3);
        switch (errorType) {
          case 0:
            const pickError1 = Math.floor(Math.random() * 3);
            switch (pickError1) {
              case 0:
                name = deleteRandomCharacter(name);
                break;
              case 1:
                address = deleteRandomCharacter(address);
                break;
              case 2:
                phone = deleteRandomCharacter(phone);
                break;
              default:
                break;
            }
            break;
          case 1:
            const pickError2 = Math.floor(Math.random() * 3);
            switch (pickError2) {
              case 0:
                name = addRandomCharacter(name, region);
                break;
              case 1:
                address = addRandomCharacter(address, region);
                break;
              case 2:
                phone = addRandomCharacter(phone, region);
                break;
              default:
                break;
            }
            break;
          case 2:
            const pickError3 = Math.floor(Math.random() * 3);
            switch (pickError3) {
              case 0:
                name = swapNearCharacters(name);
                break;
              case 1:
                address = swapNearCharacters(address);
                break;
              case 2:
                phone = swapNearCharacters(phone);
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
      }
      counter += 1;
    }

    users.push({ index, identifier, name, address, phone });
  }

  res.json(users);
});

const deleteRandomCharacter = (str) => {
  const index = Math.floor(Math.random() * str.length);
  return str.slice(0, index) + str.slice(index + 1);
};

const addRandomCharacter = (str, reg) => {
  let alphabet = "";
  switch (reg) {
    case "russia":
      alphabet =
        "йцукенгшщзхъфывапролджэячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ1234567890";
      break;
    case "georgia":
      alphabet = "ქწერტყუიოპასდფგჰჯკლზხცვბნმღჭშთძჩ1234567890";
      break;
    case "arabic":
      alphabet =
        "أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ١٠";
      break;

    default:
      break;
  }
  const index = Math.floor(Math.random() * str.length);
  const randomChar = alphabet.charAt(
    Math.floor(Math.random() * alphabet.length)
  );
  return str.slice(0, index) + randomChar + str.slice(index);
};

const swapNearCharacters = (str) => {
  const index = Math.floor(Math.random() * (str.length - 1));
  return (
    str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2)
  );
};

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
