// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AelinERC1155Test is ERC1155, ERC1155Supply, Ownable {
    uint256[] public supplies = [100, 100];
    uint256[] public minted = [0, 0];

    string public _name;
    string public _symbol;

    constructor() ERC1155("ipfs://QmdEWNzkWQhvJp6AMs5iMkZ3xX3idxTp6Ai2mKwYCFWaSs/") {
      _name = "AelinERC1155Test";
      _symbol = "AELIN-ERC1155-TEST-1";

    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function publicMint(uint256 id, uint256 amount, bytes memory data)
      public
    {
      require(id < supplies.length, "Token doesn't exist");
      require(id >= 0, "Token doesn't exist");
      
      uint256 index = 0;
      if(id != 0) {
        index = id - 1;
      }

      require(minted[index] + amount <= supplies[index], "Not enough supply");

      _mint(msg.sender, id, amount, data);
      minted[index] += amount;
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        require(id < supplies.length, "Token doesn't exist");
        require(id >= 0, "Token doesn't exist");

        uint256 index = 0;
        if(id != 0) {
          index = id - 1;
        }

        require(minted[index] + amount <= supplies[index], "Not enough supply");

        _mint(account, id, amount, data);
        minted[index] += amount;
    }

    function uri(uint256 _id) public view override returns (string memory) {
      require(exists(_id), "URI: token doesn't exist");

      return string(abi.encodePacked(super.uri(_id), Strings.toString(_id)));
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}