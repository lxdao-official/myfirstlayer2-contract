// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "erc721a/contracts/ERC721A.sol";

contract Myfirstlayer2SBT is Ownable, ERC721A {
    string public baseURI;

    event SignerChanged(address operator, address from, address to);
    event BaseURIChanged(
        address operator,
        string fromBaseURI,
        string toBaseURI
    );
    event Minted(address from, address to, uint256 tokenId);

    constructor(
        string memory _baseURI
    ) ERC721A("MyfirstLayerSBT", "MFL2SBT") {
        baseURI = _baseURI;
    }

    function mint() external {
        require(balanceOf(_msgSender()) == 0, "You have already minted.");

        uint256 tokenId = _nextTokenId();
        _safeMint(_msgSender(), 1);

        emit Minted(_msgSender(), _msgSender(), tokenId);
    }

    function approve(
        address,
        uint256
    ) public payable override(ERC721A) {
        revert("Cannot approve.");
    }

    function setApprovalForAll(
        address,
        bool
    ) public pure override(ERC721A) {
        revert("Cannot setApprovalForAll.");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable override(ERC721A) onlyOwner {
        safeTransferFrom(from, to, tokenId, bytes(""));
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public payable override(ERC721A) onlyOwner {
        _transferToken(from, to, tokenId, _data);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable override(ERC721A) onlyOwner {
        _transferToken(from, to, tokenId, bytes(""));
    }

    function _transferToken(
        address from,
        address to,
        uint256 tokenId,
        bytes memory
    ) private {
        revert("Cannot transfer.");
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721A) returns (string memory) {
        return string(abi.encodePacked(baseURI, tokenId));
    }
}
