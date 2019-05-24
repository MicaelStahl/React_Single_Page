using Microsoft.EntityFrameworkCore;
using React_Single_Page.Database;
using React_Single_Page.Interfaces;
using React_Single_Page.Models;
using React_Single_Page.Repositories;
using Microsoft.EntityFrameworkCore.InMemory;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Xunit;

namespace React_Single_Page_Testing.RepositoryTesting
{
    public class CarRepositoryTesting
    {
        //private readonly InMemoryDatabase imdb = new InMemoryDatabase();

        [Fact]
        [Trait("Service", "AllCars")]
        public void AllCars_CallMethod_ReturnsEmptyList()
        {
            var repo = GetInMemoryRepository();

            var result = repo.AllCars();

            Assert.Empty(result);
        }

        [Fact]
        [Trait("Service", "AllCars")]
        public void AllCars_CallMethodWithTwoCarsSubmitted_ReturnsListOfCars()
        {
            var repo = GetInMemoryRepository();
            var car1 = new Car() { ModelName = "A4", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var car2 = new Car() { ModelName = "A5", Brand = "Audi", Color = "Black", ProductionYear = 2017 };

            var carResult1 = repo.CreateCar(car1);
            var carResult2 = repo.CreateCar(car2);
            var result = repo.AllCars();

            Assert.Equal(2, result.Count);
        }


        [Fact]
        [Trait("Service", "Create")]
        public void Create_CreateValidCar_ReturnsCreatedCar()
        {
            var repo = GetInMemoryRepository();
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Red", ProductionYear = 2015 };

            var result = repo.CreateCar(car);
            Assert.NotNull(result);
            Assert.Equal((car.ModelName, car.Brand, car.Color, car.ProductionYear), (result.ModelName, result.Brand, result.Color, result.ProductionYear));
        }

        [Fact]
        [Trait("Service", "Create")]
        public void Create_CreateTwoValidCars_ReturnsListOfTwoCars()
        {
            var repo = GetInMemoryRepository();
            var carList = new List<Car>()
            {
            new Car() { ModelName = "A3", Brand = "Audi", Color = "Red", ProductionYear = 2015 },
            new Car() {ModelName="A4", Brand="Audi", Color="Black", ProductionYear=2017 }
            };

            carList.ForEach(x => repo.CreateCar(x));
            var result = repo.AllCars();

            Assert.Equal(2, result.Count);
        }

        [Fact]
        [Trait("Service", "Create")]
        public void Create_CreateInvalidCar_ReturnsNullValue()
        {
            var repo = GetInMemoryRepository();
            var car = new Car() { Brand = "Audi", Color = "Red", ProductionYear = 2014 };

            var result = repo.CreateCar(car);

            Assert.Null(result);
        }

        [Fact]
        [Trait("Service", "Create")]
        public void Create_CreateValidCarWithGivenId_ReturnsNullValue()
        {
            var repo = GetInMemoryRepository();
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Red", ProductionYear = 2015 };

            var result = repo.CreateCar(car);

            Assert.Null(result);
        }

        [Fact]
        [Trait("Service", "Delete")]
        public void Delete_SubmitInvalidId_ReturnsFalseValue()
        {
            var repo = GetInMemoryRepository();
            // Gets Id = 1
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };

            repo.CreateCar(car);
            var result = repo.DeleteCar(2);
            var list = repo.AllCars();

            Assert.False(result);
            Assert.Single(list);
        }

        [Fact]
        [Trait("Service", "Delete")]
        public void Delete_SubmitNullId_ReturnsFalseValue()
        {
            var repo = GetInMemoryRepository();

            var result = repo.DeleteCar(null);

            Assert.False(result);
        }

        [Fact]
        [Trait("Service", "Delete")]
        public void Delete_SubmitValidId_ReturnsTrueValue()
        {
            var repo = GetInMemoryRepository();
            // Gets Id = 1
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };

            repo.CreateCar(car);
            var result = repo.DeleteCar(1);
            var carList = repo.AllCars();

            Assert.True(result);
            Assert.Empty(carList);
        }


        [Fact]
        [Trait("Service", "Edit")]
        public void Edit_SubmitValidUpdate_ReturnsUpdatedCar()
        {
            var repo = GetInMemoryRepository();
            // Gets Id = 1
            //var editCar = new Car() { Id = 1, ModelName = "A4", Brand = "Audi", Color = "Black", ProductionYear = 2017 };

            var newCar = repo.CreateCar(new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 });
            var findCar = repo.FindCar(1);
            findCar.ModelName = "A4";
            var updatedCar = repo.EditCar(findCar);

            Assert.Equal("A4", updatedCar.ModelName);
            Assert.Equal("Audi", updatedCar.Brand);
            Assert.Equal("Black", updatedCar.Color);
            Assert.Equal(2019, updatedCar.ProductionYear);
        }

        [Fact]
        [Trait("Service", "Edit")]
        public void Edit_SubmitInvalidData_ReturnsNullValue()
        {
            var repo = GetInMemoryRepository();
            // Gets Id = 1
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var editCar = new Car() { Id = 1, ModelName = " ", Brand = "Audi", Color = "Red", ProductionYear = 2018 };

            repo.CreateCar(car);
            var result = repo.EditCar(editCar);

            Assert.Null(result);
        }

        [Fact]
        [Trait("Service", "Edit")]
        public void Edit_SubmitInvalidData_EnsureOldDataWasNotChanged()
        {
            var repo = GetInMemoryRepository();
            // Gets Id = 1
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var editCar = new Car() { Id = 1, ModelName = " ", Brand = "Audi", Color = "Red", ProductionYear = 2018 };

            repo.CreateCar(car);
            var result = repo.EditCar(editCar);
            var original = repo.FindCar(1);

            Assert.Null(result);
            Assert.Equal(1, original.Id);
            Assert.Equal("A3", original.ModelName);
            Assert.Equal("Audi", original.Brand);
            Assert.Equal("Black", original.Color);
            Assert.Equal(2019, original.ProductionYear);
        }


        [Fact]
        [Trait("Service", "Find")]
        public void FindCar_SubmitValidId_ReturnsCorrectCar()
        {
            var repo = GetInMemoryRepository();
            var carList = new List<Car>()
            {
            new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 },
            new Car() { ModelName = "A5", Brand = "Audi", Color = "White", ProductionYear = 2018 },
            new Car() { ModelName = "V70", Brand = "Volvo", Color = "Silver", ProductionYear = 1997 }
            };

            carList.ForEach(x => repo.CreateCar(x));
            var result = repo.FindCar(3);

            Assert.Equal(3, result.Id);
            Assert.Equal("V70", result.ModelName);
            Assert.Equal("Volvo", result.Brand);
            Assert.Equal("Silver", result.Color);
            Assert.Equal(1997, result.ProductionYear);
        }

        [Fact]
        [Trait("Service", "Find")]
        public void FindCar_SubmitInvalidId_ReturnsNullValue()
        {
            var repo = GetInMemoryRepository();
            // Gets Id = 1
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };

            repo.CreateCar(car);
            var result = repo.FindCar(2);

            Assert.Null(result);
        }

        [Fact]
        [Trait("Service", "Find")]
        public void FindCar_SubmitNullId_ReturnsNullValue()
        {
            var repo = GetInMemoryRepository();
            var carList = new List<Car>()
            {
            new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 },
            new Car() { ModelName = "A5", Brand = "Audi", Color = "White", ProductionYear = 2018 },
            new Car() { ModelName = "V70", Brand = "Volvo", Color = "Silver", ProductionYear = 1997 }
            };

            carList.ForEach(x => repo.CreateCar(x));
            var result = repo.FindCar(null);

            Assert.Null(result);
        }


        #region GetInMemoryRepository
        private ICarRepository GetInMemoryRepository()
        {
            DbContextOptions<CarDbContext> options;
            var builder = new DbContextOptionsBuilder<CarDbContext>();
            builder.UseInMemoryDatabase("CarDbContext");
            builder.EnableSensitiveDataLogging();
            options = builder.Options;
            CarDbContext dbContext = new CarDbContext(options);
            dbContext.ResetValueGenerators();
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();
            return new CarRepository(dbContext);
        }
        #endregion
    }
}
