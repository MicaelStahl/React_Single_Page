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
using Moq;
using React_Single_Page.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace React_Single_Page_Testing.RepositoryTesting
{
    public class CarRepositoryTesting
    {
        private readonly Mock<ICarRepository> _service;

        public CarRepositoryTesting()
        {
            _service = new Mock<ICarRepository>();
        }

        [Fact]
        [Trait("Service", "AllCars")]
        public void AllCars_CallMethod_ReturnsEmptyList()
        {
            _service.Setup(x => x.AllCars()).Returns(new List<Car>());

            var result = _service.Object.AllCars();

            Assert.Empty(result);
        }

        [Fact]
        [Trait("Service", "AllCars")]
        public void AllCars_CallMethodWithTwoCarsSubmitted_ReturnsListOfCars()
        {
            var carList = new List<Car>()
            {
                new Car()
                {
                    ModelName="A3", Brand="Audi", Color="Black", ProductionYear=2019
                },
                new Car()
                {
                    ModelName="V70", Brand="Volvo", Color="Silver", ProductionYear=1997
                }
            };
            carList.ForEach(x => _service.Setup(y => y.CreateCar(x)));
            _service.Setup(x => x.AllCars()).Returns(carList);

            var result = _service.Object.AllCars();

            Assert.Equal(2, result.Count);

        }


        [Fact]
        [Trait("Service", "Create")]
        public void Create_CreateValidCar_ReturnsCreatedCar()
        {
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Red", ProductionYear = 2015 };
            _service.Setup(x => x.CreateCar(car)).Returns(car);

            var result = _service.Object.CreateCar(car);

            Assert.NotNull(result);
            Assert.Equal((car.ModelName, car.Brand, car.Color, car.ProductionYear), (result.ModelName, result.Brand, result.Color, result.ProductionYear));
        }

        [Fact]
        [Trait("Service", "Create")]
        public void Create_CreateTwoValidCars_ReturnsListOfTwoCars()
        {
            var carList = new List<Car>()
            {
            new Car() { ModelName = "A3", Brand = "Audi", Color = "Red", ProductionYear = 2015 },
            new Car() {ModelName="A4", Brand="Audi", Color="Black", ProductionYear=2017 }
            };
            carList.ForEach(x => _service.Setup(y => y.CreateCar(x)));
            _service.Setup(x => x.AllCars()).Returns(carList);

            var result = _service.Object.AllCars();

            Assert.Equal(2, result.Count);
        }

        [Fact]
        [Trait("Service", "Create")]
        public void Create_CreateInvalidCar_ReturnsNullValue()
        {
            var car = new Car() { Brand = "Audi", Color = "Red", ProductionYear = 2014 };
            _service.Setup(x => x.CreateCar(car));

            var result = _service.Object.CreateCar(car);

            Assert.Null(result);
        }

        [Fact]
        [Trait("Service", "Create")]
        public void Create_CreateValidCarWithGivenId_ReturnsNullValue()
        {
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Red", ProductionYear = 2015 };
            _service.Setup(x => x.CreateCar(car));

            var result = _service.Object.CreateCar(car);

            Assert.Null(result);
        }

        [Fact]
        [Trait("Service", "Delete")]
        public void Delete_SubmitInvalidId_ReturnsFalseValue()
        {
            // Gets Id = 1
            var carList = new List<Car>() { new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 } };
            carList.ForEach(x => _service.Setup(y => y.CreateCar(x)));
            _service.Setup(x => x.AllCars()).Returns(carList);

            var result = _service.Object.DeleteCar(2);
            var list = _service.Object.AllCars();

            Assert.False(result);
            Assert.Single(list);
        }

        [Fact]
        [Trait("Service", "Delete")]
        public void Delete_SubmitNullId_ReturnsFalseValue()
        {
            _service.Setup(x => x.DeleteCar(null));

            var result = _service.Object.DeleteCar(null);

            Assert.False(result);
        }

        [Fact]
        [Trait("Service", "Delete")]
        public void Delete_SubmitValidId_ReturnsTrueValue()
        {
            // Gets Id = 1
            var car = new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.DeleteCar(1)).Returns(true);

            var result = _service.Object.DeleteCar(1);

            Assert.True(result);
        }


        [Fact]
        [Trait("Service", "Edit")]
        public void Edit_SubmitValidUpdate_ReturnsUpdatedCar()
        {

            _service.Setup(x => x.CreateCar(new Car() { Id = 1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 }));
            var editCar = new Car() { Id = 1, ModelName = "A4", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.EditCar(editCar)).Returns(editCar);

            var updatedCar = _service.Object.EditCar(editCar);

            Assert.Equal("A4", updatedCar.ModelName);
            Assert.Equal("Audi", updatedCar.Brand);
            Assert.Equal("Black", updatedCar.Color);
            Assert.Equal(2019, updatedCar.ProductionYear);
        }

        [Fact]
        [Trait("Service", "Edit")]
        public void Edit_SubmitInvalidData_ReturnsNullValue()
        {
            // Gets Id = 1
            var car = new Car() { Id=1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var editCar = new Car() { Id = 1, ModelName = " ", Brand = "Audi", Color = "Red", ProductionYear = 2018 };
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.EditCar(editCar));
            _service.Object.CreateCar(car);

            var result = _service.Object.EditCar(editCar);

            Assert.Null(result);
        }

        [Fact]
        [Trait("Service", "Edit")]
        public void Edit_SubmitInvalidData_EnsureOldDataWasNotChanged()
        {
            // Gets Id = 1
            var car = new Car() { Id=1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            var editCar = new Car() { Id = 1, ModelName = " ", Brand = "Audi", Color = "Red", ProductionYear = 2018 };
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.EditCar(editCar));
            _service.Setup(x => x.FindCar(1)).Returns(car);

            var result = _service.Object.EditCar(editCar);
            var original = _service.Object.FindCar(1);

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
            var carList = new List<Car>()
            {
            new Car() {Id=1, ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 },
            new Car() {Id=2, ModelName = "A5", Brand = "Audi", Color = "White", ProductionYear = 2018 },
            new Car() {Id=3, ModelName = "V70", Brand = "Volvo", Color = "Silver", ProductionYear = 1997 }
            };
            carList.ForEach(x => _service.Setup(y => y.CreateCar(x)));
            _service.Setup(x => x.FindCar(3)).Returns(carList.SingleOrDefault(z=>z.Id == 3));

            var result = _service.Object.FindCar(3);

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
            // Gets Id = 1
            var car = new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 };
            _service.Setup(x => x.CreateCar(car));
            _service.Setup(x => x.FindCar(2));

            var result = _service.Object.FindCar(2);

            Assert.Null(result);
        }

        [Fact]
        [Trait("Service", "Find")]
        public void FindCar_SubmitNullId_ReturnsNullValue()
        {
            var carList = new List<Car>()
            {
            new Car() { ModelName = "A3", Brand = "Audi", Color = "Black", ProductionYear = 2019 },
            new Car() { ModelName = "A5", Brand = "Audi", Color = "White", ProductionYear = 2018 },
            new Car() { ModelName = "V70", Brand = "Volvo", Color = "Silver", ProductionYear = 1997 }
            };
            carList.ForEach(x => _service.Setup(y => y.CreateCar(x)));
            _service.Setup(x => x.FindCar(null));

            var result = _service.Object.FindCar(null);

            Assert.Null(result);
        }
    }
}
