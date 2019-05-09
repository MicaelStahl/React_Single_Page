using System;
using System.Linq;
using React_Single_Page.Database;
using React_Single_Page.Models;

namespace React_Single_Page
{
    internal class CarDbInitializer
    {
        internal static void Initialize(CarDbContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Cars.Any())
            {
                var cars = new Car[]
                {
                    new Car{ModelName="AMG C63", Brand="Mercedes", Color="Red", ProductionYear=2015},
                    new Car{ModelName="A5", Brand="Audi", Color="Black", ProductionYear=2019},
                    new Car{ModelName="V70", Brand="Volvo", Color="Silver", ProductionYear=2002},
                    new Car{ModelName="M3", Brand="BMW", Color="White", ProductionYear=2016}
                };

                context.Cars.AddRange(cars);

                context.SaveChanges();
            }
        }
    }
}