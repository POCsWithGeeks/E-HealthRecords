pragma solidity ^0.6.12;

import './Doctor.sol';
import './patient.sol';

contract Medical {
    struct Bill{
    string HealthId;
    string DoctorRegistrationNo;
    string Amount;
    }
     address admin;
    constructor() public{
        admin = msg.sender;
        }
    
    mapping(string => Bill) billdetails;
     modifier ifadmin(){
        require(admin == msg.sender);
        _;
        }
        
        function ViewPatientRecords(string memory _HealthId,string memory _DoctorRegistrationNo) public view returns(string memory,string memory){
            return(
                billdetails[_HealthId].HealthId,
                billdetails[_DoctorRegistrationNo].DoctorRegistrationNo
                );
        }
        function TransactionBill(string memory _HealthId,string memory _Amount) public ifadmin{
            billdetails[_HealthId].Amount = _Amount;
        }
}
