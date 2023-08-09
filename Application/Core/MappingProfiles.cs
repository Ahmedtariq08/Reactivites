using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(x => x.HostUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(d => d.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(x => x.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(x => x.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }

    }
}