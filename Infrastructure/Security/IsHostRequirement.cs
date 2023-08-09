using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    //Used to authorize and check whether user editing the activity is the host of that activity
    public class IsHostRequirement : IAuthorizationRequirement
    {
        public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly DataContext _dbContext;

            public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
                _dbContext = dbContext;

            }
            protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
            {
                //get user id
                var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

                //user was not authorized for this task
                if (userId == null) return Task.CompletedTask;

                var activityId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                    .SingleOrDefault(x => x.Key == "id").Value?.ToString());    //converts guid to string from request params

                //both userId and activityId are reuquired becuase PK is combination of both
                var attendee = _dbContext.ActivityAttendees
                    .AsNoTracking()
                    .SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId)
                    .Result;

                if (attendee == null) return Task.CompletedTask;

                if (attendee.IsHost) context.Succeed(requirement);

                return Task.CompletedTask;

            }
        }

    }
}