using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            // this needs properties for activity
            public Guid Id { get; set; }

            public string Title { get; set; }

            public string Description { get; set; }

            public string Category { get; set; }

            public DateTime Date { get; set; }

            public string City { get; set; }

            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };

                // add activity to the context
                _context.Activities.Add(activity);
                // SaveChangesAsync method will return a task of integer which will be a number of changes saved
                // if number is more than 0, then it means changes were applied so success
                var success = await _context.SaveChangesAsync() > 0;

                // Unit.Value is an empty object which means that we're returning to API controller and will get 200 OK response
                if (success) return Unit.Value;

                // if request unsuccessful, throw an exception
                throw new Exception("Problem saving changes");
            }
        }
    }
}