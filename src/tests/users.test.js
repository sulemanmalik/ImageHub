const { MongoClient } = require("mongodb");
const config = require("../../config");

describe("insert", () => {
  let connection;
  let db;

  mongoURI = `mongodb+srv://${config.development.database.user}:${
    config.development.database.password
  }@imagehub-0oqob.mongodb.net/${
    config.development.database.db
  }?retryWrites=true&w=majority`;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true
    });
    db = await connection.db(config.development.database.db);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');
  
    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);
  
    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});
