using Moq;
using React_Single_Page.Controllers;
using React_Single_Page.Interfaces;
using React_Single_Page.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace React_Single_Page_Testing.ControllersTesting
{
    public class CarAPIControllerTesting
    {
        private readonly CarAPIController _controller;
        private readonly Mock<ICarRepository> _service;

        public CarAPIControllerTesting()
        {
            _service = new Mock<ICarRepository>();
            _controller = new CarAPIController(_service.Object);
        }

        [Fact]
        [Trait("api", "Get")]
        public void Get_ReturnsAListOfCars_WhenCalled()
        {
            var carList = new List<Car>()
            {
                new Car() {Id=1, ModelName="A3", Brand="Audi", Color="Black", ProductionYear=2019 },
                new Car() {Id=2, ModelName="A5", Brand="Audi", Color="Black", ProductionYear=2017 },
                new Car() {Id=3, ModelName="V70", Brand="Volvo", Color="Silver", ProductionYear=1997 }
            };
            carList.ForEach(x => _service.Setup(y => y.CreateCar(x)));
            _service.Setup(x => x.AllCars()).Returns(carList);

            var result = _controller.Get();

            Assert.Equal(3, result.Count);
        }


        [Fact]
        [Trait("api", "GetBrands")]
        public void GetBrands_ReturnsEmptyList_IfCalledWithNoBrandsInDB()
        {
            var brands = new List<string>();
            _service.Setup(x => x.AllBrands()).Returns(brands);

            var result = _controller.GetBrands();

            Assert.Empty(result);
        }

        [Fact]
        [Trait("api", "GetBrands")]
        public void GetBrands_ReturnsListOfBrands_IfCalledWithBrandsInDB()
        {
            var brands = new List<string>() { "Audi", "Volvo", "Mercedes Benz", "Renault", "Honda" };

            _service.Setup(x => x.AllBrands()).Returns(brands);

            var result = _controller.GetBrands();

            Assert.Equal(5, result.Count);
        }


        [Fact]
        [Trait("api", "Post")]
        public void Post_InvalidModelState_ReturnsNullValue()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _controller.ModelState.AddModelError("Test", "Test");
            _service.Setup(x => x.CreateCar(car));

            var result = _controller.Post(car);

            Assert.Null(result);
        }

        [Fact]
        [Trait("api", "Post")]
        public void Post_ValidModelStateIncorrectValues_ReturnsNullValue()
        {
            var car = new Car() { Id = 1, ModelName = " ", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));

            var result = _controller.Post(car);

            Assert.Null(result);
        }

        [Fact]
        [Trait("api", "Post")]
        public void Post_ValidModelStateCorrectValues_ReturnsCreatedCar()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car)).Returns(car);

            var result = _controller.Post(car);

            Assert.Equal(car.Id, result.Id);
            Assert.Equal(car.ModelName, result.ModelName);
            Assert.Equal(car.Brand, result.Brand);
            Assert.Equal(car.Color, result.Color);
            Assert.Equal(car.ProductionYear, result.ProductionYear);
        }


        [Fact]
        [Trait("api", "Put")]
        public void Put_InvalidModelState_ReturnsNullValue()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var editCar = car;
            editCar.ModelName = "A5";
            _service.Setup(x => x.CreateCar(car));
            _controller.ModelState.AddModelError("Test", "Test");
            _service.Setup(x => x.EditCar(editCar));

            var result = _controller.Put(editCar.Id, editCar);

            Assert.Null(result);
        }

        [Fact]
        [Trait("api", "Put")]
        public void Put_ValidModelStateIncorrectData_ReturnsNullValue()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var editCar = car;
            editCar.ModelName = " ";
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.EditCar(editCar));

            var result = _controller.Put(editCar.Id, editCar);

            Assert.Null(result);
        }

        [Fact]
        [Trait("api", "Put")]
        public void Put_InputCorrectData_ReturnsUpdatedCar()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var editCar = car;
            editCar.ModelName = "A5";
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.EditCar(editCar)).Returns(editCar);

            var result = _controller.Put(editCar.Id, editCar);

            Assert.Equal("A5", editCar.ModelName);
        }


        [Fact]
        [Trait("api", "Delete")]
        public void Delete_InputInvalidId_NoCarGetsRemoved()
        {
            var carList = new List<Car>()
            {
            new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 },
            new Car() { Id = 2, ModelName = "A5", Brand = "Audi", Color = "Black", ProductionYear = 2017 },
            new Car() { Id = 3, ModelName = "V70", Brand = "Volvo", Color = "Silver", ProductionYear = 1997 }
            };
            carList.ForEach(x => _service.Setup(y => y.CreateCar(x)));
            _service.Setup(x => x.DeleteCar(4));
            _service.Setup(x => x.AllCars()).Returns(carList);

            _controller.Delete(4);
            var result = _controller.Get();

            Assert.Equal(3, result.Count);
        }

        [Fact]
        [Trait("api", "Delete")]
        public void Delete_InputCorrectId_RemovesCorrectCarFromList()
        {
            var carList = new List<Car>()
            {
            new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 },
            new Car() { Id = 2, ModelName = "A5", Brand = "Audi", Color = "Black", ProductionYear = 2017 },
            new Car() { Id = 3, ModelName = "V70", Brand = "Volvo", Color = "Silver", ProductionYear = 1997 }
            };
            carList.ForEach(x => _service.Setup(y => y.CreateCar(x)));
            _service.Setup(x => x.DeleteCar(3));
            carList.RemoveAt(2);
            _service.Setup(x => x.AllCars()).Returns(carList);

            _controller.Delete(3);
            var result = _controller.Get();
            var volvoCar = _service.Object.FindCar(3);

            Assert.Equal(2, result.Count);
            Assert.Null(volvoCar);
        }
    }
}
