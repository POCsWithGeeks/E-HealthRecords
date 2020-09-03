pragma solidity ^0.6.12;
import "./Doctor.sol";
contract Patient{
    struct DoctorInfo {
        string DoctorRegistrationNo;
        string NameOfDoctor;
        string NameOfHospital;
        string Prescriptions;
    }
     address admin;
    
    constructor() public{
        admin = msg.sender;
        }
    
     mapping(string => DoctorInfo) doctordetails;
    
     modifier ifadmin(){
        require(admin == msg.sender);
        _;
        }
        
        function ViewPatientRecords(string memory _HealthId) public view returns(string memory,string memory,
        string memory){
            return(
                doctordetails[_HealthId].NameOfDoctor,
                doctordetails[_HealthId].NameOfHospital,
                doctordetails[_HealthId].Prescriptions
                );
        }
}
