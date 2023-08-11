using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(x => x.HostUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(d => d.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(x => x.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(x => x.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.AppUser.
                    Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.
                    Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<Profiles.Profile, AppUser>()
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(x => x.Bio, o => o.MapFrom(s => s.Bio));

            CreateMap<Comment, CommentDto>()
                .ForMember(x => x.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<Activity, Profiles.UserActivityDto>()
                .ForMember(x => x.Id, o => o.MapFrom(s => s.Id))
                .ForMember(x => x.Title, o => o.MapFrom(s => s.Title))
                .ForMember(x => x.Category, o => o.MapFrom(s => s.Category))
                .ForMember(x => x.Date, o => o.MapFrom(s => s.Date))
                .ForMember(x => x.HostUsername, o => o.MapFrom(s => s.Attendees.FirstOrDefault(p => p.IsHost)));

        }

    }
}