const errors = require('restify-errors');
const Customer = require('../models/Customers');

module.exports = server => {
  // get all data
  server.get('/customers', async (request, response, next) => {
    // get the requested data
    // response.send({ message: 'Customers Route' });

    try {
      // get data from source
      const customers = await Customer.find({});

      // once data returned send it out
      response.send(customers);

      // must call next at the end of the route or it blows up
      next();
    } catch (error) {
      return next(new errors.InvalidContentError(error));
    }
  });

  // get single data item
  server.get('/customers/:id', async (request, response, next) => {
    try {
      const customer = await Customer.findById(request.params.id);

      response.send(customer);

      next();
    } catch (error) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${request.params.id}`
        )
      );
    }
  });

  // add new data
  server.post('/customers', async (request, response, next) => {
    // check content type is JSON
    if (!request.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'applicaiton/json"));
    }

    const customer = new Customer({
      name: request.body.name,
      email: request.body.email,
      balance: request.body.balance
    });

    try {
      const newCustomer = await customer.save();

      // send 201 code, everything is fine and something was created
      response.send(201);

      next();
    } catch (error) {
      return next(new errors.InternalError(error.message));
    }
  });

  // update data
  server.put('/customers/:id', async (request, response, next) => {
    // check content type is JSON
    if (!request.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'applicaiton/json"));
    }

    try {
      const updateCustomer = await Customer.findOneAndUpdate(
        {
          _id: request.params.id
        },
        request.body
      );

      response.send(200);

      next();
    } catch (error) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${request.params.id}`
        )
      );
    }
  });

  // delete data
  server.del('/customers/:id', async (request, response, next) => {
    try {
      const deleteData = await Customer.findOneAndRemove({
        _id: request.params.id
      });

      // 204, something removed, all is good
      response.send(204);

      next();
    } catch (error) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${request.params.id}`
        )
      );
    }
  });
};
