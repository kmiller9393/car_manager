import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './cars.mock';
import { CarDto } from './car.dto';

@Injectable()
export class CarService {
  private cars = CARS;

  public getCars() {
    return this.cars;
  }

  public postCar(car: CarDto) {
    return this.cars.push(car);
  }

  // update any type later below
  public getCarById(id: number): Promise<any> {
    const carId = Number(id);

    return new Promise((resolve) => {
      const car = this.cars.find((car) => car.id === carId);

      if (!car) {
        throw new HttpException('Not Found', 404);
      }

      return resolve(car);
    });
  }

  public deleteCarById(id: number): Promise<any> {
    const carId = Number(id);

    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === carId);

      if (index === -1) {
        throw new HttpException('Not Found', 404);
      }

      return resolve(this.cars.splice(index, 1));
    });
  }

  public putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<any> {
    const carId = Number(id);
    const index = this.cars.findIndex((car) => car.id === carId);

    return new Promise((resolve) => {
      if (index === -1) {
        throw new HttpException('Not Found', 404);
      }

      this.cars[index][propertyName] = propertyValue;

      return resolve(this.cars[index]);
    });
  }
}
