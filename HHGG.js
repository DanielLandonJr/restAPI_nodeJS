const chalk = require('chalk');
const config = require('./config');

const hhggData = [
  {
    id: 1,
    name: 'Zaphod Beeblebrox',
    species: 'Betelgeusian',
    bio:
      "He is from a planet in the vicinity of Betelgeuse, and is a 'semi-half-cousin' of Ford Prefect, with whom he 'shares three of the same mothers'. Because of 'an accident with a contraceptive and a time machine', his direct ancestors from his father are also his direct descendants"
  },
  {
    id: '2',
    name: 'Arthur Philip Dent',
    species: 'Human',
    bio:
      "Along with Ford Prefect, Arthur Dent barely escapes the Earth's destruction as it is demolished to make way for a hyperspace bypass. Arthur spends the next several years, still wearing his dressing gown, helplessly launched from crisis to crisis while trying to straighten out his lifestyle. He rather enjoys tea, but seems to have trouble obtaining it in the far reaches of the galaxy. In time, he learns how to fly and carves a niche for himself as a sandwich-maker."
  },
  {
    id: '3',
    name: 'Marvin the Paranoid Android',
    species: 'Android',
    bio:
      "Marvin is the ship's robot aboard the starship Heart of Gold. Originally built as one of many failed prototypes of Sirius Cybernetics Corporation's GPP (Genuine People Personalities) technology, Marvin is afflicted with severe depression and boredom, in part because he has a 'brain the size of a planet' which he is seldom, if ever, given the chance to use."
  },
  {
    id: '4',
    name: 'Ford Prefect',
    species: 'Betelgeusian',
    bio:
      "Although Ford had taken great care to blend into Earth society, he had 'skimped a bit on his preparatory research,' and thought that the name 'Ford Prefect' would be 'nicely inconspicuous.' The Ford Prefect was a popular British car manufactured from 1938 to 1961, and that Ford 'had simply mistaken the dominant life form' of Earth."
  },
  {
    id: '5',
    name: 'Slartibartfast',
    species: 'Magrathean',
    bio:
      "Slartibartfast is a Magrathean, and a designer of planets. His favourite part of the job is creating coastlines, the most notable of which are the fjords found on the coast of Norway on planet Earth, for which he won an award. While trapped on prehistoric Earth, Arthur Dent and Ford Prefect see Slartibartfast's signature deep inside a glacier in ancient Norway."
  },
  {
    id: '6',
    name: 'Tricia Marie McMillan (Trillian Astra)',
    species: 'Human',
    bio:
      'Tricia McMillan is a mathematician and astrophysicist whom Arthur Dent attempted to talk to at a party in Islington. She and Arthur next meet six months later on the spaceship Heart of Gold, shortly after the Earth has been destroyed to make way for a hyperspace bypass. Trillian eventually left the party with Zaphod Beeblebrox, who, according to the Quintessential Phase, is directly responsible for her nickname.'
  }
];

let initialNumberOfRecords = 6;

module.exports = server => {
  // get all data
  server.get('/', (request, response, next) => {
    response.send(200, hhggData);

    console.log(chalk.yellow(`get: GET RECORDS, ${config.URL}, response: 200`));

    next();
  });

  // get single data item
  server.get('/:id', async (request, response, next) => {
    // filter for requested id
    const singleRecord = hhggData.filter(item => {
      return item.id === Number(request.params.id);
    });

    if (singleRecord.length) {
      // data found good return
      response.send(200, singleRecord);

      console.log(
        chalk.yellow(`get: GET RECORD, ${config.URL}, response: 200`)
      );
    } else {
      response.send(404, { message: 'Requested Id Not Found' });

      console.log(
        chalk.red(
          `get: GET RECORD, ${
            config.URL
          }, response: 404, Requested Id Not Found`
        )
      );
    }

    next();
  });

  // add new data
  server.post('/:id', (request, response, next) => {
    console.log(request.body.name);
    // check content type is JSON
    if (!request.is('application/json')) {
      try {
        response.send(400, { message: "Expects 'applicaiton/json" });
      } catch (error) {
        console.log(error);
      }

      console.log(
        chalk.red(
          `post: ADD RECORD, ${
            config.URL
          }, response: 400, Expects 'applicaiton/json'`
        )
      );
      next();
    }

    // filter for requested id
    const singleRecord = hhggData.filter(item => {
      return item.id === Number(request.params.id);
    });

    if (singleRecord.length) {
      // data found cannot update because record already exists
      response.send(409, {
        message: 'Record Already Exists, Cannot Add As New'
      });

      console.log(
        chalk.red(
          `post: ADD RECORD, ${
            config.URL
          }, response: 409, Record Already Exists, Cannot Add As New`
        )
      );
    } else {
      // record does not exist so add one

      const newData = {
        id: ++initialNumberOfRecords,
        name: String(request.body),
        species: 'species',
        bio: 'bio'
      };

      console.log(newData);

      response.send(201, newData);

      console.log(
        chalk.yellow(
          `post: ADD RECORD, ${config.URL}, response: 201, Requested Id Updated`
        )
      );
    }

    next();
  });

  // update data
  server.put('/:id', (request, response, next) => {
    // check content type is JSON
    if (!request.is('application/json')) {
      response.send(400, { message: "Expects 'applicaiton/json" });

      console.log(
        chalk.red(
          `put: UPDATE RECORD, ${
            config.URL
          }, response: 400, Expects 'applicaiton/json'`
        )
      );
      next();
    }

    // filter for requested id
    const singleRecord = hhggData.filter(item => {
      return item.id === Number(request.params.id);
    });

    if (singleRecord.length) {
      // data found good return
      response.send(200, singleRecord);

      console.log(
        chalk.yellow(`put: UPDATE RECORD, ${config.URL}, response: 200`)
      );
    } else {
      response.send(404, { message: 'Requested Id Not Found' });

      console.log(
        chalk.red(
          `put: UPDATE RECORD, ${
            config.URL
          }, response: 404, Requested Id Not Found`
        )
      );
    }

    next();
  });

  // delete data
  server.del('/:id', async (request, response, next) => {
    // filter for requested id
    const singleRecord = hhggData.filter(item => {
      return item.id === Number(request.params.id);
    });

    if (singleRecord.length) {
      // data found good return
      response.send(200, { message: 'Requested Id Deleted' });

      console.log(
        chalk.yellow(`delete: DELETE RECORD, ${config.URL}, response: 200`)
      );
    } else {
      response.send(404, { message: 'Requested Id Not Found' });

      console.log(
        chalk.red(
          `delete: DELETE RECORD, ${
            config.URL
          }, response: 404, Requested Id Not Found`
        )
      );
    }

    next();
  });
};
