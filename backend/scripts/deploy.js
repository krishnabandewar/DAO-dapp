const { ethers } = require("hardhat");

async function main() {
    const Token = await ethers.getContractFactory("GovernanceToken");
    const token = await Token.deploy(ethers.parseEther("1000000"));
    await token.waitForDeployment();
    console.log("GovernanceToken deployed to:", await token.getAddress());

    const DAO = await ethers.getContractFactory("DAOContract");
    const dao = await DAO.deploy(await token.getAddress());
    await dao.waitForDeployment();
    console.log("DAOContract deployed to:", await dao.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
