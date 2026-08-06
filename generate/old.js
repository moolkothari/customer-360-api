const fs = require('fs');
const path = require('path');
const {randomInt} = require('crypto');

const customerCIFs = [
  'CIF987654321', 'CIF987654322', 'CIF987654323', 'CIF987654324', 'CIF987654325',
  'CIF987654326', 'CIF987654327', 'CIF987654328', 'CIF987654329', 'CIF987654330'
];

const companyNames = [
  'Falcon Holdings', 'Apex Logistics', 'Summit Trading', 'Vanguard Corp', 'Horizon Enterprises',
  'Atlas Global', 'Pinnacle Group', 'Nexus Solutions', 'Crestview Tech', 'Oasis Investments'
];

//const roles = ['Shareholder', 'Director', 'Beneficial Owner', 'Partner', 'Subsidiary'];

// Simple GUID generator to match your relationshipid format
function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const relationshipData = [];

customerCIFs.forEach((cif, index) => {

    for (let h = 0; h <= 5; h++) { // Assign 3 roles per CIF

        relationshipData.push({
      customercif: cif,
      direction: '',
      identifiertype: 'CIF',
      identifiervalue: customerCIFs[random(0)],
      name: companyNames[index],
      relationshipid: generateGuid(),
      role: roles[index % roles.length],
      sortorder: 0,
      householdname: 'One Direction'

    });
}


    relationshipData.push({
      category: 'Individuals',
      customercif: cif,
      direction: '',
      identifiertype: 'CIF',
      identifiervalue: customerCIFs[random(0)],
      name: companyNames[index],
      relationshipid: generateGuid(),
      role: "Colleague",
      sortorder: 0,
      householdname: ''
    });

    relationshipData.push({
      category: 'Individuals',
      customercif: cif,
      direction: '',
      identifiertype: 'CIF',
      identifiervalue: customerCIFs[random(0)],
      name: companyNames[index],
      relationshipid: generateGuid(),
      role: "Friend",
      sortorder: 0,
      householdname: ''
    });
    relationshipData.push({
      category: 'Organizations',
      customercif: cif,
      direction: '',
      identifiertype: 'CIF',
      identifiervalue: customerCIFs[random(0)],
      name: companyNames[index],
      relationshipid: generateGuid(),
      role: "Shareholder",
      sortorder: 0,
      householdname: ''
    });

});


// Write output to JSON file
fs.writeFileSync( path.join(__dirname ,"data" , "relationshipSample.json"), 
    JSON.stringify(relationshipData, null, 2));

console.log('Successfully generated relationshipSample.json for 10 customer CIFs!');