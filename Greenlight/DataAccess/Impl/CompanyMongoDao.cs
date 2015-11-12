using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Greenlight.Models;
using Greenlight.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Bson;
using System.Text.RegularExpressions;

namespace Greenlight.DataAccess.Impl
{
    public class CompanyMongoDao : ICompanyDao
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;

        public CompanyMongoDao()
        {
            _client = new MongoClient();
            _database = _client.GetDatabase("greenlight");
        }

        public async Task<Company> UpdateCompany(Company company)
        {
            var companyCollection = _database.GetCollection<BsonDocument>("company");

            var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(company.Id));

            MemoryStream target = new MemoryStream();
            company.Logo.InputStream.CopyTo(target);
            byte[] data = target.ToArray();

            var update = Builders<BsonDocument>.Update
                .Set("name", company.Name)
                .Set("country", company.Country)
                .Set("phone", company.PhoneNumber)
                .Set("address1", company.Address1)
                .Set("address2", company.Address2)
                .Set("city", company.City)
                .Set("contact", company.Contact)
                .Set("email", company.Email)
                .Set("logo", data);
                

            await companyCollection.UpdateOneAsync(filter, update).ConfigureAwait(false);

            return company;
        }

        public async Task<Company> GetCompany()
        {
            var usersCollection = _database.GetCollection<BsonDocument>("users");

            var filter = Builders<BsonDocument>.Filter.Eq("username", HttpContext.Current.Session["username"]);

            var user = await usersCollection.Find(filter).ToListAsync().ConfigureAwait(false);
            var result = new UserValidationResult();
            result.IsValid = user.Count > 0;

            var idregex = new Regex(Regex.Escape("\"") + "[^" + Regex.Escape("\\") + "]" + "[A-Za-z0-9_-]*");
            string companyId = "";
            if (result.IsValid)
            {
                
                var fullObj = user[0].ElementAt(3).Value.RawValue.ToJson().ToString();
                companyId = idregex.Match(fullObj).Value.Substring(1);
            }

            var companyCollection = _database.GetCollection<BsonDocument>("company");

            var filter2 = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(companyId));
            var companyBson = await companyCollection.Find(filter2).ToListAsync().ConfigureAwait(false);
            var company = new Company();
            
            if (companyBson.Count > 0)
            {
                company.Id = idregex.Match(companyBson[0].ElementAt(0).Value.RawValue.ToJson()).Value.Substring(1);
                company.Name = companyBson[0].ElementAt(1).Value.AsString;
                company.Country = companyBson[0].ElementAt(2).Value.AsString;
                company.PhoneNumber = companyBson[0].ElementAt(3).Value.AsString;
                company.Address1 = companyBson[0].ElementAt(4).Value.AsString;
                company.Address2 = null;
                company.City = companyBson[0].ElementAt(6).Value.AsString;
                company.Contact = companyBson[0].ElementAt(7).Value.AsString;
                company.Email = companyBson[0].ElementAt(8).Value.AsString;
                company.LogoBytes = companyBson[0].ElementAt(9).Value.AsByteArray;
            }

            return company;
        }
    }
}