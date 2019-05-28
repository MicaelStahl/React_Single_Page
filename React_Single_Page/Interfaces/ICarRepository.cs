using React_Single_Page.Models;
using System.Collections.Generic;

namespace React_Single_Page.Interfaces
{
    public interface ICarRepository
    {
        // (C)RUD
         Car CreateCar(Car car);

        // C(R)UD
        Car FindCar(int? id);
        List<Car> AllCars();
        List<string> AllBrands();

        // CR(U)D
        Car EditCar(Car car);

        //CRU(D)
        bool DeleteCar(int? id);
    }
}
