// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

// _____________________
// IMPORTS
// _____________________
// ERC-721 introduces a standard for NFT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// Counter allows us to keep track for every NFT made
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProfileImageNfts is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter _tokenIds;
    mapping(uint256 => string) _tokenURIs;

    struct RenderToken{
        uint256 id;
        string uri;
        string space;
    }

    constructor() ERC721("ProfileImageNfts", "PIN"){}

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory){
        // Check if URI exists for supplied tokenId
        require(_exists(tokenId),"URI not exist on that ID");
        // If exists then get the URI coresponding to the tokenId and return
        string memory _RUri =  _tokenURIs[tokenId];
        return _RUri;
    }

    function getAllTokens() public view returns (RenderToken[] memory){
        uint256 latestId = _tokenIds.current();
        RenderToken[] memory res = new RenderToken[](latestId);
        for(uint256 i = 0; i  <= latestId ; i++){
            if(_exists(i)){
                string memory uri = tokenURI(i);
                res[i] = RenderToken(i,uri," ");
            }
        }
        return res;
    }

    function mint(address recipents, string memory _uri) public returns (uint256){
        uint256 newId = _tokenIds.current();

        // use built in function _mint
        _mint(recipents,newId);
        _setTokenURI(newId,_uri);
        // After minting NFT - increment the counter
        _tokenIds.increment();
        return newId;
    }
}