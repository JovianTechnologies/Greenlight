using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Greenlight.Data;
using Greenlight.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Greenlight.DataAccess.Impl
{
    public class UserMongoDao : IUserDao
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;

        public UserMongoDao()
        {
            _client = new MongoClient();
            _database = _client.GetDatabase("greenlight");
        }

        public bool ValidateUser(string username, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<UserValidationResult> ValidateUserAsync(string username, string password)
        {
            var usersCollection = _database.GetCollection<BsonDocument>("users");

            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("username", username) & builder.Eq("password", password);

            var user = await usersCollection.Find(filter).ToListAsync().ConfigureAwait(false);
            var result = new UserValidationResult();
            result.IsValid = user.Count > 0;
            if (result.IsValid)
            {
                var rolenumber = (int) user[0].ElementAt(6).Value.AsDouble;

                result.Role = Enum.GetName(typeof(Role), rolenumber);
            }
            

            return result;
        }
    }

}