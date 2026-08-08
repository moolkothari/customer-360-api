const fs = require('fs');
const path = require('path');

const { randomInt } = require('crypto');

const customerCIFs = [
  'CIF987654321', 'CIF987654322', 'CIF987654323', 'CIF987654324', 'CIF987654325',
  'CIF987654326', 'CIF987654327', 'CIF987654328', 'CIF987654329', 'CIF987654330'
];

const customers = [
  'John Smith', 'Jane Doe', 'Ahmed Al-Mansoor', 'Sarah Connor', 'Michael Scott',
  'Elena Rostova', 'David Chen', 'Fatima Al-Zahra', 'Robert Bruce', 'Maria Garcia'
];

const companyNames = [
  'Falcon Holdings', 'Apex Logistics', 'Summit Trading', 'Vanguard Corp', 'Horizon Enterprises',
  'Atlas Global', 'Pinnacle Group', 'Nexus Solutions', 'Crestview Tech', 'Oasis Investments'
];

const roles = ['Spouse', 'Son', 'Daughter', 'Father', 'Mother'];


function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const relationshipData = [];

customerCIFs.forEach((cif, index) => { 

    for (let h = 1; h <= 5; h++) { 
    relationshipData.push({
      category: 'Household',
      customercif: cif,
      direction: 'One Directional',
      identifiertype: 'CIF',
      dev_identifiervalue: customerCIFs[randomInt(9)],
      name: "Household Member " + h,
      relationshipid: generateGuid(),
      role: roles[h-1],
      sortorder: 0,
      householdname: ''
    });
}

relationshipData.push({
      category: 'Individuals',
      customercif: cif,
      direction: 'One Directional',
      identifiertype: 'CIF',
      dev_identifiervalue: customerCIFs[randomInt(9)],
      name: "Professional Contact 1",
      relationshipid: generateGuid(),
      role: "Colleague",
      sortorder: 0,
      householdname: ''
    });

relationshipData.push({
      category: 'Individuals',
      customercif: cif,
      direction: 'One Directional',
      identifiertype: 'CIF',
      dev_identifiervalue: customerCIFs[randomInt(9)],
      name: "Professional Contact 2",
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
      dev_identifiervalue: customerCIFs[randomInt(9)],
      name: companyNames[index],
      relationshipid: generateGuid(),
      role: "Shareholder",
      sortorder: 0,
      householdname: ''
    });

});



// 1. Target directory and file path
const outputDir = path.join(__dirname, 'data');
const filePathDelivery = path.join(outputDir, 'RelationshipSample.json');




// 2. Ensure the directory exists before writing
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}


fs.writeFileSync(filePathDelivery, JSON.stringify(relationshipData, null, 2));


console.log(`Successfully generated RelationshipSample.json at: ${filePathDelivery}`);
