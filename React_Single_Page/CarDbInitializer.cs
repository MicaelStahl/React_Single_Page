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

            if (!context.Brands.Any())
            {
                var brands = new Brand[]
                {
                    new Brand{Name="Audi"},
                    new Brand{Name="BMW"},
                    new Brand{Name="Citroen"},
                    new Brand{Name="Ferrari"},
                    new Brand{Name="Jaguar"},
                    new Brand{Name="Kia"},
                    new Brand{Name="Mercedes-Benz"},
                    new Brand{Name="Nissan"},
                    new Brand{Name="Renault"},
                    new Brand{Name="Volkswagen"},
                    new Brand{Name="Volvo"},
                };

                context.Brands.AddRange(brands);

                context.SaveChanges();

                if (!context.Cars.Any())
                {
                    var cars = new Car[]
                    {
                    new Car{ModelName="AMG C63", Brand=brands[6].Name, Color="Red", ProductionYear=2015},
                    new Car{ModelName="A5", Brand=brands[0].Name, Color="Black", ProductionYear=2019},
                    new Car{ModelName="V70", Brand=brands[10].Name, Color="Silver", ProductionYear=2002},
                    new Car{ModelName="M3", Brand=brands[1].Name, Color="White", ProductionYear=2016}
                    };

                    context.Cars.AddRange(cars);

                    context.SaveChanges();
                }
            }

        }
    }
}