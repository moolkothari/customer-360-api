const fs = require('fs');
const path = require('path');

// 10 Customer CIFs
const customerCIFs = [
  'CIF987654321',
  'CIF987654322',
  'CIF987654323',
  'CIF987654324',
  'CIF987654325',
  'CIF987654326',
  'CIF987654327',
  'CIF987654328',
  'CIF987654329',
  'CIF987654330'
];

const customers = [
  'John Smith', 'Jane Doe', 'Ahmed Al-Mansoor', 'Sarah Connor', 'Michael Scott',
  'Elena Rostova', 'David Chen', 'Fatima Al-Zahra', 'Robert Bruce', 'Maria Garcia'
];
const productTypes = ['Credit Card', 'Debit Card', 'Cheque Book', 'Account Documents', 'Loan Documents'];
const locations = ['Dubai Hub', 'Abu Dhabi Hub', 'Sharjah Hub', 'Jebel Ali Freezone Hub'];
const statuses = ['In Transit', 'Out for Delivery', 'Delivered', 'Pending Customs', 'Arrived at Hub'];


function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDeliveryAndShipmentData(totalRecords = 50) {
  const deliveryTrackingList = [];
  const shipmentDetailsList = [];

  for (let i = 1; i <= totalRecords; i++) {
    const awbNo = `RAKCR${String(i).padStart(13,0)}`;
    const cif = customerCIFs[(i - 1) % customerCIFs.length]; // Distributes evenly among 10 CIFs
    const customer = customers[(i - 1) % customers.length];
    const hub = getRandomItem(locations);
    const status = getRandomItem(statuses);

    // Delivery Tracking Record
    const deliveryRecord = {
      AWBTrackingNo: awbNo,
      CIFNumber: cif,
      Consignee: customer,
      CreatedOn: '2026-01-10',
      ProductType: getRandomItem(productTypes),
      DeliveryScheduled: '2026-01-12',
      DeliveryType: 'Express',
      Location: hub,
      DeliveryAttempt: '1',
      ConsigneeMobileNumber: `+97150${Math.floor(1000000 + Math.random() * 9000000)}`,
      ShipmentStatus: status,
      LastUpdatedOn: '10 Jan 2026 14:35:20'
    };

    // Corresponding Shipment Details Record
    const shipmentRecord = {
      ShipmentID: `SH${100000 + i}`,
      Name: `Shipment Activity ${i}`,
      AWBTrackingNo: awbNo,
      ActivityCode: 'ARR',
      ActivityName: 'Arrived at Hub',
      Description: `Shipment received at ${hub} and awaiting further process`,
      Hub: hub
    };

    deliveryTrackingList.push(deliveryRecord);
    shipmentDetailsList.push(shipmentRecord);
  }

  return { deliveryTrackingList, shipmentDetailsList };
}

// Generate the sample data
const { deliveryTrackingList, shipmentDetailsList } = generateDeliveryAndShipmentData(50);


// 1. Target directory and file path
const outputDir = path.join(__dirname, 'data');
const filePathDelivery = path.join(outputDir, 'deliveryTrackingSample.json');
const filePathShipment = path.join(outputDir, 'shipmentDetailsSample.json');



// 2. Ensure the directory exists before writing
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}


fs.writeFileSync(filePathDelivery, JSON.stringify(deliveryTrackingList, null, 2));
fs.writeFileSync(filePathShipment, JSON.stringify(shipmentDetailsList, null, 2));

console.log(`Successfully generated deliveryTrackingList.json at: ${filePathDelivery}`);
console.log(`Successfully generated shipmentDetailsList.json at: ${filePathShipment}`);