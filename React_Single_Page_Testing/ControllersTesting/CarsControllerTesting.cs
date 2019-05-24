using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Single_Page.Controllers;
using React_Single_Page.Database;
using React_Single_Page.Interfaces;
using React_Single_Page.Models;
using React_Single_Page.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace React_Single_Page_Testing.ControllersTesting
{
    public class CarsControllerTesting
    {
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

        [Fact]
        [Trait("Category", "Index")]
        public void Index_CallMethod_ReturnsViewResultResponse()
        {
            var controller = new CarsController(GetInMemoryRepository());

            var result = controller.Index();

            Assert.IsType<ViewResult>(result);
        }

        [Fact]
        [Trait("Category", "Index")]
        public void Index_CallMethod_ReturnsEmptyListOfcars()
        {
            var controller = new CarsController(GetInMemoryRepository());

            var result = controller.Index();

            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<List<Car>>(viewResult.ViewData.Model);
            Assert.Empty(model);
        }

        [Fact]
        [Trait("Category", "Index")]
        public void Index_CallMethodWithTwoCreatedCars_ReturnsListOfCars()
        {
            var controller = new CarsController(GetInMemoryRepository());
            var carList = new List<Car>()
            {
                new Car() { ModelName="A3", Brand="Audi", Color="Black", ProductionYear=2019 },
                new Car() { ModelName="V70", Brand="Volvo", Color="Silver", ProductionYear=1997 }
            };

            carList.ForEach(x => controller.Create(x));
            var result = controller.Index();

            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<List<Car>>(viewResult.ViewData.Model);
            Assert.Equal(2, model.Count);
        }

    }
}
