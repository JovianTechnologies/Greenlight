using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Greenlight.Models;

namespace Greenlight.DataAccess
{
    interface ICompanyDao
    {
        Task<Company> UpdateCompany(Company company);
        Task<Company> GetCompany();
    }
}
