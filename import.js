var fs = require('fs');
var path = require('path');
var os = require('os');

fs.readFile(path.join(os.homedir(), '/Downloads/test.json'), function(err, data) {
    try {
        var json = JSON.parse(data);
        var customers = json.data.map((customer, index) => ({
            id: index,
            name: `${customer.first} ${customer.last}`,
            phone: "",
            email: customer.EMail,
            dob: "",
            address: {
                "street1": customer.Street,
                "street2": customer.Street2,
                "city": customer.City,
                "state": customer.State,
                zip: customer.Zip,
                "country": ""
            },
            "acceptSms": false,
            "acceptEmail": true,
            "measurements": {
                "neck": "",
                "fullChest": "",
                "fullShoulderWidth": "",
                "rightSleeve": "",
                "leftSleeve": "",
                "bicep": "",
                "wrist": "",
                "waist": "",
                "hips": "",
                "frontJacketLength": "",
                "frontChestWidth": "",
                "backWidth": "",
                "rightHalfShoulder": "",
                "leftHalfShoulder": "",
                "fullBackLength": "",
                "halfBackLength": ""
            },
            "orders": "ARRAY"
        }))
        fs.writeFile('myjsonfile.json', JSON.stringify(customers));

    } catch (error) {
        console.log('error:', error); // eslint-disable-line no-console
    }
})
