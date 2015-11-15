using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
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
        private readonly IMongoCollection<BsonDocument> _companyCollection;
        private readonly IUserDao _userDao = new UserMongoDao();

        public CompanyMongoDao()
        {
            _client = new MongoClient();
            _database = _client.GetDatabase("greenlight");
            _companyCollection = _database.GetCollection<BsonDocument>("company");
        }

        public async Task<Company> UpdateCompany(Company company)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(company.Id));
            if (company.Logo != null)
            {
                MemoryStream target = new MemoryStream();
                company.Logo.InputStream.CopyTo(target);
                company.LogoBytes = target.ToArray();
            }

            var update = Builders<BsonDocument>.Update;
            var updateList = new List<UpdateDefinition<BsonDocument>>();
            foreach (PropertyInfo prop in typeof(Company).GetProperties())
            {
                if ((prop.GetValue(company) != null && prop.Name != "Logo"))
                {
                    if(prop.Name == "LogoBytes")
                        updateList.Add(update.Set("logo", prop.GetValue(company) as byte[]));
                    else updateList.Add(update.Set(prop.Name.ToLower(), prop.GetValue(company)));
                }
            }

            await _companyCollection.UpdateOneAsync(filter, update.Combine(updateList)).ConfigureAwait(false);

            return company;
        }

        public async Task<Company> GetCompany(Company company)
        {
            var filter2 = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(company.Id));
            var companyBson = await _companyCollection.Find(filter2).ToListAsync().ConfigureAwait(false);
            
            if (companyBson.Count > 0)
            {
                company.Id = Constants.IdRegex.Match(companyBson[0].ElementAt(0).Value.RawValue.ToJson()).Value.Substring(1);
                company.Name = companyBson[0].ElementAt(1).Value.AsString;
                company.Country = companyBson[0].ElementAt(2).Value.AsString;
                company.Phone = companyBson[0].ElementAt(3).Value.AsString;
                company.Address1 = companyBson[0].ElementAt(4).Value.AsString;
                company.Address2 = null;
                company.City = companyBson[0].ElementAt(6).Value.AsString;
                company.Contact = companyBson[0].ElementAt(7).Value.AsString;
                company.Email = companyBson[0].ElementAt(8).Value.AsString;
                try
                {
                    company.LogoBytes = companyBson[0].ElementAt(9).Value.AsByteArray;
                }
                catch (InvalidCastException ice)
                {
                    //don't assign
                }
            }

            return company;
        }
    }
}