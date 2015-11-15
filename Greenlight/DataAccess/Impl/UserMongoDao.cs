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
                    newUser.Id = Constants.IdRegex.Match(u.Elements.Where(a => a.Name == "_id").ToList()[0].Value.RawValue.ToJson()).Value.Substring(1);
                    newUser.FirstName = u.Elements.Where(a => a.Name == "firstname").ToList()[0].Value.AsString;
                    newUser.LastName = u.Elements.Where(a => a.Name == "lastname").ToList()[0].Value.AsString;
                    newUser.Email = u.Elements.Where(a => a.Name == "email").ToList()[0].Value.AsString;
                    newUser.Company = Constants.IdRegex.Match(u.Elements.Where(a => a.Name == "company").ToList()[0].Value.RawValue.ToJson()).Value.Substring(1);
                    newUser.Username = u.Elements.Where(a => a.Name == "username").ToList()[0].Value.AsString;
                    var rolenumber = (int)u.Elements.Where(a => a.Name == "role").ToList()[0].Value.AsDouble;
                    newUser.Role = (Role)rolenumber;
                    userList.Add(newUser);

                }
                
            }
            result.Users = userList;
            return result;
        }

        public async Task<UserValidationResult> CreateUserAsync(User user)
        {
            var userDoc = new BsonDocument();
           
            foreach (PropertyInfo prop in typeof(User).GetProperties())
            {
                if (prop.Name != "Id")
                {
                    if (prop.GetValue(user) != null)
                    {
                        if (prop.Name == "Role")
                        {
                            userDoc.Add(prop.Name.ToLower(), new BsonDouble((int)(prop.GetValue(user) as Role?)));
                        }
                        else
                        {
                            userDoc.Add(prop.Name.ToLower(), new BsonString(prop.GetValue(user) as string));
                        }
                    }
                    else
                    {
                        userDoc.Add(prop.Name.ToLower(), new BsonString(string.Empty));
                    }   
                }
            }

            await _usersCollection.InsertOneAsync(userDoc).ConfigureAwait(false);

            //check to see if user was actually inserted
             var result = await  GetUsersAsync(user);

            return result;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(user.Id));
            
            var update = Builders<BsonDocument>.Update;
            var updateList = new List<UpdateDefinition<BsonDocument>>();
            foreach (PropertyInfo prop in typeof(User).GetProperties())
            {
                if (prop.Name != "Company" && prop.Name != "Id" && !(prop.Name == "Password" && prop.GetValue(user) == null))
                {
                    if (prop.GetValue(user) == null)
                    {
                        updateList.Add(update.Set(prop.Name.ToLower(), ""));
                    }
                    else
                    {
                        var value = prop.Name == "Role" ? (double)(prop.GetValue(user) as Role?) : prop.GetValue(user);
                        updateList.Add(update.Set(prop.Name.ToLower(), value));
                    }
                }
            }

            await _usersCollection.UpdateOneAsync(filter, update.Combine(updateList)).ConfigureAwait(false);

            return user;
        }

        public async  Task<bool> DeleteUserAsync(User user)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(user.Id));

            await _usersCollection.DeleteOneAsync(filter).ConfigureAwait(false);

            return true;
        }
    }
}