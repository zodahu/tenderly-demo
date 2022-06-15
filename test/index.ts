import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  const tenderlyProvider = new ethers.providers.JsonRpcProvider(
    process.env.TENDERLY_URL
  );

  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory(
      "Greeter",
      tenderlyProvider.getSigner()
    );
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
