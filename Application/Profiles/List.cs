
using MediatR;
using Application.Core;
using Persistence;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Profiles
{
    public class List
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var nowUtc = DateTime.UtcNow;

                IQueryable<Domain.Activity> query = _context.Activities
                    .Where(a => a.IsCancelled != true)
                    .Where(a => a.Date > nowUtc);


                //activities that user is hosting
                if (request.Predicate == "hosting")
                {
                    var activitiesHosted = await _context.Activities
                        .Where(a => a.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName == request.Username)
                        .Where(a => a.IsCancelled != true)
                        .Where(a => a.Date > DateTime.UtcNow) //do we need to only show activites that are in future?
                        .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                        .ToListAsync(cancellationToken);
                    return Result<List<UserActivityDto>>.Success(activitiesHosted);
                }
                //activities that user is going to as attendee
                if (request.Predicate == "future")
                {
                    var activitiesToAttend = await _context.Activities
                        .Where(a => a.IsCancelled != true)
                        .Where(a => a.Attendees.All(x => x.AppUser.UserName == request.Username))
                        .Where(a => a.Date > DateTime.UtcNow)
                        .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                        .ToListAsync(cancellationToken);
                    return Result<List<UserActivityDto>>.Success(activitiesToAttend);
                }

                //activities that user went to in past as attendee
                if (request.Predicate == "past")
                {
                    var activitiesAttended = await _context.Activities
                        .Where(a => a.IsCancelled != true)
                        .Where(a => a.Attendees.All(x => x.AppUser.UserName == request.Username))
                        .Where(a => a.Date < DateTime.UtcNow)
                        .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                        .ToListAsync(cancellationToken);
                    return Result<List<UserActivityDto>>.Success(activitiesAttended);
                }
                else
                {
                    // Handle invalid or missing predicate here
                    return Result<List<UserActivityDto>>.Failure("Invalid predicate.");
                }
            }

        }
    }
}