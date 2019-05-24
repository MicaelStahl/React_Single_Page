using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using React_Single_Page.Database;
using React_Single_Page.Interfaces;
using React_Single_Page.Repositories;
using System.Linq;
using System.Threading;

namespace React_Single_Page_Testing
{
    public static class InMemoryDatabase
    {
        /// <summary>
        /// Taken from the internet. It supposedly resets the Id used in testing.
        /// Created by this gentleman:
        /// https://github.com/aspnet/EntityFrameworkCore/issues/6872#issuecomment-258025241
        /// </summary>
        public static void ResetValueGenerators(this DbContext context)
        {
            var cache = context.GetService<IValueGeneratorCache>();

            foreach (var keyProperty in context.Model.GetEntityTypes()
                .Select(e => e.FindPrimaryKey().Properties[0])
                .Where(p => p.ClrType == typeof(int)
                            && p.ValueGenerated == ValueGenerated.OnAdd))
            {
                var generator = (ResettableValueGenerator)cache.GetOrAdd(
                    keyProperty,
                    keyProperty.DeclaringEntityType,
                    (p, e) => new ResettableValueGenerator());

                generator.Reset();
            }
        }

        public class ResettableValueGenerator : ValueGenerator<int>
        {
            private int _current;

            public override bool GeneratesTemporaryValues => false;

            public override int Next(EntityEntry entry)
                => Interlocked.Increment(ref _current);

            public void Reset() => _current = 0;
        }


        //public ICarRepository GetInMemoryRepository()
        //{
        //    DbContextOptions<CarDbContext> options;
        //    var builder = new DbContextOptionsBuilder<CarDbContext>();
        //    builder.UseInMemoryDatabase("CarDbContext");
        //    options = builder.Options;
        //    CarDbContext dbContext = new CarDbContext(options);
        //    dbContext.ResetValueGenerators();
        //    dbContext.Database.EnsureDeleted();
        //    dbContext.Database.EnsureCreated();
        //    return new CarRepository(dbContext);
        //}
    }
}
