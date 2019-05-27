using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
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

        private readonly CarsController _controller;
        private readonly Mock<ICarRepository> _service;


        public CarsControllerTesting()
        {
            _service = new Mock<ICarRepository>();
            _controller = new CarsController(_service.Object);
        }

        [Fact]
        [Trait("Category", "Index")]
        public void Index_CallMethod_ReturnsViewResultResponse()
        {
            var result = _controller.Index();

            Assert.IsType<ViewResult>(result);
        }

        [Fact]
        [Trait("Category", "Index")]
        public void Index_CallMethod_ReturnsEmptyListOfcars()
        {
            var carList = new List<Car>();
            _service.Setup(x => x.AllCars()).Returns(carList);

            var result = _controller.Index();

            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<List<Car>>(viewResult.ViewData.Model);
            Assert.Empty(model);
        }

        [Fact]
        [Trait("Category", "Index")]
        public void Index_CallMethodWithTwoCreatedCars_ReturnsListOfCars()
        {
            var carList = new List<Car>()
            {
                new Car() { ModelName="A3", Brand="Audi", Color="Black", ProductionYear=2019 },
                new Car() { ModelName="V70", Brand="Volvo", Color="Silver", ProductionYear=1997 }
            };
            _service.Setup(x => x.AllCars()).Returns(carList);

            var result = _controller.Index();

            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<List<Car>>(viewResult.ViewData.Model);

            Assert.Equal(carList, model);
        }


        [Fact]
        [Trait("Category", "Create")]
        public void Create_ModelStateInvalid_ReturnsBadRequestResult()
        {
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _controller.ModelState.AddModelError("Test", "Test");
            _service.Setup(x => x.CreateCar(car)).Returns(car);

            var result = _controller.Create(car);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "Create")]
        public void Create_SendInvalidCarData_ReturnsBadRequestResult()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));

            var result = _controller.Create(car);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        [Trait("Category", "Create")]
        public void Create_ModelStateValid_RedirectsToDetailsAction()
        {
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car)).Returns(car);

            var result = _controller.Create(car);

            var viewResult = Assert.IsType<RedirectToActionResult>(result);
            var model = Assert.IsAssignableFrom<string>(viewResult.ActionName);

            Assert.Equal("Details", model, ignoreCase: true);
        }


        [Fact]
        [Trait("Category", "Details")]
        public void Details_SubmittingIdOnNonExistantCar_ReturnsNotFoundResult()
        {
            const int Id = 2;
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.FindCar(Id));

            var result = _controller.Details(Id);

            Assert.IsType<NotFoundResult>(result);

        }

        [Fact]
        [Trait("Category", "Details")]
        public void Details_SubmittingInvalidId_ReturnsBadRequestResult()
        {
            var result = _controller.Details(0);
            var result2 = _controller.Details(null);

            Assert.IsType<BadRequestResult>(result);
            Assert.IsType<BadRequestResult>(result2);

        }

        [Fact]
        [Trait("Category", "Details")]
        public void Details_SubmittingValidId_ReturnsCorrectCar()
        {
            // Setting Id here due to testing with Moq.
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.FindCar(1)).Returns(car);

            var result = _controller.Details(1);

            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Car>(viewResult.ViewData.Model);
            Assert.Equal(1, model.Id);
            Assert.Equal(car.ModelName, model.ModelName);
        }


        [Fact]
        [Trait("Category", "EditGet")]
        public void EditGet_SubmittingNonExistantId_ReturnsNotFoundValue()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));

            var result = _controller.Edit(2);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        [Trait("Category", "EditGet")]
        public void EditGet_SubmittingInvalidId_ReturnsBadRequestValue()
        {
            var result = _controller.Edit(0);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        [Trait("Category", "EditGet")]
        public void EditGet_SubmittingSuccessfulId_ReturnsCorrectCarResult()
        {
            var audiCar = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var volvoCar = new Car() { Id = 2, ModelName = "V70", Brand = "Volvo", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(audiCar));
            _service.Setup(x => x.CreateCar(volvoCar));
            _service.Setup(x => x.FindCar(2)).Returns(volvoCar);

            var result = _controller.Edit(2);

            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Car>(viewResult.ViewData.Model);
            Assert.Equal("V70", model.ModelName);
        }


        [Fact]
        [Trait("Category", "EditPost")]
        public void EditPost_InvalidModelState_ReturnsBadRequestObjectResult()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var editCar = car;
            editCar.ModelName = null;
            _controller.ModelState.AddModelError("Error", "Error");
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.EditCar(editCar)).Returns(editCar);

            var result = _controller.Edit(editCar);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "EditPost")]
        public void EditPost_ValidModelStateSubmitInvalidId_ReturnsNotFoundResult()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var editCar = car;
            editCar.Id = 2;
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.EditCar(editCar));

            var result = _controller.Edit(editCar);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        [Trait("Category", "EditPost")]
        public void EditPost_SubmitValidEditData_ReturnsRedirectToActionDetails()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var editCar = car;
            editCar.ModelName = "A4";
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.EditCar(editCar)).Returns(editCar);

            var result = _controller.Edit(editCar);

            var redirectToAction = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Details", redirectToAction.ActionName, ignoreCase: true);
        }


        [Fact]
        [Trait("Category", "Delete")]
        public void Delete_SubmitInvalidId_ReturnsNotFoundResult()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));

            var result = _controller.Delete(2);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        [Trait("Category", "Delete")]
        public void Delete_SubmitNullValue_ReturnsBadRequestResult()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));

            var result = _controller.Delete(null);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        [Trait("Category", "Delete")]
        public void Delete_SubmitCorrectId_ReturnsCorrectCar()
        {
            var audiCar = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var volvoCar = new Car() { Id = 2, ModelName = "V70", Brand = "Volvo", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(audiCar));
            _service.Setup(x => x.CreateCar(volvoCar));
            _service.Setup(x => x.FindCar(2)).Returns(volvoCar);

            var result = _controller.Delete(2);

            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Car>(viewResult.ViewData.Model);
            Assert.Equal("V70", model.ModelName);
        }


        [Fact]
        [Trait("Category", "DeleteConfirmed")]
        public void DeleteConfirmed_SubmitInvalidId_ReturnsNotFoundResult()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));

            var result = _controller.DeleteConfirmed(2);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        [Trait("Category", "DeleteConfirmed")]
        public void DeleteConfirmed_SubmitNullId_ReturnsBadRequestResult()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));

            var result = _controller.DeleteConfirmed(null);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        [Trait("Category", "DeleteConfirmed")]
        public void DeleteConfirmed_SubmitCorrectId_ReturnsRedirectToActionIndex()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.DeleteCar(1)).Returns(true);

            var result = _controller.DeleteConfirmed(1);

            var viewResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", viewResult.ActionName, ignoreCase: true);
        }
    }
}
