'use strict';

function createCustomer(money, capacity, remains) {
  return {
    money: money,
    vehicle: {
      maxTankCapacity: capacity,
      fuelRemains: remains,
    },
  };
}

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(typeof fillTank).toBe('function');
  });

  it('should fill max if amount is not given', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 10);

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill only the fuel that can be poured', () => {
    const customer = createCustomer(3000, 40, 8);

    fillTank(customer, 10, 40);

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should always fill in only what the client can pay', () => {
    const customer = createCustomer(100, 40, 8);

    fillTank(customer, 10, 40);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    });
  });

  it('Round the poured amount by discarding number to the tenth part', () => {
    const customer = createCustomer(2000, 40, 8);

    fillTank(customer, 20, 2.67);

    expect(customer.vehicle.fuelRemains).toBe(10.6);
  });

  it('If the poured amount is less than 2 liters, do not pour at all', () => {
    const customer = createCustomer(2000, 40, 8);

    fillTank(customer, 20, 1.5);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('Round the price of the purchased fuel the to the nearest '
    + 'hundredth part', () => {
    const customer = createCustomer(2000, 40, 8);

    fillTank(customer, 20.222, 2);

    expect(customer.money).toBe(1959.56);
  });
});
