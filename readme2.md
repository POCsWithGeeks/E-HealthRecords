
 pragma solidity ^0.6.12;

contarct Doctor {
    struct PatientData {
        string HealthID;
        string Name;
        string Date;
        string Time;
        string Age;
        string Gender;
        string Diagnosis;
        string Bloodpressure;
        string Medicine
    }
    
    address admin;
    
    constructor() public{
        admin = msg.sender;
        }
    
     mapping(string => PatientData) patients;
    
     modifier ifadmin(){
        require(admin == msg.sender);
        _;
        }

     function CreatePatientdetails(string memory _HealthID,string memory _Name,
                 string memory _Date,string memory _Time,
                 string memory _Age,string memory _Gender,
                 string memory _Diagnosis,string memory _Bloodpressure,string memory _Medicine) public ifadmin {
    
                patients[_HealthID].HealthID = _HealthID;
                patients[_HealthID].Name = _Name;
                patients[_HealthID].Date = _Date;
                patients[_HealthID].Time = _Time;
                patients[_HealthID].Age = _Age;
                patients[_HealthID].Gender = _Gender;
                patients[_HealthID].Bloodpressure = _Bloodpressure;
                patients[_HealthID].Medicine = _Medicine;
 }

     function ModifyPatientdetails(string memory _HealthID, string memory _NewAge, 
                     string memory _NewDiagnosis,string memory _NewBloodpressure,
                     string memory _NewMedicine) public ifadmin{
                          patients[_HealthID].Age = _NewAge;
                          patients[_HealthID].Diagnosis = _NewDiagnosis;
                          patients[_HealthID].Bloodpressure = _NewBloodpressure;
                          patients[_HealthID].Medicine = _NewMedicine;
                    }

     function GetPatientDetails(string memory _HealthID) public view ifadmin returns(string memory,
                string memory,string memory,string memory,string memory,string memory,string,string memory){
       return(
                patients[_HealthID].Name,
                patients[_HealthID].HealthID,
                patients[_HealthID].Date,
                patients[_HealthID].Time,
                patients[_HealthID].Age,
                patients[_HealthID].Gender, 
                patients[_HealthID].Bloodpressure, 
                patients[_HealthID].Medicine
            )
         }

}
    
