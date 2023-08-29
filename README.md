# Reactivities
#### Server Side
- .NET Core (v2.2) application with Clean Architecture using the CQRS + Mediator pattern
- Identity and Authentication modules using .NET Core Identity
- ASPNET Core SignalR integration to acheive real time web communication

#### Database
- Postgres / MySQL lite
- Using AutoMapper and MediatR packages, Entity Framework Core as the Object Relational Mapper

#### Client Side
- React (v18) with Typescript
- React router v6
- Mobx for state management
- Semantic UI
- Axios with interceptors for APIs 


## Features

#### Authentication
- Users can register with an active email, email verification enabled. Refresh tokens implemented with 5 minute refresh rate, stored in local storage.
- APIs and client routes protected for authenticated user only

#### Activities
- List of all activities, can be filtered by whether the user is host, whether the user is going or by date.
- A user can join an activity, create it's own activity, manage an activity it has created or delete an activity when they are host.
- Live chat enabled on activity page where users can post their comments
- Infinite scroll with pagination implemented to fetch data as user scrolls
- Loading skeletons made to make UI appealing

#### Photos
- User can upload multiple photos (hosted on cloudinary), set a main photo, delete a photo. 

#### Followers / Following
- User can follow or unfollow other users. Statistics will be displayed on profile page