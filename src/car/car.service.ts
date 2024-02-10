import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './cars.mock';
import { Car } from './car.types';

@Injectable()
export class CarService {
  private cars = CARS;

  public getCars() {
    return this.cars;
  }

  public postCar(car: Car) {
    return this.cars.push(car);
  }

  public getCarById(id: number) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new HttpException('Not Found', 404);
    }

    return car;
  }

  public deleteCarById(id: number) {
    const index = this.cars.findIndex((car) => car.id === id);

    if (index === -1) {
      throw new HttpException('Not Found', 404);
    }

    return this.cars.splice(index, 1);
  }

  public putCarById(id: number, propertyName: string, propertyValue: string) {
    const index = this.cars.findIndex((car) => car.id === id);

    if (index === -1) {
      throw new HttpException('Not Found', 404);
    }

    this.cars[index][propertyName] = propertyValue;

    return this.cars;
  }
}
