// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Product {
    
    struct ProductInfo {
        string imageUrl;
        uint256 price;
        address owner;
        string name;
        bool forSale;
        bool forbid;
        uint256 highestBid;
        address highestBidder;
    }
    
    mapping(uint256 => ProductInfo) public products;
    uint256 public productId;
    
    function addProduct(string memory _imageUrl, uint256 _price, string memory _name) public {
    productId++;
    products[productId] = ProductInfo({
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
    
    function placeForSale(uint256 _productId) public {
        require(products[_productId].owner == msg.sender, "You are not the owner of this product.");
        require(!products[_productId].forSale, "This product is already for sale.");
        products[_productId].forSale = true;
    }

     function placeForBid(uint256 _productId) public {
        require(!products[_productId].forbid, "This product is already for Bid.");
        require(products[_productId].owner == msg.sender, "You are not the owner of this product.");
        products[_productId].forbid = true;
    }
    
function buyProduct(uint256 _productId, uint256 _price) public {
    require(products[_productId].forSale, "This product is not for sale.");
    require(msg.sender != products[_productId].owner, "You are already the owner of this product.");
    require(products[_productId].price == _price, "Wrong payment.");
    //require(products[_productId].price > _price, "Wrong Payment .");
    //address payable previousOwner = payable(products[_productId].owner);
    //previousOwner.transfer(msg.value); //make function payable in original network
    products[_productId].owner = msg.sender;
    products[_productId].forSale = false;
}

function bidProduct(uint256 _productId, uint256 _bidAmount) public {
    require(products[_productId].forbid, "This product is not for Bid.");
    require(msg.sender != products[_productId].owner, "You are already the owner of this product.");
    require(_bidAmount > products[_productId].highestBid, "Bid is not higher than the current highest bid.");
    products[_productId].highestBid = _bidAmount;
    products[_productId].highestBidder = msg.sender;
    }

    function listProducts() public view returns (ProductInfo[] memory) {
    ProductInfo[] memory allProducts = new ProductInfo[](productId);
    for (uint256 i = 1; i <= productId; i++) {
        allProducts[i - 1] = products[i];
    }
    return allProducts;
}

function sellToHighestBidder(uint256 _productId) public{
    require(products[_productId].forbid, "This product is not for Bid.");
    require(msg.sender == products[_productId].owner, "Only the owner can sell the product.");
    require(products[_productId].highestBidder != address(0), "No one has placed a bid on this product.");
    //address payable owner = payable(products[_productId].owner);
    //owner.transfer(products[_productId].highestBid);
    products[_productId].owner = products[_productId].highestBidder;
    products[_productId].forSale = false;
    products[_productId].forbid = false;
    products[_productId].price =  products[_productId].highestBid;
    products[_productId].highestBid = 0;
    products[_productId].highestBidder = address(0);


}





}
