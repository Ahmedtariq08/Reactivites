using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

//This class particularly access the user from the http context and return the username
//Which can then be used in application layer to form relationships
//Reason for doing this is that our authentication layers lies outisde of application layer
//and hence all the user information, although store in db, still lies outside business logic
//So this interface implementation keeps up that principle and returns the user to any part that 
//the application will require
namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public string GetUsername()
        {
            return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }


    }
}