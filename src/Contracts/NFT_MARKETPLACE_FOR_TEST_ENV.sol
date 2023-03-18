// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFT {
    
    struct NFTInfo {
        uint id;
        string imageUrl;
        uint256 price;
        address owner;
        string name;
        bool forSale;
        bool forbid;
        uint256 highestBid;
        address highestBidder;
    }
    
    mapping(uint256 => NFTInfo) public NFTs;
    uint256 public NFTId;
    
    function addNFT(string memory _imageUrl, uint256 _price, string memory _name) public {
    NFTId++;
    NFTs[NFTId] = NFTInfo({
        id:NFTId,
        imageUrl: _imageUrl,
        price: _price,
        owner: msg.sender,
        name: _name,
        forSale: false,
        forbid:false,
        highestBid: 0,
        highestBidder: address(0)
    });
    }
    
    function placeForSale(uint256 _NFTId) public {
        require(NFTs[_NFTId].owner == msg.sender, "You are not the owner of this NFT.");
        require(!NFTs[_NFTId].forSale, "This NFT is already for sale.");
        NFTs[_NFTId].forSale = true;
    }

    function placeForBid(uint256 _NFTId) public {
        require(!NFTs[_NFTId].forbid, "This NFT is already for Bid.");
        require(NFTs[_NFTId].owner == msg.sender, "You are not the owner of this NFT.");
        NFTs[_NFTId].forbid = true;
    }
    
    function buyNFT(uint256 _NFTId, uint256 _price) public {
        require(NFTs[_NFTId].forSale, "This NFT is not for sale.");
        require(msg.sender != NFTs[_NFTId].owner, "You are already the owner of this NFT.");
        require(NFTs[_NFTId].price == _price, "Wrong payment.");
        NFTs[_NFTId].owner = msg.sender;
        NFTs[_NFTId].forSale = false;
    }

    function bidNFT(uint256 _NFTId, uint256 _bidAmount) public {
        require(NFTs[_NFTId].forbid, "This NFT is not for Bid.");
        require(msg.sender != NFTs[_NFTId].owner, "You are already the owner of this NFT.");
        require(_bidAmount > NFTs[_NFTId].highestBid, "Bid is not higher than the current highest bid.");
        NFTs[_NFTId].highestBid = _bidAmount;
        NFTs[_NFTId].highestBidder = msg.sender;
    }

    function listNFTs() public view returns (NFTInfo[] memory) {
        NFTInfo[] memory allNFTs = new NFTInfo[](NFTId);
        for (uint256 i = 1; i <= NFTId; i++) {
            allNFTs[i - 1] = NFTs[i];
    }
    return allNFTs;
    }

    function sellToHighestBidder(uint256 _NFTId) public{
        require(NFTs[_NFTId].forbid, "This NFT is not for Bid.");
        require(msg.sender == NFTs[_NFTId].owner, "Only the owner can sell the NFT.");
        require(NFTs[_NFTId].highestBidder != address(0), "No one has placed a bid on this NFT.");
        NFTs[_NFTId].owner = NFTs[_NFTId].highestBidder;
        NFTs[_NFTId].forSale = false;
        NFTs[_NFTId].forbid = false;
        NFTs[_NFTId].price =  NFTs[_NFTId].highestBid;
        NFTs[_NFTId].highestBid = 0;
        NFTs[_NFTId].highestBidder = address(0);
    }

    function listOwnerNFTs(address _owner) public view returns (NFTInfo[] memory) {
        uint256 numNFTs = 0;
        for (uint256 i = 1; i <= NFTId; i++) {
            if (NFTs[i].owner == _owner) {
                numNFTs++;
            }
        }
        NFTInfo[] memory ownerNFTs = new NFTInfo[](numNFTs);
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= NFTId; i++) {
            if (NFTs[i].owner == _owner) {
                ownerNFTs[currentIndex] = NFTs[i];
                currentIndex++;
            }
        }
        return ownerNFTs;
    }



}
