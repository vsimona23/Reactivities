using Domain;
using Microsoft.EntityFrameworkCore; // this is a nuget package installed

namespace Persistence
{
    // here DataContext class derives from DbContext from entityframework which we need to use to get access
    public class DataContext : DbContext
    {
        // creating a constructor DataContext
        // base means using options from the base class
        // if this is missed then it will cause problems when creating migration
        // nothing is needed inside this constructor
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // here in another constructor we are passing entity 'Value' which is accessed from Domain because there entities are located
        // Values is name for the property which will be used for the sqlite table name
        public DbSet<Value> Values {get; set;}

        public DbSet<Activity> Activities { get; set; }

        // protected means it is accessible to the class itself it's defined in and any derived classes from this class
        // override - to override a method that's available inside DbContext
        // void - we're not returning anything
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // configures Value entity with new values to add
            builder.Entity<Value>()
            .HasData(
                new Value {Id = 1, Name = "Value 101"},
                new Value {Id = 2, Name = "Value 102"},
                new Value {Id = 3, Name = "Value 103"},
                new Value {Id = 4, Name = "Value 104"}
            );
        }
    }
}
