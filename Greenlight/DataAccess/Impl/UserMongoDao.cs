using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
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
        private readonly IMongoCollection<BsonDocument> _usersCollection; 

        public UserMongoDao()
        {
            _client = new MongoClient();
            _database = _client.GetDatabase("greenlight");
            _usersCollection = _database.GetCollection<BsonDocument>("users");
        }

        public bool GetUser(User user)
        {
            throw new NotImplementedException();
        }

        public async Task<UserValidationResult> GetUsersAsync(User user)
        {
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Empty;
            foreach (PropertyInfo prop in typeof(User).GetProperties())
            {
                if(prop.GetValue(user) != null)
                    filter = filter & builder.Eq(prop.Name.ToLower(), prop.GetValue(user));
            }

            var userBson = await _usersCollection.Find(filter).ToListAsync().ConfigureAwait(false);
            var result = new UserValidationResult();
            result.IsValid = userBson.Count > 0;
            var userList = new List<User>();
            if (result.IsValid)
            {
                foreach (var u in userBson)
                {
                    var newUser = new User();
                    newUser.Id = Constants.IdRegex.Match(u.ElementAt(0).Value.RawValue.ToJson()).Value.Substring(1);
                    newUser.FirstName = u.ElementAt(1).Value.AsString;
                    newUser.LastName = u.ElementAt(2).Value.AsString;
                    newUser.Company = Constants.IdRegex.Match(u.ElementAt(3).Value.RawValue.ToJson()).Value.Substring(1);
                    var rolenumber = (int)u.ElementAt(6).Value.AsDouble;
                    newUser.Role = (Role)rolenumber;
                    userList.Add(newUser);
                }
                
            }
            result.Users = userList;
            return result;
        }
    }
}