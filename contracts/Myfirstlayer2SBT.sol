// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "erc721a/contracts/ERC721A.sol";
import "erc721a/contracts/extensions/ERC721AQueryable.sol";

contract Myfirstlayer2SBT is Ownable, ERC721AQueryable {
    mapping(uint256 => string) tokenURIs;

    event Minted(address to, uint256 tokenId, string svg);

    constructor() ERC721A("MyfirstLayer2SBT", "MFL2SBT") {}

    function mint(string calldata svg) external {
        require(balanceOf(_msgSender()) == 0, "You have already minted.");
        require(bytes(svg).length > 0, "The svg string is empty.");

        uint256 tokenId = _nextTokenId();
        _safeMint(_msgSender(), 1);
        tokenURIs[tokenId] = svg;

        emit Minted(_msgSender(), tokenId, svg);
    }

    function approve(
        address,
        uint256
    ) public payable override(ERC721A, IERC721A) {
        revert("Cannot approve.");
    }

    function setApprovalForAll(
        address,
        bool
    ) public pure override(ERC721A, IERC721A) {
        revert("Cannot setApprovalForAll.");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable override(ERC721A, IERC721A) onlyOwner {
        safeTransferFrom(from, to, tokenId, bytes(""));
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public payable override(ERC721A, IERC721A) onlyOwner {
        _transferToken(from, to, tokenId, _data);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable override(ERC721A, IERC721A) onlyOwner {
        _transferToken(from, to, tokenId, bytes(""));
    }

    function _transferToken(
        address,
        address,
        uint256,
        bytes memory
    ) private pure {
        revert("Cannot transfer.");
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721A, IERC721A) returns (string memory) {
        require(_exists(tokenId));
        return tokenURIs[tokenId];
    }
}
